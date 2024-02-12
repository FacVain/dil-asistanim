const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const petitionAnalysisSchema = new Schema({
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
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

function toneArrayLimit(val) {
  return val.length <= 3;
}

const PetitionAnalysis = mongoose.model('PetitionAnalysis', petitionAnalysisSchema);

module.exports = PetitionAnalysis;
