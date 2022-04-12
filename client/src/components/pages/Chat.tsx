import { FunctionComponent, useContext, useEffect, useState } from "react";
import { IoLogoChrome } from "react-icons/io";
import { useParams } from "react-router-dom";
import { authContext, IUser } from "../../context/UserContext";

import { Header } from '../elements/Header';
import { Main } from '../elements/Main';
import { MessageField } from "../elements/MessageField";
import { HeaderDialog } from "../HeaderDialog";
import { HeaderName } from "../HeaderName";
import { User404 } from "./User404";

interface ChatProps {

}

export const Chat: FunctionComponent<ChatProps> = () => {
    const { sendMessage, getUserById } = useContext(authContext);
    const { peerId } = useParams();

    const [peerUser, setPeerUser] = useState<IUser>();

    const { addToMyChats } = useContext(authContext);

    // Load peer user (companion)
    const loadPeerUser = async () => {
        const result = await getUserById(peerId);
        setPeerUser(result);
    }

    useEffect(() => {
        loadPeerUser();
    }, []);

    return (
        <section id="chat" className="relative h-screen flex flex-col w-full">
            <Header>
                <HeaderDialog nickname={peerUser?.nickname ?? ''} image={peerUser?.image ?? ''} />
            </Header>

            <Main>
                <div className="chat__messages">
                </div>
            </Main>

            <MessageField peerId={peerId ?? ''} />



            {/* chat
            <button onClick={() => { sendMessage('Тестовое сообщение', 'QWW8kBVX') }}>Отправить</button> */}


        </section >
    );
}
