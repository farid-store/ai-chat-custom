// ====================================================================
// chat-gemini.js
// Logika AI Google Gemini untuk Menganalisis Data Lokal Statis
// File ini mengekspor konstanta dan fungsi utama yang dibutuhkan index.html
// ====================================================================

// ******************************************************************
// ** KONFIGURASI API KEY (HARUS DIGANTI) **
// ******************************************************************
export const GEMINI_API_KEY = "AIzaSyBD22OZdh4V0ypkIj2DfG1wHcY_6KYLcCU"; 
export const model = 'gemini-2.5-flash';

// ******************************************************************
// ** DATASET LOKAL LENGKAP (Diperlukan oleh AI) **
// Data ini harus sama dengan yang digunakan oleh chart di index.html
// ******************************************************************

export const rawData = [
    { monthYear: "Jan 2020", trend: "Uptrend moderat", desc: "Emas menguat stabil sejak awal tahun.", factor: "Ketegangan AS–Iran & penyebasan awal COVID-19 di Tiongkok." },
    { monthYear: "Feb 2020", trend: "Uptrend kuat", desc: "Harga melonjak tajam ke area 1.680–1.700.", factor: "COVID-19 mulai menyebar global, minat safe haven naik." },
    { monthYear: "Mar 2020", trend: "Volatil (Crash → Rebound)", desc: "Awalnya turun drastis karena panic selling, lalu pulih.", factor: "Crash likuiditas global (Maret 2020), lalu intervensi The Fed." },
    { monthYear: "Apr 2020", trend: "Uptrend tajam", desc: "Rebound kuat menuju area 1.700–1750.", factor: "Stimulus besar-besaran & suku bunga mendekati 0%." },
    { monthYear: "Mei 2020", trend: "Uptrend stabil", desc: "Harga bertahan tinggi, permintaan investasi naik.", factor: "The Fed lanjutkan QE, inflasi jangka panjang diantisipasi." },
    { monthYear: "Jun 2020", trend: "Uptrend kuat", desc: "Breakout menuju area 1.780–1.800.", factor: "DXY melemah, ekspektasi stimulus tambahan." },
    { monthYear: "Jul 2020", trend: "Uptrend kuat", desc: "Lonjakan besar akibat stimulus pandemi global.", factor: "Stimulus masif dari The Fed & paket bantuan COVID-19." },
    { monthYear: "Agu 2020", trend: "Uptrend → Koreksi", desc: "Mencapai puncak historis, lalu koreksi tajam.", factor: "Euforia safe haven puncak, lalu profit taking." },
    { monthYear: "Sep 2020", trend: "Downtrend", desc: "Tekanan jual pasca puncak Agustus.", factor: "Penguatan USD & ekspektasi pemulihan ekonomi." },
    { monthYear: "Okt 2020", trend: "Ranging", desc: "Konsolidasi di area 1880–1920.", factor: "Menunggu hasil pemilu AS 2020." },
    { monthYear: "Nov 2020", trend: "Downtrend", desc: "Penurunan akibat optimisme vaksin COVID-19.", factor: "Pengumuman vaksin Pfizer-BioNTech." },
    { monthYear: "Des 2020", trend: "Ranging → Uptrend", desc: "Mulai pulih menjelang akhir tahun.", factor: "Paket stimulus tambahan AS disetujui." },
    { monthYear: "Jan 2021", trend: "Uptrend → Downtrend", desc: "Lonjakan awal tahun, lalu terkoreksi.", factor: "Harapan stimulus Biden, lalu yield US naik." },
    { monthYear: "Feb 2021", trend: "Downtrend", desc: "Yield US naik, tekanan jual tinggi.", factor: "Lonjakan yield Treasury 10 tahun." },
    { monthYear: "Mar 2021", trend: "Ranging → Downtrend", desc: "Volatilitas tinggi, gagal rebound.", factor: "Dolar menguat akibat ekspektasi tapering." },
    { monthYear: "Apr 2021", trend: "Ranging", desc: "Pasar mulai stabil di area bawah.", factor: "Tidak ada data besar; konsolidasi." },
    { monthYear: "Mei 2021", trend: "Uptrend kuat", desc: "Rebound besar dari area support.", factor: "Inflasi AS naik tajam → dorong permintaan emas." },
    { monthYear: "Jun 2021", trend: "Downtrend tajam", desc: "Penurunan cepat pasca FOMC hawkish.", factor: "FOMC sinyalkan kenaikan suku bunga lebih cepat." },
    { monthYear: "Jul 2021", trend: "Ranging", desc: "Pergerakan datar, volatilitas rendah.", factor: "Pasar menunggu sinyal Fed berikutnya." },
    { monthYear: "Agu 2021", trend: "Ranging", desc: "Tidak ada arah jelas, harga berosilasi.", factor: "Data ekonomi campuran AS." },
    { monthYear: "Sep 2021", trend: "Downtrend", desc: "Tekanan jual dominan, lower low terbentuk.", factor: "Dolar menguat, ekspektasi tapering tinggi." },
    { monthYear: "Okt 2021", trend: "Uptrend", desc: "Reversal naik dari support bawah.", factor: "Inflasi tinggi picu minat safe haven." },
    { monthYear: "Nov 2021", trend: "Ranging", desc: "Konsolidasi di area tengah.", factor: "Menanti kepastian kebijakan tapering Fed." },
    { monthYear: "Des 2021", trend: "Ranging", desc: "Fluktuasi kecil menjelang akhir tahun.", factor: "Volume pasar rendah, libur akhir tahun." },
    { monthYear: "Jan 2022", trend: "Ranging → Uptrend", desc: "Mulai muncul tekanan beli signifikan.", factor: "Ketegangan geopolitik Rusia–Ukraina meningkat." },
    { monthYear: "Feb 2022", trend: "Uptrend kuat", desc: "Lonjakan akibat geopolitik (Russia–Ukraine).", factor: "Invasi Rusia ke Ukraina (Feb 24)." },
    { monthYear: "Mar 2022", trend: "Downtrend tajam", desc: "Koreksi kuat pasca lonjakan ekstrem.", factor: "Ekspektasi kenaikan suku bunga Fed." },
    { monthYear: "Apr 2022", trend: "Ranging → Downtrend", desc: "Harga gagal menembus resistance, berbalik turun.", factor: "The Fed mulai agresif (kebijakan hawkish)." },
    { monthYear: "Mei 2022", trend: "Downtrend", desc: "Bearish stabil dengan lower low.", factor: "Inflasi tinggi, Fed tingkatkan suku bunga." },
    { monthYear: "Jun 2022", trend: "Downtrend", desc: "Tekanan jual masih kuat.", factor: "USD terus menguat, DXY tembus 105." },
    { monthYear: "Jul 2022", trend: "Ranging", desc: "Konsolidasi membentuk base.", factor: "Ekspektasi inflasi mulai turun." },
    { monthYear: "Agu 2022", trend: "Uptrend singkat", desc: "Rebound teknikal dari support.", factor: "DXY melemah sementara." },
    { monthYear: "Sep 2022", trend: "Downtrend", desc: "Turun kembali setelah rally pendek.", factor: "Fed naikkan suku bunga 75 bps lagi." },
    { monthYear: "Okt 2022", trend: "Ranging", desc: "Area bottom mulai terbentuk.", factor: "Investor mulai akumulasi emas kembali." },
    { monthYear: "Nov 2022", trend: "Uptrend", desc: "Breakout resistance besar, momentum naik.", factor: "CPI AS turun → ekspektasi Fed melunak." },
    { monthYear: "Des 2022", trend: "Uptrend", desc: "Tren naik stabil hingga akhir tahun.", factor: "Optimisme soft landing." },
    { monthYear: "Jan 2023", trend: "Uptrend", desc: "Higher high konsisten, tren bullish kuat.", factor: "DXY melemah, ekspektasi Fed akan pivot." },
    { monthYear: "Feb 2023", trend: "Downtrend", desc: "Koreksi dari puncak.", factor: "Data inflasi AS kembali tinggi." },
    { monthYear: "Mar 2023", trend: "Uptrend", desc: "Rebound kuat pasca koreksi.", factor: "Krisis perbankan AS (Silicon Valley Bank)." },
    { monthYear: "Apr 2023", trend: "Uptrend → Ranging", desc: "Kenaikan melambat di resistance.", factor: "Fed jaga suku bunga tetap tinggi." },
    { monthYear: "Mei 2023", trend: "Downtrend", desc: "Tekanan jual mulai meningkat.", factor: "Debt ceiling AS & profit taking." },
    { monthYear: "Jun 2023", trend: "Ranging", desc: "Harga mendatar.", factor: "Tidak ada katalis besar." },
    { monthYear: "Jul 2023", trend: "Ranging", desc: "Volatilitas rendah.", factor: "Libur musim panas, volume tipis." },
    { monthYear: "Agu 2023", trend: "Ranging → Uptrend awal", desc: "Mulai muncul higher low.", factor: "Data inflasi melunak." },
    { monthYear: "Sep 2023", trend: "Uptrend", desc: "Tren bullish stabil.", factor: "Fed sinyalkan akhir siklus kenaikan suku bunga." },
    { monthYear: "Okt 2023", trend: "Uptrend kuat", desc: "Breakout area resistance utama.", factor: "Konflik Hamas–Israel (Okt 7)." },
    { monthYear: "Nov 2023", trend: "Uptrend", desc: "Momentum bullish masih dominan.", factor: "Ketegangan Timur Tengah berlanjut." },
    { monthYear: "Des 2023", trend: "Ranging", desc: "Konsolidasi di area puncak.", factor: "Pasar tenang jelang akhir tahun." },
    { monthYear: "Jan 2024", trend: "Ranging → Downtrend", desc: "Awal tahun terjadi koreksi besar.", factor: "DXY rebound & data tenaga kerja kuat." },
    { monthYear: "Feb 2024", trend: "Downtrend", desc: "Penurunan konsisten, candle bearish besar.", factor: "CPI tinggi → Fed hawkish kembali." },
    { monthYear: "Mar 2024", trend: "Ranging", desc: "Pasar tenang setelah koreksi.", factor: "Tidak ada data besar." },
    { monthYear: "Apr 2024", trend: "Uptrend kuat", desc: "Breakout dari konsolidasi, kenaikan signifikan.", factor: "Dolar melemah, data inflasi turun." },
    { monthYear: "Mei 2024", trend: "Uptrend", desc: "Tren naik masih terjaga.", factor: "Spekulasi pemotongan suku bunga Fed." },
    { monthYear: "Jun 2024", trend: "Ranging", desc: "Pergerakan mendatar di level tinggi.", factor: "Investor tunggu keputusan FOMC." },
    { monthYear: "Jul 2024", trend: "Downtrend", desc: "Koreksi dari area atas.", factor: "DXY menguat kembali." },
    { monthYear: "Agu 2024", trend: "Downtrend", desc: "Lanjutan tekanan jual.", factor: "PMI dan CPI positif di AS." },
    { monthYear: "Sep 2024", trend: "Ranging → Uptrend", desc: "Reversal mulai terbentuk.", factor: "Ekspektasi dovish Fed." },
    { monthYear: "Okt 2024", trend: "Uptrend", desc: "Kenaikan stabil.", factor: "Inflasi global menurun." },
    { monthYear: "Nov 2024", trend: "Ranging", desc: "Konsolidasi di area atas.", factor: "Menunggu hasil pemilu AS." },
    { monthYear: "Des 2024", trend: "Uptrend", desc: "Bullish continuation menjelang akhir tahun.", factor: "Euforia pasca pemilu AS." },
    { monthYear: "Jan 2025", trend: "Uptrend", desc: "Harga menembus resistance lama.", factor: "Fed mulai potong suku bunga." },
    { monthYear: "Feb 2025", trend: "Ranging", desc: "Sideways di puncak.", factor: "Tidak ada katalis besar." },
    { monthYear: "Mar 2025", trend: "Downtrend", desc: "Koreksi wajar setelah rally panjang.", factor: "USD rebound teknikal." },
    { monthYear: "Apr 2025", trend: "Downtrend", desc: "Tekanan jual meningkat.", factor: "Data inflasi naik kembali." },
    { monthYear: "Mei 2025", trend: "Ranging", desc: "Konsolidasi setelah drop.", factor: "Pasar menunggu arah kebijakan baru Fed." },
    { monthYear: "Jun 2025", trend: "Ranging → Uptrend", desc: "Tanda reversal bullish awal.", factor: "Data CPI menurun lagi." },
    { monthYear: "Jul 2025", trend: "Uptrend", desc: "Momentum naik mulai kuat lagi.", factor: "Spekulasi pemotongan lanjutan suku bunga." },
    { monthYear: "Agu 2025", trend: "Uptrend", desc: "Bullish stabil dengan higher low.", factor: "USD melemah, risk-off meningkat." },
    { monthYear: "Sep 2025", trend: "Ranging", desc: "Mulai datar menjelang Q4.", factor: "Tidak ada event besar." },
    { monthYear: "Okt 2025", trend: "Ranging → Uptrend", desc: "Ada potensi kenaikan lanjutan ke akhir tahun.", factor: "Ketegangan geopolitik baru di Timur Tengah." }
];

