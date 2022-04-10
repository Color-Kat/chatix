import { useState, useEffect, useContext } from 'react';
import { Route, Routes } from "react-router-dom";
import { Main } from "./components/elements/Main";
import { authContext } from './context/UserContext';

// Pages
import { Chats } from "./components/pages/Chats";
import { Chat } from "./components/pages/Chat";
import { Login } from "./components/pages/Login";


function App() {
  const { user, logout } = useContext(authContext);

  useEffect(() => {

    // logout()
  }, []);

  return (
    <div className="App bg-app text-white px-6 pt-12 font-roboto">
      {/* <button onClick={async () => {
        console.log(await register('Client', '123'));
      }}>Регистрация</button>

      <button onClick={async () => {
        console.log(await login('ColorKat', '123'));
      }}>Логин</button> */}


      {/* <button onClick={logout}>Выйти</button> */}

      {
        user &&
        <Routes>
          <Route path="/" element={<Chats />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      }

      {
        !user && <Login />
      }
    </div>
  )
}

export default App;
