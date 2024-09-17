// src/App.js
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; // Usar HashRouter para GitHub Pages
import GameButton from './components/GameButton';
import MiniGame1 from './components/MiniGame1';
import MiniGame2 from './components/MiniGame2';

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
                gameName="Mini Juego 2" 
                gameDescription="¡No te pierdas el segundo mini-juego!" 
                route="/juego/minijuego2" 
              />
            </div>
          } />
          <Route path="/juego/minijuego1" element={<MiniGame1 />} />
          <Route path="/juego/minijuego2" element={<MiniGame2 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
