import React from 'react';
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import CountryCapitalGame from './components/CountryCapitalGame';
import FamousHangmanGame from './components/FamousHangmanGame';
import GameButton from './components/GameButton';
import MiniGame1 from './components/MiniGame1';
import WordleGame from './components/WordleGame';

const HomePage = () => (
  <div>
    <h1>Quizz de cultura 🌎</h1>
    <div className="games-grid">
      <GameButton 
        gameName="¿Qué país es?" 
        gameDescription="¡Adivina el país!" 
        image="https://stonkstutors.com/wp-content/uploads/2022/04/Los-mejores-juegos-de-adivinar-paises-para-Android-e-iOS.jpg"
        route="/juego/minijuego1" 
      />
      <GameButton 
        gameName="Adivina la capital" 
        gameDescription="¡Adivina la capital!" 
        image="https://i.ytimg.com/vi/yEvkpAoJL3E/maxresdefault.jpg"
        route="/juego/CountryCapitalGame" 
      />
      <GameButton 
        gameName="Ahorcado de Famosos" 
        gameDescription="¡Adivina el famoso!" 
        image="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/YYXEQEK2EBGBZHBIZSSI5VVXOE.jpg"
        route="/juego/FamousHangmanGame" 
      />
      <GameButton 
        gameName="Wordle Game" 
        gameDescription="¡Adivina la palabra en Wordle!" 
        image="https://upload.wikimedia.org/wikipedia/commons/e/ec/Wordle_196_example.svg"
        route="/juego/WordleGame" 
      />
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Página de inicio */}
        <Route path="/" element={<HomePage />} />

        {/* Rutas individuales para cada juego */}
        <Route path="/juego/minijuego1" element={<MiniGame1 />} />
        <Route path="/juego/CountryCapitalGame" element={<CountryCapitalGame />} />
        <Route path="/juego/FamousHangmanGame" element={<FamousHangmanGame />} />
        <Route path="/juego/WordleGame" element={<WordleGame />} />
      </Routes>
    </Router>
  );
};

export default App;
