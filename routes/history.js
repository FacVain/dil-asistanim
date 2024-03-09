const router = require('express').Router()

const { isLoggedIn } = require('../middlewares/authMiddleware')
const { fetchUserHistoryAndStats } = require('../helpers/analysisHelpers');


const MailAnalysis = require('../models/Mail');
const PetitionAnalysis = require('../models/Dilekce');
const FreeTextAnalysis = require('../models/SerbestYazi');


router.get('/mails', isLoggedIn, async (req, res, next) => {
    try {
        const response = await fetchUserHistoryAndStats(MailAnalysis, req.user.id);
        res.json(response);
    } catch (error) {
        next(error); // Pass errors to the error handler middleware
    }
});


router.get('/petitions', isLoggedIn, async (req, res, next) => {
    try {
        const response = await fetchUserHistoryAndStats(PetitionAnalysis, req.user.id);
        res.json(response);
    } catch (error) {
        next(error); // Pass errors to the error handler middleware
    }
});


router.get('/freetexts', isLoggedIn, async (req, res, next) => {
    try {
        const response = await fetchUserHistoryAndStats(FreeTextAnalysis, req.user.id);
        res.json(response);
    } catch (error) {
        next(error); // Pass errors to the error handler middleware
    }
});


module.exports = router;
