import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
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

export const QUERY_THOUGHTS = gql`

  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;


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
