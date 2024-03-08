
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
//import { ADD_QUESTION } from '../utils/mutations'

const User = () => {
	const { loading, data, error } = useQuery(QUERY_ME);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	const user = data?.me;
	

	return (
		<div>
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
