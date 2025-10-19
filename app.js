// --- 0. SIMULASI ENVIRONMENT VARIABLE (TIDAK AMAN UNTUK PRODUKSI) ---
// Ganti nilai ini dengan API Key Gemini Anda.
// PENTING: Karena ini adalah frontend JS, kunci ini terekspos. 
// Untuk keamanan, gunakan fungsi serverless.
const GEMINI_API_KEY = "AIzaSyBD22OZdh4V0ypkIj2DfG1wHcY_6KYLcCU"; 

// --- 1. DATA HISTORIS XAU/USD ---
const rawData = [
    { monthYear: "Jan 2020", trend: "Uptrend (>+2%)", desc: "Ketegangan AS-Iran memicu Safe Haven. Bullish start.", factor: "AS-Iran Tension, Fed Rate Hold" },
    { monthYear: "Feb 2020", trend: "Ranging", desc: "Kekuatan Dolar AS membatasi kenaikan. Aksi jual ringan di akhir bulan.", factor: "Strong USD, Pre-COVID uncertainty" },
    { monthYear: "Mar 2020", trend: "Downtrend (>-5%)", desc: "Panic selling untuk likuiditas USD saat Covid-19 menyebar global.", factor: "COVID-19 Panic, Liquidity Grab" },
    { monthYear: "Apr 2020", trend: "Uptrend (>+5%)", desc: "Stimulus masif The Fed dan kekhawatiran resesi mendorong harga.", factor: "Massive Fed Stimulus, Recession Fear" },
    { monthYear: "Mei 2020", trend: "Ranging", desc: "Fokus pasar bergeser ke data ekonomi AS yang memburuk, Dolar menguat.", factor: "Deteriorating US Economy, USD strength" },
    { monthYear: "Jun 2020", trend: "Uptrend (>+3%)", desc: "Emas sebagai lindung nilai inflasi. Suku bunga mendekati nol.", factor: "Inflation Hedge, Near-Zero Rates" },
    { monthYear: "Jul 2020", trend: "Uptrend (>+10%)", desc: "Lonjakan kasus COVID-19, pelemahan Dolar AS, dan stimulus fiskal AS baru.", factor: "COVID Surge, Weak USD, Fiscal Stimulus" },
    { monthYear: "Agu 2020", trend: "Downtrend (>-2%)", desc: "Profit taking setelah rekor harga tertinggi ($2073). Pasar menanti berita vaksin.", factor: "Profit Taking, Vaccine Anticipation" },
    { monthYear: "Sep 2020", trend: "Downtrend (>-4%)", desc: "Penguatan Dolar AS dan keraguan atas stimulus fiskal baru.", factor: "Stronger USD, Fiscal Stimulus Doubt" },
    { monthYear: "Okt 2020", trend: "Ranging", desc: "Volatilitas tinggi menjelang Pilpres AS. Harga konsolidasi.", factor: "US Election Volatility, Consolidation" },
    { monthYear: "Jan 2021", trend: "Downtrend (>-3%)", desc: "Dolar AS rebound, harapan pemulihan global, dan yield obligasi yang naik.", factor: "USD Rebound, Recovery Hopes, Rising Yields" },
    { monthYear: "Mar 2021", trend: "Downtrend (>-2%)", desc: "Peningkatan yield US Treasury menekan daya tarik Emas.", factor: "Rising US Treasury Yields" },
    { monthYear: "Nov 2021", trend: "Uptrend (>+4%)", desc: "Kekhawatiran inflasi dan permintaan fisik yang kuat dari Asia.", factor: "Inflation Fear, Strong Physical Demand" },
    { monthYear: "Feb 2022", trend: "Uptrend (>+6%)", desc: "Invasi Rusia ke Ukraina, memicu lonjakan Safe Haven.", factor: "Russia-Ukraine War (Safe Haven)" },
    { monthYear: "Sep 2022", trend: "Downtrend (>-4%)", desc: "Suku bunga The Fed yang agresif dan penguatan Dolar AS.", factor: "Aggressive Fed Hikes, Strong USD" },
    { monthYear: "Mar 2023", trend: "Uptrend (>+8%)", desc: "Krisis Perbankan AS (SVB) meningkatkan Safe Haven Emas.", factor: "US Banking Crisis (SVB)" },
    { monthYear: "Okt 2023", trend: "Uptrend (>+7%)", desc: "Konflik Hamas–Israel memicu ketidakpastian geopolitik.", factor: "Hamas-Israel Conflict" },
    { monthYear: "Apr 2024", trend: "Uptrend (>+2%)", desc: "Bank Sentral Global terus membeli Emas. Ketegangan di Timur Tengah.", factor: "Global Central Bank Buying, Mideast Tensions" },
    { monthYear: "Mei 2024", trend: "Downtrend (>-5%)", desc: "Kekhawatiran inflasi mereda dan pasar saham menguat.", factor: "Easing Inflation, Equity Market Strength" },
    { monthYear: "Okt 2025", trend: "Uptrend (>+10%)", desc: "Keputusan Pemotongan Suku Bunga Fed yang masif dan pelemahan Dolar global.", factor: "Massive Fed Rate Cuts, Global USD Weakness" }
];

