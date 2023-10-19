import React, { useState, useEffect } from 'react';
import Move from './Move';

export default function MoveSelection(props) {

    const moveElements = props.moves.map((move, index) => ( 
        <Move 
            key={index} 
            moveName={move.name}
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