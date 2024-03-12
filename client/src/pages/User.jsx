import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import UserQuestions from '../components/UserQuestions';
import QuestionForm from '../components/QuestionForm';

const User = () => {
	const { loading, data, error } = useQuery(QUERY_ME);
	const [showAddQuestion, setShowAddQuestion] = useState(false);
	const [showUpdateQuestion, setShowUpdateQuestion] = useState(false);
	const [selectedQuestion, setSelectedQuestion] = useState(null);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error.message}</p>;

	const user = data?.me;

	const toggleAddQuestion = () => {
		setShowAddQuestion((prev) => !prev);
		setShowUpdateQuestion(false);
		setSelectedQuestion(null);
	};

	const toggleUpdateQuestion = (question) => {
		setShowUpdateQuestion(true);
		setSelectedQuestion(question);
		setShowAddQuestion(false);
	};

	return (
		<div>
			<button onClick={toggleAddQuestion}>{showAddQuestion ? 'Hide Question Form' : 'Add a Question'}</button>
			{showAddQuestion && <QuestionForm onSuccess={() => setShowAddQuestion(false)} />}
			{showUpdateQuestion && selectedQuestion && (
				<QuestionForm
					initialValues={{
						questionText: selectedQuestion.questionText,
						choices: selectedQuestion.choices,
						answer: selectedQuestion.answer,
					}}
					onSuccess={() => setSelectedQuestion(null)}
				/>
			)}
			<UserQuestions
				questions={user.questions}
				onEditQuestion={toggleUpdateQuestion}
			/>
		</div>
	);
};

export default User;
