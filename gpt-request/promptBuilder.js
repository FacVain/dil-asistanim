const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const { ChatPromptTemplate } = require("@langchain/core/prompts");

const {
    commonSchema, commonSystemMessage,
    dilekceSchema,
    academicMailSchema, businessMailSchema,
} = require("./schemas");


function buildPrompt(req){
    let schema, systemMessage = commonSystemMessage;
    switch(req.body.type){
        case "dilekce":
            schema = zodToJsonSchema(dilekceSchema);
            break;
        case "serbestYazi":
            console
            const serbestSchema = commonSchema.merge(z.object({
                rewrittenTextFromUserText: z.string().describe(`Rewritten input text in a ${req.body.tone} tone`),
                suggestionForUserText: z.string().describe(`Detailed suggestions to user on how to communicate more effectively and in a ${req.body.tone} tone by analysing input text.`)
            }));
            systemMessage = `Fill fields of given function according to their descriptions and by extracting information from input text. Return answers in Turkish.
            Rewrite input text in a ${req.body.tone} tone and replace negative and poorly written sentences so the user can communicate more effectively
            Detailed suggestions to user on how to communicate more effectively and in a ${req.body.tone} tone by analysing input text.`;
            schema = zodToJsonSchema(serbestSchema);
            break;
        case "mail":
            if(req.body.mailType === "academic")
                schema = zodToJsonSchema(academicMailSchema);
            else if(req.body.mailType === "business")
                schema = zodToJsonSchema(businessMailSchema);
            break;
    }
    
    const prompt = ChatPromptTemplate.fromMessages([
            ["system", systemMessage],
            ["human", "{inputText}"]
        ]);
    return [prompt, schema];
}

const statsPrompt = ChatPromptTemplate.fromMessages([
    ["system", "Kullanıcının {type} yazı türünde yazdığı metinlerden elde edilen genel sentiment ve ton analizi istatistiklerini inceleyerek kullanıcının bu yazı türü için performansını değerlendir ve gelişimi için detaylı önerilerde bulun."],
    ["human", "{stats}"]
]);

module.exports = {
    buildPrompt,
    statsPrompt
};