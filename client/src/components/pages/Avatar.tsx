import { ChangeEvent, FunctionComponent, memo, useContext } from "react";
import { authContext } from "../../context/UserContext";

export const Avatar: FunctionComponent<{}> = memo(() => {
    const { loadAvatar } = useContext(authContext);

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        loadAvatar(file);
    }

    return (
        <section id="change-avatar" className="flex justify-center w-full h-full flex-col">
            <h1 className="text-4xl font-semibold mb-5">Сменить аватар</h1>
            <form action="">
                <input type="file" accept="image/*" name="avatar" id="avatar" className="my-5" onChange={changeHandler} />
            </form>
        </section>
    );
})
