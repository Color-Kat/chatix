import { useState, useEffect } from 'react';
import io from "socket.io-client";

const socket = io('ws://localhost:4000');
console.log(socket);
socket.on('connection', (socket) => {

});

function App() {
  useEffect(() => {
    socket.on('chat_message', (data: string) => {
      console.log(data);
    });

    socket.emit('chat_message', '123');
  }, []);

  return (
    <div className="App ">

    </div>
  )
}

export default App;
