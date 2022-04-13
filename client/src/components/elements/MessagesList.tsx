import { ChangeEvent, FunctionComponent, useContext, useEffect, useRef, useState } from "react";
import { IoSend } from 'react-icons/io5';
import { IMessage, socketContext } from "../../context/SocketContext";

interface MessagesListProps {
    userId: string; // Id of auth user to detect message owner
    messages: IMessage[]; // Array of messages
}

export const MessagesList: FunctionComponent<MessagesListProps> = ({ userId, messages }) => {



    useEffect(() => {
        console.log(messages);

    }, [messages]);

    return (
        <div className="messages-list w-full flex flex-col">
            <span>123</span>
            <span>123</span>
            <span>123</span>
        </div>
    );
}
