import { useState, useRef, useEffect, useCallback } from "react";
import Timer from "../Timer";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_QUESTION, UPDATE_HIGH_SCORE } from "../../utils/queries";

import startQuizAudio from "../../assets/audio/MusicaDeCirco-BennyHill.mp3";




const QuestionsForm = () => {
  const { loading, error, data } = useQuery(QUERY_QUESTION);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const timerRef = useRef(null);
  const [countdown, setCountdown] = useState(20);
  const intervalRef = useRef(null);
  const [userChoice, setUserChoice] = useState("");
  const [score, setScore] = useState(0);
  const [quizOver, setQuizOver] = useState(false);
  const { questions } = data || {};

  const [updateHighScoreMutation] = useMutation(UPDATE_HIGH_SCORE);

  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (!quizStarted) {
      const audio = new Audio(startQuizAudio);
      audio.play();
      setQuizStarted(true);
    }
  }, [quizStarted]);



  useEffect(() => {
    if (questions && questions.length > 0) {
      // Shuffle the questions array to get random questions
      const shuffledQuestions = questions
        .slice()
        .sort(() => Math.random() - 0.5);
      setCurrentQuestionIndex(0);
      setScore(0);
      setCountdown(20);
      setQuizOver(false);
    }
  }, [questions]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCountdown(20);
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
          return 20;
        }
        return prevCountdown - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef);
  }, [currentQuestionIndex, handleNextQuestion]);

  // Update score whenever it changes
  useEffect(() => {
    console.log("Current question index:", currentQuestionIndex);
    if (currentQuestionIndex >= 10) {
      setQuizOver(true);
    }
  }, [score, currentQuestionIndex]);
  if (quizOver) {

    return <p style={{textAlign:'center', fontSize: '4rem', marginTop: '200px'}}>Your score is {score}!!</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const handleChoiceClick = (choice) => {
    setUserChoice(choice);

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
    // Update high score mutation
    updateHighScoreMutation({
      variables: { userId: 'yourUserId', highScore: score }, // Pass user ID and current score
    }).then(() => {
      console.log('High score updated successfully');
    }).catch((error) => {
      console.error('Error updating high score:', error);
    });


    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCountdown(20);
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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Timer countdown={countdown} />
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <p>{questions[currentQuestionIndex].questionText}</p>
      </div>
      <ul style={{ textAlign: "center", paddingLeft: 0, listStyle: "none", display: "grid", gap: "10px", gridTemplateColumns: "repeat(2, 1fr)" }}>
        {questions[currentQuestionIndex].choices.map((choice, choiceIndex) => (
          <li key={choiceIndex}>
            <button
              onClick={() => handleChoiceClick(choice)}
              style={{
                background: "none",
                border: "none",
                padding: "10px",
                margin: "0",
                cursor: "pointer",
                width: "100%", 
              }}
            >
              {choice}
            </button>
          </li>
        ))}
      </ul>
      <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <p style={{ fontSize: "30px" }}>Player 1</p>
        <p style={{ fontSize: "30px", fontWeight: "bold" }}>{score}</p>
      </div>
    </div>
  );
};
export default QuestionsForm;