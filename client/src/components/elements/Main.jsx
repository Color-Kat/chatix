import { Footer } from "./Footer";




export const Main = ({ children }) => {
    return (
        <div id="main" className="flex flex-col h-screen overflow-hidden">
            <div id="content" className="flex-auto flex flex-col justify-between  z-10 overflow-scroll overflow-x-hidden">
                <div className="container px-2 sm:px-5 flex justify-center">
                    {children}
                </div>
            </div>
        </div>
    );
}