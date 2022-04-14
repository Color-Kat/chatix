import React, { useEffect, useState } from "react";
import { api } from "../utils/api";

export interface IUser {
    id: string;
    nickname: string;
    password: string;
    image: string;
    myChats: string[];
    notifications: { [key: string]: INotifiication };
}

export interface INotifiication {
    fromId: string;
    count: number;
}
export type Notifications = { [key: string]: INotifiication }[];

export const authContext = React.createContext<any>(null);

export const AuthProvider: React.FC = ({ children }: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [user, setUser] = useState<IUser | null>(null);
    const [notifications, setNotifications] = useState<Notifications>([]);

    // Set error message
    function err(mess: string | undefined) {
        setError(mess ?? 'Произошла непредвиденная ошибка');
    }

    // Set authorized user
    const getAuthUser = async (): Promise<IUser | boolean> => {
        const result = await api<{ user: IUser }>('/user');
        if (!result.isSuccess) {
            err(result.error);
            return false;
        }

        setUser(result.payload.user);
        return result.payload.user;
    }

    // register new user
    const register = async (nickname: string, password: string): Promise<boolean> => {
        const result = await api('/register', { nickname, password });
        if (!result.isSuccess) err(result.error);

        return result.isSuccess;
    }

    // Login user by nickname and password. If success, store jwt token
    const login = async (nickname: string, password: string): Promise<boolean> => {
        console.log(nickname, password);

        // If success, we get jwt token
        const result = await api<{
            jwt_token: string,
            user: IUser
        }>('/login', { nickname, password });

        if (!result.isSuccess) {
            err(result.error)
            return false;
        }

        // Save received jwt token to local storage
        localStorage.setItem('authorization_access_token', result.payload.jwt_token);

        getAuthUser();

        return result.isSuccess;
    }

    // Delete jwt token from localstorage
    const logout = () => {
        localStorage.setItem('authorization_access_token', '');
        setUser(null);
    }

    // Get list of user's notifications
    const getNotifications = async () => {
        const result = await api<Notifications>('/notifications');

        if (!result.isSuccess) {
            err(result.error)
            return false;
        }
        console.log(result);

        setNotifications(result.payload);
    }

    // Delete all notifications from peerId
    const clearNotifications = async (peerId: string) => {
        const result = await api('/clear-notifications', { peerId });

        if (!result.isSuccess) {
            err(result.error)
            return false;
        }

        getNotifications(); // Load updated notifications list
    }

    // Find user by his nickname
    const getUserByNickname = async (nickname: string): Promise<IUser | false> => {
        const result = await api<{ user: IUser }>('/user/' + nickname + "?type=nickname");

        if (!result.isSuccess) {
            err(result.error)
            return false;
        }

        return result.payload.user;
    }

    // Find user by his userId
    const getUserById = async (userId: string): Promise<IUser | false> => {
        const result = await api<{ user: IUser }>('/user/' + userId + "?type=user_id");

        if (!result.isSuccess) {
            err(result.error)
            return false;
        }

        return result.payload.user;
    }

    const addToMyChats = async (peerId: string): Promise<boolean> => {
        const result = await api('/add-to-chats', { peerId });

        if (!result.isSuccess) {
            err(result.error)
            return false;
        }

        // user?.myChats.push(peerId);
        // console.log(user);


        return true;
    }

    const removeFromMyChats = async (peerId: string): Promise<boolean> => {
        const result = await api('/remove-from-chats', { peerId });

        if (!result.isSuccess) {
            err(result.error)
            return false;
        }

        // setUser(prev => {
        //     if (!prev) return prev;

        //     const index = prev.myChats.indexOf(peerId);
        //     prev.myChats.splice(index, 1)
        //     return prev;
        // });


        return true;
    }

    useEffect(() => {
        // logout()
        getAuthUser();
    }, []);


    // Reset errors
    useEffect(() => {
        console.log(error);

        setTimeout(() => {
            setError("");
        }, 7000);
    }, [error]);

    return (
        <authContext.Provider
            value={{
                error, // errors messages
                isLoading, // loading state

                user,
                getAuthUser,
                register,
                login,
                logout,
                notifications,
                clearNotifications,

                getUserByNickname,
                getUserById,
                addToMyChats,
                removeFromMyChats
            }}
        >
            {children}
        </authContext.Provider>
    );
};

