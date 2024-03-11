import React from 'react';
import { useState } from 'react'
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import UserQuestions from '../components/UserQuestions';
import AddQuestion  from '../components/AddQuestions';

const User = () => {
	const { loading, data, error } = useQuery(QUERY_ME);
	const [showAddQuestion, setShowAddQuestion] = useState(false);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	const user = data?.me;

	const toggleAddQuestion = () => {
    setShowAddQuestion((prev) => !prev);
	};
	
	return (
    <div>
      <button onClick={toggleAddQuestion}>
        {showAddQuestion ? 'Hide Question Form' : 'Add a Question'}
      </button>
      
      {showAddQuestion ? (
        <AddQuestion onSuccess={() => setShowAddQuestion(false)}/>
      ) : (
        <UserQuestions questions={user.questions} />
      )}
    </div>
	);
			
};

export default User;
