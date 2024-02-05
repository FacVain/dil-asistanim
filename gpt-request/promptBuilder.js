const { zodToJsonSchema } = require("zod-to-json-schema");

const {
    dilekceSchema, dilekceRequired
} = require("./prompts");

function buildPrompt(req){
    const gptFunction = {
        functions: [
          {
            name: "output_formatter",
            description: "Should always be used to properly format output"
          },
        ],
        function_call: { name: "output_formatter" },
    };
    req.body.type = "dilekce"
    let parameters, required;
    switch(req.body.type){
        case "dilekce":
            parameters = zodToJsonSchema(dilekceSchema);
            required = dilekceRequired;
            break;
    }
    gptFunction.functions[0].parameters = parameters;
    gptFunction.functions[0].required = required;
    return gptFunction;
}

module.exports = buildPrompt;