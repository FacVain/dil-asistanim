const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { ToneEnum } = require("../config/constants");

const petitionAnalysisSchema = new Schema({
  type: {
    type: String,
    required: true,
    default: "dilekce"
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
      enum: ToneEnum
    }],
    validate: [toneArrayLimit, '{PATH} exceeds the limit of 3'], // Custom validator
    required: true
  },
  missingInformationsInUserText: {
    type: [{
      type: String,
      enum: ['Başvurulan Makamın Adı', 'Ad, Soyad', 'Tarih', 'Adres', 'Arz ederim ile bitirme']
    }],
    default: []
  },
  improvedPetitionFromUserText: {
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

const PetitionAnalysis = mongoose.model('PetitionAnalysis', petitionAnalysisSchema);

module.exports = PetitionAnalysis;
