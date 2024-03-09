const router = require('express').Router();

const getModelByType = require('../models/ModelFactory');
const { isLoggedIn } = require('../middlewares/authMiddleware')

const {sendRequestToGPT, sendStatsToGPT} = require('../gpt-request/gpt-request');
const sendRequestToXMLRoBERTa = require('../xmlroberta-request/roberta-request');

const { fetchStats } = require('../helpers/analysisHelpers');

router.post('/query', isLoggedIn, async (req, res) => {
    try {
        // Send the query to OpenAI's API
        const gptResponse = await sendRequestToGPT(req);
        const robertaResponse = await sendRequestToXMLRoBERTa(req);
        const userId = req.user.id; // Retrieve the user ID from the session
    
    
        // Merge the request body and the GPT-3 response
        const documentData = {
            ...req.body, // this will spread the type, tone, and userInput fields
            ...gptResponse, // this will spread the sentimentAnalysis, toneAnalysis, rewrittenTextFromUserText, and suggestionForUserText fields
            user: userId // Add the user's ID as a foreign key reference
        };
    
        // Determine the correct model based on the input type
        const AnalysisModel = getModelByType(req.body.type);
    
        // Create a new document using the dynamic model
        const newTextAnalysis = new AnalysisModel(documentData);
    
        // Save the document to the database
        newTextAnalysis.save();
    
        res.json({ robertaResponse: robertaResponse, gptResponse: gptResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/history', isLoggedIn, async (req, res) => {
    try {
        const userId = req.user.id;
        const AnalysisModel = getModelByType(req.body.type);
        const stats = await fetchStats(AnalysisModel, userId);
        
        const gptResponse = await sendStatsToGPT(stats, req.body.type);

        res.json({ gptResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;