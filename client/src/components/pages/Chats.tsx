import { FunctionComponent, memo, useCallback, useContext, useEffect, useState } from "react";
import { authContext, IMyChat } from "../../context/UserContext";

import Header from "../elements/Header";
import Main from '../elements/Main';
import HeaderName from "../HeaderName";
import HeaderSearch from "../HeaderSearch";

const ChatItem: FunctionComponent<{ myChat: IMyChat }> = memo(({ myChat }) => {
    return (
        <div className="chats-list__chat">

        </div>
    );
})


const ChatsList: FunctionComponent<{ myChats: IMyChat[] }> = memo(({ myChats }) => {
    useEffect(() => {
        console.log('render');
        console.log(myChats);

    }, [myChats]);

    return (
        <div className="chats-list">
            {myChats.map(myChat => {
                // console.log(myChat);

            })}
        </div>
    );
})

export const Chats: FunctionComponent<{}> = memo(() => {
    const { user, getMyChats } = useContext(authContext);
    const [myChats, setMyChats] = useState<IMyChat[]>([]);

    const loadMyChats = useCallback(async () => {
        setMyChats(await getMyChats());
    }, []);

    useEffect(() => {
        loadMyChats();
    }, []);

    return (
        <section id="chats" className="h-screen flex flex-col">
            <Header>
                <HeaderName nickname={user.nickname} image={user.image} />
                <HeaderSearch />
            </Header>
            <Main>
                <ChatsList myChats={myChats} />
            </Main>
        </section >
    );
});

