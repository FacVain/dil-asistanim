const { zodToJsonSchema } = require("zod-to-json-schema");

const { ChatOpenAI } =  require("@langchain/openai");
const { JsonOutputFunctionsParser } =  require("langchain/output_parsers");

const {
    dilekceSchema,
    dilekceprompt,
    dilekceRequired
} = require("./prompts");

const llm = new ChatOpenAI({ modelName: process.env.MODEL_NAME, temperature: 0 });

// Binding "function_call" below makes the model always call the specified function.
// If you want to allow the model to call functions selectively, omit it.
const functionCallingModel = llm.bind({
  functions: [
    {
      name: "output_formatter",
      description: "Should always be used to properly format output",
      parameters: zodToJsonSchema(dilekceSchema),
      required: dilekceRequired
    },
  ],
  function_call: { name: "output_formatter" },
});

const outputParser = new JsonOutputFunctionsParser();

const chain = dilekceprompt.pipe(functionCallingModel).pipe(outputParser);
async function sendRequestToGPT(query) {
    const response = await chain.invoke({
        inputText: query,
      });
      
      return JSON.stringify(response, null, 2);
}

module.exports = sendRequestToGPT;