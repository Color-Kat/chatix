import { useEffect, useContext, memo } from 'react';
import { Route, Routes } from "react-router-dom";
import { authContext } from './context/UserContext';

// Pages
import { Chats } from "./components/pages/Chats";
import { Chat } from "./components/pages/Chat";
import { Auth } from "./components/pages/Auth";
import { User404 } from './components/pages/User404';
import { socketContext } from './context/SocketContext';
import { AppLoader } from './components/pages/AppLoader';
import { Avatar } from './components/pages/Avatar';


function App() {
  const { user, isAppLoading } = useContext(authContext);
  const { setAuthUserId, newNotifications } = useContext(socketContext);

  useEffect(() => {
    setAuthUserId(user?.id);
  }, [user]);

  return (
    <div className="App bg-app text-white px-6 pt-12 font-roboto w-screen h-screen overflow-hidden">
      {isAppLoading && <AppLoader />}

      {
        user &&
        <Routes>
          <Route path="/" element={<Chats />} />
          <Route path="/chat/:peerId" element={<Chat />} />
          <Route path="/avatar" element={<Avatar />} />
          <Route path="/user-404" element={<User404 />} />
        </Routes>
      }

      {!user && !isAppLoading && <Auth />}
    </div>
  )
}

export default memo(App);
