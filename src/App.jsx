// frontend-pais/src/App.jsx

import React from 'react';
import RegistrationForm from './components/cadastro'; // Importa o componente de cadastro
import './styles.css'; // Importa o CSS global, se aplicável a esta aplicação

function App() {
  return (
    <div className="App-pais"> {/* Adicionei uma classe específica para esta aplicação */}
      {/* O componente de cadastro é renderizado diretamente, sem roteamento */}
      <RegistrationForm />
    </div>
  );
}

export default App;