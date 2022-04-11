import { FunctionComponent, useState } from "react";

interface LoginFieldProps {
    type: 'email' | 'text' | 'password';
    name: string;
    value: string;
    placeholder: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void;
}

export const LoginField: FunctionComponent<LoginFieldProps> = ({ type, name, value, placeholder, handleChange }) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={e => handleChange(e, name)}
            className="bg-black bg-opacity-25 outline-none"
        />
    );
}

interface AuthProps {

}

export const Auth: FunctionComponent<AuthProps> = () => {
    const [action, setAction] = useState<'login' | 'register'>('login');

    const [data, setData] = useState<{ nickname: string, password: string }>({
        nickname: '',
        password: ''
    });

    const onFormChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        setData(prev => ({
            ...prev, [name]: e.target.value
        }));

        console.log(data);
    }


    return (
        <section id="auth" className="flex justify-center items-center w-full h-full flex-wrap container">
            {action === 'login' &&
                <section id="login" className="w-full flex flex-col">
                    <h1 className="text-3xl tracking-wide">Войти</h1>
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
                </section>
            }

            {action === 'register' &&
                <section id="register">
                    register
                </section>
            }
        </section>
    );
}