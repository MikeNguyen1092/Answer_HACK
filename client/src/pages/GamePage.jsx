import QuestionsForm  from '../components/Game';
import backgroundImage from '../assets/images/beer2.jpg'; // Import the background image

const GamePage = () => {
  const mainStyle = {
    backgroundImage: `url(${backgroundImage})`, // Set the background image
	backgroundSize: '100% 100%', // Adjust background size as needed
    backgroundRepeat: 'no-repeat', // Adjust background repeat as needed
    minHeight: '100vh', // Ensure the layout fills the entire viewport height
    padding: '1rem', // Adjust padding as needed
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column'
	
	
  };

  return (
   <main  style={mainStyle}>
      <div className="flex-row justify-center text-bold">
        <h1 >Beer related trivia while enjoying a couple.</h1>
        <QuestionsForm />
      </div>
	</main>
  );
};

export default GamePage;
