import { FunctionComponent, memo } from "react";

// export const HeaderLink = ({ to, children }) => {
//     return <li className="mx-3 list-none hover:scale-105 hover:text-slate-300"></li>;
// }

// const HeaderLinkMobile = ({ to, children }) => {
//     return <li className="text-2xl font-medium mb-1 list-none hover:scale-105 hover:text-slate-300">
//         <Link to={to}>{children}</Link>
//     </li>;
// }

const Header: FunctionComponent<{children: any}> = ({ children }) => {
    return (
        // <header className="flex sticky top-0 w-full z-20 text-3xl flex-wrap items-center h-max">
        <header className="sticky w-full z-20 text-3xl flex-wrap items-center h-max">
            {children}
        </header>
    );
}

export default memo(Header);