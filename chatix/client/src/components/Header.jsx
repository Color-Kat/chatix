import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Logo from "./elements/Logo";

export const HeaderLink = ({ to, children }) => {
    return <li className="mx-3 list-none hover:scale-105 hover:text-slate-300"></li>;
}

const HeaderLinkMobile = ({ to, children }) => {
    return <li className="text-2xl font-medium mb-1 list-none hover:scale-105 hover:text-slate-300">
        <Link to={to}>{children}</Link>
    </li>;
}

export const Header = ({ }) => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const location = useLocation();

    function toggleMenu() { setShowMobileMenu(prev => !prev) }

    useEffect(() => {
        setShowMobileMenu(false);
    }, [location]);

    return (
        <header className="flex sticky top-0 w-full h-16 justify-center shadow-xl z-20 py-3">
            <div className="container flex items-center justify-between px-1  z-20">


                <Logo />

            </div>
        </header>
    );
}