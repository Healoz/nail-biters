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

  const [currentPointIndicator, setCurrentPointIndicator] = useState(0)
  const [playIndicatorAnimation, setIndicatorAnimation] = useState(false)

  const [moveNames, setMoveNames] = useState([])


  // fetching random move names on startup
  useEffect(() => {
    console.log("runs when program starts")

    const fetchRandomMoveName = async () => {
      try {
        const response = await fetch('https://api.api-ninjas.com/v1/randomword?type=verb', {
          method: 'GET',
          headers: {
            'X-Api-Key': 'K0K87hrvQf7EKobEVazk3A==JvjlVIbaJiKLDFkb', // Replace 'YOUR_API_KEY' with your actual API key
            'Content-Type': 'application/json',
          }
        })
        if (response.ok) {
          const data = await response.json()
          const word = data.word
          setMoveNames(prevMoveNames => [...prevMoveNames, word])
        } else {
          console.error('Error: ', response.statusText)
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

    const fetchRandomMoveNamesWithDelay = async () => {
      for (let i = 0; i < 4; i++) {
        await fetchRandomMoveName()
      }
    }

    fetchRandomMoveNamesWithDelay()
    
  }, [])

  useEffect(() => {
    console.log(moveNames)
  }, [moveNames])

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

      if (checkIfStatBelowPercentage(enemy, MoveTypes.HEALING, enemy.percentForTakingPotion) && healMove && healMove.quantity > 0) {
          console.log("Health is less than 25% and the enemy has enough health potions.");
          return healMove;
      } else if (checkIfStatBelowPercentage(enemy, MoveTypes.MANA_RESTORATION, enemy.percentForTakingPotion) && manaRestoreMove && manaRestoreMove.quantity > 0) {
          console.log("Mana is less than 25% and the enemy has enough mana potions.");
          return manaRestoreMove;
      } else {
          // prioritises moves with mana cost as they are more powerful
          let validEnemyMoves = enemyMoves.filter(move => move.manaCost > 0 && move.manaCost <= enemy.currentMana);
          console.log(validEnemyMoves);
          // if there are no possible mana moves the player can complete, then just use the nonMana moves
          if (validEnemyMoves.length === 0) {
            console.log("not enough mana for mana moves. using basic move")
            validEnemyMoves = enemyMoves.filter(move => move.manaCost <= enemy.currentMana)
          }
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
      completeRestoreMove(move)
    }
    else if (move.type === MoveTypes.MANA_RESTORATION) {
      console.log("complete mana restore effect")
      completeRestoreMove(move)
    }
    else {
      console.log("invalid move type")
    }

  }

  async function completeRestoreMove(restoreMove) {

    console.log("restore move name: " + restoreMove.name)
    
    const restoreSubjectSetFunction = player.isCurrentTurn ? setPlayer : setEnemy

    // healing current characters turn
    restoreSubjectSetFunction((prevCharacter) => {

      const updatedMoves = prevCharacter.moves.map((prevMove) => {
        if (prevMove.id === restoreMove.id) {
          // reduce quantity of healing/mana potion move by 1
          const updatedMove = {
            ...prevMove,
            quantity: prevMove.quantity - 1
          }
          return updatedMove
        }
        return prevMove
      })

      let updatedMana = prevCharacter.currentMana
      let updatedHealth = prevCharacter.currentHealth

      console.log(restoreMove.type)

      if (restoreMove.type === MoveTypes.HEALING) {
        updatedHealth = Math.min(
          prevCharacter.currentHealth + restoreMove.restoreAmount,
          prevCharacter.maxHealth
        )
      }

      if (restoreMove.type === MoveTypes.MANA_RESTORATION) {
        updatedMana = Math.min(
          prevCharacter.currentMana + restoreMove.restoreAmount,
          prevCharacter.maxMana
        )
      }

      console.log("updated health: " + updatedHealth)
      console.log("updated mana: " + updatedMana)

      const updatedCharacter = {
        ...prevCharacter,
        moves: updatedMoves,
        currentHealth: updatedHealth,
        currentMana: updatedMana,
      }

      return updatedCharacter
    })

    await playNumberAnimation(restoreSubjectSetFunction, MoveTypes.HEALING, restoreMove.restoreAmount)

  }

  async function completeDamageMove(move) {

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

    await playNumberAnimation(moveVictimSetFunction, MoveTypes.DAMAGE, damage)
  }

  function playNumberAnimation(characterSetFunction, moveType, number) {

    characterSetFunction(prevCharacter => ({...prevCharacter, numberIndicatorShown: true, currentMoveType: moveType}))

    // setting the current damage being dealt to display
    setCurrentPointIndicator(number)

    console.log("player current move type: " + player.currentMoveType)
    console.log("enemy current move type: " + enemy.currentMoveType)

    return new Promise((resolve) => {
      // wait for duration of animation seconds, then change numberIndicatorShown to false again
      setTimeout(() => {
        characterSetFunction(prevCharacter => ({...prevCharacter, numberIndicatorShown: false}))
        resolve()
      }, 2500)
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

      const updatedMoves = prevCharacter.moves.map((prevMove) => {
        if (prevMove.type === MoveTypes.HEALING || prevMove.type === MoveTypes.MANA_RESTORATION) {
          // set to max quantity
          const updatedMove = {
            ...prevMove,
            quantity: prevMove.maxQuantity
          }
          return updatedMove
        }
        return prevMove
      })

      const updatedCharacter = {
        ...prevCharacter,
        currentHealth: prevCharacter.maxHealth,
        currentMana: prevCharacter.maxMana,
        moves: updatedMoves,
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
          currentPointIndicator={currentPointIndicator}
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