function formatDataForGemini(data) {
    let formatted = "Tabel Data Historis XAU/USD (Bulan, Trend, Deskripsi, Faktor):\n\n";
    data.forEach(item => {
        formatted += `- ${item.monthYear}: Trend **${item.trend}**. Deskripsi: ${item.desc}. Faktor Pemicu: ${item.factor}.\n`;
    });
    return formatted;
}

/**
 * Menganalisis data historis lokal menggunakan Google Gemini.
 * @param {string} query - Pertanyaan analisis dari pengguna.
 * @returns {Promise<string>} Hasil analisis dalam format string Markdown.
 */
export async function analyzeLocalDataWithGemini(query) {
    
    if (!GEMINI_API_KEY || GEMINI_API_KEY === "YOUR_GEMINI_API_KEY_HERE") {
        return "**[ERROR]** GEMINI_API_KEY belum diisi. Silakan ganti placeholder dengan kunci API Anda di file `chat-gemini.js`.";
    }
    
    // Inisialisasi AI Client (GoogleGenAI harus dimuat di index.html via CDN)
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    const historicalData = formatDataForGemini(rawData);

    // 3. Susun Prompt
    const prompt = `[PENGANTAR: Anda adalah analis keuangan AI yang bertugas menganalisis data historis XAU/USD (Emas) yang disediakan. Analisis Anda harus STRIKTLY berdasarkan data yang diberikan dan menjawab kueri pengguna. Jangan gunakan pengetahuan eksternal atau data real-time.]

DATA HISTORIS YANG TERSEDIA (2020 - 2025):
---
${historicalData}
---

Kueri Pengguna: "${query}"

Berdasarkan data historis di atas, lakukan analisis berikut:
1. Ringkas 3 poin utama (Trend, Faktor) yang relevan dengan kueri pengguna.
2. Berikan narasi/jawaban mendetail yang menjelaskan data terkait kueri.
3. Berikan kesimpulan singkat (misalnya, jika pengguna bertanya tentang Januari, jawablah 'Januari cenderung mengalami kenaikan awal lalu terkoreksi').
Berikan jawaban dalam Bahasa Indonesia, diformat menggunakan Markdown.`;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                systemInstruction: "You are a professional financial analyst specialized in XAU/USD historical data. Your response must be formatted using Markdown, be professional, and strictly based only on the provided historical data. Use clear headings and lists.",
                temperature: 0.2 
            }
        });

        // 4. Format Output
        let output = `**[ANALISIS DATA LOKAL OLEH GEMINI AI]**\n`;
        output += `(Analisis ini didasarkan pada data Heatmap statis tahun 2020-2025, bukan data pasar real-time.)\n\n`;
        output += response.text;
        output += `\n\n---\n[EXECUTION COMPLETE] Analisis berdasarkan data historis yang tersedia.`;
        
        return output;

    } catch (error) {
        console.error('Error generating content with Gemini:', error);
        return `[FATAL ERROR] Gagal memproses Gemini API: ${error.message}. Pastikan API Key valid, koneksi internet stabil, dan Anda menjalankan file dengan server web lokal.`;
    }
}
