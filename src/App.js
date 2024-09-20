// src/App.js
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; // Usar HashRouter para GitHub Pages
import GameButton from './components/GameButton';
import MiniGame1 from './components/MiniGame1';
import CountryCapitalGame from './components/CountryCapitalGame';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <div>
              <h1>Mi Página de Mini-Juegos</h1>
              <GameButton 
                gameName="Mini Juego 1" 
                gameDescription="¡Diviértete con el primer mini-juego!" 
                route="/juego/minijuego1" 
              />
              <GameButton 
                gameName="CountryCapitalGame" 
                gameDescription="¡No te pierdas el segundo mini-juego!" 
                route="/juego/CountryCapitalGame" 
              />
            </div>
          } />
          <Route path="/juego/minijuego1" element={<MiniGame1 />} />
          <Route path="/juego/CountryCapitalGame" element={<CountryCapitalGame />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
