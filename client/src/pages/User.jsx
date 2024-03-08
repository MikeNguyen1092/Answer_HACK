import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import Auth from '../utils/auth';

const User = () => {
	const { userId: userParam } = useParams();


	const { loading, error, data } = useQuery(QUERY_USER, {
		variables: { userId: userParam },
	});

	if (Auth.loggedIn && Auth.getProfile().authenticatedPerson.username === userParam) {
		return <Navigate to="/home" />;
	}

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	const user = data.user;

	return (
		<div>
			<h1>{user.username}'s Profile</h1>
			<h2>Questions</h2>
			{user.questions.map((question, index) => (
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

export default User;
