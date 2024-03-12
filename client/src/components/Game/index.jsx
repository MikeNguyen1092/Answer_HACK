import { useState, useRef, useEffect, useCallback } from "react";
import Timer from "../Timer";
import { useQuery } from "@apollo/client";
import { QUERY_QUESTION } from "../../utils/queries";

const QuestionsForm = () => {
  const { loading, error, data } = useQuery(QUERY_QUESTION);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [countdown, setCountdown] = useState(10);
  const intervalRef = useRef(null);
  const [userChoice, setUserChoice] = useState('');
  const [score, setScore] = useState(0);

  const { questions } = data || {};

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setCountdown(10);
  };

 

  useEffect(() => {
    const intervalRef = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 0) {
          clearInterval(intervalRef);
          return 10;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef);
  }, [currentQuestionIndex]);

  // Update score whenever it changes
  useEffect(() => {
    console.log("Score updated:", score);
  }, [score]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleChoiceClick = (choice) => {
    setUserChoice(choice);
    stopTimer();
  
    const correctAnswer = questions[currentQuestionIndex].answer;
    console.log(`userChoice = ${choice}`);
    console.log(`correctAnswer = ${correctAnswer}`);
    if (choice === correctAnswer) {
      console.log('correct')
      setScore((prevScore) => {
        console.log(`prevScore is ${prevScore}`);
        return prevScore + countdown * 100;
      });    
    }else{
      console.log('incorrect answer')
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log("End of questions");
    }

  };

  return (
    <div>
      <Timer countdown={countdown} />
      <h2>Question {currentQuestionIndex + 1}</h2>
      <p>{questions[currentQuestionIndex].questionText}</p>
      <ul style={{ textAlign: "center", paddingLeft: 0, listStyle: "none" }}>
        {questions[currentQuestionIndex].choices.map((choice, choiceIndex) => (
          <li key={choiceIndex}>
            <button
              onClick={() => handleChoiceClick(choice)}
              style={{
                background: "none",
                border: "none",
                padding: "0",
                margin: "0",
                cursor: "pointer",
              }}
            >
              {choice}
            </button>
          </li>
        ))}
      </ul>
      <p>Answer: {questions[currentQuestionIndex].answer}</p>
      <p>Score: {score}</p>
    </div>
  );
};

export default QuestionsForm;
