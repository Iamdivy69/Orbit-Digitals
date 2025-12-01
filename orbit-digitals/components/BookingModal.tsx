"use client";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

interface BookingModalProps {
  plan: string | null;
  onClose: () => void;
}

export default function BookingModal({ plan, onClose }: BookingModalProps) {
  const [status, setStatus] = useState("Send Request");

  // Close on Escape Key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!plan) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Sending...");

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Add your Web3Forms Key here
    formData.append("access_key", "f4d4da69-2175-4eaf-bf72-fcac84bf89a5"); 
    formData.append("subject", `New Booking Request: ${plan} Plan`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();
      
      if (result.success) {
        setStatus("Request Sent! 🚀");
        setTimeout(() => {
            onClose();
            setStatus("Send Request");
        }, 2000);
      } else {
        setStatus("Error. Try Again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error.");
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-[99999]">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-[#050A14] border border-[#3CB7FF]/30 rounded-3xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-blue-900/10">
            <div>
                <h3 className="text-2xl font-heading font-bold text-white">Book {plan} Plan</h3>
                <p className="text-sm text-gray-400">Complete the details below to start.</p>
            </div>
            <button 
                onClick={onClose}
                className="w-8 h-8 bg-black/50 hover:bg-[#3CB7FF] rounded-full flex items-center justify-center text-white transition-colors"
            >
                <X size={18} />
            </button>
        </div>

        {/* Form */}
        <div className="p-8 bg-[#02060C]">
            <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                    <label className="text-xs font-bold text-[#3CB7FF] uppercase tracking-wider mb-1 block">Name</label>
                    <input type="text" name="name" required placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#3CB7FF] focus:outline-none transition-colors" />
                </div>

                <div>
                    <label className="text-xs font-bold text-[#3CB7FF] uppercase tracking-wider mb-1 block">Email</label>
                    <input type="email" name="email" required placeholder="your@email.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#3CB7FF] focus:outline-none transition-colors" />
                </div>

                <div>
                    <label className="text-xs font-bold text-[#3CB7FF] uppercase tracking-wider mb-1 block">Message</label>
                    <textarea 
                        name="message" 
                        rows={4} 
                        required 
                        defaultValue={`Hi, I am interested in the ${plan} Plan. I would like to discuss the next steps.`}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#3CB7FF] focus:outline-none transition-colors resize-none"
                    ></textarea>
                </div>

                <div className="pt-2">
                    <HoverBorderGradient
                        containerClassName="rounded-xl w-full"
                        as="button"
                        className="bg-[#050A14] text-white w-full flex items-center justify-center font-bold"
                    >
                        <span>{status}</span>
                    </HoverBorderGradient>
                </div>

            </form>
        </div>

      </div>
    </div>
  );
}