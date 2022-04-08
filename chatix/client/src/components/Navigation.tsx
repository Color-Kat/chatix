import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoChatbubblesSharp } from "react-icons/io5";

interface NavigationProps {

}

export const Navigation: FunctionComponent<NavigationProps> = () => {
    return (
        <nav id="navigation" className="relative w-full z-20 bg-gray-50 shadow-inner h-16 flex-shrink-0 flex justify-evenly items-center px-6">
            <Link to="/"><IoChatbubblesSharp size={35} /></Link>
            <Link to="/profile"><CgProfile size={35} /> </Link>
        </nav>
    );
}