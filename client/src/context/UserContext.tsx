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

    const getAuthUser = async () => {
        const user = await api('/user');
        return user;
    }

    const register = async (nickname: string, password: string) => {
        return await api('/register', { nickname, password });
    }

    const login = async (nickname: string, password: string) => {
        const result = await api<{
            jwt_token: string,
            user: IUser
        }>('/login', {nickname, password});

        if (!result.isSuccess) return false;

        localStorage.setItem('authorization_access_token', result.payload.jwt_token);

        return result.payload.user;
    }

    useEffect(() => {
        getAuthUser().then(res => console.log(res));
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

                getAuthUser,
                register,
                login
            }}
        >
            {children}
        </authContext.Provider>
    );
};

