import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import io from "socket.io-client";
import { IApiResponse } from "../utils/api";

export type EventType = 'connect' | 'connect_user' | 'send_message' | 'messages_of' | 'new_notification';
export interface IMessage {
    id: string;
    message: string;
    from: string;
    to: string;
    createdAt: number;
}

export const socket = io('ws://localhost:4000');

export const socketContext = React.createContext<any>(null);

export const SocketProvider: React.FC = memo(({ children }: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<{ peerId: string, count: number }[]>([]);
    const [currentMessages, setCurrentMessages] = useState<IMessage[]>([]);

    // const [authUserId, setAuthUserId] = useState<string>('');

    // Object is link. It's fix unupdateable function with use authUserId. State don't update it! IDK!
    const authUserId = { id: '' }
    function setAuthUserId(id: string) {
        authUserId.id = id
    }

    function err(mess: string | undefined) {
        setError(mess ?? 'Произошла непредвиденная ошибка');
    }

    const onEvent = useCallback(function onEvent<T>(event: EventType, callback: (data: T) => void) {
        socket.on(event, (data: IApiResponse<T>) => {
            if (!data.isSuccess) {
                err(data.error);
            } else callback(data.payload);

            connectUser();
        });
    }, []);

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
        console.log('emit');
        setIsLoading(true);
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

    const sendMessageEvent = useCallback(() => {
        onEvent<IMessage>('send_message', (data) => {
            if (authUserId.id) loadMessagesOf(authUserId.id === data.to ? data.from : data.to);
        });
    }, [authUserId])

    useEffect(() => {
        // Reconnect user after every socket connection
        socket.on('connect', () => {
            connectUser();
        })

        // Save messages and companion peerId when we get messages of somebody
        onEvent<{ messages: IMessage[], peerId: string }>('messages_of', (data) => {
            setCurrentMessages(data.messages);
            setIsLoading(false);
        });


        onEvent<{ peerId: string }>('new_notification', (data) => {
            const sound = new Audio();
            sound.src = '';
        });

        sendMessageEvent();
        // onEvent<IMessage>('send_message', (data) => {
        //     if (authUserId) loadMessagesOf(authUserId === data.to ? data.from : data.to);
        // });

        return () => {
            socket.off('connect');
            socket.off('messages_of');
            socket.off('new_notification');
            socket.off('send_message');
        }
    }, []);

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

                loadMessagesOf,
                sendMessage,

                currentMessages
            }}
        >
            {children}
        </socketContext.Provider>
    );
});