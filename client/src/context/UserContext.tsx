import React, { useEffect, useState } from "react";
import { api } from "../utils/api";

export interface IUser {
    id: string;
    nickname: string;
    password: string;
}

export const authContext = React.createContext<any>(null);

export const AuthProvider: React.FC = ({ children }: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [user, setUser] = useState<IUser | null>(null);

    function err(mess: string | undefined) {
        setError(mess ?? 'Произошла непредвиденная ошибка');
    }

    const getAuthUser = async (): Promise<IUser> => {
        const result = await api<IUser>('/user');
        if (!result.isSuccess) err(result.error);

        setUser(result.payload);
        return result.payload;
    }

    const register = async (nickname: string, password: string): Promise<boolean> => {
        const result = await api('/register', { nickname, password });
        if (!result.isSuccess) err(result.error);

        return result.isSuccess;
    }

    const login = async (nickname: string, password: string): Promise<boolean> => {
        // If success, we get jwt token
        const result = await api<{
            jwt_token: string,
            user: IUser
        }>('/login', { nickname, password });

        if (!result.isSuccess) return false;

        // Save received jwt token to local storage
        localStorage.setItem('authorization_access_token', result.payload.jwt_token);

        getAuthUser();

        return result.isSuccess;
    }

    useEffect(() => {
        // getAuthUser().then(res => console.log(res));
    }), [];


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
                isLoading, // loading state

                user,
                getAuthUser,
                register,
                login
            }}
        >
            {children}
        </authContext.Provider>
    );
};

