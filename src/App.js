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

  const [playerTurn, setPlayerTurn] = React.useState(true)

  function moveSelected(id) {
    console.log(`move selected: ${id}`)
    
    for (let i = 0; i < player.moves.length; i++) {
      const currentMove = player.moves[i]
      if(currentMove.id === id) {
        // found the move selected
        activateMove(currentMove)
      }
    }
  }

  function activateMove(move) {
    const damage = calculateDamage(move.damageMin, move.damageMax)
    console.log(damage)
    // picks the victim depending on whose turn it is
    const moveVictimSetFunction = playerTurn ? setEnemy : setPlayer

    // Updating the state
    moveVictimSetFunction((prevCharacter) => {
      const updatedCharacter = {
        ...prevCharacter,
        currentHealth: Math.max(prevCharacter.currentHealth - damage, 0) //ensures it doesnt go beneath 0
      }

      return updatedCharacter
    })

  }
  
  function calculateDamage(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
