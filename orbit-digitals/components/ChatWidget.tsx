"use client";
import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, User, Bot } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your Orbit AI assistant. Ask me about our services or pricing.", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. Add User Message
    const userMsg = input;
    setMessages(prev => [...prev, { text: userMsg, sender: "user" }]);
    setInput("");

    // 2. Simulate AI Thinking & Response
    setTimeout(() => {
      const botResponse = getBotResponse(userMsg);
      setMessages(prev => [...prev, { text: botResponse, sender: "bot" }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 flex flex-col bg-[#050A14] border border-[#3CB7FF]/50 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          
          {/* Header */}
          <div className="bg-blue-900/30 p-4 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-bold text-white text-sm">Orbit Agent</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="h-80 overflow-y-auto p-4 space-y-3 bg-black/20">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.sender === "user" 
                    ? "bg-[#3CB7FF]/20 text-white rounded-tr-none border border-[#3CB7FF]/30" 
                    : "bg-white/10 text-white rounded-tl-none border border-white/5"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-[#02060C]">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..." 
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-[#3CB7FF]"
              />
              <button type="submit" className="bg-[#3CB7FF]/20 hover:bg-[#3CB7FF]/40 text-[#3CB7FF] p-2 rounded-full transition-colors">
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-14 h-14 bg-gradient-to-r from-blue-700 to-[#3CB7FF] rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30 hover:scale-105 transition-transform"
      >
        {isOpen ? <X /> : <MessageSquare />}
      </button>
    </div>
  );
}

// Simple Logic for the Bot
function getBotResponse(msg: string) {
  const lowerMsg = msg.toLowerCase();
  
  if (lowerMsg.includes("price") || lowerMsg.includes("cost") || lowerMsg.includes("how much")) {
    return "Our Starter plan begins at ₹25,000. For custom scaling solutions, we offer bespoke pricing.";
  }
  if (lowerMsg.includes("service") || lowerMsg.includes("do")) {
    return "We specialize in Brand Identity, Web Design, Content Production (Reels/Shorts), and Paid Ads.";
  }
  if (lowerMsg.includes("contact") || lowerMsg.includes("email") || lowerMsg.includes("phone")) {
    return "You can email us at orbitdigitals11@gmail.com or call +91 9033240720.";
  }
  if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
    return "Hello! Ready to launch your brand? Ask me anything.";
  }
  
  return "I'm tuned to answer questions about services and pricing. Would you like to book a strategy call?";
}