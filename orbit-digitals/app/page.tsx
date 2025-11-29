"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, Check } from "lucide-react";
import ContactForm from "../components/ContactForm"; 
import Typewriter from "../components/Typewriter";
import RevealOnScroll from "../components/RevealOnScroll";
import ServiceModal from "../components/ServiceModal"; 
import { servicesData } from "../lib/data"; 

export default function Home() {
  const [selectedService, setSelectedService] = useState<any>(null);

  return (
    <main className="min-h-screen container mx-auto px-4 overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center relative z-20">
        
        {/* UPDATED: Uses 'font-hero' (Dela Gothic) */}
        <h1 className="text-5xl md:text-8xl font-hero font-bold mb-8 tracking-tight hero-title-animated leading-tight">
  ORBIT DIGITALS
</h1>
        
        <div className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-12 leading-relaxed h-24 sm:h-auto flex flex-col items-center">
          <span>Social creative that <Typewriter />.</span>
          <span className="block mt-3 text-lg opacity-80">We build digital gravity that pulls the world into your ecosystem.</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <a href="#contact" className="btn-orbit px-10 py-4 rounded-full font-bold text-white shadow-lg shadow-blue-500/20 text-center hover:scale-105 transition-transform">
            Start a Project
          </a>
          <a href="#services" className="px-10 py-4 rounded-full font-bold text-white border border-gray-700 hover:bg-white/5 hover:border-[#3CB7FF] transition-all text-center">
            View Our Work
          </a>
        </div>
      </section>

      {/* SERVICES GRID */}
      <RevealOnScroll>
        <section id="services" className="py-24">
            <div className="text-center mb-20">
                {/* Uses 'font-heading' (Space Grotesk) */}
                <h2 className="text-4xl font-heading font-bold text-white mb-6">Our Services</h2>
                <div className="h-1.5 w-24 bg-[#3CB7FF] mx-auto rounded-full shadow-[0_0_15px_#3CB7FF]"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {servicesData.map((service) => (
                    <div 
                        key={service.id}
                        onClick={() => setSelectedService(service)}
                        className="glass-panel p-8 rounded-3xl hover:-translate-y-3 transition-transform duration-300 cursor-pointer group border border-white/5 hover:border-[#3CB7FF]/50 hover:shadow-[0_0_30px_rgba(60,183,255,0.15)] flex flex-col"
                    >
                        <div className="w-16 h-16 bg-blue-900/20 border border-blue-500/20 rounded-2xl flex items-center justify-center text-[#3CB7FF] mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(60,183,255,0.1)]">
                            <service.icon />
                        </div>
                        <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-[#3CB7FF] transition-colors">{service.title}</h3>
                        
                        {/* Description as Bullets */}
                        <ul className="space-y-2 mb-6 border-b border-white/5 pb-6">
                            {service.description.split('.').map((sentence, i) => (
                                sentence.trim().length > 0 && (
                                    <li key={i} className="flex items-start text-sm text-gray-400 leading-relaxed">
                                        <span className="text-[#3CB7FF] mr-2 mt-1 leading-none">•</span>
                                        {sentence.trim()}.
                                    </li>
                                )
                            ))}
                        </ul>

                        {/* Features as Paragraph */}
                        <div className="flex-1 mb-6">
                            <p className="text-xs text-gray-500 leading-relaxed">
                                <span className="font-bold text-[#3CB7FF] uppercase tracking-wide">Includes: </span>
                                {service.features.join(', ')}
                            </p>
                        </div>

                        <div className="mt-auto text-xs font-bold text-[#3CB7FF] opacity-0 group-hover:opacity-100 transition-opacity">
                            View Projects →
                        </div>
                    </div>
                ))}
            </div>
        </section>
      </RevealOnScroll>

      {/* PRICING SECTION */}
      <RevealOnScroll>
        <section id="pricing" className="py-24">
            <div className="text-center mb-20">
                <h2 className="text-4xl font-heading font-bold text-white mb-6">Investment Plans</h2>
                <div className="h-1.5 w-24 bg-[#3CB7FF] mx-auto rounded-full shadow-[0_0_15px_#3CB7FF]"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                {/* 1. Starter */}
                <PricingCard 
                    title="Starter" 
                    desc="Best for small cafes, local shops, or personal brands just starting."
                    features={[
                        "Instagram OR Facebook",
                        "25 Static Graphics (Products/Offers)",
                        "One-time Profile Optimization",
                        "All types of Printables included",
                        "Bonus: Festive Posts & Stories"
                    ]}
                />
                
                {/* 2. Medium */}
                <PricingCard 
                    title="Medium" 
                    desc="For businesses that need video & Reels to grow but can't edit themselves."
                    features={[
                        "Instagram & Facebook (Linked)",
                        "4 High-Quality Reels (Shoot & Edit)",
                        "21 Graphic Posts/Carousels",
                        "Scheduling, Captions & 1 Basic Ad Setup",
                        "Bonus: Festive Posts & Special Requests"
                    ]}
                />

                {/* 3. Custom Project */}
                <PricingCard 
                    title="Custom Project" 
                    desc="Enterprise solutions tailored exactly to your brand's specific needs and goals."
                    features={[
                        "Custom Strategy & Brand Roadmap",
                        "Full-Stack Development (Web & App)",
                        "End-to-End Content Production",
                        "Advanced AI & Automation Integration",
                        "Dedicated Account Manager & Team"
                    ]}
                />
            </div>
        </section>
      </RevealOnScroll>

      {/* CONTACT SECTION */}
      <RevealOnScroll>
        <section id="contact" className="py-24">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div className="space-y-10 mt-6">
                        <div>
                            <h2 className="text-5xl font-heading font-bold text-white mb-6">Let's orbit together.</h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Ready to launch your next project? Fill out the form or reach us directly.
                            </p>
                        </div>
                        <div className="space-y-8">
                            <ContactItem icon={<Mail />} title="Email Us" text="orbitdigitals11@gmail.com" />
                            <ContactItem icon={<Phone />} title="Call Us" text="+91 9033240720" />
                            <ContactItem icon={<MapPin />} title="Location" text="Vadodara, Gujarat, India" />
                        </div>
                    </div>
                    <ContactForm />
                </div>
            </div>
        </section>
      </RevealOnScroll>

      <ServiceModal 
        isOpen={!!selectedService}
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />

    </main>
  );
}

/* --- HELPER COMPONENTS --- */
function PricingCard({ title, desc, features }: { title: string, desc: string, features: string[] }) {
    return (
        <div className="glass-panel p-10 rounded-3xl border border-white/10 hover:border-[#3CB7FF] transition-colors flex flex-col hover:shadow-[0_0_40px_rgba(60,183,255,0.1)] duration-300">
            <h3 className="text-3xl font-heading font-bold text-white mb-6">{title}</h3>
            
            <p className="text-sm text-gray-400 mb-8 border-b border-white/10 pb-8">{desc}</p>
            
            <ul className="space-y-4 mb-10 flex-1">
                {features.map((item, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-300">
                        <span className="bg-[#3CB7FF]/20 p-1 rounded-full mr-3 text-[#3CB7FF]">
                            <Check size={12} strokeWidth={3} />
                        </span> 
                        {item}
                    </li>
                ))}
            </ul>
            
            <button className="w-full btn-orbit py-4 rounded-full font-bold text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all">
                Book Now
            </button>
        </div>
    );
}

function ContactItem({ icon, title, text }: { icon: any, title: string, text: string }) {
    return (
        <div className="flex items-center gap-6 group">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-[#3CB7FF] group-hover:bg-[#3CB7FF] group-hover:text-white transition-colors duration-300 shadow-lg">
                {icon}
            </div>
            <div>
                <h4 className="text-white font-heading font-bold text-lg mb-1">{title}</h4>
                <p className="text-gray-400 group-hover:text-[#3CB7FF] transition-colors">{text}</p>
            </div>
        </div>
    );
}