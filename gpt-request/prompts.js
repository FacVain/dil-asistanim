const { z } = require("zod");
const {
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
} =  require("@langchain/core/prompts");

const dilekceSchema = z.object({
    dilekce:
        z.object({
            sentimentAnalysis: z.enum(["Pozitif", "Nötr", "Negatif"]).describe('Sentiment analysis of input text'),
            toneAnalysis: z.enum(["Kızgın", "Korku", "Mutlu", "Sürpriz", "Üzgün"]).describe('Tone analysis of input text.'),
            missingInformations: z.array(z.enum(["Adres bilgisi", "Yazanın ismi", "Tarih", "Arz ederim ile bitirme"]).describe('List given values that does not exists in input text')),
            correctionOfUserText: z.string().describe("Better petition from user text"),
            suggestion: z.string().describe("Suggestions to user on how to write better pettion")
        }) 
    .describe("Fields of Petition will be filled from given input text"),
});

const dilekceprompt = new ChatPromptTemplate({
    promptMessages: [
        SystemMessagePromptTemplate.fromTemplate(
        `
        Fill fields of given function according to their descriptions and by extracting information from user text. Return answers in Turkish.
        Write a better petition from user text to by changing its language to more formal one and change negative and poorly written sentences.
        Write detailed suggestions to user on how to write better pettion by analysing input text
        `
        ),
        HumanMessagePromptTemplate.fromTemplate("{inputText}"),
    ],
    inputVariables: ["inputText"],
});

const dilekceRequired = ["sentimentAnalysis", "toneAnalysis", "missingInformations", "correctionOfUserText", "suggestion"]

module.exports = {dilekceSchema, dilekceprompt, dilekceRequired};