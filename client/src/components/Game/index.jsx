import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_QUESTION } from '../../utils/queries';

const QuestionsForm = () => {
  const { loading, error, data } = useQuery(QUERY_QUESTION);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const questions = data.questions;

  const handleNextQuestion = () => {
    // Check if there are more questions
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Handle end of questions, for example, display a message or reset the index
      console.log('End of questions');
      // You might want to reset the index to loop through questions again
      // setCurrentQuestionIndex(0);
    }
  };


  return (
    <div>
      <h2>Question {currentQuestionIndex + 1}</h2>
      <p>{questions[currentQuestionIndex].questionText}</p>
      <ul style={{ textAlign: 'center', paddingLeft: 0, listStyle: 'none' }}>
        {questions[currentQuestionIndex].choices.map((choice, choiceIndex) => (
          <li  key={choiceIndex}><button onClick={handleNextQuestion}style={{ background: 'none', border: 'none', padding: '0', margin: '0', cursor: 'pointer' }}>{choice}</button></li>
        ))}
      </ul>
      <p>Answer: {questions[currentQuestionIndex].answer}</p>
      
    </div>
  );
};

export default QuestionsForm;
