import { useState, useRef, useEffect } from 'react';
import Timer from '../Timer';
import { useQuery } from '@apollo/client';
import { QUERY_QUESTION } from '../../utils/queries';

const QuestionsForm = () => {
  const { loading, error, data } = useQuery(QUERY_QUESTION);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const timerRef = useRef(null);
  const [countdown, setCountdown] = useState(10);
  const intervalRef = useRef(null);
  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 0) {
          clearInterval(intervalRef.current);
          return 10;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };
 // Run once on mount and clean up on unmount
 useEffect(() => {
  startTimer();
}, []); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const questions = data.questions;
  

  const stopTimer = () => {
    clearInterval(intervalRef.current);
  };

  

  const handleNextQuestion = () => {
   //stop the timer
  stopTimer();
   
   
    //get the score

    //go to next question

    //restart the timer
    //startTimer();
    // Check if there are more questions
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      console.log(currentQuestionIndex);
    } else {
      // Handle end of questions, for example, display a message or reset the index
      console.log('End of questions');
      // You might want to reset the index to loop through questions again
      // setCurrentQuestionIndex(0);
    }
    // Reset the timer
    if (timerRef.current) {
      timerRef.current.resetTimer();
    }
  };

  return (
    <div>
      <Timer countdown={countdown} resetTimer={() => handleNextQuestion()} ref={timerRef} /> {/* Render the Timer component */}
      <h2>Question {currentQuestionIndex + 1}</h2>
      <p>{questions[currentQuestionIndex].questionText}</p>
      <ul style={{ textAlign: 'center', paddingLeft: 0, listStyle: 'none' }}>
        {questions[currentQuestionIndex].choices.map((choice, choiceIndex) => (
          <li key={choiceIndex}><button onClick={handleNextQuestion} style={{ background: 'none', border: 'none', padding: '0', margin: '0', cursor: 'pointer' }}>{choice}</button></li>
        ))}
      </ul>
      <p>Answer: {questions[currentQuestionIndex].answer}</p>
    </div>
  );
};

export default QuestionsForm;