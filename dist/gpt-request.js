"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const zod_to_json_schema_1 = require("zod-to-json-schema");
const openai_1 = require("@langchain/openai");
const output_parsers_1 = require("langchain/output_parsers");
const prompts_1 = require("@langchain/core/prompts");
const propmts_1 = require("./propmts");
const zodSchema = zod_1.z.object({
    foods: zod_1.z
        .array(zod_1.z.object({
        name: zod_1.z.string().describe("The name of the food item"),
        healthy: zod_1.z.boolean().describe("Whether the food is good for you"),
        color: zod_1.z.string().optional().describe("The color of the food"),
    }))
        .describe("An array of food items mentioned in the text"),
});
const prompt = new prompts_1.ChatPromptTemplate({
    promptMessages: [
        prompts_1.SystemMessagePromptTemplate.fromTemplate("List all food items mentioned in the following text."),
        prompts_1.HumanMessagePromptTemplate.fromTemplate("{inputText}"),
    ],
    inputVariables: ["inputText"],
});
const llm = new openai_1.ChatOpenAI({ modelName: "gpt-3.5-turbo-1106", temperature: 0 });
// Binding "function_call" below makes the model always call the specified function.
// If you want to allow the model to call functions selectively, omit it.
const functionCallingModel = llm.bind({
    functions: [
        {
            name: "output_formatter",
            description: "Should always be used to properly format output",
            parameters: (0, zod_to_json_schema_1.zodToJsonSchema)(propmts_1.dilekceSchema),
        },
    ],
    function_call: { name: "output_formatter" },
});
const outputParser = new output_parsers_1.JsonOutputFunctionsParser();
const chain = propmts_1.dilekceprompt.pipe(functionCallingModel).pipe(outputParser);
function sendRequestToGPT() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield chain.invoke({
            inputText: "Gönderilen üründen hiç memnun kalmadım. Bu firmadan bir daha asla ürün almam. Rezalet bir müşteri hizmetleri var. Lütfen bu ürünü değiştirin.",
        });
        return JSON.stringify(response, null, 2);
    });
}
module.exports = sendRequestToGPT;
//# sourceMappingURL=gpt-request.js.map