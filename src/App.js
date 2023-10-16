import './App.css';
import './ShakeAnimation.css';
import ShakingText from './Components/ShakingText';
import MoveSelection from './Components/MoveSelection';
import React, { useState, useEffect } from 'react';

function App() {
  return (
    <div className="App">
      <main>
        <section className='game-scene'></section>
        <MoveSelection />
      </main>
      
    </div>
  );
}

export default App;
