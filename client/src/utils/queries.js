import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query GetUser($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
      highScore
      questions {
        _id
        questionText
        choices
        answer
      }
    }
  }
`;

export const QUERY_QUESTION = gql`
query getQuestions {
  questions {
    questionText
    choices
    answer
  }
}
`

export const QUERY_SINGLE_Question = gql`
  query getSingleQuestion($questionId: ID!) {
    question(questionId: $questionId) {
      _id
      questionText
      questionAuthor
      createdAt

    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email

      question {
        _id
        questionText
        questionAuthor

        createdAt
      }
    }
  }
`;
