const axios = require('axios');

// Check if the service is alive
async function sendRequestToXMLRoBERTa(req) {
    try {
        const response = await axios.get(process.env.MODEL_ORIGIN + '/isalive');
        if (response.status === 200) {
            // Service is alive, send userInput to /predict endpoint
            const userInput = req.body.userInput;
            const predictionResponse = await axios.post(process.env.MODEL_ORIGIN + '/predict', { "userInput": userInput });
            // Handle prediction response
            return predictionResponse.data;
        } else {
            // Service is not alive
            console.error('Service is not alive');
        }
    } catch (error) {
        console.error('Error occurred:', error.message);
    }
}

module.exports = sendRequestToXMLRoBERTa;
