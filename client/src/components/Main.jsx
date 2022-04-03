import { Footer } from "./Footer";
import { Content } from "./Content";
import { Header } from "./Header";

export const Main = ({ }) => {
    return (
        <div id="main" className="flex flex-col h-screen overflow-auto overflow-x-hidden">
            <Header />

            <Content />

            <Footer />
        </div>
    );
}