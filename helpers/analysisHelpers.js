const mongoose = require('mongoose');
const MailAnalysis = require('../models/Mail');

async function fetchStats(AnalysisModel, userId, mailType) {
    let idToSearch = new mongoose.Types.ObjectId(userId);
    
    // Very bad code bad no time to refactor. Know how to correct though xDD
    let totalSentimentsCount;
    if (mailType) {
        totalSentimentsCount = await AnalysisModel.countDocuments({ user: idToSearch, mailType: mailType });
    } else {
        totalSentimentsCount = await AnalysisModel.countDocuments({ user: idToSearch });
    }

    // Very bad code bad no time to refactor. Know how to correct though xDD
    let sentimentCounts;
    if (mailType) {
        sentimentCounts = await AnalysisModel.aggregate([
            { $match: { user: idToSearch, mailType: mailType }},
            { $group: { _id: "$sentimentAnalysis", count: { $sum: 1 }}}
        ]);
    }
    else {
        sentimentCounts = await AnalysisModel.aggregate([
            { $match: { user: idToSearch }},
            { $group: { _id: "$sentimentAnalysis", count: { $sum: 1 }}}
        ]);
    }

    const sentimentRatios = {};
    sentimentCounts.forEach((sentiment) => {
        sentimentRatios[sentiment._id] =
            ((sentiment.count / totalSentimentsCount) * 100).toFixed(2);
    });

    // Very bad code bad no time to refactor. Know how to correct though xDD
    // Count total tone entries for the user
    let totalTonesCount;
    if(mailType) {
        totalTonesCount = await AnalysisModel.aggregate([
            { $match: { user: idToSearch, mailType: mailType }},
            { $unwind: "$toneAnalysis" },
            { $group: { _id: null, count: { $sum: 1 }}}
        ]).then(res => res.length ? res[0].count : 0);
    } else {
        totalTonesCount = await AnalysisModel.aggregate([
            { $match: { user: idToSearch }},
            { $unwind: "$toneAnalysis" },
            { $group: { _id: null, count: { $sum: 1 }}}
        ]).then(res => res.length ? res[0].count : 0);
    }


    // Aggregate tone counts
    let toneCounts;
    if(mailType) {
        toneCounts = await AnalysisModel.aggregate([
            { $match: { user: idToSearch, mailType: mailType }},
            { $unwind: "$toneAnalysis" },
            { $group: { _id: "$toneAnalysis", count: { $sum: 1 }}}
        ]);
    } else {
        toneCounts = await AnalysisModel.aggregate([
            { $match: { user: idToSearch }},
            { $unwind: "$toneAnalysis" },
            { $group: { _id: "$toneAnalysis", count: { $sum: 1 }}}
        ]);
    }


    // Calculate tone ratios
    const toneRatios = {};
    toneCounts.forEach((tone) => {
        toneRatios[tone._id] =
            ((tone.count / totalTonesCount) * 100).toFixed(2);
    });

    return {
        sentimentRatios,
        toneRatios
    };
}

async function fetchUserHistoryAndStats(AnalysisModel, userId, mailType) {
    let idToSearch = new mongoose.Types.ObjectId(userId);

    let userHistory;

    // Unfortunately bad code
    if(mailType) {
        userHistory = await AnalysisModel.find({ user: idToSearch, mailType: mailType})
        .sort({ createdAt: -1 })
        .limit(10)
        .exec();
    } else {
        userHistory = await AnalysisModel.find({ user: idToSearch })
        .sort({ createdAt: -1 })
        .limit(10)
        .exec();
    }
    
    
    const stats = await fetchStats(AnalysisModel, userId, mailType);
    return {
        userHistory,
        stats
    };
}

module.exports = {
    fetchUserHistoryAndStats,
    fetchStats
};
