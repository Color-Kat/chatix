import { FunctionComponent, memo, useCallback, useContext, useState } from "react";
import { authContext } from "../../context/UserContext";

interface LoginFieldProps {
    type: 'email' | 'text' | 'password';
    name: string;
    value: string;
    placeholder: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
}

export const LoginField: FunctionComponent<LoginFieldProps> = memo(({ type, name, value, placeholder, handleChange }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={e => handleChange(e, name)}
            className="w-full my-1 bg-black bg-opacity-25 rounded-xl h-10 text-sm tracking-widest py-3 px-4 outline-none"
        />
    );
});

export const Auth: FunctionComponent<{}> = () => {
    const { register, login, error } = useContext(authContext);
    const [action, setAction] = useState<'login' | 'register'>('login');
    const [data, setData] = useState<{ nickname: string, password: string }>({
        nickname: '',
        password: ''
    });

    const onFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setData(prev => ({
            ...prev, [name]: e.target.value
        }));
    }, []);

    return (
        <section id="auth" className="flex justify-center items-center w-full h-full flex-wrap container">
            {action === 'login' &&
                <section id="login" className="w-full flex flex-col">
                    <h1 className="text-3xl tracking-wide mb-2.5">Войти</h1>
                    <LoginField
                        type="text"
                        placeholder="Ваш ник"
                        name="nickname"
                        value={data.nickname}
                        handleChange={onFormChange}
                    />

                    <LoginField
                        type="password"
                        placeholder="Пароль"
                        name="password"
                        value={data.password}
                        handleChange={onFormChange}
                    />

                    {error && <span className="text-red-600 text-sm mt-1">{error}</span>}

                    <div className="login__control flex justify-between items-center mt-3">
                        <button
                            onClick={() => { setAction('register') }}
                            className="underline-offset-1 underline tracking-wider"
                        >Регистрация</button>

                        <button
                            onClick={() => { login(data.nickname, data.password) }}
                            className="bg-app-blue py-2.5 px-7 rounded-xl text-base tracking-wider"
                        >Войти</button>
                    </div>
                </section>
            }

            {action === 'register' &&
                <section id="register">
                    <h1 className="text-3xl tracking-wide mb-2.5">Регистрация</h1>

                    <LoginField
                        type="text"
                        placeholder="Ник"
                        name="nickname"
                        value={data.nickname}
                        handleChange={onFormChange}
                    />

                    <LoginField
                        type="password"
                        placeholder="Пароль"
                        name="password"
                        value={data.password}
                        handleChange={onFormChange}
                    />

                    {error && <span className="text-red-600 text-sm mt-1">{error}</span>}

                    <div className="login__control flex justify-between items-center mt-3">
                        <button
                            onClick={() => { setAction('login') }}
                            className="underline-offset-1 underline tracking-wider"
                        >Войти</button>

                        <button
                            onClick={async () => {
                                const result = await register(data.nickname, data.password);
                                if (result) setAction('login');
                            }}
                            className="bg-app-blue py-2.5 px-7 rounded-xl text-base tracking-wider"
                        >Зарегистрироваться</button>
                    </div>
                </section>
            }

            <span className="auth__footer absolute bottom-10 text-white text-opacity-25">
                @Chatix. All rights reserved.
            </span>
        </section>
    );
}