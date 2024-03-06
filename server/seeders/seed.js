const db = require('../config/connection');
const { User, Question } = require('../models');
const questionSeed = require('./question.json');
const userSeed = require('./userSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('User', 'users');

    await User.create(userSeed);
    await Question.create(questionSeed)

    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});