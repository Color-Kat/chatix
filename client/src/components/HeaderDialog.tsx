import { FunctionComponent } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface HeaderDialogProps {
    nickname: string;
    image: string;
}

export const HeaderDialog: FunctionComponent<HeaderDialogProps> = ({ nickname, image }) => {
    const navigate = useNavigate();

    return (
        <div id="chats" className="flex w-full items-center pb-3">
            <button className="mr-3" onClick={() => { navigate(-1) }}><IoMdArrowRoundBack /></button>

            <img src={image} alt="(*)" className="w-12 h-12 rounded-full object-cover shadow-3xl" />
            <h1 className="pl-4 tracking-wider text-3xl">{nickname}</h1>
        </div >
    );
}

