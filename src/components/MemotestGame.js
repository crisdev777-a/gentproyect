import React, { useState, useEffect } from 'react';
import './MemotestGame.css';

const allCardImages = [
    { src: '/images/Argentina.png', matched: false },
    { src: '/images/Alemania.png', matched: false },
    { src: '/images/Austria.png', matched: false },
    { src: '/images/Bolivia.png', matched: false },
    { src: '/images/Chile.png', matched: false },
    { src: '/images/Brasil.png', matched: false },
    { src: '/images/Colombia.png', matched: false },
    { src: '/images/Ecuador.png', matched: false },
    { src: '/images/Francia.png', matched: false },
    { src: '/images/Espana.png', matched: false },
    { src: '/images/Rusia.png', matched: false },
    { src: '/images/India.png', matched: false },
    { src: '/images/Uruguay.png', matched: false },
    { src: '/images/Irak.png', matched: false }
];

const levels = {
    1: 4,
    2: 8,
    3: 14
};

const MemotestGame = () => {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const [level, setLevel] = useState(1);
    const [gameCompleted, setGameCompleted] = useState(false);

    const shuffleCards = (level) => {
        const numCards = levels[level];
        const selectedCards = allCardImages.slice(0, numCards);
        const shuffledCards = [...selectedCards, ...selectedCards]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }));

        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffledCards);
        setTurns(0);
        setGameCompleted(false);
    };

    const handleChoice = (card) => {
        if (!disabled && card !== choiceOne) {
            choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
        }
    };

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                setCards((prevCards) => {
                    return prevCards.map((card) => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true };
                        }
                        return card;
                    });
                });
                resetTurn();
            } else {
                setTimeout(() => resetTurn(), 1000);
            }
        }
    }, [choiceOne, choiceTwo]);

    const resetTurn = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns((prevTurns) => prevTurns + 1);
        setDisabled(false);
    };

    useEffect(() => {
        shuffleCards(level);
    }, [level]);

    useEffect(() => {
        if (cards.length > 0 && cards.every(card => card.matched)) {
            if (level < 3) {
                setLevel((prevLevel) => prevLevel + 1);
            } else {
                setGameCompleted(true);
            }
        }
    }, [cards]);

    const restartGame = () => {
        setLevel(1);
        shuffleCards(1);
    };

    return (
        <div className="memotest">
            <h1>Memotest de Banderas</h1>
            {gameCompleted ? (
                <div>
                    <h2>¡Juego completado!</h2>
                    <button className="memotest-button" onClick={restartGame}>Reiniciar</button>
                </div>
            ) : (
                <div>
                    <div className="card-grid">
                        {cards.map((card) => (
                            <div
                                key={card.id}
                                className={`card ${card.matched ? 'flipped' : ''} ${
                                    card === choiceOne || card === choiceTwo ? 'flipped' : ''
                                }`}
                                onClick={() => !disabled && handleChoice(card)}
                            >
                                <div className="card-inner">
                                    <div className="card-back"></div>
                                    <img className="card-front" src={card.src} alt="card" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MemotestGame;
