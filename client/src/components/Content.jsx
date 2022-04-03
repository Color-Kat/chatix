import { Route, Routes } from "react-router-dom";


export const Content = ({ scrollElement }) => {
    return (
        <div id="content" className="flex-auto flex-shrink-0 flex justify-center bg-slate-100">
            <div className="container px-2 sm:px-5 flex justify-center">
                <Routes>
                    {/* <Route path="/" element={<Home scrollElement={scrollElement} />} /> */}
                </Routes>
            </div>
        </div>
    );
}