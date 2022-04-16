import { FunctionComponent, useContext, useEffect, useState } from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { IoLogoChrome } from "react-icons/io";
import { useParams } from "react-router-dom";
import { socketContext } from "../../context/SocketContext";
import { authContext, IUser } from "../../context/UserContext";

import Header from '../elements/Header';
import Main from '../elements/Main';
import MessageField from "../elements/MessageField";
import { MessagesList, MessagesListEmpty } from "../elements/MessagesList";
import HeaderDialog from "../HeaderDialog";


export const Chat: FunctionComponent<{}> = () => {
    const { user, getUserById } = useContext(authContext);
    const { loadMessagesOf, currentMessages } = useContext(socketContext);

    const userId = user.id; // UserId of auth user (me)
    const { peerId } = useParams(); // UserId of companion (chat partner)
    const [peerUser, setPeerUser] = useState<IUser>();

    // Load peer user (companion)
    const loadPeerUser = async () => {
        const result = await getUserById(peerId);
        setPeerUser(result);
    }

    const loadMessages = async () => {
        loadMessagesOf(peerId);
    }

    useEffect(() => {
        loadPeerUser(); // Load data about peer user (our companion)
        loadMessages(); // Load all message. It will be available in variable currentMessages
    }, []);

    return (
        <section id="chat" className="relative h-full flex flex-col w-full">
            <Header>
                <HeaderDialog peerUser={peerUser} />
            </Header>

            <Main>
                {!currentMessages.length
                    ? <MessagesListEmpty peerId={peerId ?? ''} />
                    : <MessagesList userId={userId} messages={currentMessages} />
                }

            </Main>

            <MessageField peerId={peerId ?? ''} />

        </section >
    );
}
