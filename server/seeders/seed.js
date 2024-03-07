const db = require('../config/connection');
const { User, Question } = require('../models');
const questionSeed = require('./question.json');
const userSeed = require('./userSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('User', 'users');
    await cleanDB('Question', 'questions')

    await User.create(userSeed);

    for (let i = 0; i < questionSeed.length; i++) {
      const { _id, questionAuthor } = await Question.create(questionSeed[i]);
      const user = await User.findOneAndUpdate(
        { username: questionAuthor },
        {
          $addToSet: {
            questions: _id,
          },
        }
      );
    }

    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});