import { useState, useEffect, useContext } from 'react';
import { Main } from "./components/Main";
import { authContext } from './context/UserContext';


function App() {
  const { register, login, logout } = useContext(authContext);

  useEffect(() => {
   

  }, []);

  return (
    <div className="App">
      <button onClick={async () => {
        console.log(await register('Client', '123'));
      }}>Регистрация</button>

      <button onClick={async () => {
        console.log(await login('Client', '123'));
      }}>Логин</button>


      <button onClick={logout}>Выйти</button>
      <Main />
    </div>
  )
}

export default App;
