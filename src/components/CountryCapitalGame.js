import React, { useState, useEffect } from "react";

const CountryCapitalGame = () => {
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState({});
  const [options, setOptions] = useState([]);
  const [lives, setLives] = useState(2);
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const filteredCountries = data.filter((country) => country.capital); // Solo países con capital
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
    const options = [correctCountry.capital[0]];
    while (options.length < 4) {
      const randomOption = countriesList[Math.floor(Math.random() * countriesList.length)].capital[0];
      if (!options.includes(randomOption)) {
        options.push(randomOption);
      }
    }
    return options.sort(() => Math.random() - 0.5); // Mezcla las opciones
  };

  const handleGuess = (capital) => {
    if (capital === currentCountry.capital[0]) {
      setScore(score + 1);
      if (score + 1 === 5) {
        alert("¡Ganaste!");
        resetGame();
      } else {
        setNewCountry(countries);
      }
    } else {
      setLives(lives - 1);
      if (lives - 1 === 0) {
        alert("Perdiste todas tus vidas");
        resetGame();
      }
    }
  };

  const resetGame = () => {
    setLives(2);
    setScore(0);
    setNewCountry(countries);
  };

  return (
    <div>
      <h1>Adivina la Capital</h1>
      <p>Vidas: {lives}</p>
      <p>Puntuación: {score}/5</p>
      {currentCountry && currentCountry.flags && (
        <div>
          <img
            src={currentCountry.flags.svg || currentCountry.flags.png}
            alt={`Bandera de ${currentCountry.name.common}`}
            style={{ width: "200px" }}
          />
          <h2>{currentCountry.name.common}</h2>
          <div>
            {options.map((option, index) => (
              <button key={index} onClick={() => handleGuess(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryCapitalGame;
