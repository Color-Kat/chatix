import { FunctionComponent, memo, useContext, useEffect } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { BsFillPersonPlusFill, BsFillPersonDashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { authContext, IUser } from "../context/UserContext";

import { apiPath } from "../utils/api";

interface HeaderDialogProps {
    peerUser: IUser | undefined;
}

const HeaderDialog: FunctionComponent<HeaderDialogProps> = ({ peerUser }) => {
    const navigate = useNavigate();
    const { user, addToMyChats, removeFromMyChats } = useContext(authContext);

    return (
        <div id="chats" className="flex w-full items-center pb-3">
            <button className="mr-3" onClick={() => { navigate(-1) }}><IoMdArrowRoundBack /></button>

            <img src={peerUser ? apiPath + '/' + peerUser?.image : '/assets/loading.gif'} alt="(*)" className="w-12 h-12 rounded-full object-cover shadow-3xl" />
            <h1 className="pl-4 text-3xl">{peerUser?.nickname ?? ''}</h1>

            {!user.myChatsIds.includes(peerUser?.id)
                ? <button className="absolute right-0 h-8 w-8 flex items-center justify-center rounded-lg shadow-lg bg-app-blue" onClick={() => {
                    addToMyChats(peerUser?.id);
                }}><BsFillPersonPlusFill size={20} /></button>

                : <button className="absolute right-0 h-8 w-8 flex items-center justify-center rounded-lg shadow-lg bg-app-orange" onClick={() => {
                    removeFromMyChats(peerUser?.id);
                }}><BsFillPersonDashFill size={20} /></button>
            }

        </div >
    );
}

export default memo(HeaderDialog);