const { ChatOpenAI } = require("@langchain/openai");
const { JsonOutputFunctionsParser } = require("langchain/output_parsers");
const { createStructuredOutputRunnable } =  require("langchain/chains/openai_functions");
const {buildPrompt, statsPrompt} = require("./promptBuilder");

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

async function sendStatsToGPT(stats, type) {
  const model = new ChatOpenAI({ modelName: process.env.MODEL_NAME});
  const prompt = await statsPrompt.format({ type: type, stats: JSON.stringify(stats)});

  const response = await model.invoke(prompt);
  
  return response.content;
}

module.exports = {
  sendRequestToGPT,
  sendStatsToGPT
};