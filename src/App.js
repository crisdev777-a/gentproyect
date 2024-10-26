// src/App.js
import './App.css';
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import GameCard from './components/GameCard';
import MiniGame1 from './components/MiniGame1';
import CountryCapitalGame from './components/CountryCapitalGame';
import FamousHangmanGame from './components/FamousHangmanGame';
import WordleGame from './components/WordleGame';
import MemotestGame from './components/MemotestGame';
import HistoricalEventsGame from './components/HistoricalEventsGame';
import CompletaLaFrase from './components/CompletaLaFrase';
import QuienLoDijo from './components/QuienLoDijo';
import Background from './components/Background';
import Tierra from './components/Tierra';

const HomePage = () => (
  <div>
    <div className="games-grid">
      <GameCard gameName="¿Qué país es?" gameDescription="¡Adivina el país por su bandera!" image="https://stonkstutors.com/wp-content/uploads/2022/04/Los-mejores-juegos-de-adivinar-paises-para-Android-e-iOS.jpg" route="/juego/minijuego1" />
      <GameCard gameName="Adivina la capital" gameDescription="¡Encuentra la capital del pais!" image="https://i.ytimg.com/vi/yEvkpAoJL3E/maxresdefault.jpg" route="/juego/CountryCapitalGame" />
      <GameCard gameName="Descubre el famoso" gameDescription="¡Adivina el famoso en este ahorcado!" image="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/YYXEQEK2EBGBZHBIZSSI5VVXOE.jpg" route="/juego/FamousHangmanGame" />
      <GameCard gameName="Wordle Game" gameDescription="¿Serás capaz de adivinar la palabra?" image="https://upload.wikimedia.org/wikipedia/commons/e/ec/Wordle_196_example.svg" route="/juego/WordleGame" />
      <GameCard gameName="Memotest" gameDescription="¡Encuentra los pares!" image="https://stonkstutors.com/wp-content/uploads/2022/04/Los-mejores-juegos-de-adivinar-paises-para-Android-e-iOS.jpg" route="/juego/memotest" />
      <GameCard gameName="Ordena la historia" gameDescription="¡Organiza los acontecimientos en orden cronologico!" image="https://st2.depositphotos.com/1259239/8917/v/450/depositphotos_89177026-stock-illustration-timeline-infographic-vector.jpg" route="/juego/HistoricalEventsGame" />
      <GameCard gameName="Completa la frase" gameDescription="¡Encuenta la palabra correcta para completar la frase!" image="https://paginadelespanol.com/wp-content/uploads/2019/03/Completa-la-frase-1-570x478.png" route="/juego/completaLaFrase" />
      <GameCard gameName="¿Quien lo dijo?" gameDescription="¡Adivina a quien el pertenece la frase!" image="https://stonkstutors.com/wp-content/uploads/2022/04/Los-mejores-juegos-de-adivinar-paises-para-Android-e-iOS.jpg" route="/juego/QuienLoDijo" />
    </div>
  </div>
);

const Header = () => (
  <header>
    <h1 class="text-naranja">CultureQuiz</h1>
    <Tierra />  
  </header>
);

const App = () => {
  return (
    <Router>
      <Background />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/juego/minijuego1" element={<MiniGame1 />} />
        <Route path="/juego/CountryCapitalGame" element={<CountryCapitalGame />} />
        <Route path="/juego/FamousHangmanGame" element={<FamousHangmanGame />} />
        <Route path="/juego/WordleGame" element={<WordleGame />} />
        <Route path="/juego/memotest" element={<MemotestGame />} />
        <Route path="/juego/HistoricalEventsGame" element={<HistoricalEventsGame />} />
        <Route path="/juego/completaLaFrase" element={<CompletaLaFrase />} />
        <Route path="/juego/QuienLoDijo" element={<QuienLoDijo />} />
      </Routes>
    </Router>
  );
};

export default App;
