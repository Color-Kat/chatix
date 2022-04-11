import { FunctionComponent, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const User404: FunctionComponent<{}> = () => {
    const navigate = useNavigate();

    const back = () => {
        navigate(-1)
    }

    return (
        <section id="user-404" className="flex justify-center  w-full h-full flex-col">
            <h2 className="text-3xl tracking-wide">Такой пользователь не найден!</h2>
            <button onClick={back} className="self-start underline text-lg tracking-wide my-2.5">Вернуться</button>
        </section>
    );
}