const priceData = [
    { month: "Des 2019", high: 1553.11, low: 1450.40 },
    { month: "Jan 2020", high: 1611.38, low: 1516.34 },
    { month: "Agu 2020", high: 2073.68, low: 1863.00 },
    { month: "Jan 2021", high: 1959.02, low: 1809.80 },
    { month: "Mar 2021", high: 1755.00, low: 1676.80 },
    { month: "Feb 2022", high: 1974.30, low: 1779.30 },
    { month: "Mar 2023", high: 2010.50, low: 1809.80 },
    { month: "Des 2023", high: 2146.70, low: 1974.70 },
    { month: "Apr 2024", high: 2431.53, low: 2282.80 },
    { month: "Okt 2025", high: 4380.07, low: 4010.50 }
];

const MODEL_NAME = 'gemini-2.5-flash-preview-09-2025';
const GEMINI_API_BASE_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;
const MAX_RETRIES = 3;

// Mengubah data menjadi string untuk System Instruction
const xauUsdDataString = JSON.stringify({ rawData, priceData }, null, 2);

// System Instruction untuk Model
const SYSTEM_INSTRUCTION = {
    parts: [{
        text: `
Anda adalah seorang analis keuangan ahli di pasar Emas (XAU/USD). Tugas Anda adalah menjawab pertanyaan pengguna berdasarkan data historis dan musiman XAU/USD yang disediakan di bawah ini.

1.  Gunakan data ini untuk memberikan analisis yang terperinci dan berwawasan.
2.  Jangan pernah menciptakan data atau fakta yang tidak ada dalam konteks yang diberikan.
3.  Berikan jawaban yang ringkas, profesional, dan dalam Bahasa Indonesia, dengan gaya penulisan seperti terminal analisis, gunakan markdown seperti **bold** dan list untuk struktur.

DATA XAU/USD (Januari 2020 - Oktober 2025):
${xauUsdDataString}
`
    }]
};

// --- 2. Variabel dan Elemen DOM ---
const elements = {
    chatForm: document.getElementById('chatForm'),
    chatInput: document.getElementById('chatInput'),
    sendBtn: document.getElementById('sendBtn'),
    messagesContainer: document.getElementById('messagesContainer'),
    messagesEndRef: document.getElementById('messages-end-ref'),
    initialMessage: document.getElementById('initial-message'),
    errorMessage: document.getElementById('error-message'),
    dataTableBody: document.getElementById('dataTableBody'),
    toggleTableBtn: document.getElementById('toggleTableBtn'),
    historicalDataTable: document.getElementById('historicalDataTable'),
    dataPlaceholder: document.getElementById('data-placeholder'),
    maximizeChatBtn: document.getElementById('maximizeChatBtn'),
    chatContainer: document.getElementById('chat-container'),
    dataColumn: document.getElementById('data-column'),
    mainContent: document.getElementById('main-content'),
};

let messages = [];
let state = {
    isLoading: false,
    isTableVisible: false,
    isChatMaximized: false,
};

// --- 3. FUNGSI UTILITAS UI (Direvisi untuk UX) ---

const updateLucideIcons = () => {
    if (window.lucideCreateIcons) {
        window.lucideCreateIcons();
    }
};

const scrollToBottom = () => {
    elements.messagesEndRef.scrollIntoView({ behavior: 'smooth' });
};

const showLoadingIndicator = () => {
    const loadingHtml = `
        <div id="loading-indicator" class="flex justify-start">
            <!-- Menggunakan warna yang lebih halus dan border -->
            <div class="bg-gray-800 text-[#ffeb3b] p-3 rounded-tr-lg rounded-b-lg shadow-md flex items-center mb-4 border border-[#00e676]/30">
                <i data-lucide="loader-2" class="animate-spin w-4 h-4 mr-2"></i>
                ANALYZING DATA...
            </div>
        </div>
    `;
    elements.messagesContainer.insertAdjacentHTML('beforeend', loadingHtml);
    updateLucideIcons();
    scrollToBottom();
};

const hideLoadingIndicator = () => {
    const indicator = document.getElementById('loading-indicator');
    if (indicator) {
        indicator.remove();
    }
};

const showError = (message) => {
    elements.errorMessage.querySelector('p').innerHTML = `<i data-lucide="alert-triangle" class="w-4 h-4 mr-2"></i> ${message}`;
    elements.errorMessage.classList.remove('hidden');
    updateLucideIcons();
};

