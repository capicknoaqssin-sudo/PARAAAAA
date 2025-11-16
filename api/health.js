// Vercel Serverless Function: /api/health
const cache = require('./cache');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    return res.json({
        status: 'ok',
        cacheSize: cache.size(),
        timestamp: new Date().toISOString()
    });
};

