import React from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
//Firebase
import FirebaseConn from './utils/FirebaseConn';
import FirebaseContext from './utils/FirebaseContext';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <FirebaseContext.Provider value={new FirebaseConn()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FirebaseContext.Provider>
);
//Relação produtor-consumidor
//Provê instância para os componentes consumidores
//Nessa aplicação, o produtor disponibilizará a classe FirebaseConn, para consumo dos
//componentes consumidores