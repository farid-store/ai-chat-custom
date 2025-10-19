// File: api/chat-gemini.js - Lebih kuat dalam menangani Vercel Environment
const { GoogleGenAI } = require('@google/genai');

// API Key diambil secara otomatis dari Environment Variables Vercel
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 

if (!GEMINI_API_KEY) {
    // Ini akan memicu Error 500 yang lebih jelas di log Vercel
    throw new Error("GEMINI_API_KEY tidak ditemukan di Environment Variables Vercel.");
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const model = 'gemini-2.5-flash';

// Utility function untuk mengambil body JSON (Karena Vercel tidak selalu mem-parse otomatis)
function getRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(new Error('Gagal mem-parsing body JSON'));
            }
        });
        req.on('error', reject);
    });
}

// Fungsi utama yang diekspor untuk Vercel Serverless Function
module.exports = async (req, res) => {
    // 1. Tangani Header & Method
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        // 2. Ambil Body Secara Manual
        const { history, newMessage, historicalData } = await getRequestBody(req);

        if (!newMessage) {
             return res.status(400).json({ error: 'Missing Message', message: 'Parameter newMessage hilang dari permintaan.' });
        }

        // **Sistem Prompting**
        // Batasi data historis yang dikirim (misalnya, 10 data terakhir) untuk menghindari batasan konteks yang terlalu besar.
        const relevantData = historicalData ? historicalData.slice(-10) : [];
        const systemInstruction = `Anda adalah Analis Finansial XAU/USD. Jawab pertanyaan pengguna berdasarkan konteks percakapan dan data historis yang tersedia (XAU/USD): ${JSON.stringify(relevantData)}. Jawablah secara profesional dan lugas.`;

        // 3. Persiapan Konten
        const contents = [
            { role: 'system', parts: [{ text: systemInstruction }] },
            ...(history || []), // Pastikan history ada
            { role: 'user', parts: [{ text: newMessage }] }
        ];

        // 4. Panggil Gemini API
        const response = await ai.models.generateContent({
            model: model,
            contents: contents,
        });

        const aiResponseText = response.text;

        // 5. Kirim Sukses
        res.status(200).json({
            text: aiResponseText
        });

    } catch (error) {
        console.error('SERVER ERROR:', error.message);
        // Mengirimkan error.message agar Anda tahu persis apa yang salah
        res.status(500).json({ 
            error: 'Internal Server Error', 
            message: `Gagal memproses permintaan: ${error.message}` 
        });
    }
};
