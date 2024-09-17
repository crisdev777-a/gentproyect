// src/components/GameButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const GameButton = ({ gameName, gameDescription, route }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${route}`); // Cambiado para incluir /juego
  };

  return (
    <div className="game-button" onClick={handleClick}>
      <h3>{gameName}</h3>
      <p>{gameDescription}</p>
      <button>Jugar</button>
    </div>
  );
};

export default GameButton;
