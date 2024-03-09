import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_QUESTION } from '../../utils/mutations';
import { useNavigate } from 'react-router-dom';



const QuestionForm = () => {
	const [formState, setFormState] = useState({
		questionText: '',
		choices: [],
		answer: '',
	});

	const [addQuestion, { error, data }] = useMutation(ADD_QUESTION);

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	const handleAddChoice = () => {
		setFormState((prevState) => ({
			...prevState,
			choices: [...prevState.choices, ''], // Add an empty choice
		}));
	};

	const handleChoiceChange = (index, value) => {
		setFormState((prevState) => {
			const updatedChoices = [...prevState.choices];
			updatedChoices[index] = value;
			return {
				...prevState,
				choices: updatedChoices,
			};
		});
	};

	const handleRemoveChoice = (index) => {
		setFormState((prevState) => ({
			...prevState,
			choices: prevState.choices.filter((_, i) => i !== index),
		}));
	};

  const navigate = useNavigate();
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const { data } = await addQuestion({
				variables: {
					questionText: formState.questionText,
					choices: formState.choices,
					answer: formState.answer,
				},
			});

			console.log('Question added successfully:', data);
      setFormState({
        questionText: '',
        choices: [],
        answer: '',
      });
      navigate('/me');
		} catch (error) {

			console.error('Error adding question:', error.message);
		}
	};

	return (
		<div>
			<h2>Add Question</h2>
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
								onChange={(e) => handleChoiceChange(index, e.target.value)}
							/>
							<button
								type="button"
								onClick={() => handleRemoveChoice(index)}>
								Remove
							</button>
						</div>
					))}
					<button
						type="button"
						onClick={handleAddChoice}>
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

				<button type="submit">Add Question</button>
			</form>

			{error && <p>Error: {error.message}</p>}
		</div>
	);
};

export default QuestionForm;
