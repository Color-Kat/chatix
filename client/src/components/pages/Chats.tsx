import { FunctionComponent, memo, useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authContext, IMyChat } from "../../context/UserContext";

import Header from "../elements/Header";
import Main from '../elements/Main';
import HeaderName from "../HeaderName";
import HeaderSearch from "../HeaderSearch";
import { Loader } from "./Loader";

const ChatItem: FunctionComponent<{ myChat: IMyChat }> = memo(({ myChat }) => {
    const user = myChat.peerUser;
    const lastmessage = myChat.lastMessage.message;
    const date = new Date(myChat.lastMessage.createdAt);
    const dataOpt = { month: 'short', day: 'numeric' };


    return (
        <Link to={`/chat/${myChat.chatId}`}>
            <li className="chats-list__chat flex justify-between pb-6">
                <span className="chats-list__chat-notification">{myChat.notifications}</span>

                <img src={myChat.peerUser.image} alt="(*)" className="chats-list__left w-10 h-10 rounded-full object-cover shadow-3xl" />
                <div className="chats-list__right flex-1 pl-4 relative">
                    <div className="chats-list__nickname text-base font-normal">{user.nickname}</div>
                    <div className="chats-list__lastmessage text-white font-light text-xs">{lastmessage ?? 'Вы не начали диалог'}</div>


                    <span className="chats-list__date absolute right-0 top-1/2 -translate-y-1/2 text-sm">
                        {lastmessage ? date.toLocaleDateString('ru-RU', dataOpt as any) : new Date(Date.now()).toLocaleDateString('ru-RU', dataOpt as any)}
                    </span>
                </div>
            </li>
        </Link>
    );
})


const ChatsList: FunctionComponent<{ myChats: IMyChat[] }> = memo(({ myChats }) => {
    if (!myChats.length) return (
        <div className="chats-list-empty w-full flex justify-center items-center">
            <h3 className="text-3xl text-center tracking-widest font-light text-white text-opacity-50">У вас нет чатов</h3>
        </div>
    )

    return (
        <ul className="chats-list w-full pt-3">
            {myChats.map(myChat => {
                return (
                    <ChatItem key={myChat.chatId} myChat={myChat} />
                );
            })}
        </ul>
    );
}, (prev, next) => {
    if (prev.myChats.length == next.myChats.length) return true;
    return false;
}
)

export const Chats: FunctionComponent<{}> = memo(() => {
    const { user, getMyChats } = useContext(authContext);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [myChats, setMyChats] = useState<IMyChat[]>([]);

    useEffect(() => {
        const loadMyChats = async () => {
            setIsLoading(true);
            setMyChats(await getMyChats());
            setIsLoading(false);
        };

        loadMyChats();
    }, []);

    return (
        <section id="chats" className="h-screen flex flex-col">
            <Header>
                <HeaderName nickname={user.nickname} image={user.image} />
                <HeaderSearch />
            </Header>
            <Main>
                {!isLoading
                    ? <ChatsList myChats={myChats} />
                    : <div className="flex mt-10 justify-center w-full"> <Loader /></div>
                }
            </Main>
        </section >
    );
});

