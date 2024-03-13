import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const ADD_USER = gql`
	mutation addUser($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const ADD_QUESTION = gql`
mutation addQuestion($questionText: String, $choices: [String], $answer: String) {
  addQuestion(questionText: $questionText, choices: $choices, answer: $answer) {
    _id
    questionText
    choices
    answer
    questionAuthor
  }
}
`;

export const DELETE_QUESTION = gql`
  mutation deleteQuestion($questionId: ID!) {
    deleteQuestion(questionId: $questionId) {
      _id
    }
  }
`;

export const UPDATE_QUESTION = gql`
mutation updateQuestion($questionId: ID!, $questionText: String, $choices: [String], $answer: String) {
  updateQuestion(questionId: $questionId, questionText: $questionText, choices: $choices, answer: $answer) {
    _id
    answer
    choices
    questionAuthor
    questionText
  }
}
`;


export const SUBMIT_SCORE_MUTATION = gql`
  mutation SubmitScore($userId: ID!, $score: Int!) {
    submitScore(userId: $userId, score: $score) {
   success
   message
    }
  }
`;