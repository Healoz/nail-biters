import React, { useState, useEffect } from 'react';
import SpeechBubble1 from '../Images/speech-bubble-1.png'
import PlayerSection from './PlayerSection';
import EnemySection from './EnemySection';

export default function GameScene(props) {

    return (
        <section className='game-scene'>
            <EnemySection />
            <PlayerSection />
        </section>
    )


}