const hideError = () => {
    elements.errorMessage.classList.add('hidden');
};

const createMessageBubble = (role, text) => {
    const isUser = role === 'user';
    // Warna baru: Pengguna Hijau (Aksi), Model Abu-abu Gelap (Informasi)
    const bgColor = isUser ? 'bg-[#00e676] text-gray-900' : 'bg-gray-800 text-[#00e676] border border-[#00e676]/30';
    const alignment = isUser ? 'justify-end' : 'justify-start';
    const borderRadius = isUser ? 'rounded-tl-lg rounded-b-lg' : 'rounded-tr-lg rounded-b-lg';
    // Class khusus untuk styling Markdown di respons Model
    const markdownClass = isUser ? '' : 'analyst-response';

    const bubbleHtml = `
        <div class="flex w-full ${alignment}">
            <div 
                class="max-w-xs sm:max-w-lg p-3 sm:p-4 mb-4 ${bgColor} ${borderRadius} transition-all duration-300 shadow-xl shadow-black/50 ${markdownClass}"
                style="white-space: pre-wrap; font-family: inherit;"
            >
                <p class="font-bold text-xs mb-1 ${isUser ? 'text-gray-900/70' : 'text-[#ffeb3b]'}">${isUser ? 'USER >' : 'ANALYST >'}</p>
                ${text}
            </div>
        </div>
    `;
    
    if (elements.initialMessage) {
        elements.initialMessage.style.display = 'none';
    }

    elements.messagesContainer.insertAdjacentHTML('beforeend', bubbleHtml);
    scrollToBottom();
};

const renderHistoricalData = () => {
    const html = rawData.map((item, index) => {
        // Gunakan shade yang sama agar lebih konsisten
        const rowClass = index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900';
        let trendClass = 'text-blue-400';
        // Mengganti warna tren agar lebih profesional
        if (item.trend.includes('Uptrend')) {
            trendClass = 'text-[#00e676] font-semibold'; // Hijau neon
        } else if (item.trend.includes('Downtrend')) {
            trendClass = 'text-red-400 font-semibold';
        }

        return `
            <tr class="${rowClass} hover:bg-gray-700/50 transition-colors duration-150">
                <td class="p-2 text-gray-300 font-medium">${item.monthYear}</td>
                <td class="p-2 ${trendClass}">${item.trend}</td>
                <td class="p-2 text-gray-400 text-xs">${item.factor}</td>
            </tr>
        `;
    }).join('');

    elements.dataTableBody.innerHTML = html;
    updateLucideIcons(); 
};

// --- 4. FUNGSI LOGIKA STATE ---

const updateFormState = () => {
    const inputFilled = elements.chatInput.value.trim().length > 0;
    
    // Periksa apakah API Key diisi (simulasi "Environment Variable" ada)
    const apiKeyPresent = GEMINI_API_KEY && GEMINI_API_KEY !== "AIzaSyBD22OZdh4V0ypkIj2DfG1wHcY_6KYLcCU";
    
    elements.chatInput.disabled = state.isLoading || !apiKeyPresent;
    elements.sendBtn.disabled = state.isLoading || !inputFilled || !apiKeyPresent;

    if (!apiKeyPresent) {
        // Memberi visual peringatan API Key
        elements.chatInput.placeholder = "!!! HARAP SET GEMINI API KEY !!!";
        elements.chatInput.classList.add('border-red-500');
        elements.sendBtn.title = "Harap masukkan GEMINI_API_KEY";
    } else {
        elements.chatInput.classList.remove('border-red-500');
        if (state.isLoading) {
            elements.sendBtn.title = "Sedang menganalisis...";
        } else if (!inputFilled) {
            elements.sendBtn.title = "Ketik pesan untuk mengirim";
        } else {
            elements.sendBtn.title = "Kirim Pesan";
        }
        elements.chatInput.placeholder = "ASK XAU/USD ANALYST...";
    }
};

const toggleTableVisibility = () => {
    state.isTableVisible = !state.isTableVisible;
    const btn = elements.toggleTableBtn;

    if (state.isTableVisible) {
        elements.historicalDataTable.classList.remove('hidden');
        elements.dataPlaceholder.classList.add('hidden');
        btn.innerHTML = '<i data-lucide="minimize-2" class="inline w-4 h-4 mr-2"></i> Sembunyikan Data Historis';
        // Ganti style tombol menjadi lebih menonjol saat aktif
        btn.classList.replace('bg-gray-800', 'bg-red-700');
        btn.classList.replace('hover:bg-gray-700', 'hover:bg-red-600');
        btn.classList.add('text-white');
    } else {
        elements.historicalDataTable.classList.add('hidden');
        elements.dataPlaceholder.classList.remove('hidden');
        btn.innerHTML = '<i data-lucide="maximize-2" class="inline w-4 h-4 mr-2"></i> Tampilkan Data Historis';
        // Kembalikan ke style awal
        btn.classList.replace('bg-red-700', 'bg-gray-800');
        btn.classList.replace('hover:bg-red-600', 'hover:bg-gray-700');
        btn.classList.remove('text-white');
    }
    updateLucideIcons();
};

