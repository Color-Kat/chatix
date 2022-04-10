import { FunctionComponent, useContext } from "react";
import { socketContext } from "../../context/SocketContext";

interface ChatProps {

}

export const Chat: FunctionComponent<ChatProps> = () => {
    const { sendMessage } = useContext(socketContext);

    return (
        <section id="chat">
            chat
            <button onClick={() => { sendMessage('Тестовое сообщение', 'QWW8kBVX') }}>Отправить</button>
        </section>
    );
}
