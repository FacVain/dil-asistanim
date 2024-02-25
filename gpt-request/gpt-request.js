const { ChatOpenAI } = require("@langchain/openai");
const { JsonOutputFunctionsParser } = require("langchain/output_parsers");
const { createStructuredOutputRunnable } =  require("langchain/chains/openai_functions");
const buildPrompt = require("./promptBuilder");

const model = new ChatOpenAI({ modelName: process.env.MODEL_NAME, temperature: 0 });

async function sendRequestToGPT(req) {
  const [prompt, schema] = buildPrompt(req);

  const outputParser = new JsonOutputFunctionsParser();

  const runnable = createStructuredOutputRunnable({
    outputSchema: schema,
    llm: model,
    prompt,
    outputParser
  });

  const response = await runnable.invoke({
      inputText: req.body.userInput,
    });
    
  // console.log("Cevap: ", response)
  return response;
}

module.exports = sendRequestToGPT;