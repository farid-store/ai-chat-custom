<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gemini Terminal Chat Interface</title>
    <!-- Font Terminal: Roboto Mono, sesuai tema Anda -->
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet">
    <!-- Bootstrap (Opsional, untuk utilitas layout) -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Lucide Icons for Send/Loading -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <style>
        /* DARK TERMINAL THEME */
        :root {
            --bg-dark: #111111;
            --accent-neon: #00ff41;
            --secondary-text: #008822;
            --container-bg: #1f1f1f;
            --border-color: #333333;
            --user-bg: #004d12;
            --model-bg: #2a2a2a;
        }

        body {
            background-color: var(--bg-dark);
            color: var(--accent-neon);
            font-family: 'Roboto Mono', Consolas, 'Courier New', monospace;
            padding-top: 20px;
        }
        .container {
            max-width: 800px;
        }
        
        /* Terminal Window Style */
        .terminal-window {
            background-color: var(--container-bg);
            border: 2px solid var(--accent-neon);
            border-radius: 8px;
            box-shadow: 0 0 15px var(--accent-neon);
            height: 70vh; /* Sesuaikan tinggi agar terlihat seperti terminal */
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        /* Message Area */
        #chat-messages {
            flex-grow: 1;
            padding: 1rem;
            overflow-y: auto;
        }
        
        /* Message Bubble Styling */
        .message-bubble {
            margin-bottom: 15px;
            padding: 10px;
            border-radius: 5px;
            max-width: 90%;
            word-wrap: break-word;
            white-space: pre-wrap; /* Mempertahankan format baris baru */
            font-size: 0.9rem;
        }

        .user-message {
            background-color: var(--user-bg);
            color: white; /* Kontras lebih baik */
            margin-left: auto;
            border-top-right-radius: 0;
            border: 1px solid var(--accent-neon);
        }

        .model-message {
            background-color: var(--model-bg);
            color: var(--accent-neon);
            margin-right: auto;
            border-top-left-radius: 0;
            border: 1px solid var(--secondary-text);
        }

        /* Input and Controls */
        #chat-input-area {
            border-top: 1px solid var(--accent-neon);
            padding: 1rem;
            display: flex;
        }
        
        #user-input {
            background-color: transparent;
            border: none;
            color: var(--accent-neon);
            outline: none;
            flex-grow: 1;
            padding: 0.5rem 0.5rem 0.5rem 0;
        }
        
        .send-button {
            background-color: var(--accent-neon);
            color: var(--bg-dark);
            border: none;
            border-radius: 4px;
            padding: 8px 12px;
            transition: background-color 0.2s;
        }

        .send-button:hover:not(:disabled) {
            background-color: #33ff66;
        }
        
        .send-button:disabled {
            background-color: var(--secondary-text);
            cursor: not-allowed;
        }

        /* API Key Input */
        #api-key-input {
            background-color: var(--container-bg);
            color: var(--accent-neon);
            border: 1px solid var(--accent-neon);
            border-radius: 4px;
            padding: 8px;
        }

        /* Loading Spinner */
        .spinner {
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        /* Custom Scrollbar (untuk tema gelap) */
        #chat-messages::-webkit-scrollbar {
            width: 8px;
        }
        #chat-messages::-webkit-scrollbar-track {
            background: var(--container-bg);
        }
        #chat-messages::-webkit-scrollbar-thumb {
            background: var(--secondary-text);
            border-radius: 10px;
        }
        #chat-messages::-webkit-scrollbar-thumb:hover {
            background: var(--accent-neon);
        }
    </style>
