import React from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_QUESTION } from '../../utils/queries';

const QuestionsForm = () => {
  const { loading, error, data } = useQuery(QUERY_QUESTION);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const questions = data.questions;

  console.log('QuestionsForm component loaded successfully');

  return (
    <div>
      <h2>Questions</h2>
      {questions.map((question, index) => (
        <div key={index}>
          <p>{question.questionText}</p>
          <ul>
            {question.choices.map((choice, choiceIndex) => (
              <li key={choiceIndex}>{choice}</li>
            ))}
          </ul>
          <p>Answer: {question.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default QuestionsForm;
