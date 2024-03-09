import React from 'react';
import backgroundImage from '../assets/images/frank.gif';




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
        <h1 style={{ color: 'white', textAlign: 'center' }}>hello</h1>
        {/* <QuestionsForm /> */}
      </div>
    </main>
  );
};

export default Home;