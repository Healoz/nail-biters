import React, { useState, useEffect } from 'react';
import PlayerSection from './PlayerSection';
import EnemySection from './EnemySection';

export default function GameScene(props) {

    return (
        <section className='game-scene'>
            <EnemySection enemy={props.enemy}/>
            <PlayerSection player={props.player}/>
        </section>
    )


}