</head>
<body>

    <div class="container my-5">
        <h1 class="text-center mb-4" style="color: var(--accent-neon); text-shadow: 0 0 5px var(--accent-neon);">
            <i data-lucide="terminal" style="width: 32px; height: 32px;"></i> Gemini Terminal Chat
        </h1>

        <!-- API Key Input Section -->
        <div class="mb-4 p-3 rounded-lg" style="background-color: var(--container-bg); border: 1px solid var(--border-color);">
            <label for="apiKey" style="color: var(--secondary-text); font-size: 0.85rem;">
                API Key Gemini Anda:
            </label>
            <input
                id="apiKey"
                type="password"
                placeholder="Masukkan AIzaSy..."
                class="form-control mt-1"
                style="background-color: var(--bg-dark); color: var(--accent-neon); border-color: var(--border-color);"
            />
            <small class="form-text text-muted" style="color: var(--secondary-text) !important;">
                Kunci disimpan di browser lokal (localStorage).
            </small>
        </div>

        <!-- Terminal Chat Window -->
        <div class="terminal-window">
            <div id="chat-messages">
                <!-- Pesan akan ditambahkan di sini -->
                <div class="text-center p-4" id="welcome-message" style="color: var(--secondary-text);">
                    <i data-lucide="bot" style="width: 24px; height: 24px; margin-bottom: 10px;"></i><br>
                    [SYSTEM] Terminal Gemini Chat siap. Masukkan kunci dan mulai obrolan Anda.
                </div>
            </div>

            <!-- Error Notification -->
            <div id="error-box" class="p-3 d-none" style="background-color: #550000; color: #ff9999; border-top: 1px solid #ff0000;">
                <strong id="error-text"></strong>
            </div>

            <!-- Input Form -->
            <form id="chat-form" onsubmit="sendMessage(event)">
                <div id="chat-input-area">
                    <span style="color: var(--accent-neon); margin-right: 5px;">user@terminal:~$</span>
                    <input
                        id="user-input"
                        type="text"
                        placeholder="Ketik perintah/pertanyaan..."
                        autocomplete="off"
                    />
                    <button id="send-btn" type="submit" class="send-button" disabled>
                        <i data-lucide="send" style="width: 18px; height: 18px;"></i>
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script>
        // --- Konfigurasi dan Variabel Global ---
        const GEMINI_API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent';
        const MAX_RETRIES = 3;
        
        let messages = [];
        let isLoading = false;

        // --- DOM Elements ---
        const chatMessages = document.getElementById('chat-messages');
        const userInput = document.getElementById('user-input');
        const sendBtn = document.getElementById('send-btn');
        const apiKeyInput = document.getElementById('apiKey');
        const errorBox = document.getElementById('error-box');
        const errorText = document.getElementById('error-text');
        const welcomeMessage = document.getElementById('welcome-message');


        // --- Utility Functions ---

        function scrollToBottom() {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        function updateUIState(loading, key) {
            isLoading = loading;
            const hasKey = !!key;

            userInput.disabled = loading || !hasKey;
            sendBtn.disabled = loading || !userInput.value.trim() || !hasKey;
            apiKeyInput.disabled = loading;
            
            // Perbarui ikon tombol kirim
            sendBtn.innerHTML = loading 
                ? `<i data-lucide="loader-2" class="spinner"></i>`
                : `<i data-lucide="send" style="width: 18px; height: 18px;"></i>`;
            
            lucide.createIcons();
        }

        function displayError(message) {
            errorText.textContent = message;
            errorBox.classList.remove('d-none');
        }

        function clearError() {
            errorText.textContent = '';
            errorBox.classList.add('d-none');
        }
        
        // --- Message Display ---

        function displayMessage(role, text) {
            if (welcomeMessage) welcomeMessage.remove(); // Hapus pesan selamat datang setelah pesan pertama
            
            const bubble = document.createElement('div');
            bubble.className = 'message-bubble';
            
            if (role === 'user') {
                bubble.classList.add('user-message');
            } else {
                bubble.classList.add('model-message');
            }

            // Gunakan innerText atau textContent untuk menghindari injeksi HTML/XSS
            bubble.textContent = text; 
            chatMessages.appendChild(bubble);
            scrollToBottom();
        }

        // --- Core API Logic (Translated from React) ---

        async function callGeminiApi(contents, apiKey, retryCount = 0) {
            clearError();
            if (!apiKey) {
                displayError("Silakan masukkan Gemini API Key Anda.");
                updateUIState(false, apiKey);
                return;
            }

            try {
                const apiUrl = `${GEMINI_API_BASE_URL}?key=${apiKey}`;
                
                const payload = {
                    contents: contents,
                };

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) {
                    // Logika Exponential Backoff
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

                // Tambahkan pesan model ke riwayat dan tampilkan
                messages.push({ role: 'model', text: modelResponseText });
                displayMessage('model', modelResponseText);

            } catch (err) {
                console.error("Kesalahan dalam pengiriman pesan:", err);
                displayError(err.message);
            } finally {
                updateUIState(false, apiKey);
            }
        }

        // --- Main Send Handler ---
        async function sendMessage(e) {
            e.preventDefault();
            const apiKey = apiKeyInput.value.trim();
            const input = userInput.value.trim();
            
            if (!input || isLoading || !apiKey) return;

            const userMessage = input;
            userInput.value = ''; // Kosongkan input
            
            updateUIState(true, apiKey); // Set loading dan nonaktifkan input

            // 1. Tambahkan pesan pengguna ke riwayat dan tampilkan
            messages.push({ role: 'user', text: userMessage });
            displayMessage('user', userMessage);

            // 2. Format riwayat pesan untuk payload API
            const apiContents = messages.map(msg => ({
                role: msg.role === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }],
            }));

            // 3. Panggil API
            await callGeminiApi(apiContents, apiKey);
        }

        // --- Initialization ---

        document.addEventListener('DOMContentLoaded', () => {
            lucide.createIcons();
            
            // 1. Load API Key dari localStorage
            const storedKey = localStorage.getItem('geminiApiKey');
            if (storedKey) {
                apiKeyInput.value = storedKey;
            }

            // 2. Event Listener untuk Input API Key
            apiKeyInput.addEventListener('input', () => {
                const currentKey = apiKeyInput.value.trim();
                if (currentKey) {
                    localStorage.setItem('geminiApiKey', currentKey);
                } else {
                    localStorage.removeItem('geminiApiKey');
                }
                // Perbarui status tombol send
                updateUIState(false, currentKey); 
            });
            
            // 3. Event Listener untuk perubahan input pesan (agar tombol aktif)
            userInput.addEventListener('input', () => {
                updateUIState(isLoading, apiKeyInput.value.trim());
            });

            // 4. Initial UI update
            updateUIState(false, apiKeyInput.value.trim());
        });
    </script>

</body>
</html>
