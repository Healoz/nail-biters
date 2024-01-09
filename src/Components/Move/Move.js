import React, { useState, useEffect } from 'react';
import { MoveTypes } from '../../MoveTypes';
import { ReactComponent as SwordIcon } from '../../Images/jam_sword-f.svg';
import { ReactComponent as EnergyIcon } from '../../Images/ph_lightning-fill.svg';


export default function Move(props) {

    const styles = {
        opacity: '0.5'
    }

    let hasResources

    return (
        <>
            {props.move.type === MoveTypes.DAMAGE && (
                hasResources = props.playerCurrentMana >= props.move.manaCost,
                <button
                    onClick={hasResources ? () => props.moveSelected(props.id) : null}
                    style={!hasResources ? styles : {}}
                >
                    <div className='button-contents'>
                        <div className='move-info'>
                            <p className='move-name'>{props.move.name}</p>
                            {/* <p className='move-desc'>{props.move.description}</p> */}
                        </div>
                        <div className='move-stats'>
                            <p className='dmg'><SwordIcon /> {props.move.damageMin} - {props.move.damageMax}</p>
                            <p className='mana'><EnergyIcon /> {props.move.manaCost}</p>
                        </div>
                    </div>
                </button>
            )}
            {props.move.type === MoveTypes.HEALING && (
                hasResources = props.move.quantity > 0,
                <button
                    onClick={hasResources ? () => props.moveSelected(props.id) : null}
                    style={!hasResources ? styles : {}}
                    className='health-potion'
                >
                    <div className='button-contents'>
                        <p className='move-name'>{props.move.name}</p>
                        {/* <p>Restores: {props.move.restoreAmount}</p>
                        <p>Quantity: {props.move.quantity}</p> */}
                    </div>
                </button>
            )}
            {props.move.type === MoveTypes.MANA_RESTORATION && (
                hasResources = props.move.quantity > 0,
                <button
                    onClick={hasResources ? () => props.moveSelected(props.id) : null}
                    style={!hasResources ? styles : {}}
                    className='mana-potion'
                >
                    <div className='button-contents'>
                        <p className='move-name'>{props.move.name}</p>
                        {/* <p>Restores: {props.move.restoreAmount}</p>
                        <p>Quantity: {props.move.quantity}</p> */}
                    </div>
                </button>
            )}
        </>
    )
}