import React, { useState } from 'react';
import './QuienLoDijo.css';

const frases = [
    { phrase: "El conocimiento es poder.", author: "Francis Bacon", options: ["Friedrich Nietzsche", "Pedro Calderón de la Barca", "Francis Bacon", "William Shakespeare"] },
    { phrase: "La vida es un sueño.", author: "Pedro Calderón de la Barca", options: ["William Shakespeare", "Friedrich Nietzsche", "Francis Bacon", "Pedro Calderón de la Barca"] },
    { phrase: "Ser o no ser.", author: "William Shakespeare", options: ["William Shakespeare", "Thomas Dewar", "Mahatma Gandhi", "Nelson Mandela"] },
    { phrase: "Lo que no te mata te hace más fuerte.", author: "Friedrich Nietzsche", options: ["Friedrich Nietzsche", "Robert Collier", "Eleanor Roosevelt", "Aristóteles"] },
    { phrase: "La felicidad no es un destino, es una forma de viajar.", author: "Margaret Lee Runbeck", options: ["Thomas Dewar", "Margaret Lee Runbeck", "Nelson Mandela", "Heráclito"] },
    { phrase: "La mente es como un paracaídas, funciona mejor cuando está abierta.", author: "Thomas Dewar", options: ["Friedrich Nietzsche", "Thomas Dewar", "Steve Jobs", "Mahatma Gandhi"] },
    { phrase: "No hay camino para la paz, la paz es el camino.", author: "Mahatma Gandhi", options: ["Mahatma Gandhi", "Nelson Mandela", "Aristóteles", "John Lennon"] },
    { phrase: "La educación es el arma más poderosa que puedes usar para cambiar el mundo.", author: "Nelson Mandela", options: ["Robert Collier", "Eleanor Roosevelt", "Nelson Mandela", "Thomas Dewar"] },
    { phrase: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.", author: "Robert Collier", options: ["William Shakespeare", "Robert Collier", "Steve Jobs", "Friedrich Nietzsche"] },
    { phrase: "El único modo de hacer un gran trabajo es amar lo que haces.", author: "Steve Jobs", options: ["Heráclito", "Nelson Mandela", "Steve Jobs", "Margaret Lee Runbeck"] },
    { phrase: "No hay nada permanente, excepto el cambio.", author: "Heráclito", options: ["Friedrich Nietzsche", "Heráclito", "Mahatma Gandhi", "Eleanor Roosevelt"] },
    { phrase: "El futuro pertenece a quienes creen en la belleza de sus sueños.", author: "Eleanor Roosevelt", options: ["Eleanor Roosevelt", "Aristóteles", "Nelson Mandela", "John Lennon"] },
    { phrase: "La esperanza es el sueño de los que están despiertos.", author: "Aristóteles", options: ["Thomas Dewar", "Friedrich Nietzsche", "Aristóteles", "Steve Jobs"] },
    { phrase: "La vida es lo que pasa mientras estás ocupado haciendo otros planes.", author: "John Lennon", options: ["Heráclito", "John Lennon", "Margaret Lee Runbeck", "Robert Collier"] },
];

const QuienLoDijo = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lives, setLives] = useState(5);
    const [message, setMessage] = useState('');
    const [gameOver, setGameOver] = useState(false);

    const handleAnswer = (author) => {
        if (author === frases[currentIndex].author) {
            setMessage('¡Correcto!');
            setCurrentIndex(currentIndex + 1);
        } else {
            setLives(lives - 1);
            setMessage('Incorrecto, intenta de nuevo.');
        }

        if (lives === 1) {
            setGameOver(true);
            setMessage('¡Has perdido! La respuesta correcta era: ' + frases[currentIndex].author);
        }

        if (currentIndex === frases.length - 1) {
            setMessage('¡Has completado el juego!');
            setCurrentIndex(0);
            setLives(5);
        }
    };

    const restartGame = () => {
        setCurrentIndex(0);
        setLives(5);
        setMessage('');
        setGameOver(false);
    };

    return (
        <div className="quien-lo-dijo">
            <h1>¿Quién lo dijo?</h1>
            {gameOver ? (
                <div>
                    <p className="game-over">{message}</p>
                    <button className="restart-button" onClick={restartGame}>Jugar otra vez</button>
                </div>
            ) : (
                currentIndex < frases.length && (
                    <div>
                        <p>{frases[currentIndex].phrase.replace(frases[currentIndex].author, "__________")}</p>
                        <p>Vidas restantes: {lives}</p>
                        <div className="options">
                            {frases[currentIndex].options.map((option, index) => (
                                <button key={index} onClick={() => handleAnswer(option)}>{option}</button>
                            ))}
                        </div>
                        {message && <p className="message">{message}</p>}
                    </div>
                )
            )}
        </div>
    );
};

export default QuienLoDijo;
