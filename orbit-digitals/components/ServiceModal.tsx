"use client";
import { X, ArrowRight, Layers } from "lucide-react";
import { useEffect } from "react";

interface Project {
  title: string;
  img: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  projects: Project[];
}

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
}

export default function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 99999 }}>
      
      {/* Dark Backdrop */}
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* CARD FRAME (Static - Does NOT Scroll) */}
      <div className="relative w-full max-w-5xl bg-[#050A14] border border-[#3CB7FF]/30 rounded-3xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-300 max-h-[85vh] overflow-hidden">
        
        {/* CLOSE BUTTON (Stays Sticky at Top Right) */}
        <div className="absolute top-0 right-0 p-4 z-50 pointer-events-none"> 
            {/* pointer-events-none allows clicking through the padding area, button sets it back to auto */}
            <button 
            onClick={onClose}
            className="w-10 h-10 bg-black/80 hover:bg-[#3CB7FF] border border-white/20 rounded-full flex items-center justify-center text-white transition-colors pointer-events-auto shadow-lg"
            >
            <X size={20} />
            </button>
        </div>

        {/* SCROLLABLE CONTENT AREA */}
        <div className="overflow-y-auto flex flex-col md:flex-row h-full">
            
            {/* LEFT SIDE: Info */}
            <div className="p-8 md:p-12 md:w-5/12 border-b md:border-b-0 md:border-r border-white/10 bg-blue-900/10 relative md:sticky md:top-0 h-fit min-h-min">
            <h3 className="text-3xl font-heading font-bold text-white mb-6 pr-8">{service.title}</h3>
            <p className="text-gray-300 leading-relaxed mb-8 text-lg">{service.description}</p>
            
            <div className="space-y-4">
                <h4 className="text-sm font-bold text-[#3CB7FF] uppercase tracking-wider">What We Do</h4>
                <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-gray-300">
                            <span className="text-[#3CB7FF] mr-3 text-xl leading-none">•</span>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <a href="#contact" onClick={onClose} className="mt-10 inline-flex items-center gap-2 text-[#3CB7FF] font-bold hover:text-white transition-colors group">
                Start a Project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            </div>

            {/* RIGHT SIDE: Work Showcase (IMAGES) */}
            <div className="p-8 md:p-12 md:w-7/12 bg-[#02060C]">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Layers size={20} className="text-[#3CB7FF]" /> Recent Work
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.projects.map((project, i) => (
                        <div key={i} className="group relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-white/5 cursor-pointer">
                            <img 
                            src={project.img} 
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="font-bold text-white tracking-wide">{project.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}