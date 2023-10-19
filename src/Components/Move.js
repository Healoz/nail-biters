import React, { useState, useEffect } from 'react';

export default function MoveSelection(props) {

    return (
        <button onClick={() => props.moveSelected(props.id)}>{ props.moveName }</button>
    )
}