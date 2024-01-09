import './App.css';
import './ShakeAnimation.css';
import ShakingText from './Components/ShakingText';
import MoveSelection from './Components/MoveSelection';
import GameScene from './Components/GameScene';
import { playerStructure, enemyStructure } from './Characters';
import FightOverMenu from './Components/FightOverMenu';
import BackgroundScene from './Components/BackgroundScene/BackgroundScene';
import React, { useState, useEffect, useRef } from 'react';
import { MoveTypes } from './MoveTypes';
import aggressiveVerbsData from './aggressiveVerbsData';

function App() {

  const [player, setPlayer] = useState(playerStructure)

  const [enemy, setEnemy] = useState(enemyStructure)

  const [aggressiveVerbs, setAggressiveVerbs] = useState(aggressiveVerbsData.aggressive_verbs)

  const [currentPointIndicator, setCurrentPointIndicator] = useState(0)
  const [playIndicatorAnimation, setIndicatorAnimation] = useState(false)

  const firstRender = useRef(true)
  const customMoveIds = [2, 4, 5]


  // ------------------- MOVE GENERATION -------------------

  // fetching random move names on startup
  useEffect(() => {

    // only allows single words to be move names
    filterSingleWordsFromVerbsData()
     
  }, [])

  useEffect(() => {

    if (!firstRender.current) {
      generateMoveNames()
      
    }
    else {
      firstRender.current = false
    }
    
  }, [aggressiveVerbs])

  function filterSingleWordsFromVerbsData() {

    setAggressiveVerbs((prevAggressiveVerbs) => {
      const updatedAggressiveVerbs = prevAggressiveVerbs.filter(verb => !/\s/.test(verb))

      return updatedAggressiveVerbs
    })
  }

  function generateMoveNames() {
    const moveNamesArray = aggressiveVerbs || []
    const selectedMoves = []

    // get 3 random move names
    for (let i = 0; i < 3; i++) {
      // get a random element from moveNamesArray to be the move name
      const randomIndex = Math.floor(Math.random() * moveNamesArray.length)
      const moveSelected = moveNamesArray[randomIndex]
      // move element from array so it doesnt get picked twice
      moveNamesArray.splice(randomIndex, 1)
      selectedMoves.push(moveSelected)
    }

    // get 3 in total
    // rename the player moves to these move names

    setPlayer((prevPlayer) => {
      const updatedMoves = prevPlayer.moves.map((prevMove, index) => {

        if (prevMove.id === 1 || prevMove.type !== MoveTypes.DAMAGE) { // first move stays as default, and any healing moves stay the same
          return prevMove
        }

        // if id is 2, index of selectedMoves is 0
        // if id is 4, index of selectedMoves is 1
        // if id is 5, index of selectedMoves is 2
        const selectedMoveIndex = 
          prevMove.id === 2 ? 0 : 
          prevMove.id === 4 ? 1 : 
          prevMove.id === 5 ? 2 : null

        if (selectedMoveIndex === null) {
          return prevMove
        }

        const moveName = selectedMoves[selectedMoveIndex]

        const updatedMove = {
            ...prevMove,
            name: moveName,
        }
        return updatedMove

      })

        const updatedPlayer = {
          ...prevPlayer,
          moves: updatedMoves
        }
        return updatedPlayer
    })
  }

  // ------------------- MOVE DESCRIPTIONS -------------------

  // checks if the first custom move name has been changed. if yes, then generate descriptions
  useEffect(() => {

    const fourthMoveName = player.moves[4].name

    // means all moves have been given custom names
    if (fourthMoveName !== "Move 4") {
      generateMoveDescriptions()
    }

  }, [player.moves[4].name])

  function generateMoveDescriptions() {

    const customMoves = [
      player.moves[customMoveIds[0] - 1],
      player.moves[customMoveIds[1] - 1],
      player.moves[customMoveIds[2] - 1]
    ]

    customMoves.forEach((move) => {
      fetchMoveDescription(move.name)
        .then(moveDesc => {
          // console.log(moveDesc)
          setPlayer((prevPlayer) => {
            const updatedMoves = prevPlayer.moves.map((prevMove) => {
              // if the current prevMove matches the move being checked, update the move with the desc
              if (prevMove.id === move.id) {
                const updatedMove = {
                  ...prevMove,
                  description: moveDesc
                }
                return updatedMove
              }
              else {
                return prevMove
              }
            })
            // moves have all been updated. assign to players moves
            const updatedPlayer = {
              ...prevPlayer,
              moves: updatedMoves
            }
            return updatedPlayer
          })
        })
        .catch(error => {
          console.error(error)
        })
    })
    
  }

  function fetchMoveDescription(word) {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`

    return fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error found')
        }
        return response.json()
      })
      .then(data => {
        // this is working
        return getMoveDescFromData(data)
      })
      .catch(error => {
        console.error("Error fetching data:", error)
        throw error
      })

  }

  function getMoveDescFromData(data) {
    const firstWordData = data[0]
    // console.log(firstWordData)
    const meanings = firstWordData.meanings
    let definition = "Attack your enemy"

    meanings.forEach(meaning => {
      if (meaning.partOfSpeech === "verb") {
        // console.log("meaning is a verb")
        const definitionArray = meaning.definitions[0]
        definition = definitionArray.definition
      }
    })

    return definition
  }

  // ------------------- TURN CYCLE -------------------

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

  // ------------------- COMPLETING MOVES -------------------

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

    const damage = generateRandNum(move.damageMin, move.damageMax)
    
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

  // ------------------- FEEDBACK ANIMATION -------------------

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
  
  function generateRandNum(min, max) {
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
        <BackgroundScene></BackgroundScene>
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
