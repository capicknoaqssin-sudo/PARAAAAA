// API Server para converter imagens em JSON para Roblox
// Use: node api-server.js
// Ou hospede em: Replit, Glitch, Railway, etc.

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const { createCanvas, loadImage } = require('canvas');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

// Armazenamento temporário (em produção, use Redis ou banco de dados)
const imageCache = new Map();

// Endpoint para processar imagem
app.post('/api/process-image', async (req, res) => {
    try {
        const { imageUrl } = req.body;
        
        if (!imageUrl) {
            return res.status(400).json({ error: 'imageUrl is required' });
        }
        
        // Baixar imagem
        const response = await fetch(imageUrl);
        if (!response.ok) {
            return res.status(400).json({ error: 'Failed to fetch image' });
        }
        
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const img = await loadImage(buffer);
        
        // Criar canvas
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
        
        // Extrair pixels
        const imageData = ctx.getImageData(0, 0, width, height);
        const pixels = [];
        
        for (let i = 0; i < imageData.data.length; i += 4) {
            pixels.push([
                imageData.data[i],
                imageData.data[i + 1],
                imageData.data[i + 2]
            ]);
        }
        
        const result = {
            Width: width,
            Height: height,
            Pixels: pixels
        };
        
        // Gerar código único
        const code = crypto.randomBytes(8).toString('hex');
        
        // Armazenar por 1 hora
        imageCache.set(code, JSON.stringify(result));
        setTimeout(() => imageCache.delete(code), 3600000);
        
        res.json({
            success: true,
            code: code,
            width: width,
            height: height,
            pixelCount: pixels.length
        });
        
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ error: 'Failed to process image' });
    }
});

// Endpoint para buscar JSON pelo código
app.get('/api/get-image/:code', (req, res) => {
    const { code } = req.params;
    const jsonData = imageCache.get(code);
    
    if (!jsonData) {
        return res.status(404).json({ error: 'Code not found or expired' });
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.send(jsonData);
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', cacheSize: imageCache.size });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Server running on port ${PORT}`);
    console.log(`Health: http://localhost:${PORT}/api/health`);
});

