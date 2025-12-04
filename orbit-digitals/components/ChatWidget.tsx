"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // 1. Initial Welcome Message (This caused the error before)
  const [messages, setMessages] = useState<{ role: string; parts: string }[]>([
    { role: "model", parts: "Systems online! 🚀 I am Orbit AI. How can I help you grow your brand today?" }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const SUGGESTIONS = [
    "💰 Pricing Packages",
    "🚀 Our Services",
    "📞 Book a Call",
    "🌐 Web Development"
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(true);
    }, 4000); 
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]); 

  const handleSend = async (textOverride?: string) => {
    const messageToSend = textOverride || input;
    if (!messageToSend.trim() || isLoading) return;

    // Clear input immediately
    setInput("");
    
    // Add User Message to UI
    setMessages((prev) => [...prev, { role: "user", parts: messageToSend }]);
    setIsLoading(true);

    try {
      // --- FIX: Filter out the first message if it's from the model ---
      // The API history cannot start with a 'model' role.
      const cleanHistory = messages.filter((msg, index) => {
          // If it's the very first message AND it's from the model (our welcome msg), skip it.
          if (index === 0 && msg.role === "model") return false;
          return true;
      });

      // Prepare history for API
      const history = cleanHistory.slice(-10).map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.parts }],
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageToSend, history }),
      });

      const data = await res.json();
      if(data.error) throw new Error(data.error);

      setMessages((prev) => [...prev, { role: "model", parts: data.response }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: "model", parts: "Signal lost. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
      
      {/* HINT BUBBLE */}
      <AnimatePresence>
        {showHint && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="relative bg-white text-black px-4 py-3 rounded-xl shadow-lg border border-[#3CB7FF] max-w-[200px]"
          >
            <button 
                onClick={() => setShowHint(false)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
            >
                <X size={12} />
            </button>
            <p className="text-xs font-bold leading-relaxed">
              Have questions? <br/>
              <span className="text-[#0A2A88]">Ask Orbit AI anything!</span>
            </p>
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white rotate-45 border-b border-r border-[#3CB7FF]"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[350px] h-[550px] flex flex-col overflow-hidden rounded-2xl border border-[#3CB7FF]/30 shadow-[0_0_30px_rgba(60,183,255,0.15)]"
            style={{ 
              background: "rgba(5, 10, 20, 0.95)", 
              backdropFilter: "blur(16px)" 
            }}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#3CB7FF]/20 flex items-center justify-center text-[#3CB7FF]">
                    <Bot size={18} />
                </div>
                <div>
                    <h3 className="text-white font-bold text-sm">Orbit AI</h3>
                    <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider">Online</span>
                    </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div 
                    className={`max-w-[85%] p-3 text-sm leading-relaxed ${
                        msg.role === "user" 
                        ? "bg-[#3CB7FF] text-black font-medium rounded-2xl rounded-tr-none" 
                        : "bg-white/10 text-gray-200 border border-white/5 rounded-2xl rounded-tl-none"
                    }`}
                  >
                    {msg.parts}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                    <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none flex gap-2 items-center text-xs text-[#3CB7FF]">
                        <Loader2 className="animate-spin w-3 h-3" />
                        <span>Thinking...</span>
                    </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips */}
            {messages.length < 3 && !isLoading && (
                <div className="px-4 pb-2">
                    <p className="text-xs text-gray-500 mb-2 font-medium">Suggested:</p>
                    <div className="flex flex-wrap gap-2">
                        {SUGGESTIONS.map((text) => (
                            <button
                                key={text}
                                onClick={() => handleSend(text)}
                                className="text-xs bg-white/5 hover:bg-[#3CB7FF] hover:text-black border border-white/10 rounded-full px-3 py-1.5 text-gray-300 transition-all duration-200"
                            >
                                {text}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Input Area */}
            <div className="p-3 bg-black/40 border-t border-white/10">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me anything..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-[#3CB7FF]/50 transition-colors placeholder:text-gray-600"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#3CB7FF] text-black rounded-lg hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={14} strokeWidth={3} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
            setIsOpen(!isOpen);
            setShowHint(false);
        }}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-[#3CB7FF] to-blue-700 text-white flex items-center justify-center shadow-[0_0_20px_rgba(60,183,255,0.4)] border border-white/20 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full"></div>
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </div>
  );
}