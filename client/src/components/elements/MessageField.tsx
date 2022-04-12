import { ChangeEvent, FunctionComponent, useContext, useEffect, useRef, useState } from "react";
import { IoSend } from 'react-icons/io5';
import { socketContext } from "../../context/SocketContext";

interface MessageFieldProps {
    peerId: string
}

export const MessageField: FunctionComponent<MessageFieldProps> = ({peerId}) => {
    const textArea = useRef<HTMLTextAreaElement>(null);
    const { sendMessage } = useContext(socketContext);
    const [message, setMessage] = useState<string>('');

    const textAreaAutoResize = () => {
        if (textArea.current) {
            const textAreaElem = textArea.current;
            function pxToNumber(px: string) { return +px.slice(0, px.length - 2) }

            // If height == scrollHeight try to reset text area height
            // it is for auto decrease height
            if (textAreaElem.scrollHeight === textAreaElem.offsetHeight) {
                textAreaElem.style.height = '40px';
            }

            // Increase textArea height when scroll decreases
            if (pxToNumber(textAreaElem.style.height) < pxToNumber(textAreaElem.style.maxHeight))
                textAreaElem.style.height = textAreaElem.scrollHeight + 'px';
        }
    }

    const changeHandle = (e: ChangeEvent<HTMLTextAreaElement>) => {
        textAreaAutoResize();
        setMessage(e.target.value);
    }

    const send = async () => {
        sendMessage(message, peerId);
    }

    useEffect(() => {

    }, []);

    return (
        <div className="message-field w-full flex h-8 sticky bottom-12 justify-between items-end">
            <textarea
                ref={textArea}
                onChange={changeHandle}
                name="message"
                id="message-field"
                placeholder="Сообщение"
                value={message}
                style={{
                    minHeight: 40,
                    height: 40,
                    maxHeight: 120
                }}
                className="flex flex-1 bg-app-dark rounded-lg py-2 px-2.5 text-base tracking-wider outline-none resize-none"
            ></textarea>
            <button
                className="h-10 w-10 bg-app-light flex items-center justify-center rounded-lg"
                onClick={send}
            ><IoSend size={16} opacity="55" color="white" /></button>
        </div>
    );
}