const toggleChatMaximize = () => {
    state.isChatMaximized = !state.isChatMaximized;
    
    if (state.isChatMaximized) {
        elements.mainContent.classList.replace('lg:grid-cols-3', 'grid-cols-1');
        elements.chatContainer.classList.replace('lg:col-span-2', 'lg:col-span-3');
        elements.chatContainer.classList.replace('h-[80vh]', 'h-[85vh]');
        elements.dataColumn.classList.add('hidden'); 
        elements.maximizeChatBtn.querySelector('i').setAttribute('data-lucide', 'minimize-2');
        elements.maximizeChatBtn.title = 'Perkecil Tampilan';
    } else {
        elements.mainContent.classList.replace('grid-cols-1', 'lg:grid-cols-3');
        elements.chatContainer.classList.replace('lg:col-span-3', 'lg:col-span-2');
        elements.chatContainer.classList.replace('h-[85vh]', 'h-[80vh]');
        elements.dataColumn.classList.remove('hidden'); 
        elements.maximizeChatBtn.querySelector('i').setAttribute('data-lucide', 'maximize-2');
        elements.maximizeChatBtn.title = 'Perbesar Chat';
    }
    updateLucideIcons();
    scrollToBottom();
};


// --- 5. FUNGSI API & HANDLER UTAMA ---

/** Memanggil API Gemini dengan Exponential Backoff. */
const callGeminiApi = async (contents, retryCount = 0) => {
    try {
        const apiUrl = `${GEMINI_API_BASE_URL}?key=${GEMINI_API_KEY}`;
        
        const payload = {
            contents: contents,
            // System instruction ditempatkan di root object
            systemInstruction: SYSTEM_INSTRUCTION, 
        };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            if (response.status === 429 && retryCount < MAX_RETRIES) {
                const delay = Math.pow(2, retryCount) * 1000 + Math.random() * 1000;
                // console.warn(`Rate limit (429). Retrying in ${delay.toFixed(0)}ms...`); // Jangan log retry
                await new Promise(resolve => setTimeout(resolve, delay));
                return callGeminiApi(contents, retryCount + 1);
            }
            
            const errorData = await response.json();
            throw new Error(`Gemini API Error: ${response.status} - ${errorData.error?.message || 'Gagal memanggil API.'}`);
        }

        const result = await response.json();
        const modelResponseText = result.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!modelResponseText) {
            throw new Error("Respon dari model kosong atau tidak terduga.");
        }

        messages.push({ role: 'model', text: modelResponseText });
        createMessageBubble('model', modelResponseText);
        hideError();

    } catch (err) {
        console.error("Kesalahan dalam pengiriman pesan:", err);
        showError(err.message);
    } finally {
        state.isLoading = false;
        hideLoadingIndicator();
        updateFormState();
    }
};

/** Handler untuk pengiriman pesan */
const sendMessage = async (e) => {
    e.preventDefault();
    const userMessage = elements.chatInput.value.trim();

    if (!userMessage || state.isLoading) return;
    
    // Pengecekan API Key yang lebih spesifik
    const isDefaultKey = GEMINI_API_KEY === "AIzaSyBD22OZdh4V0ypkIj2DfG1wHcY_6KYLcCU";
    if (isDefaultKey) {
        showError("Harap ganti GEMINI_API_KEY di file app.js dengan API Key Anda yang valid.");
        return;
    }
    
    elements.chatInput.value = '';
    hideError();
    state.isLoading = true;
    updateFormState();
    
    messages.push({ role: 'user', text: userMessage });
    createMessageBubble('user', userMessage);
    showLoadingIndicator();

    const apiContents = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
    }));

    await callGeminiApi(apiContents);
};

// --- 6. INISIALISASI ---

const initialize = () => {
    // 1. Render data tabel
    renderHistoricalData();
    
    // 2. Setup Event Listeners
    elements.chatForm.addEventListener('submit', sendMessage);
    elements.chatInput.addEventListener('input', updateFormState);
    elements.toggleTableBtn.addEventListener('click', toggleTableVisibility);
    elements.maximizeChatBtn.addEventListener('click', toggleChatMaximize);
    
    // 3. Update status form awal
    updateFormState(); 
};

// Jalankan inisialisasi setelah DOM dimuat
document.addEventListener('DOMContentLoaded', initialize);
