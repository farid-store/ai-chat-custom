// Pastikan Anda telah menginstal: npm install @google/genai express body-parser cors
const { GoogleGenAI } = require('@google/genai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// ************* GANTI DENGAN API KEY ANDA *************
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyBD22OZdh4V0ypkIj2DfG1wHcY_6KYLcCU"; 
// *******************************************************

if (GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE" || !GEMINI_API_KEY) {
    console.error("PERINGATAN: GEMINI_API_KEY belum diatur. Setel variabel lingkungan atau ganti placeholder.");
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const model = 'gemini-2.5-flash';

const app = express();
app.use(cors()); // Izinkan permintaan dari frontend Anda
app.use(bodyParser.json());

// Endpoint yang dipanggil oleh JavaScript di browser
app.post('/api/chat-gemini', async (req, res) => {
    const { history, newMessage, historicalData } = req.body;

    // Sistem Prompting (Instruksi awal untuk AI)
    const systemInstruction = `Anda adalah seorang Analis Finansial yang ahli dalam XAU/USD. Jawablah pertanyaan pengguna berdasarkan konteks percakapan dan data historis yang disediakan (data historis XAU/USD dari 2020-2025). Data historis (historicalData) yang relevan adalah: ${JSON.stringify(historicalData.slice(-12))}. Jawab dengan singkat, jelas, dan informatif.`;

    // Gabungkan riwayat dan instruksi
    const contents = [
        { role: 'system', parts: [{ text: systemInstruction }] },
        ...history,
        { role: 'user', parts: [{ text: newMessage }] }
    ];

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: contents,
        });

        const aiResponseText = response.text;

        res.json({
            text: aiResponseText
        });

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server API berjalan di http://localhost:${PORT}`);
});
