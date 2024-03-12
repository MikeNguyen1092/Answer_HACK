import { useState, useRef, useEffect, useCallback } from "react";
import Timer from "../Timer";
import { useQuery } from "@apollo/client";
import { QUERY_QUESTION } from "../../utils/queries";

const QuestionsForm = () => {
  const { loading, error, data } = useQuery(QUERY_QUESTION);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const timerRef = useRef(null);
  const [countdown, setCountdown] = useState(30);

  const intervalRef = useRef(null);
  const [userChoice, setUserChoice] = useState("");
  const [score, setScore] = useState(0);

  const { questions } = data || {};

  const stopTimer = () => {
    clearInterval(intervalRef.current);
    setCountdown(10);
  };
  
  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCountdown(30);
    } else {
      console.log("End of questions");
    }
  }, [currentQuestionIndex, questions]);

  
  useEffect(() => {
    const intervalRef = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 0) {
          clearInterval(intervalRef);
          handleNextQuestion();
          return 30;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef);
  }, [currentQuestionIndex, handleNextQuestion]);

 

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
    if (choice === correctAnswer) {
      console.log("correct");
      setScore((prevScore) => {
        console.log(`prevScore is ${prevScore}`);
        return prevScore + countdown * 100;
      });
    } else {
      console.log("incorrect answer");
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCountdown(30);
    } else {
      // Handle end of questions, for example, display a message or reset the index
      console.log("End of questions");
    }
    // Reset the timer
    if (timerRef.current) {
      console.log("End of questions");
    }
  };

  return (
    <div>
      <Timer countdown={countdown} />
      <div>
        <h2>Question {currentQuestionIndex + 1}</h2>
        <p>{questions[currentQuestionIndex].questionText}</p>
        <ul style={{ textAlign: "center", paddingLeft: 0, listStyle: "none" }}>
          {questions[currentQuestionIndex].choices.map(
            (choice, choiceIndex) => (
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
            )
          )}
        </ul>
        <p>Answer: {questions[currentQuestionIndex].answer}</p>
      </div>
      <p>Score: {score}</p>
    </div>
  );
};

export default QuestionsForm;
