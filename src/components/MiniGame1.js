import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './MiniGame1.css';

const MiniGame1 = () => {
  const [flags, setFlags] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [hint, setHint] = useState('');
  const [hintCount, setHintCount] = useState(0);
  const [timeOver, setTimeOver] = useState(false); // Nuevo estado para controlar el tiempo agotado
  const timerRef = useRef(null);

  const knownCountries = ['US', 'FR', 'DE', 'JP', 'GB', 'CN', 'IN', 'BR', 'ZA', 'IT'];

  // Función para remover tildes de las palabras
  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countries = response.data;
        const knownFlagData = countries
          .filter(country => knownCountries.includes(country.cca2))
          .map(country => ({
            url: country.flags.png,
            answer: removeAccents(country.translations.spa?.common || country.name.common)
          }));

        const shuffledFlags = knownFlagData.sort(() => Math.random() - 0.5).slice(0, 5);
        setFlags(shuffledFlags);
      } catch (error) {
        console.error('Error fetching flags:', error);
      }
    };
    fetchFlags();

    if (timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }

    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      setFeedback('¡Tiempo agotado!'); // Feedback cuando el tiempo se acaba
      setTimeOver(true); // Mostrar mensaje motivador y botón de reinicio
      clearInterval(timerRef.current);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (correctAnswers === flags.length && flags.length > 0) {
      setShowModal(true);
      clearInterval(timerRef.current);
    }
  }, [correctAnswers, flags.length]);

  const handleGuessChange = (e) => {
    setGuess(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentFlag = flags[currentIndex];

    if (removeAccents(guess.trim().toLowerCase()) === currentFlag.answer.toLowerCase()) {
      setFeedback('¡Correcto!');
      setGuess('');
      setCorrectAnswers(prev => prev + 1);

      setTimeout(() => {
        if (currentIndex < flags.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setFeedback('');
          setHint('');
          setHintCount(0);
        }
      }, 1000);
    } else {
      setFeedback('Inténtalo de nuevo.');
    }
  };

  const handleHint = () => {
    const currentFlag = flags[currentIndex];
    const answer = currentFlag.answer;

    if (hintCount === 0) {
      setHint(`Pista: La primera letra es "${answer[0].toUpperCase()}"`);
      setTimeLeft(prev => Math.max(0, prev - 10));
    } else if (hintCount === 1) {
      setHint(`Pista: Las tres primeras letras son "${answer.substring(0, 3).toUpperCase()}"`);
      setTimeLeft(prev => Math.max(0, prev - 15));
    }

    setHintCount(prev => prev + 1);
  };

  const closeModal = () => {
    setShowModal(false);
    window.location.reload();
  };

  const restartGame = () => {
    window.location.reload();
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
              <button className="hint-button" onClick={handleHint}>
                Pista ({hintCount === 0 ? '-10' : '-15'} segundos)
              </button>
              {hint && <p>{hint}</p>}
              <p>Tiempo restante: {timeLeft} segundos</p>
              {feedback && <p>{feedback}</p>}
            </div>
          )}
        </div>
      ) : timeOver ? (
        <div>
          <p>No te rindas, seguí practicando. ¡Volvé a intentar!</p>
          <button onClick={restartGame}>Reintentar</button>
        </div>
      ) : (
        <p>¡Tiempo agotado! ¡Juego terminado!</p>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>¡Felicidades!</h2>
            <p>Has adivinado todas las banderas correctamente 🎉</p>
            <button onClick={closeModal}>Jugar de nuevo</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniGame1;
