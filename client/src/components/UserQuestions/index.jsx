import { useMutation } from '@apollo/client';
import { DELETE_QUESTION } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries'

const UserQuestions = ({ questions, onEditQuestion }) => {
  const [deleteQuestion] = useMutation(DELETE_QUESTION, {
		refetchQueries: [{query: QUERY_ME}]
	});

  const handleDeleteQuestion = async (questionId) => {
    try {
      await deleteQuestion({
        variables: { questionId },
      });

    } catch (error) {
      console.error('Error deleting question:', error.message);
    }
  };

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

        <button onClick={() => onEditQuestion(question)}>Edit</button>
      </div>
    ))}
  </div>
	);
};

export default UserQuestions;
