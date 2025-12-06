"use client";
import { useState, useId, useRef, useEffect } from "react";
import { Mail, Phone, MapPin, Check, X, Download, Play } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import ContactForm from "../components/ContactForm";
import { servicesData } from "../lib/data";
import { HoverBorderGradient } from "../components/ui/hover-border-gradient";
import { FlipWords } from "../components/ui/flip-words";

export default function Home() {
  const [active, setActive] = useState<(typeof servicesData)[number] | boolean | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // UPDATED STATE: Tracks both the URL and whether it's a video
  const [selectedMedia, setSelectedMedia] = useState<{ url: string; type: 'video' | 'image' } | null>(null);

  const serviceModalRef = useRef<HTMLDivElement>(null);
  const quoteModalRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const flipWords = ["moves customers", "scales brands", "captures leads", "drives sales"];

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
        setIsQuoteModalOpen(false);
        setSelectedMedia(null); // Close lightbox on ESC
      }
    }
    // Lock scroll if any modal is open
    if ((active && typeof active === "object") || isQuoteModalOpen || selectedMedia) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, isQuoteModalOpen, selectedMedia]);

  useOutsideClick(serviceModalRef as React.RefObject<HTMLDivElement>, () => setActive(null));

  useOutsideClick(quoteModalRef as React.RefObject<HTMLDivElement>, () => {
    setIsQuoteModalOpen(false);
    setSelectedPlan(null);
  });

  return (
    <main className="min-h-screen container mx-auto px-4 overflow-hidden">

      {/* --- EXPANDABLE CARD OVERLAY (Modal) --- */}
      <AnimatePresence>
        {active && typeof active === "object" && (
          <div className="fixed inset-0 grid place-items-center z-[100]">

            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="absolute inset-0 bg-black/95 h-full w-full"
              onClick={() => setActive(null)}
            />

            {/* MAIN CARD */}
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={serviceModalRef}
              transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.8 }}
              className="w-full max-w-4xl h-full md:h-auto md:max-h-[80vh] flex flex-col md:flex-row bg-[#050A14] border border-[#3CB7FF]/50 sm:rounded-3xl overflow-hidden shadow-2xl relative z-10"
            >

              {/* CLOSE BUTTON */}
              <button
                className="absolute top-6 right-6 bg-black/50 p-2 rounded-full z-50 text-white hover:text-[#3CB7FF] transition-colors hover:bg-white/10"
                onClick={() => setActive(null)}
              >
                <X size={24} />
              </button>

              {/* LEFT SIDE (Icon & Title) */}
              <div className="relative p-8 pt-16 md:pt-8 md:w-1/3 flex flex-col items-center justify-center bg-blue-900/10 border-b md:border-b-0 md:border-r border-white/10">
                {active.icon && (
                  <motion.div layoutId={`icon-${active.title}-${id}`} className="w-20 h-20 bg-[#3CB7FF]/20 rounded-2xl flex items-center justify-center text-[#3CB7FF] mb-4">
                    <active.icon size={40} />
                  </motion.div>
                )}
                <h3 className="font-heading font-bold text-2xl text-center text-white">
                  {active.title}
                </h3>
              </div>

              {/* RIGHT SIDE (Content) */}
              <div className="flex flex-col md:w-2/3 relative bg-[#050A14]">

                {/* SCROLLABLE AREA */}
                <div className="flex-1 overflow-y-auto p-8 md:pt-20 custom-scrollbar">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.1 } }}
                    exit={{ opacity: 0, transition: { duration: 0.05 } }}
                    className="flex flex-col h-full"
                  >
                    <p className="text-gray-400 text-base leading-relaxed mb-8">
                      {active.description}
                    </p>

                    <div className="flex-grow space-y-8">
                      <div>
                        <h4 className="text-sm font-bold text-[#3CB7FF] uppercase tracking-wider mb-3">Includes</h4>
                        <ul className="space-y-2">
                          {active.features?.map((feature: string, i: number) => (
                            <li key={i} className="flex items-start text-gray-300 text-sm">
                              <span className="text-[#3CB7FF] mr-2">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-[#3CB7FF] uppercase tracking-wider mb-3">Recent Projects</h4>
                        {/* GRID: Always standard 16:9 so layouts don't break */}
                        <div className="grid grid-cols-2 gap-3 min-h-[100px] items-start">
                          {active.projects
                            ?.slice(0, active.title === 'Brand Identity' ? 2 : active.projects.length)
                            .map((project: any, i: number) => (
                              <div
                                key={i}
                                className="aspect-video relative rounded-lg overflow-hidden border border-white/10 bg-[#0A0F1C] group cursor-zoom-in"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Handle selection based on type
                                  if (project.video) {
                                    setSelectedMedia({ url: project.video, type: 'video' });
                                  } else {
                                    setSelectedMedia({ url: project.img, type: 'image' });
                                  }
                                }}
                              >
                                {/* Text Placeholder */}
                                <div className="absolute inset-0 flex items-center justify-center text-gray-600 text-xs font-mono uppercase tracking-widest z-0">
                                  {project.title}
                                </div>

                                {/* CONDITIONAL RENDERING: GRID VIEW */}
                                {project.video ? (
                                  <div className="w-full h-full relative">
                                    {/* Video in grid is cropped (object-cover) to fit 16:9 card */}
                                    <video
                                      src={project.video}
                                      className="object-cover w-full h-full relative z-20 pointer-events-none" // Disable pointer events so click goes to parent
                                      muted
                                      loop
                                      playsInline
                                    // Auto-play on hover could go here, but kept simple for now
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center z-30">
                                      <div className="bg-black/50 p-2 rounded-full backdrop-blur-sm">
                                        <Play size={16} className="text-white fill-white" />
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <img
                                      src={project.img}
                                      alt={project.title}
                                      className="object-cover w-full h-full relative z-10 transition-transform duration-500 group-hover:scale-105"
                                      onError={(e) => e.currentTarget.style.display = 'none'}
                                      loading="eager"
                                    />
                                    <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                      <span className="text-xs font-bold text-white text-center px-2">{project.title}</span>
                                    </div>
                                  </>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>

                    {/* FOOTER ACTIONS */}
                    <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4">
                      {active.pdf && (
                        <a
                          href={active.pdf}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button className="w-full py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#3CB7FF]/50 text-white font-bold flex items-center justify-center gap-2 transition-all group">
                            <Download size={20} className="text-[#3CB7FF] group-hover:scale-110 transition-transform" />
                            <span>Brochure</span>
                          </button>
                        </a>
                      )}

                      <a href="#contact" onClick={() => setActive(null)} className="flex-[2]">
                        <HoverBorderGradient
                          containerClassName="rounded-xl w-full"
                          as="button"
                          className="bg-[#050A14] text-white flex items-center justify-center w-full gap-2 font-bold tracking-wide py-4"
                        >
                          <span>Start This Project</span>
                        </HoverBorderGradient>
                      </a>
                    </div>

                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isQuoteModalOpen && (
          <QuoteModal
            planTitle={selectedPlan}
            onClose={() => {
              setIsQuoteModalOpen(false);
              setSelectedPlan(null);
            }}
            modalRef={quoteModalRef as React.RefObject<HTMLDivElement>}
          />
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center relative z-20">

        <h1 className="text-5xl md:text-8xl font-hero font-black mb-8 tracking-widest uppercase hero-title-animated leading-tight text-center">
          ORBIT DIGITALS
        </h1>

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
      <motion.section
        id="services"
        className="py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants as any}
      >
        <div className="text-center mb-20">
          <h2 className="text-4xl font-heading font-bold text-white mb-6">Our Services</h2>
          <div className="h-1.5 w-24 bg-[#3CB7FF] mx-auto rounded-full shadow-[0_0_15px_#3CB7FF]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <ServiceCard
              key={service.id}
              id={id}
              service={service}
              onClick={() => setActive(service)}
            />
          ))}
        </div>
      </motion.section>

      {/* PRICING SECTION */}
      <motion.section
        id="pricing"
        className="py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants as any}
      >
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
            onGetQuote={() => { setSelectedPlan("Starter"); setIsQuoteModalOpen(true); }}
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
            onGetQuote={() => { setSelectedPlan("Medium"); setIsQuoteModalOpen(true); }}
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
            onGetQuote={() => { setSelectedPlan("Custom Project"); setIsQuoteModalOpen(true); }}
          />
        </div>
      </motion.section>

      {/* CONTACT SECTION */}
      <motion.section
        id="contact"
        className="py-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants as any}
      >
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
      </motion.section>

      {/* --- FULL SCREEN LIGHTBOX --- */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setSelectedMedia(null)}
          >
            <button
              className="fixed top-6 right-6 z-[100000] text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all backdrop-blur-md"
              onClick={() => setSelectedMedia(null)}
            >
              <X size={32} />
            </button>

            {/* CONDITIONAL RENDER: VIDEO VS IMAGE */}
            {selectedMedia.type === 'video' ? (
              <motion.video
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={selectedMedia.url}
                controls
                autoPlay
                // ENFORCED 9:16 ASPECT RATIO HERE
                className="max-w-full max-h-[90vh] aspect-[9/16] object-contain shadow-2xl bg-black rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={selectedMedia.url}
                alt="Full Screen Project"
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

/* --- HELPER COMPONENTS --- */

function ContactItem({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) {
  return (
    <div className="flex items-start gap-5">
      <div className="bg-[#3CB7FF]/10 p-3 rounded-full border border-[#3CB7FF]/20 text-[#3CB7FF]">{icon}</div>
      <div>
        <h3 className="font-bold text-white text-lg">{title}</h3>
        <p className="text-gray-400">{text}</p>
      </div>
    </div>
  );
}

function ServiceCard({ service, id, onClick }: { service: (typeof servicesData)[number], id: string, onClick: () => void }) {
  return (
    <motion.div layoutId={`card-${service.title}-${id}`} onClick={onClick} className="cursor-pointer glass-panel p-8 rounded-3xl border border-white/10 hover:border-[#3CB7FF]/60 transition-all duration-300 group flex flex-col h-full hover:shadow-[0_0_40px_-15px_rgba(60,183,255,0.3)]">
      <motion.div className="relative z-10 flex flex-col h-full">
        {service.icon && (
          <motion.div layoutId={`icon-${service.title}-${id}`} className="w-16 h-16 bg-[#3CB7FF]/10 border border-[#3CB7FF]/20 rounded-2xl flex items-center justify-center text-[#3CB7FF] mb-6 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_-5px_rgba(60,183,255,0.2)]">
            <service.icon />
          </motion.div>
        )}
        <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-[#3CB7FF] transition-colors">{service.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed flex-grow">
          {service.description}
        </p>
        <motion.div className="mt-6 text-xs font-bold text-[#3CB7FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          View Projects →
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function QuoteModal({ planTitle, onClose, modalRef }: { planTitle: string | null, onClose: () => void, modalRef: React.RefObject<HTMLDivElement> }) {
  return (
    <div className="fixed inset-0 grid place-items-center z-[100]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/90 backdrop-blur-sm h-full w-full"
        onClick={onClose}
      />
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-lg bg-[#050A14] border border-[#3CB7FF]/50 rounded-3xl shadow-2xl p-8 m-4"
      >
        <button
          className="absolute top-4 right-4 bg-black/50 p-2 rounded-full z-50 text-white hover:text-[#3CB7FF] transition-colors"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <div className="text-center mb-6">
          <h2 className="text-3xl font-heading font-bold text-white mb-2">Get a Quote</h2>
          <p className="text-gray-400">
            Inquiring for the <span className="text-[#3CB7FF] font-semibold">{planTitle || 'Custom'}</span> plan.
          </p>
        </div>
        <ContactForm />
      </motion.div>
    </div>
  );
}

function PricingCard({ title, desc, features, onGetQuote }: { title: string, desc: string, features: string[], onGetQuote: () => void }) {
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  return (
    <div
      className={`glass-panel p-10 rounded-3xl border transition-all duration-300 h-full flex flex-col
                ${isButtonHovered
          ? "border-white/10 shadow-none"
          : "border-white/10 hover:border-[#3CB7FF] hover:shadow-[0_0_40px_rgba(60,183,255,0.1)]"
        }
            `}
    >
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

      <div
        className="w-full pt-4 mt-auto"
        onClick={onGetQuote}
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
      >
        <HoverBorderGradient
          containerClassName="rounded-full w-full"
          as="button"
          className="bg-[#050A14] text-white w-full flex items-center justify-center"
        >
          <span className="text-center w-full">Get Quote</span>
        </HoverBorderGradient>
      </div>
    </div>
  );
}