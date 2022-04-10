import { FunctionComponent } from "react";
import search from '../../assets/search.png';


interface HeaderSearchProps {
}

export const HeaderSearch: FunctionComponent<HeaderSearchProps> = () => {
    return (
        <div id="header-search" className="flex w-full justify-betwee h-10 items-center">
            <input type="text" placeholder="Поиск..." className="w-full bg-black bg-opacity-25 rounded-xl h-10 text-sm tracking-widest py-3 px-4 outline-none" />
            <button className="absolute z-10 right-0 w-10 h-10 bg-slate-500 flex justify-center items-center rounded-xl"><img src={search} alt="" /></button>
        </div >
    );
}

