import './App.css';
import './ShakeAnimation.css';
import ShakingText from './Components/ShakingText';
import React, { useState } from 'react';

function App() {
  return (
    <div className="App">
      <h1>Hello world</h1>
      <ShakingText text="hello" />
      <ShakingText text="howdy stranger how are you?" />
    </div>
  );
}

export default App;
