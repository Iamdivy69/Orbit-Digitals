"use client";
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("Send Message");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Sending...");

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // ⚠️ REPLACE THIS WITH YOUR WEB3FORMS KEY LATER
    formData.append("access_key", "f4d4da69-2175-4eaf-bf72-fcac84bf89a5"); 

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
       
       <button type="submit" disabled={status === "Sending..."} className="w-full btn-orbit py-4 rounded-lg font-bold text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all">
         {status}
       </button>
    </form>
  );
}