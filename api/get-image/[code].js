// Vercel Serverless Function: /api/get-image/[code]
const cache = require('../cache');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    const { code } = req.query;
    
    if (!code) {
        return res.status(400).json({ error: 'Code is required' });
    }
    
    const jsonData = cache.get(code);
    
    if (!jsonData) {
        return res.status(404).json({ error: 'Code not found or expired' });
    }
    
    return res.send(jsonData);
};

