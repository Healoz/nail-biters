import './App.css';
import './ShakeAnimation.css';
import ShakingText from './Components/ShakingText';
import MoveSelection from './Components/MoveSelection';
import GameScene from './Components/GameScene';
import { playerStructure, enemyStructure } from './Characters';
import FightOverMenu from './Components/FightOverMenu';
import React, { useState, useEffect } from 'react';

function App() {

  const [player, setPlayer] = useState(playerStructure)

  const [enemy, setEnemy] = useState(enemyStructure)

  // changes when currentTurn changes
  useEffect(() => {

    if (player.isCurrentTurn) {
      console.log("players turn")

      // show speechbubble feedback
      setPlayer(player => ({...player, speechBubble: "It's my turn now!"}))

      setEnemy(enemy => ({...enemy, speechBubble: ""}))

    }
    else {

      // doesn't complete turn if someone is dead
      console.log(player.isDead, enemy.isDead)
      if (!player.isDead && !enemy.isDead) {
        console.log("enemys turn")

        // show speechbubble feedback
        setPlayer(player => ({...player, speechBubble: ""}))

        setEnemy(enemy => ({...enemy, speechBubble: "It's my turn now!"}))

        completeEnemyMove()
      }

    }

  }, [player.isCurrentTurn])

  useEffect(() => {

    if (player.currentHealth === 0) {
      console.log("player lost")
      setPlayer(player => ({...player, isDead: true}))
    }
    else if (enemy.currentHealth === 0) {
      console.log("enemy lost")
      setEnemy(enemy => ({...enemy, isDead: true}))
    }

  },[player.currentHealth, enemy.currentHealth])

  function completeEnemyMove() {
    // select random move from enemy moves
    const enemyMoves = enemy.moves
    const randomIndex = Math.floor(Math.random() * enemyMoves.length);
    const randomMove = enemyMoves[randomIndex]
    
    // show effect of move for a couple seconds before changing to player turn
    setTimeout(() => {
      // activate the move
      activateMove(randomMove)
    }, 1000)

    // set a timer for 3 seconds to show effect of move
    setTimeout(() => {

      // players turn now
      setPlayer(player => ({...player, isCurrentTurn: true}))

    }, 2000) // wait 3 seconds before making it players turn

  }

  function moveSelected(id) {

    if (!player.isCurrentTurn) {
      return
    }

    console.log(`move selected: ${id}`)
  
    for (let i = 0; i < player.moves.length; i++) {
      const currentMove = player.moves[i]
      if(currentMove.id === id) {
        // found the move selected
        activateMove(currentMove)
        setPlayer(player => ({...player, isCurrentTurn: false}))
      }
    }
    
  }

  function activateMove(move) {
    const damage = calculateDamage(move.damageMin, move.damageMax)
    console.log(damage)
    // picks the victim depending on whose turn it is
    const moveVictimSetFunction = player.isCurrentTurn ? setEnemy : setPlayer

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

  function nextBattle() {
    resetStats(setPlayer)
    resetStats(setEnemy)
  }

  function resetStats(setCharacterFunction) {

    setCharacterFunction((prevCharacter) => {
      const updatedCharacter = {
        ...prevCharacter,
        currentHealth: prevCharacter.maxHealth,
        isDead: false
      }

      if ('isCurrentTurn' in prevCharacter) {
        updatedCharacter.isCurrentTurn = true
      }

      return updatedCharacter
    })
  }

  return (
    <div className="App">
      <main>
        {player.isDead && <FightOverMenu battleWon={false} nextBattle={nextBattle} />}
        {enemy.isDead && <FightOverMenu battleWon={true} nextBattle={nextBattle}/>}
        <GameScene 
          player={player}
          enemy={enemy}
        />
        <MoveSelection 
          moves={player.moves}
          moveSelected={moveSelected}
          isPlayerTurn={player.isCurrentTurn}     
        />
      </main>
      
    </div>
  );
}

export default App;
