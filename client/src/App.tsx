import { useState, useEffect, useContext } from 'react';
import { Route, Routes } from "react-router-dom";
import { Main } from "./components/elements/Main";
import { authContext } from './context/UserContext';

// Pages
import { Chats } from "./components/pages/Chats";
import { Chat } from "./components/pages/Chat";
import { Auth } from "./components/pages/Auth";
import { User404 } from './components/pages/User404';
import { socketContext } from './context/SocketContext';


function App() {
  const { user, logout } = useContext(authContext);
  const { setAuthUserId } = useContext(socketContext);

  useEffect(() => {
    if (user) setAuthUserId(user.id);
  }, [user]);

  return (
    <div className="App bg-app text-white px-6 pt-12 font-roboto w-screen h-screen overflow-hidden">
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
          <Route path="/chat/:peerId" element={<Chat />} />
          <Route path="/user-404" element={<User404 />} />
        </Routes>
      }

      {
        !user && <Auth />
      }
    </div>
  )
}

export default App;
