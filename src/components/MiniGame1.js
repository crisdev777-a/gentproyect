// src/components/MiniGame1.js
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const MiniGame1 = () => {
  const [flags, setFlags] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const timerRef = useRef(null);

  // Lista de países más conocidos (códigos de país en formato ISO 3166-1 alpha-2)
  const knownCountries = [
    'US', 'FR', 'DE', 'JP', 'GB', 'CN', 'IN', 'BR', 'ZA', 'IT'
  ];

  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = response.data;
        const knownFlagData = countries
          .filter(country => knownCountries.includes(country.cca2))
          .map(country => ({
            url: country.flags.png,
            answer: country.translations.spa?.common || country.name.common // Use Spanish translation if available
          }));

        // Shuffle the knownFlagData array and get the first 5
        const shuffledFlags = knownFlagData.sort(() => Math.random() - 0.5).slice(0, 5);
        setFlags(shuffledFlags);
      } catch (error) {
        console.error('Error fetching flags:', error);
      }
    };
    fetchFlags();

    // Start the timer
    if (timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    }

    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setFeedback('Tiempo agotado. ¡Juego terminado!');
      clearInterval(timerRef.current);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (currentIndex === flags.length) {
      setFeedback('¡Felicidades! Has adivinado todas las banderas.');
      clearInterval(timerRef.current); // Stop the timer
    }
  }, [currentIndex, flags.length]);

  const handleGuessChange = (e) => {
    setGuess(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentFlag = flags[currentIndex];
    
    if (guess.trim().toLowerCase() === currentFlag.answer.toLowerCase()) {
      setFeedback('¡Correcto!');
      setGuess('');
      // Move to the next flag after a short delay
      setTimeout(() => {
        if (currentIndex < flags.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          setFeedback('');
        }
      }, 1000); // Delay before moving to the next flag
    } else {
      setFeedback('Inténtalo de nuevo.');
    }
  };

  return (
    <div className="mini-game">
      <h2>Adivina la Bandera</h2>
      {timeLeft > 0 ? (
        <div>
          {flags.length > 0 && (
            <div>
              <img src={flags[currentIndex]?.url} alt="Bandera" />
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={guess}
                  onChange={handleGuessChange}
                  placeholder="Escribe el nombre del país"
                />
                <button type="submit">Adivinar</button>
              </form>
              <p>Tiempo restante: {timeLeft} segundos</p>
              {feedback && <p>{feedback}</p>}
            </div>
          )}
        </div>
      ) : (
        <p>¡Tiempo agotado! ¡Juego terminado!</p>
      )}
    </div>
  );
};

export default MiniGame1;
