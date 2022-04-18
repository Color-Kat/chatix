import { FunctionComponent, memo, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import searchIcon from '../assets/search.png';
import { authContext } from "../context/UserContext";


interface HeaderSearchProps {
}

const HeaderSearch: FunctionComponent<HeaderSearchProps> = () => {
    const navigate = useNavigate();
    const { getUserByNickname } = useContext(authContext);
    const [nickname, setNickname] = useState<string>('');

    const search = useCallback(async () => {
        const result = await getUserByNickname(nickname);

        if (result) navigate('/chat/' + result.id);
        else navigate('/user-404');
    }, [nickname])

    return (
        <div id="header-search" className="flex w-full justify-betwee h-10 items-center">
            <input
                type="text"
                placeholder="Поиск по id..."
                value={nickname}
                onChange={(e) => { setNickname(e.target.value) }}
                className="w-full bg-black bg-opacity-25 rounded-xl h-10 text-sm tracking-widest py-3 px-4 outline-none"
            />
            <button
                onClick={search}
                className="absolute z-10 right-0 w-10 h-10 bg-slate-500 flex justify-center items-center rounded-xl"
            ><img src={searchIcon} alt="" /></button>

        </div >
    );
}

export default memo(HeaderSearch);