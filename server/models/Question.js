const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
  questionText: {
    type: String,
  },
  choices: [{
    type: String, 
  }],
  answer: {
    type: String
  },
  questionAuthor:{
    type: String,
    trim: true, 
  }
});

const Question = model('Question', questionSchema);

module.exports = Question;