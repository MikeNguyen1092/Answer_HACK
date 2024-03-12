import React from 'react';


const Score = () => {

  const showHighScore = () => {
    // Add the logic to show high score
  };

  return (
    
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
      <div>
        <h1>High score will go here</h1>
      </div>
      <div className="Score">
        {/* Add your Score content here */}
      </div>
    </main>
  );
};

export default Score;