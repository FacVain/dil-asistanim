const router = require('express').Router()
const mongoose = require('mongoose');


const { isLoggedIn } = require('../middlewares/authMiddleware')

// Assuming MailAnalysis is already required from your models
const MailAnalysis = require('../models/Mail');
const PetitionAnalysis = require('../models/Dilekce');
const FreeTextAnalysis = require('../models/SerbestYazi');


router.get('/mails', isLoggedIn, async (req, res, next) => {
    try {
        const userId = req.session.userId; // Retrieve the user's MongoDB _id from the session
        const lastTenMails = await MailAnalysis.find({ user: userId })
            .sort({ createdAt: -1 }) // Sort by createdAt in descending order
            .limit(10) // Limit to last 10 documents
            .exec(); // Execute the query

        res.json(lastTenMails);
    } catch (error) {
        next(error); // Pass errors to the error handler middleware
    }
});


router.get('/petitions', isLoggedIn, async (req, res, next) => {
    try {
        const userId = req.session.userId; // Retrieve the user's MongoDB _id from the session
        const lastTenPetitions = await PetitionAnalysis.find({ user: userId })
            .sort({ createdAt: -1 }) // Sort by createdAt in descending order
            .limit(10) // Limit to last 10 documents
            .exec(); // Execute the query

        res.json(lastTenPetitions);
    } catch (error) {
        next(error); // Pass errors to the error handler middleware
    }
});


router.get('/freetexts', isLoggedIn, async (req, res, next) => {
    try {
        const userId = req.session.userId;
        let idToSearch = new mongoose.Types.ObjectId(userId)
        
        // Fetch the last ten mails
        const userHistory = await FreeTextAnalysis.find({ user: idToSearch })
        .sort({ createdAt: -1 })
        .limit(3)
        .exec();

        // Calculate total number of sentiment entries for the user
        const totalSentimentsCount = await FreeTextAnalysis.find({ user: idToSearch }).count();

        const sentimentCounts = await FreeTextAnalysis.aggregate([
            { $match: { user: idToSearch }},
            { $group: { _id: '$sentimentAnalysis', count: { $sum: 1 } }}
        ]);

        // Transform sentimentCounts to percentages
        const sentimentRatios = {};
        sentimentCounts.forEach((sentiment) => {
            sentimentRatios[sentiment._id] = 
                ((sentiment.count / totalSentimentsCount) * 100).toFixed(2);
        });

        // Construct the final response
        const response = {
            userHistory,
            stats: {
                sentimentRatios
            }
        };

        res.json(response);
    } catch (error) {
        next(error); // Pass errors to the error handler middleware
    }
});


module.exports = router;
