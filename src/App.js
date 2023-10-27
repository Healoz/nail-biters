import './App.css';
import './ShakeAnimation.css';
import ShakingText from './Components/ShakingText';
import MoveSelection from './Components/MoveSelection';
import GameScene from './Components/GameScene';
import { playerStructure, enemyStructure } from './Characters';
import FightOverMenu from './Components/FightOverMenu';
import React, { useState, useEffect } from 'react';
import { MoveTypes } from './MoveTypes';

function App() {

  const [player, setPlayer] = useState(playerStructure)

  const [enemy, setEnemy] = useState(enemyStructure)

  const [currentDamageDealt, setCurrentDamageDealt] = useState(0)
  const [playDamageAnimation, setPlayDamageAnimation] = useState(false)

  // changes when currentTurn changes
  useEffect(() => {

    if (player.isCurrentTurn) {
      // console.log("players turn")

      // show speechbubble feedback
      setPlayer(player => ({...player, speechBubble: "It's my turn now!"}))

      setEnemy(enemy => ({...enemy, speechBubble: ""}))

    }
    else {

      // doesn't complete turn if someone is dead
      // console.log(player.isDead, enemy.isDead)
      if (!player.isDead && !enemy.isDead) {
        // console.log("enemys turn")

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
    const moveSelected = selectEnemyMove();
    showMoveEffect(moveSelected);
    setTimeout(() => switchToPlayerTurn(), 2000);
}

  function selectEnemyMove() {
      const enemyMoves = enemy.moves;
      const healMove = enemyMoves.find(move => move.type === MoveTypes.HEALING);
      const manaRestoreMove = enemyMoves.find(move => move.type === MoveTypes.MANA_RESTORATION);

      if (checkIfStatBelowPercentage(enemy, MoveTypes.HEALING, 25) && healMove && healMove.quantity > 0) {
          console.log("Health is less than 25% and the enemy has enough health potions.");
          return healMove;
      } else if (checkIfStatBelowPercentage(enemy, MoveTypes.MANA_RESTORATION, 25) && manaRestoreMove && manaRestoreMove.quantity > 0) {
          console.log("Mana is less than 25% and the enemy has enough mana potions.");
          return manaRestoreMove;
      } else {
          const validEnemyMoves = enemyMoves.filter(move => move.manaCost <= enemy.currentMana);
          console.log(validEnemyMoves);
          const randomIndex = Math.floor(Math.random() * validEnemyMoves.length);
          return validEnemyMoves[randomIndex];
      }
  }

  function showMoveEffect(move) {
      setTimeout(() => {
          activateMove(move);
      }, 1000);
  }

  function switchToPlayerTurn() {
      setPlayer(player => ({ ...player, isCurrentTurn: true }));
  }


function checkIfStatBelowPercentage(character, moveType, percentage) {

  let currentPercentage

  if (moveType === MoveTypes.HEALING) {
    currentPercentage = (character.currentHealth / character.maxHealth) * 100
  }
  else if (moveType === MoveTypes.MANA_RESTORATION) {
    currentPercentage = (character.currentMana / character.maxMana) * 100
  }
  else {
    console.log("invalid move type")
    return false
  }

  return currentPercentage < percentage
  
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

    if (move.type === MoveTypes.DAMAGE) {
      completeDamageMove(move)
    }
    else if (move.type === MoveTypes.HEALING) {
      console.log("complete heal effect")
    }
    else if (move.type === MoveTypes.MANA_RESTORATION) {
      console.log("complete mana restore effect")
    }
    else {
      console.log("invalid move type")
    }

  }

  function completeDamageMove(move) {

    const damage = calculateDamage(move.damageMin, move.damageMax)
    
    // console.log(damage)
    // picks the victim / user depending on whose turn it is
    const moveVictimSetFunction = player.isCurrentTurn ? setEnemy : setPlayer
    const moveUserSetFunction = player.isCurrentTurn ? setPlayer : setEnemy

    // Updating the state of victim (reducing health + playing animation)
    moveVictimSetFunction((prevCharacter) => {
      const updatedCharacter = {
        ...prevCharacter,
        currentHealth: Math.max(prevCharacter.currentHealth - damage, 0), //ensures it doesnt go beneath 0
        damageDealt: true
      }

      return updatedCharacter
    })

    // reducing mana + showing speechBubble
    moveUserSetFunction((prevCharacter) => {
      const updatedCharacter = {
        ...prevCharacter,
        currentMana: Math.max(prevCharacter.currentMana - move.manaCost, 0)

      }

      return updatedCharacter
    })

    // setting the current damage being dealt to display
    setCurrentDamageDealt(damage)

    // wait for duration of animation seconds, then change damageDealt to false again
    setTimeout(() => {
      moveVictimSetFunction(prevCharacter => ({...prevCharacter, damageDealt: false}))
    }, 2500)

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
        currentMana: prevCharacter.maxMana,
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
          currentDamageDealt={currentDamageDealt}
          playDamageAnimation={playDamageAnimation}
        />
        <MoveSelection 
          moves={player.moves}
          moveSelected={moveSelected}
          isPlayerTurn={player.isCurrentTurn}
          playerCurrentMana={player.currentMana}    
        />
      </main>
      
    </div>
  );
}

export default App;
