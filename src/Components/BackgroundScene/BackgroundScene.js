import React, { useState, useEffect } from 'react';
import './BackgroundScene.css';

export default function BackgroundScene(props) {

    return (
        <section className='background-scene'>
            <div className='blob'></div>
            <div className='clouds'></div>
        </section>
    )

}