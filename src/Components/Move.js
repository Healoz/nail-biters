import React, { useState, useEffect } from 'react';
import { MoveTypes } from '../MoveTypes';

export default function MoveSelection(props) {

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
                    <p className='move-name'>{props.move.name}</p>
                    <p className='move-desc'>{props.move.description}</p>
                    <p>Damage: {props.move.damageMin} - {props.move.damageMax}</p>
                    <p>Mana cost: {props.move.manaCost}</p>
                </button>
            )}
            {props.move.type === MoveTypes.HEALING && (
                hasResources = props.move.quantity > 0,
                <button
                    onClick={hasResources ? () => props.moveSelected(props.id) : null}
                    style={!hasResources ? styles : {}}
                >
                    <p className='move-name'>{props.move.name}</p>
                    <p>Restores: {props.move.restoreAmount}</p>
                    <p>Quantity: {props.move.quantity}</p>
                </button>
            )}
            {props.move.type === MoveTypes.MANA_RESTORATION && (
                hasResources = props.move.quantity > 0,
                <button
                    onClick={hasResources ? () => props.moveSelected(props.id) : null}
                    style={!hasResources ? styles : {}}
                >
                    <p className='move-name'>{props.move.name}</p>
                    <p>Restores: {props.move.restoreAmount}</p>
                    <p>Quantity: {props.move.quantity}</p>
                </button>
            )}
        </>
    )
}