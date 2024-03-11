import React from 'react';
import { useState } from 'react'
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import UserQuestions from '../components/UserQuestions';
import QuestionForm  from '../components/AddQuestions';

const User = () => {
	const { loading, data, error } = useQuery(QUERY_ME);
	const [showQuestionForm, setShowQuestionForm] = useState(false);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	const user = data?.me;

	const toggleQuestionForm = () => {
    setShowQuestionForm((prev) => !prev);
	};
	
	return (
    <div>
      <button onClick={toggleQuestionForm}>
        {showQuestionForm ? 'Hide Question Form' : 'Add a Question'}
      </button>
      
      {showQuestionForm ? (
        <QuestionForm />
      ) : (
        <UserQuestions questions={user.questions} />
      )}
    </div>
	);
			
};

export default User;
