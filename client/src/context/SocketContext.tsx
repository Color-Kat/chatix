import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { api } from "../utils/api";

export const socket = io('ws://localhost:4000');

export const socketContext = React.createContext<any>(null);

export const SocketProvider: React.FC = ({ children }: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    function err(mess: string | undefined) {
        setError(mess ?? 'Произошла непредвиденная ошибка');
    }



    useEffect(() => {
        // socket.on('connected', () => {
        //     console.log('connected');

        // socket.on('chat_message', (data: string) => {
        //   console.log(data);
        // });

        socket.on('messages', (data) => {
            console.log(data);
        });

        socket.emit('messages', {
            peerId: '2pnw0JCb',
            authorization_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJwbncwSkNiIiwiaWF0IjoxNjQ5MTgyMzkxLCJleHAiOjE2NDk1Mjc5OTF9.9qstennisXP3TA8Q1GQZ7qMjhyeN_QxSJ1o5fNBCytM",
        });

        // socket.emit('chat_message', {
        //   authorization_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJwbncwSkNiIiwiaWF0IjoxNjQ5MTgyMzkxLCJleHAiOjE2NDk1Mjc5OTF9.9qstennisXP3TA8Q1GQZ7qMjhyeN_QxSJ1o5fNBCytM",
        //   message: "Deine mutter ist fantastisch",
        //   to: "2pnw0JCb"
        // });
        // });
    }), [];


    // Reset errors
    useEffect(() => {
        setTimeout(() => {
            setError("");
        }, 7000);
    }, [error]);

    return (
        <socketContext.Provider
            value={{
                error, // errors messages
                isLoading, // loading state


            }}
        >
            {children}
        </socketContext.Provider>
    );
};