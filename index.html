<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>XAU/USD AI Analyst Chat - Vanilla JS</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script type="module">
        import { createIcons, icons } from 'https://unpkg.com/lucide@latest';
        window.lucide = { createIcons, icons };
    </script>
    <style>
        /* Menggunakan font monospasi untuk nuansa terminal */
        body {
            font-family: 'Consolas', 'Courier New', monospace;
            color: #00ff41; /* Warna teks utama hijau */
            background-color: #0a0a0a; /* Latar belakang sangat gelap */
        }
        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #1f2937; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #00ff41; border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #00b32e; }
        
        /* Efek fokus neon untuk input/button */
        .focus-ring-green:focus {
            box-shadow: 0 0 0 3px rgba(0, 255, 65, 0.5);
            border-color: #00ff41;
        }

        /* Gaya latar belakang untuk nuansa terminal */
        #app-container {
            background-image: radial-gradient(circle at 50% 10%, rgba(0,255,65,0.1), rgba(0,0,0,0) 50%);
        }
    </style>
</head>
<body class="min-h-screen">

<div id="app-container" class="min-h-screen flex flex-col p-4 sm:p-8 transition-all duration-300">
    
    <header class="w-full max-w-7xl mx-auto mb-6">
        <h1 class="text-3xl font-extrabold text-yellow-400 text-center mb-1 drop-shadow-[0_0_10px_rgba(255,193,7,0.5)]">
            <span class="text-green-500">XAU/USD</span> AI Analyst Chat
        </h1>
        <p class="text-center text-sm text-green-500 mb-4">
            Tanya tentang historis Emas (2020-2025). Data Historis dimuat ke dalam konteks AI.
        </p>
        <div class="w-full max-w-xl mx-auto bg-gray-900 p-3 rounded-xl shadow-lg border border-green-900">
            <label for="apiKeyInput" class="block text-xs font-medium text-green-400 mb-1">
                <i data-lucide="key-round" class="inline w-3 h-3 mr-1"></i> API Key (Isi Manual):
            </label>
            <input
                id="apiKeyInput"
                type="password"
                placeholder="AIzaSy..."
                class="w-full px-3 py-1 bg-gray-800 text-yellow-300 border border-green-700 rounded-lg text-sm focus-ring-green transition duration-150"
                title="API Key Gemini Anda"
            />
        </div>
    </header>
    
    <main id="main-content" class="flex-grow w-full max-w-7xl mx-auto grid transition-all duration-300 lg:grid-cols-3 gap-6">
        
        <div id="chat-container" class="lg:col-span-2 bg-gray-900 border border-green-900 rounded-xl shadow-2xl flex flex-col overflow-hidden h-[80vh]">
            <div class="flex justify-between items-center p-4 border-b border-green-800 bg-gray-800">
                <h2 class="text-xl font-bold text-green-400 flex items-center">
                    <i data-lucide="message-square" class="w-5 h-5 mr-2"></i> Gemini Analysis Console
                </h2>
                <button id="maximizeChatBtn" class="text-green-500 hover:text-green-300 p-1 rounded-full bg-gray-900 transition-colors" title="Perbesar Chat">
                    <i data-lucide="maximize-2" class="w-5 h-5"></i>
                </button>
            </div>

            <div id="messagesContainer" class="flex-grow p-4 overflow-y-auto custom-scrollbar">
                <div id="initial-message" class="flex flex-col items-center justify-center h-full text-center text-green-600">
                    <p class="text-lg mb-2">ACCESS GRANTED. MEMORY CONTEXT LOADED.</p>
                    <p class="text-sm">
                        Tanyakan tentang tren, high/low, atau faktor pemicu Emas dari tahun 2020 hingga 2025.
                    </p>
                </div>
                <div id="messages-end-ref"></div>
            </div>

            <div id="error-message" class="hidden p-3 bg-red-900 text-red-300 border-t border-red-700 font-bold">
                <p class="text-sm"></p>
            </div>

            <form id="chatForm" class="p-4 bg-gray-900 border-t border-green-800">
                <div class="flex space-x-3">
                    <input
                        id="chatInput"
                        type="text"
                        placeholder="ASK XAU/USD ANALYST..."
                        class="flex-grow p-3 bg-gray-800 text-green-300 border border-green-700 rounded-full focus-ring-green transition duration-150 placeholder-green-600"
                        disabled
                    />
                    <button
                        id="sendBtn"
                        type="submit"
                        class="p-3 bg-green-600 text-gray-900 rounded-full hover:bg-green-500 transition duration-200 shadow-md shadow-green-900/50 disabled:bg-green-900 disabled:text-green-700 disabled:cursor-not-allowed"
                        disabled
                        title="Masukkan API Key dan pesan terlebih dahulu"
                    >
                        <i data-lucide="send" class="w-6 h-6"></i>
                    </button>
                </div>
            </form>
        </div>

        <div id="data-column" class="lg:col-span-1 flex flex-col space-y-4 h-[80vh]">
            
            <button
                id="toggleTableBtn"
                class="w-full py-2 px-4 rounded-xl font-bold transition-all duration-300 bg-green-700 hover:bg-green-600 text-white shadow-green-900/50 shadow-lg border border-white/10"
            >
                <i data-lucide="maximize-2" class="inline w-4 h-4 mr-2"></i> Tampilkan Data Historis
            </button>
            
            <div id="historicalDataTable" class="flex-grow hidden">
                <div class="bg-gray-900 border border-green-900 rounded-xl shadow-2xl p-4 overflow-hidden h-full">
                    <h2 class="text-xl font-bold mb-4 text-yellow-400 border-b border-green-800 pb-2">
                        <i data-lucide="database" class="inline w-5 h-5 mr-2 text-green-400"></i> Data Kualitatif Historis
                    </h2>
                    <div class="overflow-y-auto h-[calc(100%-4rem)] custom-scrollbar">
                        <table class="w-full text-sm">
                            <thead>
                                <tr class="sticky top-0 bg-gray-900 border-b border-green-700 text-green-400">
                                    <th class="p-2 text-left">Bulan & Tahun</th>
                                    <th class="p-2 text-left">Tren Utama</th>
                                    <th class="p-2 text-left">Faktor Pemicu (News)</th>
                                </tr>
                            </thead>
                            <tbody id="dataTableBody">
                                </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div id="data-placeholder" class="flex-grow bg-gray-900 border border-green-900 rounded-xl shadow-2xl flex items-center justify-center p-4">
                <p class="text-green-600">Tekan tombol di atas untuk menampilkan data historis.</p>
            </div>
        </div>
    </main>
