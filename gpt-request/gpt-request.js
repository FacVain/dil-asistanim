const { zodToJsonSchema } = require("zod-to-json-schema");

const { ChatOpenAI } =  require("@langchain/openai");
const { JsonOutputFunctionsParser } =  require("langchain/output_parsers");

const {
    dilekceSchema,
    dilekceprompt,
} = require("./prompts");

const llm = new ChatOpenAI({ modelName: "gpt-3.5-turbo-1106", temperature: 0 });

// Binding "function_call" below makes the model always call the specified function.
// If you want to allow the model to call functions selectively, omit it.
const functionCallingModel = llm.bind({
  functions: [
    {
      name: "output_formatter",
      description: "Should always be used to properly format output",
      parameters: zodToJsonSchema(dilekceSchema),
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