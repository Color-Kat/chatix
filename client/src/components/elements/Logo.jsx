import { Link } from "react-router-dom";

function Logo() {
    return (
        <Link to="/" className="flex items-center w-max">
            <img src="/assets/logo.png" alt="(@)" className="h-14" />
            <span className="font-bold text-4xl text-slate-800 pl-2 font-mono">Chatix</span>
        </Link>
    );
}

export default Logo;