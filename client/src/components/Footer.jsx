import { Link } from "react-router-dom";
import Logo from "./elements/Logo";
import { HeaderLink } from "./Header";

export const Footer = ({ }) => {
    return (
        <footer className="flex justify-center bg-slate-400 text-slate-800 shadow-lg py-4">
            <div className="container px-5 flex-col md:flex-row flex items-center">
                <Logo />
                <span>@all rights reserved.</span>
            </div>
        </footer>
    );
}