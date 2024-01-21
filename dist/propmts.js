"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dilekceprompt = exports.dilekceSchema = void 0;
const zod_1 = require("zod");
const prompts_1 = require("@langchain/core/prompts");
exports.dilekceSchema = zod_1.z.object({
    dilekce: zod_1.z.array(zod_1.z.object({
        sentiment: zod_1.z.string().describe('Sentiment analysis of text with values "positif", "negatif", "nötr"'),
        emotion: zod_1.z.string().describe('Emotion analysis with emotions "Öfkeli", "Üzgün", "Tedirgin", "Kendinden emin"'),
        missing_info: zod_1.z.string().describe('Missing information from user text if following informations does not exists in given text: "Adres bilgisi", "Yazanın ismi", "Tarih", "Arz ederim ile bitirme"'),
        correction: zod_1.z.string().describe("Write a better petition from user text by changing its language to more formal one and change negative and poorly written sentences")
    }))
        .describe("Outputs of dilekce."),
});
exports.dilekceprompt = new prompts_1.ChatPromptTemplate({
    promptMessages: [
        prompts_1.SystemMessagePromptTemplate.fromTemplate(`
        Do sentiment analysis with values "positif", "negatif", "nötr".
        Do emotion analysis with emotions "Öfkeli", "Üzgün", "Tedirgin", "Kendinden emin".
        Missing information from user text if following informations does not exists in given text: "Adres bilgisi", "Yazanın ismi", "Tarih", "Arz ederim ile bitirme".
        Write a better petition from user text by changing its language to more formal one and change negative and poorly written sentences.
        `),
        prompts_1.HumanMessagePromptTemplate.fromTemplate("{inputText}"),
    ],
    inputVariables: ["inputText"],
});
//# sourceMappingURL=propmts.js.map