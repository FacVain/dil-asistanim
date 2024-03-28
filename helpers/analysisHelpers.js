const mongoose = require('mongoose');

async function fetchUserHistoryAndStats(AnalysisModel, userId) {
    let idToSearch = new mongoose.Types.ObjectId(userId);
    
    const userHistory = await AnalysisModel.find({ user: idToSearch })
        .sort({ createdAt: -1 })
        .limit(10)
        .exec();

    const totalSentimentsCount = await AnalysisModel.countDocuments({ user: idToSearch });

    const sentimentCounts = await AnalysisModel.aggregate([
        { $match: { user: idToSearch }},
        { $group: { _id: "$sentimentAnalysis", count: { $sum: 1 }}}
    ]);

    const sentimentRatios = {};
    sentimentCounts.forEach((sentiment) => {
        sentimentRatios[sentiment._id] =
            ((sentiment.count / totalSentimentsCount) * 100).toFixed(2);
    });

    // Count total tone entries for the user
    const totalTonesCount = await AnalysisModel.aggregate([
        { $match: { user: idToSearch }},
        { $unwind: "$toneAnalysis" },
        { $group: { _id: null, count: { $sum: 1 }}}
    ]).then(res => res.length ? res[0].count : 0);

    // Aggregate tone counts
    const toneCounts = await AnalysisModel.aggregate([
        { $match: { user: idToSearch }},
        { $unwind: "$toneAnalysis" },
        { $group: { _id: "$toneAnalysis", count: { $sum: 1 }}}
    ]);

    // Calculate tone ratios
    const toneRatios = {};
    toneCounts.forEach((tone) => {
        toneRatios[tone._id] =
            ((tone.count / totalTonesCount) * 100).toFixed(2);
    });

    return {
        userHistory,
        stats: {
            sentimentRatios,
            toneRatios
        }
    };
}

module.exports = {
    fetchUserHistoryAndStats
};
