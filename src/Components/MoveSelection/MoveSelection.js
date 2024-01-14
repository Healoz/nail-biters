import React, { useState, useEffect } from 'react';
import Move from '../Move/Move';
import './MoveSelection.css';

export default function MoveSelection(props) {

    const moveElements = props.moves.map((move) => ( 
        <Move 
            key={move.id} 
            move={move}
            moveSelected={props.moveSelected}
            playerCurrentMana={props.playerCurrentMana} 
            id={move.id} 
        />
    ))

    return (
        <section className='move-selection'>
          <div className={`move-grid ${props.isPlayerTurn ? '' : 'move-grid-hidden'}`}>
            {moveElements}
          </div>
        </section>
    )


}