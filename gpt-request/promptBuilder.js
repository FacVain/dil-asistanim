const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const {
    commonSchema,
    dilekceSchema, dilekceRequired,
    serbestRequired
} = require("./schemas");

const {
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
} = require("@langchain/core/prompts");

function buildPrompt(req){
    
    req.body.type = "dilekce"
    req.body.tone = "Mutlu"
    let parameters, required, systemMessage;
    switch(req.body.type){
        case "dilekce":
            systemMessage = "Fill fields of given function according to their descriptions and by extracting information from input text. Return answers in Turkish.";
            parameters = zodToJsonSchema(dilekceSchema);
            required = dilekceRequired;
            break;
        case "serbestYazi":
            const serbestSchema = commonSchema.merge(z.object({
                rewrittenTextFromUserText: z.string().describe(`Rewritten input text in a ${req.body.tone} tone`),
                suggestion: z.string().describe(`Detailed suggestions to user on how to communicate more effectively and in a ${req.body.tone} tone by analysing input text.`)
            }));
            systemMessage = `Fill fields of given function according to their descriptions and by extracting information from input text. Return answers in Turkish.
            Rewrite input text in a ${req.body.tone} tone and replace negative and poorly written sentences so the user can communicate more effectively
            Detailed suggestions to user on how to communicate more effectively and in a ${req.body.tone} tone by analysing input text.`;
            parameters = zodToJsonSchema(serbestSchema);
            required = serbestRequired;
            break;
    }

    const gptFunction = {
        functions: [
          {
            name: "output_formatter",
            description: "Should always be used to properly format output",
            parameters: parameters,
            required: required
          },
        ],
        function_call: { name: "output_formatter" },
    };
    
    const prompt = new ChatPromptTemplate({
        promptMessages: [
            SystemMessagePromptTemplate.fromTemplate(systemMessage),
            HumanMessagePromptTemplate.fromTemplate("{inputText}"),
        ],
        inputVariables: ["inputText"],
    });

    return [gptFunction, prompt];
}

module.exports = buildPrompt;