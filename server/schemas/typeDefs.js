const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    highScore: Int
    questions: [Question]
  }

  type Question {
    _id: ID
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
    user(userId: ID!): User
    questions: [Question]
    question(questionId: ID!): Question
    me: User
  }

  type Mutation {

    addUser(
      username: String!, 
      email: String!, 
      password: String!)
      : Auth
    login(
      email: String!, 
      password: String!)
      : Auth
    addQuestion(
      questionText: String, 
      choices: [String], 
      answer: String)
      : Question
    deleteQuestion(
      questionId: ID!)
      : Question
    updateQuestion(
      questionId: ID!
      questionText: String
      choices: [String]
      answer: String
    ): Question
  }
`;
module.exports = typeDefs;
