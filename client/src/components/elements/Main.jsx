import { Footer } from "./Footer";




export const Main = ({ children }) => {
    return (
        <div id="main" className="flex-1 flex w-full overflow-scroll no-scrollbar">
            {/* <div id="content" className="flex-auto flex flex-col justify-between z-10 overflow-scroll overflow-x-hidden"> */}
            {children}
            {/* </div> */}
        </div>
    );
}