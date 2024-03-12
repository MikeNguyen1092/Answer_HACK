import React, { useState, useRef, useEffect } from "react";
import QuestionsForm from "../components/Game";
import backgroundImage from "../assets/images/tapper.gif";
import Timer from "../components/Timer";

const GamePage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [countdown, setCountdown] = useState(30);
  const [userChoice, setUserChoice] = useState("");
  const [score, setScore] = useState(0);

  const pageStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "80vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    textSize: "250px",
  };

  const overlayStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    fontSize: "25px",
    borderRadius: "10px",
    padding: "1rem",
    width: "900px",
    height: "600px",
  };

  const handleChoiceClick = (choice) => {
    setUserChoice(choice);
  
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    if (choice === correctAnswer) {
      setScore((prevScore) => prevScore + countdown * 100);
    }
  
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setCountdown(30); // Reset the timer for the next question
    } else {
      console.log('End of questions');
      // Handle end of questions, for example, display a message or reset the index
    }
  };

  useEffect(() => {
    setCountdown(30);
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 0) {
          clearInterval(intervalId);
          return 30;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, [countdown, currentQuestionIndex]);

  return (
    <main style={pageStyle}>
      <h1>Beer related trivia while enjoying a couple of frosty ones!</h1>
      
      <Timer countdown={countdown} />
      <div>
        <div style={overlayStyle} className="flex-row justify-center text-bold">
          <QuestionsForm
            currentQuestionIndex={currentQuestionIndex}
            handleChoiceClick={handleChoiceClick}
            setUserChoice={setUserChoice}
          />
        </div>
      </div>
    </main>
  );
};

export default GamePage;
