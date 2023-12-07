import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './init/Router.tsx';
import './index.css';
import './conversations/theRecognizer';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)
