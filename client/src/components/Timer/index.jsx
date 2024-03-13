import React, { useState, useEffect } from 'react';
import './Timer.css'; // Import the CSS file with styles

const Timer = ({ countdown }) => {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    // Toggle the pulse state on every countdown change
    setPulse(true);

    // Set a timeout to reset the pulse state after a short duration (e.g., 300 milliseconds)
    const timeoutId = setTimeout(() => {
      setPulse(false);
    }, 300);

    // Clear the timeout to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, [countdown]);

  return (
    <div className={`timer ${pulse ? 'pulse' : ''}`}>
      <h1>{countdown}</h1>
    </div>
  );
};

export default Timer;