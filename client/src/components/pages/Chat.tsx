import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authContext, IUser } from "../../context/UserContext";

import { Header } from '../elements/Header';
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
        <section id="chat">

            <Header>
                <HeaderDialog nickname={peerUser?.nickname ?? ''} image={peerUser?.image ?? ''} />
            </Header>

            {/* chat
            <button onClick={() => { sendMessage('Тестовое сообщение', 'QWW8kBVX') }}>Отправить</button> */}


        </section>
    );
}
