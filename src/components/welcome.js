import React from 'react';
import './welcome.css';

const WelcomeFootball = () => {
  return (
    <div className="football-container">
      <div className="escudo-wrapper">
        <img
          src="/logo-racing.png" // coloque sua imagem aqui
          alt="Escudo do time"
          className="escudo"
        />
      </div>
      <h1 className="titulo">Bem-vindo ao Racing Academy!</h1>
      <p className="subtitulo">Aqui formamos atletas com disciplina, paixão e trabalho em equipe. ⚽</p>
    </div>
  );
};

export default WelcomeFootball;

