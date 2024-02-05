const { ChatOpenAI } = require("@langchain/openai");
const { JsonOutputFunctionsParser } = require("langchain/output_parsers");
const buildPrompt = require("./promptBuilder");

const llm = new ChatOpenAI({ modelName: process.env.MODEL_NAME, temperature: 0 });

async function sendRequestToGPT(req) {
  // Binding "function_call" below makes the model always call the specified function.
  const [gptFunction, prompt] = buildPrompt(req);
  const functionCallingModel = llm.bind(gptFunction);

  const outputParser = new JsonOutputFunctionsParser();
  const chain = prompt.pipe(functionCallingModel).pipe(outputParser);

  const response = await chain.invoke({
      inputText: req.body.userInput,
    });
    
  return response;
}

module.exports = sendRequestToGPT;