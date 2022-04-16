import React from 'react'
import { createRoot } from 'react-dom/client';
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/UserContext';
import { SocketProvider } from './context/SocketContext';

const container = document.getElementById('root') as Element;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <SocketProvider>

      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </SocketProvider>

  </React.StrictMode>
);