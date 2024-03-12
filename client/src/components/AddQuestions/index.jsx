import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_QUESTION } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries'



const AddQuestion = ({onSuccess}) => {
	const [formState, setFormState] = useState({
		questionText: '',
		choices: [],
		answer: '',
	});

	const [addQuestionForm, { error, data }] = useMutation(ADD_QUESTION, {
		refetchQueries: [{query: QUERY_ME}]
	});

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

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const { data } = await addQuestionForm({
				variables: {
					questionText: formState.questionText,
					choices: formState.choices,
					answer: formState.answer,
				},
			});

			console.log('Question added successfully:', data);
			if (onSuccess && typeof onSuccess === 'function') {
        onSuccess();
      }
      setFormState({
        questionText: '',
        choices: [],
        answer: '',
      });

		} catch (error) {
			console.error('Error adding question:', error.message);
		}
	};

	return (
		<main className="flex-row justify-center mb-4 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
		  <div className="col-12 col-lg-10">
			<div className="card">
			  <h4 className="card-header bg-dark text-light p-2 text-center">Add Question</h4>
			  <div className="card-body d-flex flex-column align-items-center">
				<form onSubmit={handleSubmit}>
				  <label>
					Question Text:
					<input
					  className="form-input"
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
					  <div key={index} className="mt-2">
						<input
						  className="form-input"
						  type="text"
						  value={choice}
						  onChange={(e) => handleChoiceChange(index, e.target.value)}
						/>
						<button
						  className="btn btn-danger btn-sm ml-2"
						  type="button"
						  onClick={() => handleRemoveChoice(index)}>
						  Remove
						</button>
					  </div>
					))}
					<button
					  className="btn btn-primary mt-2"
					  type="button"
					  onClick={handleAddChoice}>
					  Add Choice
					</button>
				  </label>
				  <br />
	
				  <label>
					Answer:
					<input
					  className="form-input"
					  type="text"
					  name="answer"
					  value={formState.answer}
					  onChange={handleChange}
					/>
				  </label>
				  <br />
	
				  <button className="btn btn-block btn-primary" type="submit">
					Add Question
				  </button>
				</form>
	
				{error && (
				  <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
				)}
			  </div>
			</div>
		  </div>
		</main>
	  );
};

export default AddQuestion;
