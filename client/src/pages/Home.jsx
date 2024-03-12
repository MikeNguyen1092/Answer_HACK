import React, { useEffect, useRef, useState } from 'react';
import backgroundImage from '../assets/images/frank.gif';
import '../index.css';


const Home = () => {
  const pageStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  };

  return (
    <main style={pageStyle}>
      <div className="flex-row justify-center">
        <h1 className="scrolling-text">Grab your drinks  lets get ready to rumble!!!</h1>
      </div>
    </main>
  );
};

export default Home;