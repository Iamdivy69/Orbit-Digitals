"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Bot, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: string; parts: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", parts: userMessage }]);
    setIsLoading(true);

    try {
      // Prepare history for API
      const history = messages.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.parts }],
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history }),
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
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[350px] h-[500px] flex flex-col overflow-hidden rounded-2xl border border-[#3CB7FF]/30 shadow-[0_0_30px_rgba(60,183,255,0.15)]"
            style={{ 
              background: "rgba(5, 10, 20, 0.9)", 
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

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
              {messages.length === 0 && (
                <div className="text-center mt-20 space-y-3">
                    <Sparkles className="w-8 h-8 text-[#3CB7FF] mx-auto opacity-50" />
                    <p className="text-gray-400 text-sm">Welcome to Orbit Digitals.<br/>How can we elevate your brand today?</p>
                </div>
              )}
              
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

            {/* Input Area */}
            <div className="p-3 bg-black/40 border-t border-white/10">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-[#3CB7FF]/50 transition-colors placeholder:text-gray-600"
                />
                <button
                  onClick={handleSend}
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
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-[#3CB7FF] to-blue-700 text-white flex items-center justify-center shadow-[0_0_20px_rgba(60,183,255,0.4)] border border-white/20 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full"></div>
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>
    </div>
  );
}