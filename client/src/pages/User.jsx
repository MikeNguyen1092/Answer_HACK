import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import UserQuestions from '../components/UserQuestions';
import QuestionForm from '../components/AddQuestions'; // Assuming you have a separate QuestionForm component

const User = () => {
  const { loading, data, error } = useQuery(QUERY_ME);
  const [showQuestionForm, setShowQuestionForm] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data?.me;

  const toggleQuestionForm = () => {
    setShowQuestionForm((prev) => !prev);
  };

  return (
    <main className="flex-row justify-center mb-4 d-flex justify-content-center align-items-center">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2 text-center">
            {showQuestionForm ? 'Hide Question Form' : 'Add a Question'}
          </h4>
          <div className="card-body d-flex flex-column align-items-center">
            {showQuestionForm ? (
              <form>
                <QuestionForm />
              </form>
            ) : (
              <UserQuestions questions={user.questions} />
            )}

            <div className="mt-3">
              <button className="btn btn-block btn-primary" onClick={toggleQuestionForm}>
                {showQuestionForm ? 'Hide Question Form' : 'Add a Question'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default User;