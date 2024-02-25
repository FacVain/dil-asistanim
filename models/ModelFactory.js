const mongoose = require('mongoose');

const FreeTextAnalysis = require("./SerbestYazi")
const MailAnalysis = require("./Mail")
const PetitionAnalysis = require("./Dilekce")

function getModelByType(type) {
    const typeModelMapping = {
      serbestYazi: FreeTextAnalysis,
      mail: MailAnalysis,
      dilekce: PetitionAnalysis,
      // ... other mappings
    };
  
    return typeModelMapping[type]; // Default to FreeTextAnalysis if type is not found
  }

module.exports = getModelByType