// File ini akan menjadi serverless function Anda di Vercel
const { GoogleGenAI } = require('@google/genai');

// API Key diambil secara otomatis dari Environment Variables Vercel
const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 

if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY tidak ditemukan di Environment Variables Vercel.");
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const model = 'gemini-2.5-flash';

// Fungsi utama yang diekspor untuk Vercel Serverless Function
module.exports = async (req, res) => {
    // Setel header CORS yang longgar untuk memastikan koneksi
    res.setHeader('Access-Control-Allow-Origin', '*'); // Biasanya diatasi oleh Vercel
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Tangani permintaan OPTIONS (preflight CORS)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { history, newMessage, historicalData } = req.body;

        // **Sistem Prompting**
        const systemInstruction = `Anda adalah Analis Finansial XAU/USD. Jawab pertanyaan pengguna berdasarkan konteks percakapan dan data historis yang tersedia (XAU/USD dari 2020-2025): ${JSON.stringify(historicalData.slice(-12))}. Jawablah secara profesional dan lugas.`;

        // Gabungkan riwayat dan instruksi
        const contents = [
            { role: 'system', parts: [{ text: systemInstruction }] },
            ...history,
            { role: 'user', parts: [{ text: newMessage }] }
        ];

        const response = await ai.models.generateContent({
            model: model,
            contents: contents,
        });

        const aiResponseText = response.text;

        res.status(200).json({
            text: aiResponseText
        });

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};
