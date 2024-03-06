const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Question {
    questionText: String
    choices: [String]
    answer: String
    questionAuthor: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    questions: [Question]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addQuestion(questionText: String, choices: [String], answer: String): Question
  }
`;
module.exports = typeDefs;
