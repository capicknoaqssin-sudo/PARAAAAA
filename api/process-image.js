// Vercel Serverless Function: /api/process-image
const { createCanvas, loadImage } = require('canvas');
const crypto = require('crypto');
const cache = require('./cache');

async function processImage(imageUrl) {
    const fetch = (await import('node-fetch')).default;
    
    const response = await fetch(imageUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch image');
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const img = await loadImage(buffer);
    
    let width = img.width;
    let height = img.height;
    const maxDim = 512;
    
    if (width > maxDim || height > maxDim) {
        const scale = Math.min(maxDim / width, maxDim / height);
        width = Math.floor(width * scale);
        height = Math.floor(height * scale);
    }
    
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, width, height);
    
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = [];
    
    for (let i = 0; i < imageData.data.length; i += 4) {
        pixels.push([
            imageData.data[i],
            imageData.data[i + 1],
            imageData.data[i + 2]
        ]);
    }
    
    return {
        Width: width,
        Height: height,
        Pixels: pixels
    };
}

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { imageUrl } = req.body;
        
        if (!imageUrl) {
            return res.status(400).json({ error: 'imageUrl is required' });
        }
        
        const result = await processImage(imageUrl);
        const code = crypto.randomBytes(8).toString('hex');
        
        // Armazenar por 1 hora
        cache.set(code, JSON.stringify(result), 3600000);
        
        return res.json({
            success: true,
            code: code,
            width: result.Width,
            height: result.Height,
            pixelCount: result.Pixels.length
        });
        
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Failed to process image: ' + error.message });
    }
};

