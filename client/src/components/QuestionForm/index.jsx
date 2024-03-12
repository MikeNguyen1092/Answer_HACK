import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_QUESTION, UPDATE_QUESTION } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const QuestionForm = ({ initialValues, onSuccess }) => {
	const [formState, setFormState] = useState({
		questionText: '',
		choices: [],
		answer: '',
	});
	const [action, setAction] = useState('add');
	const [mutationFunction, setMutationFunction] = useState(ADD_QUESTION);

	useEffect(() => {
		if (initialValues) {
			setFormState(initialValues);
			setAction('update');
		} else {
			setFormState({
				questionText: '',
				choices: [],
				answer: '',
			});
			setAction('add');
		}
	}, [initialValues]);

	const [performMutation, { error }] = useMutation(mutationFunction);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const { data } = await performMutation({
				variables: {
					...(action === 'update' ? { questionId: initialValues._id } : {}),
					...formState,
				},
				refetchQueries: [{ query: QUERY_ME }],
			});
			console.log('Question', action === 'update' ? 'updated' : 'added', 'successfully:', data);
			if (typeof onSuccess === 'function') {
				onSuccess();
			}
			// Reset form state if adding a new question
			if (action === 'add') {
				setFormState({
					questionText: '',
					choices: [],
					answer: '',
				});
			}
		} catch (error) {
			console.error('Error', action === 'update' ? 'updating' : 'adding', 'question:', error.message);
		}
	};

	return (
		<div>
			<h2>{action === 'add' ? 'Add Question' : 'Update Question'}</h2>
			<form onSubmit={handleSubmit}>
				<label>
					Question Text:
					<input
						type="text"
						name="questionText"
						value={formState.questionText}
						onChange={handleChange}
					/>
				</label>
				<br />

				<label>
					Choices:
					{formState.choices.map((choice, index) => (
						<div key={index}>
							<input
								type="text"
								value={choice}
								onChange={(e) =>
									setFormState((prevState) => ({
										...prevState,
										choices: prevState.choices.map((c, i) => (i === index ? e.target.value : c)),
									}))
								}
							/>
						</div>
					))}
					<button
						type="button"
						onClick={() =>
							setFormState((prevState) => ({
								...prevState,
								choices: [...prevState.choices, ''],
							}))
						}>
						Add Choice
					</button>
				</label>
				<br />

				<label>
					Answer:
					<input
						type="text"
						name="answer"
						value={formState.answer}
						onChange={handleChange}
					/>
				</label>
				<br />

				<button type="submit">{action === 'add' ? 'Add Question' : 'Update Question'}</button>
				{action === 'update' && (
					<button
						type="button"
						onClick={() => setAction('add')}>
						Cancel Update
					</button>
				)}
			</form>

			{error && <p>Error: {error.message}</p>}
		</div>
	);
};
export default QuestionForm;
