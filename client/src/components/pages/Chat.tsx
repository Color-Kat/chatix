import { FunctionComponent, useContext, useEffect, useState } from "react";
import { IoLogoChrome } from "react-icons/io";
import { useParams } from "react-router-dom";
import { socketContext } from "../../context/SocketContext";
import { authContext, IUser } from "../../context/UserContext";

import { Header } from '../elements/Header';
import { Main } from '../elements/Main';
import { MessageField } from "../elements/MessageField";
import { MessagesList } from "../elements/MessagesList";
import { HeaderDialog } from "../HeaderDialog";
import { HeaderName } from "../HeaderName";
import { User404 } from "./User404";

interface ChatProps {

}

export const Chat: FunctionComponent<ChatProps> = () => {
    const { getUserById, addToMyChats } = useContext(authContext);
    const { loadMessagesOf, currentMessages } = useContext(socketContext);

    const { peerId } = useParams();

    const [peerUser, setPeerUser] = useState<IUser>();


    // Load peer user (companion)
    const loadPeerUser = async () => {
        const result = await getUserById(peerId);
        setPeerUser(result);
    }

    const loadMessages = async () => {
        const result = loadMessagesOf(peerId);
    }

    useEffect(() => {
        loadPeerUser(); // Load data about peer user (our companion)
        loadMessages(); // Load all message. It will be available in variable currentMessages
    }, []);

    return (
        <section id="chat" className="relative h-screen flex flex-col w-full">
            <Header>
                <HeaderDialog nickname={peerUser?.nickname ?? ''} image={peerUser?.image ?? ''} />
            </Header>

            <Main>
                {/* <MessagesList messages={ currentMessages }/> */}
            </Main>

            <MessageField peerId={peerId ?? ''} />



            {/* chat
            <button onClick={() => { sendMessage('Тестовое сообщение', 'QWW8kBVX') }}>Отправить</button> */}


        </section >
    );
}
