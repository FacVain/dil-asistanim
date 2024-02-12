const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FreeTextAnalysisSchema = new Schema({
  type: {
    type: String,
    required: true,
    default: "serbestYazi"
  },
  tone: {
    type: String,
    required: true
  },
  userInput: {
    type: String,
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
        enum: ["Kızgın", "Korku", "Mutlu", "Sürpriz", "Üzgün", "Resmi", "Gayri Resmi", "İyimser", "Endişeli", "Samimi", "Meraklı", "İddialı"]
    }],
    validate: [toneArrayLimit, '{PATH} exceeds the limit of 3'], // Custom validator
    required: true
  },
  rewrittenTextFromUserText: {
    type: String,
    required: true
  },
  suggestionForUserText: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming your user model is named 'User'
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps automatically
});

function toneArrayLimit(val) {
    return val.length <= 3;
}

const FreeTextAnalysis = mongoose.model('FreeTextAnalysis', FreeTextAnalysisSchema);

module.exports = FreeTextAnalysis;
