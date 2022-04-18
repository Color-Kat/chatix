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
import { Loader } from "./Loader";


export const Chat: FunctionComponent<{}> = () => {
    const { user, getUserById, clearNotifications } = useContext(authContext);
    const { loadMessagesOf, currentMessages, isLoading } = useContext(socketContext);

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
        clearNotifications(peerId);
    }, []);

    return (
        <section id="chat" className="relative h-full flex flex-col w-full">
            <Header>
                <HeaderDialog peerUser={peerUser} />
            </Header>

            <Main>
                {currentMessages.length === 0
                    ? <MessagesListEmpty peerId={peerId ?? ''} />
                    : <MessagesList userId={userId} messages={currentMessages} />
                }

            </Main>
            {isLoading &&
                <span className="absolute top-24 w-full flex justify-center"><Loader size={8} /></span>
            }

            <MessageField peerId={peerId ?? ''} />

        </section >
    );
}
