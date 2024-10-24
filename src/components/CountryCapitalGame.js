import React, { useState, useEffect } from "react";
import './CountryCapitalGame.css'; // Importamos el CSS

const CountryCapitalGame = () => {
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState({});
  const [options, setOptions] = useState([]);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [gameOver, setGameOver] = useState(false); // Control para modal de fin de juego
  const [win, setWin] = useState(false); // Control para mensaje de victoria

  // Cargar los datos de los países al iniciar el juego
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const filteredCountries = data.filter((country) => country.capital);
        setCountries(filteredCountries);
        setNewCountry(filteredCountries);
      });
  }, []);

  const setNewCountry = (countriesList) => {
    const randomCountry = countriesList[Math.floor(Math.random() * countriesList.length)];
    setCurrentCountry(randomCountry);
    setOptions(generateOptions(randomCountry, countriesList));
  };

  const generateOptions = (correctCountry, countriesList) => {
    const correctCapital = correctCountry.translations.spa.capital || correctCountry.capital[0];
    const options = [correctCapital];
    while (options.length < 4) {
      const randomOption =
        countriesList[Math.floor(Math.random() * countriesList.length)].capital[0];
      if (!options.includes(randomOption)) {
        options.push(randomOption);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

  const handleGuess = (capital) => {
    const correctCapital = currentCountry.translations.spa.capital || currentCountry.capital[0];
    if (capital === correctCapital) {
      setScore(score + 1);
      if (score + 1 === 5) {
        setWin(true); // Mostrar mensaje de victoria
      } else {
        setNewCountry(countries);
      }
    } else {
      setLives(lives - 1);
      if (lives - 1 === 0) {
        setGameOver(true); // Mostrar mensaje de derrota
      }
    }
  };

  const handleHint = () => {
    if (!hintUsed) {
      const correctOption = currentCountry.translations.spa.capital || currentCountry.capital[0];
      const remainingOptions = options.filter((option) => option !== correctOption);
      const newOptions = [correctOption, ...remainingOptions.slice(0, 1)];
      setOptions(newOptions.sort(() => Math.random() - 0.5));
      setHintUsed(true);
    }
  };

  const resetGame = () => {
    setLives(3);
    setScore(0);
    setHintUsed(false);
    setGameOver(false);
    setWin(false);
    setNewCountry(countries);
  };

  return (
    <div className="game-container">
      <h1>Adivina la Capital</h1>
      <p>Vidas: {lives}</p>
      <p>Puntuación: {score}/5</p>
      {currentCountry && currentCountry.flags && (
        <div>
          <img
            src={currentCountry.flags.svg || currentCountry.flags.png}
            alt={`Bandera de ${currentCountry.translations.spa.common}`}
            className="country-flag"
          />
          <h2>{currentCountry.translations.spa.common}</h2>
          <div className="options-container">
            {options.map((option, index) => (
              <button key={index} onClick={() => handleGuess(option)} className="option-button">
                {option}
              </button>
            ))}
          </div>
          {!hintUsed && (
            <button onClick={handleHint} className="hint-button">
<<<<<<< HEAD
              Usar Pista (Eliminar 2 opciones)
=======
              Usar Pista (Eliminar 3 opciones)
>>>>>>> f2f9ffbc9d2992e473c7d951ae3096fca8390508
            </button>
          )}
        </div>
      )}

      {gameOver && (
        <div className="modal">
          <div className="modal-content">
            <h2>¡Perdiste!</h2>
            <p>No te rindas, seguí practicando. ¡Volvé a intentarlo!</p>
            <button onClick={resetGame}>Volver a jugar</button>
          </div>
        </div>
      )}

      {win && (
        <div className="modal">
          <div className="modal-content">
            <h2>¡Ganaste!</h2>
            <p>¡Felicitaciones! Adivinaste todas las capitales.</p>
            <button onClick={resetGame}>Jugar de nuevo</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryCapitalGame;
