import { useState, useEffect, useContext } from 'react';
import io from "socket.io-client";
import { Main } from "./components/Main";
import { authContext } from './context/UserContext';

const socket = io('ws://localhost:4000');

function App() {
  const { register, login } = useContext(authContext);

  useEffect(() => {
    socket.on('connection', (socket) => {

      // socket.on('chat_message', (data: string) => {
      //   console.log(data);
      // });

      // socket.on('messages', (data) => {
      //   console.log(data);
      // });

      // socket.emit('messages', {
      //   peerId: '2pnw0JCb',
      //   authorization_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJwbncwSkNiIiwiaWF0IjoxNjQ5MTgyMzkxLCJleHAiOjE2NDk1Mjc5OTF9.9qstennisXP3TA8Q1GQZ7qMjhyeN_QxSJ1o5fNBCytM",
      // });

      // socket.emit('chat_message', {
      //   authorization_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJwbncwSkNiIiwiaWF0IjoxNjQ5MTgyMzkxLCJleHAiOjE2NDk1Mjc5OTF9.9qstennisXP3TA8Q1GQZ7qMjhyeN_QxSJ1o5fNBCytM",
      //   message: "Deine mutter ist fantastisch",
      //   to: "2pnw0JCb"
      // });
    });

  }, []);

  return (
    <div className="App">
      <button onClick={async () => {
        console.log(await register('Client', '123'));
      }}>Регистрация</button>

      <button onClick={async () => {
        console.log(await login('Client', '123'));
      }}>Логин</button>
      <Main />
    </div>
  )
}

export default App;
