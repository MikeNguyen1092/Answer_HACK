import React from 'react';
import QuestionsForm from '../components/Game';
import backgroundImage from '../assets/images/tapper.gif';

const GamePage = () => {
  const mainStyle = {
    margin: 0,  
    padding: 0, 

    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',  
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center', 

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    textAlign: 'center'
  };

  const overlayStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    borderRadius: '10px',
    padding: '1rem',
    maxWidth: '600px'
  };

  return (
    <div style={mainStyle}>
      <div style={overlayStyle} className="flex-row justify-center text-bold">
        <h1>Beer related trivia while enjoying a couple.</h1>
        <QuestionsForm />
      </div>
    </div>
  );
};

export default GamePage;