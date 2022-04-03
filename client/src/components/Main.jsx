import { Route, Routes } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Navigation } from "./Navigation";

// Pages
import { Home } from "./pages/Home";
import { Chat } from "./pages/Chat";
import { Login } from "./pages/Login";

export const Main = ({ }) => {
    return (
        <div id="main" className="flex flex-col h-screen overflow-hidden">
            <Header />

            <div id="content" className="flex-auto flex flex-col justify-between bg-slate-100 z-10 overflow-scroll overflow-x-hidden">
                <div className="container px-2 sm:px-5 flex justify-center">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/chat/:id" element={<Chat />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>

                <Footer />
            </div>


            <Navigation />
        </div>
    );
}