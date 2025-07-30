// frontend-pais/src/components/welcome.js
import React from 'react';
import './welcome.css'; // Importa o CSS para o componente Welcome

// Definição do componente funcional Welcome
const Welcome = () => {
  return (
    <div className="welcome-container"> 
      <div className="content-wrapper">
        <img
          src="/logo-racing.png" // Caminho da imagem que você especificou
          alt="Escudo do time Racing Academy"
          className="welcome-logo" // Classe para o logo
        />
        <h1 className="welcome-title">Bem-vindo ao Racing Academy!</h1>
        <p className="welcome-message">
          Aqui formamos atletas com disciplina, paixão e trabalho em equipe.

        </p> {/* Mensagem de boas-vindas */}
      </div>
      {/* Rodapé, mantido para consistência visual */}
      <footer className="welcome-footer">
        <img src="/img/racing_rodape.png" alt="Rodapé Racing" className="footer-image" />
      </footer>
    </div>
  );
};

export default Welcome; // Exportação padrão do componente
