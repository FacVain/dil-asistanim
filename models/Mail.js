const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { ToneEnum } = require("../config/constants");

const mailAnalysisSchema = new Schema({
  type: {
    type: String,
    required: true,
    default: "mail"
  },
  userInput: {
    type: String,
    required: true
  },
  mailType: {
    type: String,
    enum: ['academic', 'business'],
    required: true
  },
  sentimentAnalysis: {
    type: String,
    enum: ['Pozitif', 'Nötr', 'Negatif'],
    required: true
  },
  toneAnalysis: {
    type: [{
      type: String,
      enum: ToneEnum
    }],
    validate: [toneArrayLimit, '{PATH} exceeds the limit of 3'], // Custom validator
    required: true
  },
  improvedMailFromUserText: {
    type: String,
    required: true
  },
  suggestionForUserText: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

function toneArrayLimit(val) {
  return val.length <= 3;
}

const MailAnalysis = mongoose.model('MailAnalysis', mailAnalysisSchema);

module.exports = MailAnalysis;
