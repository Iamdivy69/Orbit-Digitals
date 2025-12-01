"use client";
import { useState, useId, useRef, useEffect } from "react";
import { Mail, Phone, MapPin, Check, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import ContactForm from "../components/ContactForm"; 
import RevealOnScroll from "../components/RevealOnScroll";
import { servicesData } from "../lib/data"; 
import { GlowingEffect } from "../components/ui/glowing-effect";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";
import { FlipWords } from "../components/ui/flip-words";

export default function Home() {
  const [active, setActive] = useState<(typeof servicesData)[number] | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  // Words for the Flip Effect
  const flipWords = ["moves customers", "scales brands", "captures leads", "drives sales"];

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }
    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <main className="min-h-screen container mx-auto px-4 overflow-hidden">
      
      {/* --- EXPANDABLE CARD OVERLAY --- */}
      <AnimatePresence>
        {active && typeof active === "object" && (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm h-full w-full"
            />
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-[#050A14] border border-[#3CB7FF]/50 sm:rounded-3xl overflow-hidden shadow-2xl relative"
            >
              <button
                className="absolute top-4 right-4 bg-black/50 p-2 rounded-full z-50 text-white hover:text-[#3CB7FF] transition-colors"
                onClick={() => setActive(null)}
              >
                <X size={20} />
              </button>

              <div className="relative h-60 bg-blue-900/10 flex items-center justify-center border-b border-white/10">
                 <motion.div layoutId={`icon-${active.title}-${id}`} className="w-20 h-20 bg-[#3CB7FF]/20 rounded-2xl flex items-center justify-center text-[#3CB7FF]">
                    <active.icon size={40} />
                 </motion.div>
              </div>

              <div className="flex flex-col p-8 h-full overflow-auto">
                <motion.h3 
                  layoutId={`title-${active.title}-${id}`}
                  className="font-heading font-bold text-3xl text-white mb-4"
                >
                  {active.title}
                </motion.h3>
                <motion.p 
                  layoutId={`desc-${active.title}-${id}`}
                  className="text-gray-400 text-base leading-relaxed mb-8"
                >
                  {active.description}
                </motion.p>

                <div className="space-y-6">
                    <div>
                        <h4 className="text-sm font-bold text-[#3CB7FF] uppercase tracking-wider mb-3">Includes</h4>
                        <ul className="space-y-2">
                            {active.features.map((feature: string, i: number) => (
                                <li key={i} className="flex items-start text-gray-300 text-sm">
                                    <span className="text-[#3CB7FF] mr-2">•</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-[#3CB7FF] uppercase tracking-wider mb-3">Recent Projects</h4>
                        <div className="grid grid-cols-2 gap-3">
                            {active.projects.map((project: any, i: number) => (
                                <div key={i} className="aspect-video relative rounded-lg overflow-hidden border border-white/10">
                                    <img src={project.img} alt={project.title} className="object-cover w-full h-full" />
                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                        <span className="text-xs font-bold text-white">{project.title}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <a href="#contact" onClick={() => setActive(null)} className="mt-8 w-full block">
                    <HoverBorderGradient
                        containerClassName="rounded-xl w-full"
                        as="button"
                        className="bg-[#050A14] text-white flex items-center justify-center w-full gap-2"
                    >
                        <span>Start This Project</span>
                    </HoverBorderGradient>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center relative z-20">
        
        {/* MAIN TITLE - ANIMATED */}
        <h1 className="text-5xl md:text-8xl font-hero font-black mb-8 tracking-widest uppercase hero-title-animated leading-tight text-center">
          ORBIT DIGITALS
        </h1>
        
        {/* Subtext Section */}
        <div className="flex flex-col items-center mb-12 max-w-4xl mx-auto space-y-6">
          <div className="text-2xl md:text-4xl font-heading font-medium text-white flex flex-wrap justify-center gap-x-2 leading-relaxed items-center">
            <span>Social creative that</span>
            <FlipWords 
              words={flipWords} 
              className="text-[#3CB7FF] font-bold" 
            />
          </div>
          <p className="text-lg md:text-xl text-gray-400 font-sans max-w-2xl opacity-90">
            We build digital gravity that pulls the world into your ecosystem.
          </p>
        </div>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center">
          <a href="#contact">
            <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="bg-[#050A14] text-white flex items-center space-x-2 px-8"
            >
                <span>Start a Project</span>
            </HoverBorderGradient>
          </a>
          
          <a href="#services">
            <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="bg-[#050A14] text-white flex items-center space-x-2 px-8"
            >
                <span>View Our Work</span>
            </HoverBorderGradient>
          </a>
        </div>
      </section>

      {/* SERVICES GRID */}
      <RevealOnScroll>
        <section id="services" className="py-24">
            <div className="text-center mb-20">
                <h2 className="text-4xl font-heading font-bold text-white mb-6">Our Services</h2>
                <div className="h-1.5 w-24 bg-[#3CB7FF] mx-auto rounded-full shadow-[0_0_15px_#3CB7FF]"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {servicesData.map((service) => (
                    <div key={service.id} onClick={() => setActive(service)} className="cursor-pointer h-full">
                        <ServiceCard 
                            icon={<service.icon />} 
                            title={service.title} 
                            desc={service.description} 
                        />
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

    </main>
  );
}

/* --- HELPER COMPONENTS --- */

function ServiceCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div className="relative h-full rounded-3xl p-0.5 group"> 
            <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                className="rounded-3xl z-0"
            />
            <div className="relative z-10 glass-panel p-8 rounded-3xl h-full border border-white/5 flex flex-col hover:bg-black/40 transition-colors">
                <div className="w-16 h-16 bg-blue-900/20 border border-blue-500/20 rounded-2xl flex items-center justify-center text-[#3CB7FF] mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(60,183,255,0.1)]">
                    {icon}
                </div>
                <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-[#3CB7FF] transition-colors">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 border-b border-white/5 pb-6">
                    {desc}
                </p>
                <div className="mt-auto text-xs font-bold text-[#3CB7FF] opacity-0 group-hover:opacity-100 transition-opacity">
                    View Projects →
                </div>
            </div>
        </div>
    );
}

function PricingCard({ title, desc, features }: { title: string, desc: string, features: string[] }) {
    return (
        <div className="glass-panel p-10 rounded-3xl border border-white/10 hover:border-[#3CB7FF] transition-colors flex flex-col hover:shadow-[0_0_40px_rgba(60,183,255,0.1)] duration-300 h-full">
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
            <div className="w-full pt-4 mt-auto">
                <HoverBorderGradient
                    containerClassName="rounded-full w-full"
                    as="button"
                    className="bg-[#050A14] text-white w-full flex items-center justify-center"
                >
                    <span className="text-center w-full">Book Now</span>
                </HoverBorderGradient>
            </div>
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