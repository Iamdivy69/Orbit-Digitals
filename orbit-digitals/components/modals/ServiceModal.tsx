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
    <div className="fixed inset-0 flex items-center justify-center p-4 z-[99999]">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* MODAL CONTAINER */}
      <div className="relative w-full max-w-6xl bg-[#050A14] border border-[#3CB7FF]/30 rounded-3xl shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] overflow-hidden">
        
        {/* CLOSE BUTTON */}
        <div className="absolute top-0 right-0 p-4 z-50"> 
            <button 
                onClick={onClose}
                className="w-10 h-10 bg-black/80 hover:bg-[#3CB7FF] border border-white/20 rounded-full flex items-center justify-center text-white transition-colors shadow-lg"
            >
                <X size={20} />
            </button>
        </div>

        {/* CONTENT WRAPPER */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
            
            {/* GRID LAYOUT: 1 Col on Mobile, 2 Cols on Desktop */}
            <div className="grid grid-cols-1 md:grid-cols-12 min-h-full">
                
                {/* --- LEFT SIDE: INFO (Spans 5 of 12 columns on desktop) --- */}
                <div className="md:col-span-5 p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 bg-blue-900/10 relative flex flex-col">
                    <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6 pr-8 leading-tight">
                        {service.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                        {service.description}
                    </p>
                    
                    <div className="space-y-4 mb-10 flex-1">
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

                    <div className="mt-auto pt-6">
                        <a href="#contact" onClick={onClose} className="w-full inline-flex justify-center items-center gap-2 btn-orbit py-4 rounded-xl font-bold text-white shadow-lg hover:scale-[1.02] transition-transform">
                            Start This Project <ArrowRight size={20} />
                        </a>
                    </div>
                </div>

                {/* --- RIGHT SIDE: IMAGES (Spans 7 of 12 columns on desktop) --- */}
                <div className="md:col-span-7 p-8 md:p-12 bg-[#02060C]">
                    <h4 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                        <Layers size={24} className="text-[#3CB7FF]" /> Recent Work
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {service.projects.map((project, i) => (
                            <div key={i} className="group relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-white/5 cursor-pointer shadow-lg hover:shadow-[#3CB7FF]/20 transition-all">
                                {project.img ? (
                                    <img 
                                        src={project.img} 
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-900">
                                        No Image
                                    </div>
                                )}
                                
                                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="font-bold text-white text-lg tracking-wide border-b-2 border-[#3CB7FF] pb-1">
                                        {project.title}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
}