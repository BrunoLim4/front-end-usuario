// frontend-pais/src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa componentes de roteamento
import RegistrationForm from './components/cadastro'; // Importa o componente de cadastro
import Welcome from './components/welcome'; // Importa o novo componente de boas-vindas (assumindo que você o criará)
import './styles.css'; // Importa o CSS global, se aplicável a esta aplicação

function App() {
  return (
    // O BrowserRouter envolve toda a sua aplicação para habilitar o roteamento
    <Router>
      <div className="App-pais"> {/* Adicionei uma classe específica para esta aplicação */}
        {/* O componente Routes define as diferentes rotas da sua aplicação */}
        <Routes>
          {/* Rota para a tela de cadastro (componente RegistrationForm) */}
          {/* A rota padrão '/' irá renderizar o formulário de cadastro */}
          <Route path="/" element={<RegistrationForm />} />

          {/* Nova rota para a tela de boas-vindas (componente Welcome) */}
          {/* Você pode ajustar o caminho da rota conforme necessário, por exemplo, '/welcome' */}
          <Route path="/welcome" element={<Welcome />} />

          {/* Você pode adicionar outras rotas aqui conforme sua aplicação cresce */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
