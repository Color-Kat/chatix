import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { api, IApiResponse } from "../utils/api";

export type EventType = 'send_message' | 'messages_of';
export interface IMessage {
    id: string;
    message: string;
    from: string;
    to: string;
    createdAt: number;
}

export const socket = io('ws://localhost:4000');

export const socketContext = React.createContext<any>(null);

export const SocketProvider: React.FC = ({ children }: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [notifications, setNotifications] = useState<{peerId: string, count: number}[]>([]);
    const [currentMessages, setCurrentMessages] = useState<IMessage[]>([]);
    const [currentPeerId, setCurrentPeerId] = useState<string>();

    function err(mess: string | undefined) {
        setError(mess ?? 'Произошла непредвиденная ошибка');
    }

    function onEvent<T>(event: EventType, callback: (data: T) => void) {
        socket.on(event, (data: IApiResponse<T>) => {
            console.log(data);

            if (!data.isSuccess) {
                err(data.error);
            } else callback(data.payload);
        });
    }

    const emit = (event: EventType, data: any) => {
        data.authorization_token = localStorage.getItem('authorization_access_token') ?? '';
        socket.emit(event, data);
    }

    /**
     * Return all message of userId and peerId
     * @param peerId userId of chat partner
     */

    const getMessagesOf = (peerId: string) => {
        emit('messages_of', { peerId });
    }

    /**
     * Send message {message} to {to}
     * 
     * @param message 
     * @param to userId who needs to send a message
     */

    const sendMessage = (message: string, to: string) => {
        emit('send_message', {
            to, message
        });
    }

    useEffect(() => {
        // socket.on('connected', () => {
        //     console.log('connected');

        // getMessagesOf('2pnw0JCb');

        // Save messages and companion peerId when we get messages of somebody
        onEvent<{ messages: IMessage[], peerId: string }>('messages_of', (data) => {
            setCurrentMessages(data.messages);
            setCurrentPeerId(data.peerId);
        });

        onEvent('send_message', (data) => {
            console.log(data);
        });

        // socket.on('send_message', (data) => {
        //     console.log(data);
        // });

        // socket.on('messages_of', (data) => {
        //     console.log(data);
        // });

        // socket.emit('messages', {
        //     peerId: '2pnw0JCb',
        //     authorization_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJwbncwSkNiIiwiaWF0IjoxNjQ5MTgyMzkxLCJleHAiOjE2NDk1Mjc5OTF9.9qstennisXP3TA8Q1GQZ7qMjhyeN_QxSJ1o5fNBCytM",
        // });

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

                getMessagesOf,
                sendMessage,

                currentPeerId,
                currentMessages,
            }}
        >
            {children}
        </socketContext.Provider>
    );
};