const { z } = require("zod");

commonSchema = z.object({
    sentimentAnalysis: z.enum(["Pozitif", "Nötr", "Negatif"]).describe('Sentiment analysis of input text'),
    toneAnalysis: z.array(z.enum(["Kızgın", "Korku", "Mutlu", "Sürpriz", "Üzgün", "Resmi", "Gayri Resmi", "İyimser", "Endişeli", "Samimi", "Meraklı", "İddialı",  
                                  "Teşvik Edici", "İşbirliği"])).describe('Tone analysis of input text. Return top 3 tones.'),
});

const dilekceSchema = commonSchema.merge(z.object({
    missingInformationsInUserText: z.array(z.enum(["Başvurulan Makamın Adı", "Ad ve Soyad", "Tarih", "Adres", "Arz ederim ifadesi"])).describe('Return information that is not included in input text'),
    improvedPetitionFromUserText: z.string().describe(`An improved petition using input text by changing its language to a more formal one and changing negative and poorly written sentences. 
    Your petition should include "Gereğini arz ederim." sentence,Name of the Authority Applied to, Name of the Petitioner, Date and Address of the petitioner.`),
    suggestionForUserText: z.string().describe("Detailed suggestions to user on how to write better petition by analysing input text.")
}));

const dilekceSystemMessage = `Fill fields of given function according to their descriptions and by extracting information from input text. Return answers in Turkish.
Write An improved petition using input text by changing its language to a more formal one and changing negative and poorly written sentences.
Your petition should include "Gereğini arz ederim" phrase, Name of the Authority Applied to, Name of the Petitioner, Date and Address of the petitioner.
Write Detailed suggestions to user on how to write better petition by analysing input text.
`

const dilekceRequired = ["sentimentAnalysis", "toneAnalysis", "missingInformationsInUserText", "improvedPetitionFromUserText", "suggestionForUserText"];
const serbestRequired = ["sentimentAnalysis", "toneAnalysis", "rewrittenTextFromUserText", "suggestionForUserText"];

module.exports = {
    commonSchema,
    dilekceSchema, dilekceSystemMessage, dilekceRequired,
    serbestRequired
};