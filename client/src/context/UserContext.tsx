import React, { memo, useEffect, useState } from "react";
import { api, IApiResponse } from "../utils/api";
import { IMessage } from "./SocketContext";

export interface IUser {
    id: string;
    nickname: string;
    password: string;
    image: string;
    myChatsIds: string[];
    notifications: { [key: string]: INotifiication };
}

export interface INotifiication {
    fromId: string;
    count: number;
}
export type Notifications = { [key: string]: INotifiication }[];

export interface IMyChat {
    chatId: string;
    lastMessage: IMessage;
    peerUser: IUser;
    notifications: number;
}

export const authContext = React.createContext<any>(null);

export const AuthProvider: React.FC = ({ children }: any) => {
    const [isAppLoading, setIsAppLoading] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [user, setUser] = useState<IUser | null>(null);
    const [notifications, setNotifications] = useState<Notifications>([]);

    // Set error message
    function err(mess: string | undefined) {
        setError(mess ?? 'Произошла непредвиденная ошибка');
    }

    async function withAppLoader<T>(
        callback: <T>(...params: any[]) => Promise<IApiResponse<T>>,
        ...params: any[]
    ) {
        setIsAppLoading(true);
        const result = await callback<T>(...params);
        setIsAppLoading(false);
        return result;
    }

    // Set authorized user
    const getAuthUser = async (): Promise<IUser | boolean> => {
        // setIsAppLoading(true);
        // const result = await api<{ user: IUser }>('/user');
        // setIsAppLoading(false);

        const result = await withAppLoader<{ user: IUser }>(api, '/user');

        if (!result.isSuccess) {
            err(result.error);
            return false;
        }

        setUser(result.payload.user);
        return result.payload.user;
    }

    // register new user
    const register = async (nickname: string, password: string): Promise<boolean> => {
        // const result = await api('/register', { nickname, password });
        const result = await withAppLoader(api, '/register', { nickname, password });

        if (!result.isSuccess) err(result.error);

        return result.isSuccess;
    }

    // Login user by nickname and password. If success, store jwt token
    const login = async (nickname: string, password: string): Promise<boolean> => {
        // If success, we get jwt token
        const result = await withAppLoader<{
            jwt_token: string,
            user: IUser
        }>(api, '/login', { nickname, password });

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

        setUser(prev => {
            if (!prev) return prev;
            const myChatsIds = prev.myChatsIds;
            myChatsIds.push(peerId);
            return { ...prev, myChatsIds };
        })


        return true;
    }

    const removeFromMyChats = async (peerId: string): Promise<boolean> => {
        const result = await api('/remove-from-chats', { peerId });

        if (!result.isSuccess) {
            err(result.error)
            return false;
        }

        setUser(prev => {
            if (!prev) return prev;
            const myChatsIds = prev.myChatsIds;
            const index = myChatsIds.indexOf(peerId);
            myChatsIds.splice(index, 1)
            return { ...prev, myChatsIds };
        });


        return true;
    }

    // Get from server list of my chats with peerUser, notifications and last message
    const getMyChats = async (): Promise<IMyChat[] | false> => {
        const result = await api<{ myChats: IMyChat[] }>('/my-chats');

        if (!result.isSuccess) {
            err(result.error)
            return false;
        }

        // Sort by date
        return result.payload.myChats.sort((a, b) => {
            return (a.lastMessage.createdAt < b.lastMessage.createdAt ? 1 : -1);
        });
    }

    useEffect(() => {
        getAuthUser();
    }, []);

    // Reset errors
    useEffect(() => {
        setTimeout(() => {
            setError("");
        }, 7000);
    }, [error]);

    return (
        <authContext.Provider
            value={{
                error, // errors messages
                isAppLoading, // loading state

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
                removeFromMyChats,
                getMyChats
            }}
        >
            {children}
        </authContext.Provider>
    );
};

