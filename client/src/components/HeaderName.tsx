import { FunctionComponent, useContext } from "react";
import { HiOutlineLogout } from 'react-icons/hi';
import { authContext } from "../context/UserContext";

interface HeaderNameProps {
    nickname: string;
    image: string;
}

export const HeaderName: FunctionComponent<HeaderNameProps> = ({ nickname, image }) => {
    const { logout } = useContext(authContext);

    return (
        <div id="chats" className="flex w-full items-center  pb-3">
            <img src={image} alt="(*)" className="w-14 h-14 rounded-full object-cover shadow-3xl" />
            <h1 className="pl-4 tracking-wider">{nickname}</h1>

            <button className="absolute right-0" onClick={logout}><HiOutlineLogout size={34} /></button>
        </div >
    );
}