</div>

<script>
    // --- 1. DATA HISTORIS XAU/USD (Sama seperti data asli) ---
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

    const GEMINI_API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent';
    const MAX_RETRIES = 3;

    const xauUsdDataString = JSON.stringify({ rawData, priceData }, null, 2);

    const SYSTEM_INSTRUCTION = `
Anda adalah seorang analis keuangan ahli di pasar Emas (XAU/USD). Tugas Anda adalah menjawab pertanyaan pengguna berdasarkan data historis dan musiman XAU/USD yang disediakan di bawah ini.

1.  Gunakan data ini untuk memberikan analisis yang terperinci dan berwawasan.
2.  Jangan pernah menciptakan data atau fakta yang tidak ada dalam konteks yang diberikan.
3.  Berikan jawaban yang ringkas, profesional, dan dalam Bahasa Indonesia, dengan gaya penulisan seperti terminal analisis.

DATA XAU/USD (Januari 2020 - Oktober 2025):
${xauUsdDataString}

Contoh pertanyaan yang harus Anda jawab:
- "Apa faktor pemicu utama di bulan Maret 2020?"
- "Berapa harga tertinggi (high) XAU/USD di tahun 2024?"
- "Bulan apa yang paling sering 'uptrend' secara musiman dalam data ini?"
`;

    // --- 2. Variabel dan Elemen DOM ---
    const elements = {
        apiKeyInput: document.getElementById('apiKeyInput'),
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
        mainContent: document.getElementById('main-content'),
    };

    let messages = [];
    let isLoading = false;
    let isTableVisible = false;
    let isChatMaximized = false;

    // --- 3. FUNGSI UTILITAS UI ---

    /** Menambah ikon Lucide ke elemen yang baru dimuat */
    const renderLucideIcons = () => {
        window.lucide.createIcons();
    };

    /** Menggulir ke bawah kontainer pesan */
    const scrollToBottom = () => {
        elements.messagesEndRef.scrollIntoView({ behavior: 'smooth' });
    };

    /** Menampilkan indikator loading model */
    const showLoadingIndicator = () => {
        const loadingHtml = `
            <div id="loading-indicator" class="flex justify-start">
                <div class="bg-gray-800 text-green-500 p-3 rounded-tr-xl rounded-b-xl shadow-md flex items-center mb-4 border border-green-900">
                    <i data-lucide="loader-2" class="animate-spin w-4 h-4 mr-2"></i>
                    ANALYZING DATA...
                </div>
            </div>
        `;
        elements.messagesContainer.insertAdjacentHTML('beforeend', loadingHtml);
        renderLucideIcons();
        scrollToBottom();
    };

    /** Menghapus indikator loading model */
    const hideLoadingIndicator = () => {
        const indicator = document.getElementById('loading-indicator');
        if (indicator) {
            indicator.remove();
        }
    };

    /** Menampilkan pesan error */
    const showError = (message) => {
        elements.errorMessage.querySelector('p').textContent = message;
        elements.errorMessage.classList.remove('hidden');
    };

    /** Menghapus pesan error */
    const hideError = () => {
        elements.errorMessage.classList.add('hidden');
    };

    /** Membuat bubble pesan HTML */
    const createMessageBubble = (role, text) => {
        const isUser = role === 'user';
        const bgColor = isUser ? 'bg-green-700 text-white' : 'bg-gray-800 text-green-400 border border-green-900';
        const alignment = isUser ? 'justify-end' : 'justify-start';
        const borderRadius = isUser ? 'rounded-tl-xl rounded-b-xl' : 'rounded-tr-xl rounded-b-xl';

        const bubbleHtml = `
            <div class="flex w-full ${alignment}">
                <div 
                    class="max-w-xs sm:max-w-lg p-3 sm:p-4 mb-4 ${bgColor} ${borderRadius} transition-all duration-300 shadow-xl shadow-black/50"
                    style="white-space: pre-wrap; font-family: inherit;"
                >
                    <p class="font-bold text-sm mb-1">${isUser ? 'USER >' : 'ANALYST >'}</p>
                    ${text}
                </div>
            </div>
        `;
        
        if (elements.initialMessage) elements.initialMessage.remove(); // Hapus pesan awal
        elements.messagesContainer.insertAdjacentHTML('beforeend', bubbleHtml);
        scrollToBottom();
    };

    /** Render data historis ke tabel */
    const renderHistoricalData = () => {
        const html = rawData.map((item, index) => {
            const rowClass = index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900';
            let trendClass = 'text-blue-400';
            if (item.trend.includes('Uptrend')) {
                trendClass = 'text-green-500';
            } else if (item.trend.includes('Downtrend')) {
                trendClass = 'text-red-500';
            }

            return `
                <tr class="${rowClass} hover:bg-green-950 transition-colors duration-150">
                    <td class="p-2 text-green-300">${item.monthYear}</td>
                    <td class="p-2 ${trendClass}">${item.trend}</td>
                    <td class="p-2 text-gray-300 text-xs">${item.factor}</td>
                </tr>
            `;
        }).join('');

        elements.dataTableBody.innerHTML = html;
    };

    // --- 4. FUNGSI API & LOGIKA UTAMA ---

    /** Memanggil API Gemini dengan Exponential Backoff */
    const callGeminiApi = async (contents, apiKey, retryCount = 0) => {
        try {
            const apiUrl = `${GEMINI_API_BASE_URL}?key=${apiKey}`;
            
            const payload = {
                contents: contents,
                config: {
                    systemInstruction: {
                        parts: [{ text: SYSTEM_INSTRUCTION }]
                    }
                }
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                if (response.status === 429 && retryCount < MAX_RETRIES) {
                    const delay = Math.pow(2, retryCount) * 1000 + Math.random() * 1000;
                    console.log(`Rate limit (429). Mencoba ulang dalam ${delay.toFixed(0)}ms...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    return callGeminiApi(contents, apiKey, retryCount + 1);
                }
                
                const errorData = await response.json();
                throw new Error(`Gemini API Error: ${response.status} - ${errorData.error?.message || 'Gagal memanggil API.'}`);
            }

            const result = await response.json();
            const modelResponseText = result.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!modelResponseText) {
                throw new Error("Respon dari model kosong atau tidak terduga.");
            }

            // Tambahkan pesan model ke riwayat
            messages.push({ role: 'model', text: modelResponseText });
            createMessageBubble('model', modelResponseText);
            hideError();

        } catch (err) {
            console.error("Kesalahan dalam pengiriman pesan:", err);
            showError(err.message);
        } finally {
            isLoading = false;
            hideLoadingIndicator();
            updateFormState();
        }
    };

    /** Mengirim pesan */
    const sendMessage = async (e) => {
        e.preventDefault();
        const apiKey = elements.apiKeyInput.value.trim();
        const userMessage = elements.chatInput.value.trim();

        if (!userMessage || isLoading || !apiKey) return;

        elements.chatInput.value = '';
        hideError();
        isLoading = true;
        updateFormState();
        
        // Tambahkan pesan pengguna ke riwayat
        messages.push({ role: 'user', text: userMessage });
        createMessageBubble('user', userMessage);
        showLoadingIndicator();

        // Format riwayat pesan untuk payload API
        const apiContents = messages.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }],
        }));

        await callGeminiApi(apiContents, apiKey);
    };

    // --- 5. FUNGSI PENANGAN EVENT UI ---

    /** Memperbarui status input dan tombol Kirim */
    const updateFormState = () => {
        const apiKey = elements.apiKeyInput.value.trim();
        const inputFilled = elements.chatInput.value.trim().length > 0;
        
        elements.chatInput.disabled = isLoading || !apiKey;
        elements.sendBtn.disabled = isLoading || !apiKey || !inputFilled;

        if (!apiKey) {
             elements.sendBtn.title = "Masukkan API Key terlebih dahulu";
        } else if (isLoading) {
             elements.sendBtn.title = "Sedang menganalisis...";
        } else if (!inputFilled) {
             elements.sendBtn.title = "Ketik pesan untuk mengirim";
        } else {
             elements.sendBtn.title = "Kirim Pesan";
        }
    };

    /** Toggle visibilitas tabel data historis */
    const toggleTableVisibility = () => {
        isTableVisible = !isTableVisible;
        
        if (isTableVisible) {
            elements.historicalDataTable.classList.remove('hidden');
            elements.dataPlaceholder.classList.add('hidden');
            elements.toggleTableBtn.innerHTML = '<i data-lucide="minimize-2" class="inline w-4 h-4 mr-2"></i> Sembunyikan Data Historis';
            elements.toggleTableBtn.classList.remove('bg-green-700', 'hover:bg-green-600', 'shadow-green-900/50');
            elements.toggleTableBtn.classList.add('bg-red-700', 'hover:bg-red-600', 'shadow-red-900/50');
        } else {
            elements.historicalDataTable.classList.add('hidden');
            elements.dataPlaceholder.classList.remove('hidden');
            elements.toggleTableBtn.innerHTML = '<i data-lucide="maximize-2" class="inline w-4 h-4 mr-2"></i> Tampilkan Data Historis';
            elements.toggleTableBtn.classList.remove('bg-red-700', 'hover:bg-red-600', 'shadow-red-900/50');
            elements.toggleTableBtn.classList.add('bg-green-700', 'hover:bg-green-600', 'shadow-green-900/50');
        }
        renderLucideIcons();
    };

    /** Toggle mode Chat Maximized */
    const toggleChatMaximize = () => {
        isChatMaximized = !isChatMaximized;
        
        if (isChatMaximized) {
            elements.mainContent.classList.remove('lg:grid-cols-3');
            elements.mainContent.classList.add('grid-cols-1');
            elements.chatContainer.classList.remove('lg:col-span-2', 'h-[80vh]');
            elements.chatContainer.classList.add('lg:col-span-3', 'h-[85vh]');
            elements.dataColumn.classList.add('hidden'); // Sembunyikan kolom data
            elements.maximizeChatBtn.querySelector('i').setAttribute('data-lucide', 'minimize-2');
            elements.maximizeChatBtn.title = 'Perkecil Tampilan';
        } else {
            elements.mainContent.classList.remove('grid-cols-1');
            elements.mainContent.classList.add('lg:grid-cols-3');
            elements.chatContainer.classList.remove('lg:col-span-3', 'h-[85vh]');
            elements.chatContainer.classList.add('lg:col-span-2', 'h-[80vh]');
            elements.dataColumn.classList.remove('hidden'); // Tampilkan kolom data
            elements.maximizeChatBtn.querySelector('i').setAttribute('data-lucide', 'maximize-2');
            elements.maximizeChatBtn.title = 'Perbesar Chat';
        }
        renderLucideIcons();
    };


    // --- 6. INISIALISASI ---

    const initialize = () => {
        // Render data tabel saat startup
        renderHistoricalData();
        
        // Render Lucide Icons pertama kali
        renderLucideIcons();

        // Setup Event Listeners
        elements.chatForm.addEventListener('submit', sendMessage);
        elements.apiKeyInput.addEventListener('input', updateFormState);
        elements.chatInput.addEventListener('input', updateFormState);
        elements.toggleTableBtn.addEventListener('click', toggleTableVisibility);
        elements.maximizeChatBtn.addEventListener('click', toggleChatMaximize);
        
        // Akses data-column untuk fungsionalitas maximize
        elements.dataColumn = document.getElementById('data-column');

        // Update status form awal
        updateFormState(); 
    };

    // Jalankan inisialisasi setelah DOM dimuat
    document.addEventListener('DOMContentLoaded', initialize);
</script>

</body>
</html>
