require('dotenv').config();
const express = require('express');
const axios = require('axios');

const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });  
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Endpoint to handle queries to the OpenAI API
app.post('/ask', async (req, res) => {
    const query = req.body.query;
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": query
        }
      ],
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.json(response.choices[0].message.content);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
