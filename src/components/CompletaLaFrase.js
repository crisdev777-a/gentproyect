// CompletaLaFrase.js
import React, { useState } from 'react';
import './CompletaLaFrase.css';

const levels = [
    { phrase: "El conocimiento es ____________.", answer: "poder", options: ["sabiduría", "fuerza", "poder", "conocimiento"], author: "Francis Bacon" },
    { phrase: "La vida es un ____________.", answer: "sueño", options: ["desperdicio", "sueño", "asco", "horror"], author: "Pedro Calderón de la Barca" },
    { phrase: "Ser o no ____________.", answer: "ser", options: ["existir", "ser", "vivir", "parecer"], author: "William Shakespeare" },
    { phrase: "Lo que no te mata te hace más ____________.", answer: "fuerte", options: ["feo", "mata", "fuerte", "débil"], author: "Friedrich Nietzsche" },
    { phrase: "La felicidad no es un destino, es una forma de ____________.", answer: "viajar", options: ["vivir", "destino", "camino", "viajar"], author: "Margaret Lee Runbeck" },
    { phrase: "La mente es como un paracaídas, funciona mejor cuando está ____________.", answer: "abierta", options: ["despejada", "estresada", "cerrada", "abierta"], author: "Thomas Dewar" },
    { phrase: "No hay camino para la paz, la paz es el ____________.", answer: "camino", options: ["odio", "cambio", "destino", "camino"], author: "Mahatma Gandhi" },
    { phrase: "La educación es el arma más poderosa que puedes usar para cambiar el ____________.", answer: "mundo", options: ["destino", "arma", "mundo", "tiempo"], author: "Nelson Mandela" },
    { phrase: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.", answer: "éxito", options: ["fracasos", "éxito", "esfuerzos", "cambios"], author: "Robert Collier" },
    { phrase: "El único modo de hacer un gran trabajo es amar lo que ____________.", answer: "haces", options: ["haces", "sueñas", "deseas", "pretendes"], author: "Steve Jobs" },
    { phrase: "No hay nada permanente, excepto el ____________.", answer: "cambio", options: ["temor", "cambio", "horror", "trauma"], author: "Heráclito" },
    { phrase: "El futuro pertenece a quienes creen en la belleza de sus ____________.", answer: "sueños", options: ["pasado", "futuro", "realidad", "sueños"], author: "Eleanor Roosevelt" },
    { phrase: "La esperanza es el sueño de los que están ____________.", answer: "despiertos", options: ["durmiendo", "despiertos", "tristes", "locos"], author: "Aristóteles" },
    { phrase: "La vida es lo que pasa mientras estás ocupado haciendo otros ____________.", answer: "planes", options: ["deseos", "planes", "caminos", "proyectos"], author: "John Lennon" }
];

const buttonColors = [
    "#FF5733", // rojo
    "#33FF57", // verde
    "#3357FF", // azul
    "#FF33A8", // rosa
    "#F5C430", // amarillo
    "#A330FF", // púrpura
    "#33FFF5", // cian
    "#FF8C33", // naranja
    "#FF3333", // rojo claro
    "#33FF33"  // verde claro
];

const CompletaLaFrase = () => {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [message, setMessage] = useState('');

    const loadLevel = () => {
        return levels[currentLevel];
    };

    const checkAnswer = (selected) => {
        const correctAnswer = levels[currentLevel].answer;
        if (selected === correctAnswer) {
            setCurrentLevel(currentLevel + 1);
            setMessage('');
            if (currentLevel + 1 >= levels.length) {
                setMessage('¡Juego completado!');
            }
        } else {
            setMessage('¡Intenta de nuevo!');
        }
    };

    const currentPhrase = loadLevel();

    return (
        <div className="game-container">
            <h1>Completa la Frase</h1>
            <p>{currentPhrase.phrase}</p>
            <p><em>- {currentPhrase.author}</em></p>
            <div className="options">
                {currentPhrase.options.map((option, index) => (
                    <button 
                        key={option} 
                        className="option-button" 
                        style={{ backgroundColor: buttonColors[index % buttonColors.length] }} 
                        onClick={() => checkAnswer(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
            <div className="message">{message}</div>
        </div>
    );
};

export default CompletaLaFrase;
