import { ChangeEvent, FunctionComponent, memo, useContext, useEffect, useRef } from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { IMessage, socketContext } from "../../context/SocketContext";
import { authContext } from "../../context/UserContext";

interface MessagesListProps {
    userId: string; // Id of auth user to detect message owner
    messages: IMessage[]; // Array of messages
}

export const MessagesListEmpty: FunctionComponent<{ peerId: string }> = memo(({ peerId }) => {
    const { addToMyChats, user } = useContext(authContext);

    return (
        <div className="messages-list-empty flex flex-col justify-center items-center w-full h-full">
            {!user.myChatsIds.includes(peerId)
                ? <>
                    <button className="opacity-90 h-14 w-14 flex items-center justify-center rounded-lg shadow-lg bg-app-blue" onClick={() => {
                        addToMyChats(peerId);
                    }}><BsFillPersonPlusFill size={30} /></button>
                    <span className="text-white text-opacity-50 mt-2 text-lg">Добавить чат</span>
                </>

                : <span className="text-white text-opacity-50 mt-2 text-lg">Начните диалог</span>
            }
        </div>
    );
});

export const MessagesList: FunctionComponent<MessagesListProps> = memo(({ userId, messages }) => {
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
});