import { FunctionComponent, useContext, useEffect } from "react";
import { authContext } from "../../context/UserContext";

import Header from "../elements/Header";
import Main from '../elements/Main.jsx';
import HeaderName from "../HeaderName";
import HeaderSearch from "../HeaderSearch";


interface ChatsProps {

}

export const Chats: FunctionComponent<ChatsProps> = () => {
    const { user } = useContext(authContext);
    
    const myChats = user.myChats;


    return (
        <section id="chats" className="h-screen flex flex-col">
            <Header>
                <HeaderName nickname={user.nickname} image="https://sun9-32.userapi.com/impf/c853428/v853428972/210be5/TEX4SUcRtK8.jpg?size=689x1080&quality=96&sign=9b6e14d8e04ace5ff72332c71015a281&type=album" />
                <HeaderSearch />
            </Header>
            <Main>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci molestiae vel ducimus non temporibus rerum perspiciatis saepe maiores. Nisi incidunt provident molestias soluta rem eos sunt placeat! Aspernatur optio accusantium commodi vitae officia doloribus ullam nisi id deserunt, voluptatum facilis molestias, natus adipisci nobis nostrum at nemo ab pariatur enim unde architecto! Recusandae exercitationem veniam pariatur ea animi maxime beatae provident suscipit. Nobis vitae nesciunt doloremque voluptatibus incidunt dolores sunt quam sapiente modi, natus a omnis! Animi accusantium, quam molestias omnis maxime nostrum consectetur nulla quos, asperiores corrupti saepe provident, expedita dolore voluptate laborum optio sit. Provident aliquid deleniti nemo nostrum, similique temporibus autem eum ipsa a voluptatum sequi facilis eligendi ad sit! Quae nemo in qui saepe tempore neque blanditiis excepturi, sint exercitationem facilis ratione assumenda eveniet molestias dicta nam est corporis aspernatur! Sunt mollitia reprehenderit hic exercitationem tempora incidunt. Quae asperiores perspiciatis saepe placeat eaque exercitationem corrupti reiciendis est laborum facere eveniet reprehenderit consectetur ex velit harum in delectus voluptatum, iusto architecto quaerat, dicta debitis autem! Laudantium at necessitatibus corporis magni tempora nihil nesciunt labore saepe maiores beatae molestiae, earum excepturi quam corrupti ratione impedit distinctio. Fuga debitis in mollitia asperiores, eligendi cupiditate tempore commodi voluptatem? Ipsum consectetur repellat, mollitia eveniet tempora, earum laboriosam nobis quod, iusto facilis optio accusamus placeat dignissimos eaque necessitatibus voluptatum minima accusantium ea. Nulla, alias! Provident temporibus tenetur omnis quae voluptate tempora doloribus maiores vel modi animi. Culpa deleniti soluta consequatur in molestias eligendi eius accusamus quasi deserunt beatae odit, minima, ipsum quibusdam quod nihil reprehenderit quae numquam laudantium. Voluptatum maiores quidem hic corporis perspiciatis cupiditate ad laborum distinctio nemo, sunt laudantium mollitia necessitatibus consequatur delectus quaerat in pariatur unde quisquam repudiandae. Fuga vero, laboriosam odit ex qui doloremque atque molestiae ab dignissimos saepe enim praesentium maiores! Maiores tenetur quo error, corporis unde laboriosam expedita voluptatibus perferendis obcaecati sed aliquam, veniam quis optio, eligendi cum minus dolorem sapiente incidunt. Minima, officiis. Iure voluptas recusandae neque culpa nobis totam quod vitae. Unde doloremque ad natus, beatae a numquam dolore in fugiat molestias tempore non maiores. Quia placeat, iste deserunt magni quas debitis error consectetur necessitatibus atque ullam perspiciatis perferendis incidunt repellat voluptas. Excepturi fugiat asperiores iste libero doloremque earum dolore obcaecati culpa, porro cupiditate tempore corrupti esse pariatur ratione consequuntur quisquam impedit molestias distinctio tenetur sequi, minus labore. Nihil totam pariatur quod quia, quos explicabo libero dolorem perspiciatis eveniet facilis quaerat est voluptatibus quisquam nostrum aliquid dicta nam placeat repellat adipisci magnam odit commodi qui voluptatum ducimus! Qui aperiam ipsam ipsa cumque quaerat perspiciatis totam voluptates vel repellat, sequi ullam enim veritatis. Temporibus similique labore iusto? Odit beatae perferendis dolorum sapiente ducimus mollitia laboriosam natus? Doloremque hic blanditiis dignissimos quisquam, aperiam id et culpa nam, eos aliquam sint commodi. Laboriosam molestiae accusamus aperiam necessitatibus adipisci excepturi quaerat. Numquam molestias iure cumque adipisci, enim perspiciatis iste? Ullam voluptas similique ex nulla dolor veritatis porro quod repellendus temporibus numquam laboriosam tempore provident vel quos possimus, reiciendis voluptatibus alias aliquam consectetur quibusdam? Aut perspiciatis expedita sapiente necessitatibus!
            </Main>
        </section >
    );
}

