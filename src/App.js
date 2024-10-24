import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import GameButton from './components/GameButton';
import MiniGame1 from './components/MiniGame1';
import CountryCapitalGame from './components/CountryCapitalGame';
import FamousHangmanGame from './components/FamousHangmanGame';
import WordleGame from './components/WordleGame';
import MemotestGame from './components/MemotestGame';
import HistoricalEventsGame from './components/HistoricalEventsGame';
import CompletaLaFrase from './components/CompletaLaFrase';
import QuienLoDijo from './components/QuienLoDijo';

import './App.css';

const HomePage = () => (
  <div>
    <h1>Quizz de cultura 🌎</h1>
    <div className="games-grid">
      <GameButton 
        gameName="¿Qué país es?" 
        gameDescription="¡Adivina el país por su bandera!" 
        image="https://stonkstutors.com/wp-content/uploads/2022/04/Los-mejores-juegos-de-adivinar-paises-para-Android-e-iOS.jpg"
        route="/juego/minijuego1" 
      />
      <GameButton 
        gameName="Adivina la capital" 
        gameDescription="¡Encuentra la capital del pais!" 
        image="https://i.ytimg.com/vi/yEvkpAoJL3E/maxresdefault.jpg"
        route="/juego/CountryCapitalGame" 
      />
      <GameButton 
        gameName="Descubre el famoso" 
        gameDescription="¡Adivina el famoso en este ahorcado!" 
        image="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/YYXEQEK2EBGBZHBIZSSI5VVXOE.jpg"
        route="/juego/FamousHangmanGame" 
      />
      <GameButton 
        gameName="Wordle Game" 
        gameDescription="¿Serás capaz de adivinar la palabra?" 
        image="https://upload.wikimedia.org/wikipedia/commons/e/ec/Wordle_196_example.svg"
        route="/juego/WordleGame" 
      />
      <GameButton 
        gameName="Memotest" 
        gameDescription="¡Encuentra los pares!" 
        image="https://stonkstutors.com/wp-content/uploads/2022/04/Los-mejores-juegos-de-adivinar-paises-para-Android-e-iOS.jpg" 
        route="/juego/memotest" 
      />
      <GameButton 
        gameName="Ordena la historia" 
        gameDescription="¡Organiza los acontecimientos en orden cronologico!" 
        image="https://st2.depositphotos.com/1259239/8917/v/450/depositphotos_89177026-stock-illustration-timeline-infographic-vector.jpg"
        route="/juego/HistoricalEventsGame" 
      />
      <GameButton 
        gameName="Completa la frase" 
        gameDescription="¡Encuenta la palabra correcta para completar la frase!" 
        image="https://example.com/your-image.jpg" 
        route="/juego/completaLaFrase" 
      />
      <GameButton 
        gameName="¿Quien lo dijo?" 
        gameDescription="¡Adivina a quien el pertenece la frase!" 
        image="https://example.com/your-image.jpg" 
        route="/juego/QuienLoDijo" 
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
        <Route path="/juego/memotest" element={<MemotestGame />} />
        <Route path="/juego/HistoricalEventsGame" element={<HistoricalEventsGame />} />
        <Route path="/juego/CompletaLaFrase" element={<CompletaLaFrase />} />
        <Route path="/juego/QuienLoDijo" element={<QuienLoDijo />} />
      </Routes>
    </Router>
  );
};

export default App;
