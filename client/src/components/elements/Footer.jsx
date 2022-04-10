import { Link } from "react-router-dom";
import Logo from "./Logo";
import { HeaderLink } from "./Header";

export const Footer = ({ }) => {
    return (
        <footer className="flex justify-center bg-slate-100 text-slate-800 shadow-lg py-4 opacity-60">
            <div className="container px-5 flex-col md:flex-row flex items-center">
                <Logo />
                <span>@all rights reserved.</span>
            </div>
        </footer>
    );
}