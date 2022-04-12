import { FunctionComponent, useContext, useEffect, useState } from "react";
import { IoLogoChrome } from "react-icons/io";
import { useParams } from "react-router-dom";
import { authContext, IUser } from "../../context/UserContext";

import { Header } from '../elements/Header';
import { Main } from '../elements/Main';
import { MessageField } from "../elements/MessageField";
import { HeaderDialog } from "../HeaderDialog";
import { HeaderName } from "../HeaderName";
import { User404 } from "./User404";

interface ChatProps {

}

export const Chat: FunctionComponent<ChatProps> = () => {
    const { sendMessage, getUserById } = useContext(authContext);
    const { peerId } = useParams();

    const [peerUser, setPeerUser] = useState<IUser>();

    const { addToMyChats } = useContext(authContext);

    // Load peer user (companion)
    const loadPeerUser = async () => {
        const result = await getUserById(peerId);
        setPeerUser(result);
    }

    useEffect(() => {
        loadPeerUser();
    }, []);

    return (
        <section id="chat" className="relative h-screen flex flex-col">
            <Header>
                <HeaderDialog nickname={peerUser?.nickname ?? ''} image={peerUser?.image ?? ''} />
            </Header>

            <Main>
                <div className="relative flex flex-col">
                    <div className="chat__messages">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique voluptates reiciendis nobis architecto esse. Suscipit earum repudiandae pariatur placeat beatae illo molestias in sit porro? Explicabo, rem! Cum ea doloribus aliquam, illum consectetur similique a perferendis eum magnam culpa minima perspiciatis dolorum! Numquam, maiores reprehenderit sed temporibus placeat aspernatur commodi optio? Modi nemo, eveniet nihil officiis, vel magnam provident, quibusdam doloremque ullam incidunt doloribus? Minus magnam porro saepe a reiciendis temporibus ullam unde autem, ut asperiores iste dolor dolore, minima in nam incidunt, ex veritatis. Dicta laboriosam libero aspernatur iste neque necessitatibus fuga, obcaecati similique ducimus pariatur modi nesciunt eligendi. Ipsam tempora illo optio autem distinctio doloribus cumque qui vero recusandae. Quod nam explicabo rerum atque suscipit tempore labore deserunt animi vero libero earum mollitia, iure facilis fugit natus, odio quam voluptates non ad nobis repellendus enim laboriosam unde maxime. Autem delectus, fuga officiis natus dolores fugit alias deleniti vero hic ad ab animi sint culpa labore quae optio quis voluptatem enim ex consequuntur odio excepturi laboriosam. Corporis ea magnam reiciendis molestiae soluta praesentium possimus esse ipsa! Iusto quos dignissimos alias eaque libero vero, accusantium maiores adipisci porro odit eius sequi autem id exercitationem a. Culpa adipisci dolorem sit eius commodi recusandae at, quia debitis voluptatibus, alias ad ullam fugiat est autem deserunt eaque praesentium vel, magnam quo illo nisi earum iusto ipsa! Voluptatem ducimus porro repellendus quis facere magnam soluta error. Vel, iste aliquam expedita sed quod illum sunt quam corrupti incidunt dolore suscipit consequuntur, quae eos quo architecto ipsa exercitationem. Nam officia quisquam dolorum necessitatibus corporis mollitia cum a inventore rem vero eius sit, quas quia deleniti nemo cupiditate. Veniam voluptatem assumenda quisquam eaque laboriosam sint labore sequi sunt eligendi, molestias ut blanditiis corrupti esse adipisci perferendis quos temporibus repellendus porro debitis sit impedit non nesciunt? Nemo blanditiis magnam ullam. Inventore, nihil ratione? Ea quo sunt vitae minus doloremque. Ipsam modi commodi quia. Aut, mollitia! Sequi iste laudantium voluptatibus nam pariatur magnam hic rerum ipsam magni eveniet accusantium, expedita eligendi voluptatem porro repudiandae quos cupiditate, aspernatur aliquam minus inventore itaque, libero aut explicabo. Eligendi recusandae quas laudantium velit omnis. Quis nemo, quidem nihil obcaecati accusantium quam, iure error eos ducimus modi atque ea quisquam aut quod labore maiores at necessitatibus eveniet provident illum. Esse, odio, et eaque, commodi iusto velit sint quo sed veniam omnis aspernatur fuga! Sint officia qui sunt asperiores itaque quos totam, aut sapiente eaque! In error aut neque nostrum incidunt consequatur cumque, illum aliquam totam natus animi aspernatur architecto, at unde quos soluta ab eligendi. Eligendi nesciunt consequuntur odit culpa harum adipisci quis temporibus inventore neque natus recusandae deserunt modi ex repellat quaerat omnis, voluptatibus expedita est! Eligendi, facilis tempora blanditiis a voluptatem officia fugiat, harum eos ab dolor minima aperiam explicabo facere expedita voluptatibus eum necessitatibus magnam distinctio quisquam iste vel esse. Suscipit assumenda illum sapiente voluptatibus, harum, quis odio itaque nobis asperiores ullam repellat doloremque, hic facere quia aliquid eius fugit? Soluta accusamus voluptates sit dignissimos sed blanditiis corrupti. Perspiciatis laboriosam consequuntur culpa architecto eum tempore fugiat saepe accusantium molestias nobis repellendus eaque nesciunt consequatur itaque omnis corrupti, a cum possimus! Sunt doloremque eveniet quae dicta animi. Assumenda nobis porro voluptatem quaerat, ad in commodi repellat, consequatur ipsum omnis ea ex! Vel illum expedita debitis laudantium magnam provident beatae molestiae. Suscipit labore nostrum facilis officiis iure sunt aliquid est. Ratione, et ex aperiam, nulla iure dolorem odio aspernatur quidem ipsum odit, unde repudiandae magnam quas vitae soluta inventore? Explicabo, ut quod perferendis labore quasi ipsam dolores necessitatibus sint quis laborum in hic, quia architecto dignissimos qui velit ipsum perspiciatis. Dignissimos aperiam ratione possimus accusamus laudantium enim sapiente velit quas tempore facere qui, sit, sunt veniam quos repellendus voluptas nisi amet magnam repudiandae assumenda atque beatae culpa! Beatae accusantium quo cumque similique cum deserunt repellat fuga, nisi libero amet dicta incidunt soluta. Facere quas asperiores quos sed soluta eaque. Dolores suscipit sunt nisi eos quam quos quis itaque, earum dicta. Consectetur autem dolorem recusandae accusamus beatae dolore nisi possimus rem sapiente maiores, deleniti sit voluptate magni, sed fugiat obcaecati molestiae dicta? Consectetur, nihil autem? Mollitia officia error aliquam voluptatem quod vitae tempore debitis quibusdam placeat dolorem voluptate ipsam iste nostrum cumque veritatis autem nulla odit accusamus, velit beatae non explicabo omnis! Autem, maxime dicta impedit sed veniam quos voluptates nihil soluta pariatur! Accusamus reprehenderit quas quod recusandae officiis error, illo corporis ad voluptate sequi suscipit necessitatibus quia, eaque autem quidem quam atque quisquam, blanditiis dolor ipsa aut. Ut molestiae recusandae perferendis! Nesciunt ducimus dolorum corrupti, officia ab doloremque officiis itaque. Possimus ea perspiciatis aliquam neque, vel vero repellendus facere blanditiis. Eum, odio! Odio mollitia dicta, quisquam vitae ut porro consequuntur nobis totam minima numquam, necessitatibus itaque repudiandae aspernatur sint cupiditate ad molestiae sed quod veritatis nesciunt repellat eaque aut unde! Eveniet amet vel, ut corrupti minus dolores, cum tempora aut, doloremque iusto fugiat ipsum temporibus beatae iste nostrum odit quos doloribus voluptates nisi sunt reiciendis a? Et quia impedit velit corporis suscipit quidem possimus quod omnis asperiores a animi nostrum fugit commodi error sapiente, numquam quam non, odio, accusantium tempora? Nam sapiente, animi omnis quas distinctio culpa numquam deserunt labore impedit natus aliquid ut adipisci porro, vitae consequuntur expedita, doloribus incidunt quam alias eveniet illum? Maxime at autem assumenda aperiam doloremque, dolorem, quae voluptatibus ut aliquid est vero quia incidunt numquam iste quas enim placeat sit, itaque amet? Nemo, eligendi. Corrupti omnis nobis ut enim ducimus commodi maxime illo voluptate, cum alias perspiciatis qui autem quidem veniam architecto consequuntur dolore quae quia molestias! Totam ex, ab illum rem, repudiandae dolores dolorem eligendi quis sed quibusdam, mollitia alias maxime unde ea corrupti soluta. Nam commodi sapiente blanditiis magni reiciendis rem neque minima magnam quas! Doloribus facere fugiat dolorem alias. Iure, quidem tempora! Reprehenderit ex pariatur totam et porro. Fuga eum eveniet suscipit hic nobis unde consectetur, pariatur consequuntur nostrum esse sed quaerat quos nam error deleniti eligendi? Facilis alias temporibus dignissimos ipsum atque delectus animi accusantium repellendus? Ut quis ullam, mollitia itaque quia aliquid.
                    </div>

                </div>
            </Main>

            <MessageField />



            {/* chat
            <button onClick={() => { sendMessage('Тестовое сообщение', 'QWW8kBVX') }}>Отправить</button> */}


        </section >
    );
}
