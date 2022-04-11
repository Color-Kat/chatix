import { FunctionComponent, useContext, useEffect } from "react";

import { Header } from "../elements/Header";
import { Main } from '../elements/Main.jsx';
import { HeaderName } from "../HeaderName";
import { HeaderSearch } from "../HeaderSearch";


interface ChatsProps {

}

export const Chats: FunctionComponent<ChatsProps> = () => {

    return (
        <section id="chats">
            <Header>
                <HeaderName nickname="Color Kat" image="https://sun9-32.userapi.com/impf/c853428/v853428972/210be5/TEX4SUcRtK8.jpg?size=689x1080&quality=96&sign=9b6e14d8e04ace5ff72332c71015a281&type=album" />
                <HeaderSearch />
            </Header>
            <Main>123</Main>
        </section >
    );
}

