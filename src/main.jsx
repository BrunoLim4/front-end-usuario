// frontend-pais/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Importa o App.jsx específico da aplicação dos pais

// Se o slick-carousel não for usado na tela de cadastro, você pode remover esta linha.
// Caso contrário, mantenha-o.
import "slick-carousel/slick/slick.css";

// Importa o CSS global. Se você criou um styles.css específico para frontend-pais,
// certifique-se de que este caminho esteja correto.
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);