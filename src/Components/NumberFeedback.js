import React, { useState, useEffect } from 'react';
import { MoveTypes } from '../MoveTypes';

export default function NumberFeedback(props) {

    // generate a random number between 1 and 4
    // play animation of number appearing and disappearing in a random direction
    const [animationClass, setAnimationClass] = useState('')
    const [colourClass, setColourClass] = useState('')

    function getClassListBasedOnMoveType(moveType) {
        switch (moveType) {
            case MoveTypes.DAMAGE:
                return 'damage-colour';
            case MoveTypes.MANA_RESTORATION:
                return 'mana-colour';
            case MoveTypes.HEALING:
                return 'heal-colour';
            default:
                return '';
        }
    }

    useEffect(() => {
        if (props.character.numberIndicatorShown) {
            const randomNumber = Math.floor(Math.random() * 4) + 1;
            setAnimationClass(`damage-animation-${randomNumber}`)
        }
        else {
            setAnimationClass('')
        }
    }, [props.character.numberIndicatorShown])

    useEffect(() => {

        setColourClass(getClassListBasedOnMoveType(props.character.currentMoveType))

    }, [props.character.currentMoveType])
    
    return (
        <div className="damage-feedback">
            <h3 className={`damage-number ${animationClass} ${colourClass}`}>{props.currentPointIndicator}</h3>
        </div>
    )
}