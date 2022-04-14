import { Footer } from "./Footer";




export const Main = ({ children }) => {
    return (
        <div id="main" className="flex-1 flex w-full overflow-y-scroll overflow-x-hidden no-scrollbar">
            {children}
        </div>
    );
}