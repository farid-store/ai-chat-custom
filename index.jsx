import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

// URL dasar API Gemini
const GEMINI_API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent';
const MAX_RETRIES = 3;

// Komponen utama aplikasi
const App = () => {
  // State untuk menyimpan API Key
  const [apiKey, setApiKey] = useState(
    // Coba ambil dari localStorage, jika ada (untuk kenyamanan development)
    localStorage.getItem('geminiApiKey') || '' 
  );
  // State untuk menyimpan riwayat pesan
  const [messages, setMessages] = useState([]);
  // State untuk input pesan saat ini
  const [input, setInput] = useState('');
  // State untuk status loading
  const [isLoading, setIsLoading] = useState(false);
  // State untuk menyimpan pesan error
  const [error, setError] = useState(null);

  // Ref untuk menggulir ke pesan terbaru
  const messagesEndRef = useRef(null);

  // Efek untuk menggulir ke bawah setiap kali pesan diperbarui
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Efek untuk menyimpan API Key ke localStorage
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('geminiApiKey', apiKey);
    } else {
      localStorage.removeItem('geminiApiKey');
    }
  }, [apiKey]);


  // Fungsi untuk memanggil API Gemini dengan Exponential Backoff
  const callGeminiApi = useCallback(async (contents, retryCount = 0) => {
    if (!apiKey) {
      setError("Silakan masukkan Gemini API Key Anda.");
      setIsLoading(false);
      return;
    }

    try {
      const apiUrl = `${GEMINI_API_BASE_URL}?key=${apiKey}`;
      
      const payload = {
        contents: contents,
      };

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Logika Exponential Backoff
        if (response.status === 429 && retryCount < MAX_RETRIES) {
          const delay = Math.pow(2, retryCount) * 1000 + Math.random() * 1000;
          console.log(`Rate limit (429). Mencoba ulang dalam ${delay.toFixed(0)}ms...`);
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

      // Tambahkan pesan model ke riwayat
      setMessages(prev => [
        ...prev,
        { role: 'model', text: modelResponseText },
      ]);
      setError(null);

    } catch (err) {
      console.error("Kesalahan dalam pengiriman pesan:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [apiKey]);

  // Fungsi untuk menangani pengiriman pesan
  const sendMessage = useCallback(async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);
    setIsLoading(true);

    // Tambahkan pesan pengguna ke riwayat
    const newMessages = [...messages, { role: 'user', text: userMessage }];
    setMessages(newMessages);

    // Format riwayat pesan untuk payload API
    const apiContents = newMessages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    await callGeminiApi(apiContents);
  }, [input, isLoading, messages, callGeminiApi]);

  // Komponen untuk menampilkan bubble pesan
  const MessageBubble = ({ message }) => {
    const isUser = message.role === 'user';
    const bgColor = isUser ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800 shadow-md';
    const alignment = isUser ? 'ml-auto' : 'mr-auto';
    const borderRadius = isUser ? 'rounded-tl-xl rounded-b-xl' : 'rounded-tr-xl rounded-b-xl';

    return (
      <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div 
          className={`max-w-xs sm:max-w-md p-4 mb-4 ${bgColor} ${alignment} ${borderRadius} transition-all duration-300`}
          style={{ whiteSpace: 'pre-wrap' }} // Mempertahankan format baris baru
        >
          {message.text}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans p-4 sm:p-8">
      
      {/* Header dan Input API Key */}
      <header className="w-full max-w-2xl mx-auto mb-6">
        <h1 className="text-3xl font-extrabold text-indigo-700 text-center mb-4">
          Chat Gemini 2.5 Flash
        </h1>
        <div className="bg-white p-4 rounded-xl shadow-lg border border-indigo-200">
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
            Masukkan API Key Gemini Anda:
          </label>
          <input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
          />
          <p className="mt-2 text-xs text-gray-500 text-center">
            *API Key disimpan secara lokal (localStorage) di browser ini. Untuk deployment Vercel, gunakan Environment Variable.
          </p>
        </div>
      </header>
      
      {/* Area Chat */}
      <main className="flex-grow w-full max-w-2xl mx-auto bg-gray-50 rounded-xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Kontainer Pesan */}
        <div className="flex-grow p-6 overflow-y-auto custom-scrollbar">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
              <p className="text-lg">Selamat datang! Mulai obrolan Anda.</p>
              <p className="text-sm">Tanyakan apa saja kepada Gemini 2.5 Flash.</p>
              
            </div>
          ) : (
            messages.map((msg, index) => (
              <MessageBubble key={index} message={msg} />
            ))
          )}
          
          {/* Indikator Loading Model */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-600 p-3 rounded-tr-xl rounded-b-xl shadow-md flex items-center mb-4">
                <Loader2 className="animate-spin w-4 h-4 mr-2" />
                Gemini sedang berpikir...
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Notifikasi Error */}
        {error && (
          <div className="p-4 bg-red-100 text-red-700 border-t border-red-300">
            <p className="font-semibold">Error:</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={sendMessage} className="p-4 bg-white border-t border-gray-200">
          <div className="flex space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pesan Anda di sini..."
              className="flex-grow p-3 border border-gray-300 rounded-full focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 text-gray-800"
              disabled={isLoading || !apiKey}
            />
            <button
              type="submit"
              className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-200 shadow-md disabled:bg-indigo-300 disabled:cursor-not-allowed"
              disabled={!input.trim() || isLoading || !apiKey}
              title={!apiKey ? "Masukkan API Key terlebih dahulu" : "Kirim Pesan"}
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </form>

      </main>
      
      {/* Custom Scrollbar Style */}
      <style jsx="true">{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default App;
