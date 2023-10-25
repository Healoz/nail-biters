import React, { useState, useEffect } from 'react';

export default function MoveSelection(props) {

    const styles = {
        opacity: '0.5'
    }

    const hasEnoughMana = props.playerCurrentMana >= props.move.manaCost

    return (
        <button 
            onClick={hasEnoughMana ? () => props.moveSelected(props.id) : null}
            style={!hasEnoughMana ? styles : {}}
        >
            <p className='move-name'>{ props.move.name }</p>
            <p className='move-desc'>{ props.move.description}</p>
            <p>Damage: {props.move.damageMin} - {props.move.damageMax}</p>
            <p>Mana cost: { props.move.manaCost }</p>
        </button>
        
    )
}