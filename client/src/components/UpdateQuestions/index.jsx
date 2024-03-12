import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_QUESTION } from '../../utils/mutations';

const UpdateQuestion = ({ questionId, initialValues, onUpdateSuccess }) => {
  const [formState, setFormState] = useState(initialValues);

  const [updateQuestion] = useMutation(UPDATE_QUESTION);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await updateQuestion({
        variables: {
          questionId,
          questionText: formState.questionText,
          choices: formState.choices,
          answer: formState.answer,
        },
      });

      console.log('Question updated successfully:', data);

      if (onUpdateSuccess && typeof onUpdateSuccess === 'function') {
        onUpdateSuccess();
      }
    } catch (error) {
      console.error('Error updating question:', error.message);
    }
  };

  return (
    <div>
      <h2>Update Question</h2>
      <form onSubmit={handleSubmit}>


        <button type="submit">Update Question</button>
      </form>
    </div>
  );
};

export default UpdateQuestion;
