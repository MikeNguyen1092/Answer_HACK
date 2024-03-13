import { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import UserQuestions from "../components/UserQuestions";
import QuestionForm from "../components/QuestionForm";

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
    <main className="flex-row justify-center mb-4 d-flex justify-content-center align-items-center">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2 text-center">
            <button onClick={toggleAddQuestion}>
              {showAddQuestion ? "Hide Question Form" : "Add a Question"}
            </button>
          </h4>
          <div className="card-body d-flex flex-column align-items-center">
            {showAddQuestion && (
              <QuestionForm onSuccess={() => setShowAddQuestion(false)} />
            )}
            {showUpdateQuestion && selectedQuestion && (
              <QuestionForm
                initialValues={{
                  questionText: selectedQuestion.questionText,
                  choices: selectedQuestion.choices,
                  answer: selectedQuestion.answer,
                  questionId: selectedQuestion._id,
                }}
                onSuccess={() => setSelectedQuestion(null)}
              />
            )}
            <div className="mt-3">
              <UserQuestions
                questions={user.questions}
                onEditQuestion={toggleUpdateQuestion}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default User;
