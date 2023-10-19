import React, { useState, useEffect } from 'react';
import Move from './Move';

export default function MoveSelection(props) {

    const moveElements = props.moves.map((move) => ( 
        <Move 
            key={move.id} 
            moveName={move.name}
            moveSelected={props.moveSelected}
            id={move.id} 
        />
    ))

    return (
        <section className='move-selection'>
          <div className='move-grid'>
            {moveElements}
          </div>
        </section>
    )


}