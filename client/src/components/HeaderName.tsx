import { FunctionComponent, memo, useContext } from "react";
import { HiOutlineLogout } from 'react-icons/hi';
import { Link } from "react-router-dom";
import { authContext } from "../context/UserContext";
import { apiPath } from "../utils/api";

interface HeaderNameProps {
    nickname: string;
    image: string;
}

const HeaderName: FunctionComponent<HeaderNameProps> = ({ nickname, image }) => {
    const { logout } = useContext(authContext);

    return (
        <div id="chats" className="flex w-full items-center  pb-3">
            <Link to="/avatar"><img src={apiPath + '/' + image} alt="(*)" className="w-14 h-14 rounded-full object-cover shadow-3xl" /></Link>
            <h1 className="pl-4 tracking-wider">{nickname}</h1>

            <button className="absolute right-0" onClick={logout}><HiOutlineLogout size={34} /></button>
        </div >
    );
}

export default memo(HeaderName);