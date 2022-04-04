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

    socket.emit('chat_message', '123');
  }, []);

  return (
    <div className="App">
      <Main />
    </div>
  )
}

export default App;
