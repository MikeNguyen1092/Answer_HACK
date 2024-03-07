const HighScore=()=> {
    function showHighScore() {
        const highScore = getHighScoreFromLocalStorage();
        alert(`High Score: ${highScore}`);
    }

    function getHighScoreFromLocalStorage() {
      const savedScore = localStorage.getItem('highScore');
        return savedScore || 'No high score yet';
    }

return(
<main>
<div>
<h1>"High score will go here"</h1></div>
<button onClick="showHighScore()">HighScore
</button>
</main>

);
};

export default HighScore;

  