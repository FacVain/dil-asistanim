const { z } = require("zod");

commonSchema = z.object({
    sentimentAnalysis: z.enum(["Pozitif", "Nötr", "Negatif"]).describe('Sentiment analysis of input text'),
    toneAnalysis: z.array(z.enum(["Kızgın", "Korku", "Mutlu", "Sürpriz", "Üzgün", "Resmi", "Gayri Resmi", "İyimser", "Endişeli", "Samimi", "Meraklı", "İddialı",  
                                  "Teşvik Edici", "İşbirliği"])).length(3).describe('Tone analysis of input text. Return top 3 tones.'),
});

const commonSystemMessage = `Fill fields of given function according to their descriptions and by extracting information from input text. You must return your answers in Turkish.`

const dilekceSchema = commonSchema.merge(z.object({
    //missingInformationsInUserText: z.array(z.enum(["Başvurulan Makamın Adı", "Ad ve Soyad", "Tarih", "Adres"])).describe('Informations that is not included in input text'),
    improvedPetitionFromUserText: z.string().describe(`Write An improved petition using input text by changing its language to a more formal one and changing negative and poorly written sentences.
    Correct user grammar errors. You should also improve the clarity and professionalism of the petition. Your petition should include "Gereğini arz ederim" phrase,Name of the Authority Applied to, Name of the Petitioner, Date and Address of the petitioner.`),
    suggestionForUserText: z.string().describe("Detailed suggestions to user on how to write better petitions by analysing input text. Add evaluation of the tone analysis to your suggestions.")
}));


const academicMailSchema = commonSchema.merge(z.object({
    improvedMailFromUserText: z.string().describe(`Write An improved academic e-mail using input text by improving its academic tone, clarity, and professionalism. Correct user grammar errors and change negative and poorly written sentences in user text.
    Your E-mail should include salutation, Full name of the writer and Contact information of the writer. Yazacağın Epostanın ilk satırında postanın konusunu Konu: şeklinde belirt.`),
    suggestionForUserText: z.string().describe("Detailed suggestions to user on how to write better academic e-mails by analysing input text. Add evaluation of the tone analysis to your suggestions.")
}));


const businessMailSchema = commonSchema.merge(z.object({
    improvedMailFromUserText: z.string().describe(`Write An improved business e-mail using input text by improving its business tone, clarity, and professionalism. Correct user grammar errors and change negative and poorly written sentences in user text.
    Your E-mail should include salutation, Full name of the writer and Contact information of the writer. Yazacağın Epostanın ilk satırında postanın konusunu Konu: şeklinde belirt.`),
    suggestionForUserText: z.string().describe("Detailed suggestions to user on how to write better business e-mails by analysing input text. Add evaluation of the tone analysis to your suggestions.")
}));



module.exports = {
    commonSchema, commonSystemMessage,
    dilekceSchema,
    academicMailSchema, businessMailSchema,
};