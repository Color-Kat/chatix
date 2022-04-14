import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Logo from "./Logo";

export const HeaderLink = ({ to, children }) => {
    return <li className="mx-3 list-none hover:scale-105 hover:text-slate-300"></li>;
}

const HeaderLinkMobile = ({ to, children }) => {
    return <li className="text-2xl font-medium mb-1 list-none hover:scale-105 hover:text-slate-300">
        <Link to={to}>{children}</Link>
    </li>;
}

export const Header = ({ children }) => {
    return (
        // <header className="flex sticky top-0 w-full z-20 text-3xl flex-wrap items-center h-max">
        <header className="sticky w-full z-20 text-3xl flex-wrap items-center h-max">
            {/* <div className="container flex items-center justify-between px-1  z-20">
                <Logo />
            </div> */}

            {children}
        </header>
    );
}