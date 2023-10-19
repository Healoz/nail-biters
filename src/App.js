import './App.css';
import './ShakeAnimation.css';
import ShakingText from './Components/ShakingText';
import MoveSelection from './Components/MoveSelection';
import GameScene from './Components/GameScene';
import { playerStructure, enemyStructure } from './Characters';
import React, { useState, useEffect } from 'react';

function App() {

  const [player, setPlayer] = React.useState(playerStructure)

  const [enemy, setEnemy] = React.useState(enemyStructure)

  function moveSelected(id) {
    console.log(`move selected: ${id}`)
  }

  return (
    <div className="App">
      <main>
        <GameScene 
          player={player}
          enemy={enemy}
        />
        <MoveSelection 
          moves={player.moves}
          moveSelected={moveSelected}     
        />
      </main>
      
    </div>
  );
}

export default App;
