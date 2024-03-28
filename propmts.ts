import { z } from "zod";

import {
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
  } from "@langchain/core/prompts";
  

export const dilekceSchema = z.object({
    dilekce: z.array(
        z.object({
            sentiment: z.string().describe('Sentiment analysis of text with values "positif", "negatif", "nötr"'),
            emotion: z.string().describe('Emotion analysis with emotions "Öfkeli", "Üzgün", "Tedirgin", "Kendinden emin"'),
            missing_info: z.string().describe('Missing information from user text if following informations does not exists in given text: "Adres bilgisi", "Yazanın ismi", "Tarih", "Arz ederim ile bitirme"'),
            correction: z.string().describe("Write a better petition from user text by changing its language to more formal one and change negative and poorly written sentences")
        })
    )
    .describe("Outputs of dilekce."),
});

export const dilekceprompt = new ChatPromptTemplate({
    promptMessages: [
        SystemMessagePromptTemplate.fromTemplate(
        `
        Do sentiment analysis with values "positif", "negatif", "nötr".
        Do emotion analysis with emotions "Öfkeli", "Üzgün", "Tedirgin", "Kendinden emin".
        Missing information from user text if following informations does not exists in given text: "Adres bilgisi", "Yazanın ismi", "Tarih", "Arz ederim ile bitirme".
        Write a better petition from user text by changing its language to more formal one and change negative and poorly written sentences.
        `
        ),
        HumanMessagePromptTemplate.fromTemplate("{inputText}"),
    ],
    inputVariables: ["inputText"],
});