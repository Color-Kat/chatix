import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { api, IApiResponse } from "../utils/api";

export type EventType = 'connect' | 'connect_user' | 'send_message' | 'messages_of';
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
    const [notifications, setNotifications] = useState<{ peerId: string, count: number }[]>([]);
    const [currentMessages, setCurrentMessages] = useState<IMessage[]>([]);

    const [authUserId, setAuthUserId] = useState<string>('');
    // const [currentPeerId, setCurrentPeerId] = useState<string>();

    function err(mess: string | undefined) {
        setError(mess ?? 'Произошла непредвиденная ошибка');
    }

    function onEvent<T>(event: EventType, callback: (data: T) => void) {
        socket.on(event, (data: IApiResponse<T>) => {
            // console.log(data);

            if (!data.isSuccess) {
                err(data.error);
            } else callback(data.payload);

            connectUser();
        });
    }

    const emit = (event: EventType, data: any) => {
        data.authorization_token = localStorage.getItem('authorization_access_token') ?? '';
        socket.emit(event, data);
    }

    /**
     * Connect user to websocket room
     */

    const connectUser = () => {
        emit('connect_user', {});
    }

    /**
     * Return all message of userId and peerId
     * @param peerId userId of chat partner
     */

    const loadMessagesOf = (peerId: string) => {
        emit('messages_of', { peerId });
    }

    /**
     * Send message {message} to {to}
     * 
     * @param message 
     * @param to userId who needs to send a message
     */

    const sendMessage = (message: string, to: string) => {
        connectUser();

        emit('send_message', {
            to, message
        });
    }

    useEffect(() => {


        // Reconnect user after every socket connection
        socket.on('connect', () => {
            connectUser();
        })

        // Save messages and companion peerId when we get messages of somebody
        onEvent<{ messages: IMessage[], peerId: string }>('messages_of', (data) => {
            setCurrentMessages(data.messages);
        });

        onEvent<IMessage>('send_message', (data) => {
            console.log('me - ' + authUserId);
            console.log((authUserId == data.to ? data.from : data.to));

            loadMessagesOf((authUserId == data.to ? data.from : data.to));
        });
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

                setAuthUserId,
                // setCurrentPeerId,

                loadMessagesOf,
                sendMessage,

                // currentPeerId,
                currentMessages,
            }}
        >
            {children}
        </socketContext.Provider>
    );
};