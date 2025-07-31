// frontend-pais/src/components/welcome.js
import React from 'react';
import './welcome.css'; // Importa o CSS para o componente Welcome

// Definição do componente funcional Welcome
const Welcome = () => {
  return (
    <div className="welcome-container"> {/* Container principal do componente */}
      <div className="content-wrapper">
        <img
          src="/img/racing_rodape.png" // Caminho da imagem que você especificou
          alt="Escudo do time Racing Academy"
          className="welcome-logo" // Classe para o logo
        />
        <h1 className="welcome-title">Bem-vindo ao Racing Academy!</h1> {/* Título principal */}
        <p className="welcome-message">
          Aqui formamos atletas com disciplina, paixão e trabalho em equipe. ⚽
        </p> {/* Mensagem de boas-vindas */}
      </div>
    </div>
  );
};

export default Welcome; // Exportação padrão do componente
