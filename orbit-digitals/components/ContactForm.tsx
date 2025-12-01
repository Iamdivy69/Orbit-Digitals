"use client";
import { useState } from "react";
// 1. Import the new Button Component
import { HoverBorderGradient } from "./ui/hover-border-gradient";

export default function ContactForm() {
  const [status, setStatus] = useState("Send Message");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Sending...");

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // ⚠️ REPLACE THIS WITH YOUR ACTUAL ACCESS KEY
    formData.append("access_key", "d3970ddf-cf3d-4f05-963f-107b5aeea4dd"); 

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const result = await response.json();
      
      if (result.success) {
        setStatus("Message Sent! 🚀");
        form.reset();
        setTimeout(() => setStatus("Send Message"), 3000);
      } else {
        setStatus("Error. Try Again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error. Check Internet.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-2xl space-y-6 border border-white/10 relative z-20">
       <div>
         <label className="text-sm text-gray-400 font-medium ml-1">Name</label>
         <input type="text" name="name" required placeholder="John Doe" className="w-full mt-2 p-3 bg-black/40 border border-gray-700 rounded-lg text-white focus:border-[#3CB7FF] outline-none transition-colors" />
       </div>
       
       <div>
         <label className="text-sm text-gray-400 font-medium ml-1">Email</label>
         <input type="email" name="email" required placeholder="john@example.com" className="w-full mt-2 p-3 bg-black/40 border border-gray-700 rounded-lg text-white focus:border-[#3CB7FF] outline-none transition-colors" />
       </div>
       
       <div>
         <label className="text-sm text-gray-400 font-medium ml-1">Project Details</label>
         <textarea name="message" rows={4} required placeholder="Tell us about your project..." className="w-full mt-2 p-3 bg-black/40 border border-gray-700 rounded-lg text-white focus:border-[#3CB7FF] outline-none transition-colors resize-none"></textarea>
       </div>
       
       {/* UPDATED BUTTON */}
       <div className="w-full pt-2">
         <HoverBorderGradient
            containerClassName="rounded-full w-full"
            as="button"
            className="bg-[#050A14] text-white w-full flex items-center justify-center font-bold tracking-wide"
            // Passing necessary button props
            {...{ type: "submit", disabled: status === "Sending..." }}
         >
            <span>{status}</span>
         </HoverBorderGradient>
       </div>
    </form>
  );
}