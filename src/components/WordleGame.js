import React, { useEffect, useState } from 'react';
import './WordleGame.css'; // Asegúrate de agregar este archivo CSS

const WORDS = ['chile', 'nepal', 'india', 'malta', 'paris','paris', 'kyoto', 'cairo', 'miami']; // Lista de palabras posibles
const MAX_ATTEMPTS = 6;

const WordleGame = () => {
  const [solution, setSolution] = useState('');
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    setSolution(randomWord);
  }, []);

  const handleInputChange = (e) => {
    if (e.target.value.length <= 5) {
      setCurrentGuess(e.target.value);
    }
  };

  const handleGuess = () => {
    if (currentGuess.length !== 5) {
      setMessage('La palabra debe tener 5 letras');
      return;
    }

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);
    setCurrentGuess('');

    if (currentGuess === solution) {
      setGameOver(true);
      setMessage('¡Felicidades! Adivinaste la palabra 🎉');
    } else if (newGuesses.length === MAX_ATTEMPTS) {
      setGameOver(true);
      setMessage(`Perdiste. La palabra era: ${solution}`);
    }
  };

  const getLetterStatus = (letter, index) => {
    if (solution[index] === letter) return 'correct';
    if (solution.includes(letter)) return 'present';
    return 'absent';
  };

  return (
    <div className="wordle-container">
      <h1>Wordle - Adivina la Palabra</h1>
      <div className="guesses-container">
        {guesses.map((guess, guessIndex) => (
          <div key={guessIndex} className="guess">
            {guess.split('').map((letter, index) => (
              <span key={index} className={`letter ${getLetterStatus(letter, index)}`}>
                {letter}
              </span>
            ))}
          </div>
        ))}
      </div>
      {!gameOver && (
        <div className="input-container">
          <input
            type="text"
            value={currentGuess}
            onChange={handleInputChange}
            maxLength={5}
            placeholder="Escribe tu palabra..."
          />
          <button onClick={handleGuess}>Adivinar</button>
        </div>
      )}
      <p>{message}</p>
      {gameOver && <button onClick={() => window.location.reload()}>Jugar de nuevo</button>}
    </div>
  );
};

export default WordleGame;
