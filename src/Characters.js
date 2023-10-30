// object for selecting what kind of move it is
import { MoveTypes } from "./MoveTypes";

// characters.js
export const playerStructure = {
    name: "Player name",
    isCurrentTurn: true,
    maxHealth: 100,
    currentHealth: 100,
    maxMana: 100,
    currentMana: 100,
    speechBubble: "Player speech bubble text here.",
    damageDealt: false,
    isDead: false,
    moves: [
      {
        name: "Basic Attack",
        id: 1,
        description: "This is the first move.",
        damageMin: 3,
        damageMax: 10,
        manaCost: 0,
        type: MoveTypes.DAMAGE
      },
      {
        name: "Move 2",
        id: 2,
        description: "This is the second move.",
        damageMin: 10,
        damageMax: 20,
        manaCost: 30,
        type: MoveTypes.DAMAGE
      },
      {
        name: "Health potion",
        id: 3,
        description: "Consume a potion to restore health",
        restoreAmount: 30,
        quantity: 3,
        maxQuantity: 3,
        type: MoveTypes.HEALING
      },
      {
        name: "Move 3",
        id: 4,
        description: "This is the third move.",
        damageMin: 50,
        damageMax: 70,
        manaCost: 70,
        type: MoveTypes.DAMAGE
      },
      {
        name: "Move 4",
        id: 5,
        description: "This is the fourth move.",
        damageMin: 10,
        damageMax: 20,
        manaCost: 30,
        type: MoveTypes.DAMAGE
      },
      {
        name: "Mana potion",
        id: 6,
        description: "Consume a mana potion",
        restoreAmount: 30,
        quantity: 5,
        maxQuantity: 5,
        type: MoveTypes.MANA_RESTORATION
      }
    ]
  };
  
  export const enemyStructure = {
    name: "Enemy name",
    maxHealth: 100,
    currentHealth: 100,
    maxMana: 100,
    currentMana: 100,
    speechBubble: "Enemy speech bubble text here.",
    damageDealt: false,
    isDead: false,
    moves: [
      {
        name: "Basic Attack",
        id: 1,
        description: "This is the first move.",
        damageMin: 3,
        damageMax: 10,
        manaCost: 0,
        type: MoveTypes.DAMAGE
      },
      {
        name: "Move 2",
        id: 2,
        description: "This is the second move.",
        damageMin: 10,
        damageMax: 20,
        manaCost: 30,
        type: MoveTypes.DAMAGE
      },
      {
        name: "Health potion",
        id: 3,
        description: "Consume a potion to restore health",
        restoreAmount: 50,
        quantity: 3,
        maxQuantity: 3,
        type: MoveTypes.HEALING
      },
      {
        name: "Move 3",
        id: 4,
        description: "This is the third move.",
        damageMin: 50,
        damageMax: 70,
        manaCost: 70,
        type: MoveTypes.DAMAGE
      },
      {
        name: "Move 4",
        id: 5,
        description: "This is the fourth move.",
        damageMin: 10,
        damageMax: 20,
        manaCost: 30,
        type: MoveTypes.DAMAGE
      },
      {
        name: "Mana potion",
        id: 6,
        description: "Consume a mana potion",
        restoreAmount: 30,
        quantity: 3,
        maxQuantity: 3,
        type: MoveTypes.MANA_RESTORATION
      }
    ]
  };
  