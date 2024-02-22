import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

import { ChatOpenAI } from "@langchain/openai";
import { JsonOutputFunctionsParser } from "langchain/output_parsers";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "@langchain/core/prompts";

import {
    dilekceSchema,
    dilekceprompt,
} from "./propmts";

const zodSchema = z.object({
  foods: z
    .array(
      z.object({
        name: z.string().describe("The name of the food item"),
        healthy: z.boolean().describe("Whether the food is good for you"),
        color: z.string().optional().describe("The color of the food"),
      })
    )
    .describe("An array of food items mentioned in the text"),
});

const prompt = new ChatPromptTemplate({
  promptMessages: [
    SystemMessagePromptTemplate.fromTemplate(
      "List all food items mentioned in the following text."
    ),
    HumanMessagePromptTemplate.fromTemplate("{inputText}"),
  ],
  inputVariables: ["inputText"],
});

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
async function sendRequestToGPT() {
    const response = await chain.invoke({
        inputText: "Gönderilen üründen hiç memnun kalmadım. Bu firmadan bir daha asla ürün almam. Rezalet bir müşteri hizmetleri var. Lütfen bu ürünü değiştirin.",
      });
      
      return JSON.stringify(response, null, 2);
}

module.exports = sendRequestToGPT;