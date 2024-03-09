const UserQuestions = ({ questions }) => (
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

export default UserQuestions;
