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
            {messages.map(message => {
                const id = message.id;
                const text = message.message;
                const from = message.from;

                return (

                    <div className="messages-list__message" key={id}>
                        {text}
                    </div>
                );
            })}
        </div>
    );
}
