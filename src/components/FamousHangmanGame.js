import React, { useState, useEffect } from 'react';
import './FamousHangmanGame.css'; 
const famousPeople = [
  { name: 'William Shakespeare', image: '/images/shakespeare.png' },
  { name: 'Albert Camus', image: '/images/albert_Camus.jpg' },
  { name: 'Abraham Lincoln', image: '/images/lincoln.jpg' },
  { name: 'Hp Lovecraft', image: '/images/lovecraft.jpg' },
  { name: 'Marie Curie', image: '/images/marie_curie.png' },
  { name: 'Frida Kahlo', image: '/images/frida_kahlo.png' },
  { name: 'Leonardo da Vinci', image: '/images/da_vinci.png' },
  { name: 'Isaac Newton', image: '/images/newton.png' },
  { name: 'Nikola Tesla', image: '/images/tesla.png' },
  { name: 'Albert Einstein', image: '/images/einstein.png' },
  { name: 'Charles Darwin', image: '/images/darwin.jpg' },
  { name: 'Wolfgang Amadeus Mozart', image: '/images/mozart.jpg' },
  { name: 'Pablo Picasso', image: '/images/picasso.jpg' },
  { name: 'Napoleón Bonaparte', image: '/images/bonaparte.jpg' },
  { name: 'Cristóbal Colón', image: '/images/colon.png' }
];
  

const FamousHangmanGame = () => {
  const [person, setPerson] = useState(famousPeople[Math.floor(Math.random() * famousPeople.length)]);
  const [guesses, setGuesses] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState([]);
  const [remainingAttempts, setRemainingAttempts] = useState(6); // 6 intentos de adivinanza

  useEffect(() => {
    const handleKeyPress = (event) => {
      const letter = event.key.toLowerCase();
      if (/^[a-zñ]$/.test(letter)) { // Verificar si es una letra válida
        if (person.name.toLowerCase().includes(letter)) {
          if (!guesses.includes(letter)) {
            setGuesses([...guesses, letter]);
          }
        } else if (!incorrectGuesses.includes(letter)) {
          setIncorrectGuesses([...incorrectGuesses, letter]);
          setRemainingAttempts(remainingAttempts - 1);
        }
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [guesses, incorrectGuesses, person.name, remainingAttempts]);

  const renderWord = () => {
    return person.name.split('').map((char, index) => {
      if (char === ' ') {
        return <span key={index}>&nbsp;</span>;
      }
      return guesses.includes(char.toLowerCase()) ? (
        <span key={index}>{char}</span>
      ) : (
        <span key={index}>_</span>
      );
    });
  };

  const isGameOver = remainingAttempts <= 0;
  const isGameWon = person.name.toLowerCase().split('').every(char => char === ' ' || guesses.includes(char.toLowerCase()));

  return (
    <div>
      <h1>Juego del Ahorcado - Adivina el famoso</h1>
      <img src={person.image} alt={person.name} width="200" />
      <p>Adivina el nombre de esta persona famosa:</p>
      <div style={{ fontSize: '24px', marginBottom: '20px' }}>
        {renderWord()}
      </div>
      <p>Letras incorrectas: {incorrectGuesses.join(', ')}</p>
      <p>Intentos restantes: {remainingAttempts}</p>
      {isGameOver && <p>¡Has perdido! La persona era {person.name}</p>}
      {isGameWon && <p>¡Felicidades! Adivinaste el nombre del famoso.</p>}
      <button onClick={() => window.location.reload()}>Jugar de nuevo</button>
    </div>
  );
};

export default FamousHangmanGame;
