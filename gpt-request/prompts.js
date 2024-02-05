const { z } = require("zod");
const {
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
} = require("@langchain/core/prompts");

const dilekceSchema = z.object({
    sentimentAnalysis: z.enum(["Pozitif", "Nötr", "Negatif"]).describe('Sentiment analysis of input text'),
    toneAnalysis: z.enum(["Kızgın", "Korku", "Mutlu", "Sürpriz", "Üzgün"]).describe('Tone analysis of input text.'),
    missingInformations: z.array(z.enum(["Başvurulan Makamın Adı", "Ad, Soyad", "Tarih", "Adres", "Arz ederim ile bitirme"]).describe('List given values that does not exists in input text')),
    improvedPetitionFromUserText: z.string().describe(`An improved petition using input text by changing its language to a more formal one and changing negative and poorly written sentences. 
    Your petition should include "Gereğini arz ederim." sentence,Name of the Authority Applied to, Name of the Petitioner, Date and Address of the petitioner.`),
    suggestion: z.string().describe("Detailed suggestions to user on how to write better petition by analysing input text.")
});

const prompt = new ChatPromptTemplate({
    promptMessages: [
        SystemMessagePromptTemplate.fromTemplate(
        `
        Fill fields of given function according to their descriptions and by extracting information from input text. Return answers in Turkish.
        `
        ),
        HumanMessagePromptTemplate.fromTemplate("{inputText}"),
    ],
    inputVariables: ["inputText"],
});

const dilekceRequired = ["sentimentAnalysis", "toneAnalysis", "missingInformations", "petitionFromUserText", "suggestion"]

module.exports = {
    prompt,
    dilekceSchema, dilekceRequired
};