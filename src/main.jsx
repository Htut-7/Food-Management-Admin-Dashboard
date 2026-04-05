import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Router from './router/Router.jsx';
import AuthContextProvider from './contexts/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <Router />
  </AuthContextProvider>
);