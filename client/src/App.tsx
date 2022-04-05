import { useState, useEffect } from 'react';
import io from "socket.io-client";
import { Main } from "./components/Main";

const socket = io('ws://localhost:4000');
console.log(socket);
socket.on('connection', (socket) => {
  console.log('connected to ws');

});

function App() {


  useEffect(() => {
    socket.on('chat_message', (data: string) => {
      console.log(data);
    });

    socket.emit('chat_message', {
      authorization_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjJwbncwSkNiIiwiaWF0IjoxNjQ5MTgyMzkxLCJleHAiOjE2NDk1Mjc5OTF9.9qstennisXP3TA8Q1GQZ7qMjhyeN_QxSJ1o5fNBCytM",
      message: "Deine mutter ist fantastisch"
    });
  }, []);

  return (
    <div className="App">
      <Main />
    </div>
  )
}

export default App;
