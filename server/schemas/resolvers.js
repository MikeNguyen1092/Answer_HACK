const { User, Question } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    questions: async () => {
      return Question.find();
    }
  },

  Mutation: {
    addUser: async (parent, { name, email, password }) => {
      const user = await User.create({ name, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addQuestion: async(_, {questionText, choices, answer}, context) => {
      if (context.user) {
        console.log(context.user)
        const question = await Question.create({
          questionText,
          choices,
          answer,
          questionAuthor: context.user.username
      });
      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { questions: question._id } }
      );

      return question
      }
      throw AuthenticationError;
    }
  }
};

  module.exports = resolvers;