const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
  question: {
    type: String,
  },
  choices: [{
    type: String, 
  }],
  answer: {
    type: String
  }
});

const Question = model('Question', questionSchema);

module.exports = Question;