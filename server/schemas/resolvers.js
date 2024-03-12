const { User, Question } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
	Query: {
		users: async () => {
			return User.find();
		},

		user: async (parent, { userId }) => {
			const user = await User.findOne({ _id: userId }).populate('highScore').populate({
				path: 'questions',
				model: 'Question'
			});
			if (!user) {
				throw new Error('No user with that ID');
			}
			return user;
		},
		// By adding context to our query, we can retrieve the logged in user without specifically searching for them
		questions: async () => {
			//fetch all questions
			const allQuestions= await Question.find();

			//shuffle the array for random questions
			const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
			return shuffledQuestions;

		},
		question: async (parent, { questionId }) => {
			const question = Question.findOne({ _id: questionId });
			if (!question) {
				throw new Error('No question with that ID');
			}
			return question;
		},
		me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('questions');
      }
      throw AuthenticationError;
    },
	},

	Mutation: {
		addUser: async (parent, { username, email, password, highScore }) => {
			const user = await User.create({ username, email, password, highScore });
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
		addQuestion: async (_, { questionText, choices, answer }, context) => {
			if (context.user) {
				const question = await Question.create({
					questionText,
					choices,
					answer,
					questionAuthor: context.user.username,
				});
				await User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { questions: question._id } });

				return question;
			}
			throw AuthenticationError;
		},

		deleteQuestion: async (_, { questionId }) => {
      const deletedQuestion = await Question.findByIdAndDelete(questionId);

      return deletedQuestion;
    },

		updateQuestion: async (_, { questionId, questionText, choices, answer }, context) => {
			if (context.user) {

				const question = await Question.findById(questionId);
	
				if (!question) {
					throw new Error('No question with that ID');
				}

				// Update the question
				const updatedQuestion = await Question.findByIdAndUpdate(
					questionId,
					{ questionText, choices, answer },
					{ new: true }
				);
	
				return updatedQuestion;
			}
	
			throw AuthenticationError;
		},
	},
};

module.exports = resolvers;
