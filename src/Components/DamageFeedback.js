import React, { useState, useEffect } from 'react';

export default function DamageFeedback(props) {

    // generate a random number between 1 and 4
    // play animation of number appearing and disappearing in a random direction
    const [animationClass, setAnimationClass] = useState('')

    // console.log(props.character.damageDealt)
    // const classList = `damage-number ${props.character.damageDealt ? `damage-animation-${props.randomNumber}` : ''}`;

    useEffect(() => {
        if (props.character.damageDealt) {
            const randomNumber = Math.floor(Math.random() * 4) + 1;
            setAnimationClass(`damage-animation-${randomNumber}`)
        }
        else {
            setAnimationClass('')
        }
    }, [props.character.damageDealt])
    
    return (
        <div className="damage-feedback">
            <h3 className={`damage-number ${animationClass}`}>{props.currentDamageDealt}</h3>
        </div>
    )
}