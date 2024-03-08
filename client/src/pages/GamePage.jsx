import QuestionsForm  from '../components/Game';
import backgroundImage from '../assets/images/beer2.jpg'; // Import the background image

const GamePage = () => {
  const mainStyle = {
    backgroundImage: `url(${backgroundImage})`, // Set the background image
    backgroundSize: 'cover', // Adjust background size as needed
    backgroundRepeat: 'no-repeat', // Adjust background repeat as needed
    padding: '1rem', // Adjust padding as needed
    textAlign: 'center'
  };

  return (
   
      <div style={mainStyle} className="flex-row justify-center text-bold">
        <h1 >Beer related trivia while enjoying a couple.</h1>
        <QuestionsForm />
      </div>
   
  );
};

export default GamePage;
