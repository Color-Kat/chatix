import { ChangeEvent, FunctionComponent, memo, useContext, useEffect, useRef, useState } from "react";
import { IoSend } from 'react-icons/io5';
import { IMessage, socketContext } from "../../context/SocketContext";

interface MessagesListProps {
    userId: string; // Id of auth user to detect message owner
    messages: IMessage[]; // Array of messages
}

const MessagesList: FunctionComponent<MessagesListProps> = ({ userId, messages }) => {
    const messagesListElement = useRef<HTMLDivElement>(null);

    function scrollBottom() {
        if (messagesListElement.current)
            messagesListElement.current.scrollTop = messagesListElement.current?.scrollHeight;
    }

    // Scroll to bottom when change messages array
    useEffect(() => {
        scrollBottom();
    }, [messages]);

    return (
        <div className="messages-list w-full flex flex-col px-2.5 pt-2 h-full overflow-scroll no-scrollbar" ref={messagesListElement}>
            {messages.map(message => {
                const id = message.id;
                const text = message.message;
                const from = message.from;
                const dateRaw = new Date(message.createdAt);
                const date = dateRaw.getHours() + ':' + dateRaw.getMinutes();

                return (

                    <div className={`
                        messages-list__message rounded-3xl text-base font-light
                        px-4 py-2.5 pb-3 mb-3 shadow-sm
                        max-w-full relative text-white text-opacity-80
                        ${userId == from ? 'bg-app-dark self-end' : 'bg-app-light self-start'}
                    `} key={id}>
                        {text}
                        <span className="absolute top-full right-4 -translate-y-2/3 text-sm shadow-xl text-opacity-50 text-white">{date}</span>
                    </div>
                );
            })}
        </div>
    );
}

export default memo(MessagesList);