import React from 'react';
import { Link } from 'react-router-dom';
import './GameCard.css'; // Estilo CSS actualizado

const GameCard = ({ gameName, gameDescription, route, image }) => {
  return (
    <div className="game-card">
      <div className="image-wrapper">
        <img src={image} alt={gameName} className="game-image" />
      </div>
      <div className="game-info">
        <h3>{gameName}</h3>
        <p>{gameDescription}</p>
        {/* Link mantiene la redirección a la página del juego */}
        <Link to={route}>
          <button className="play-button">Jugar</button>
        </Link>
      </div>
    </div>
  );
};

export default GameCard;
