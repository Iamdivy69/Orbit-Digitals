"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 top-0 border-b border-white/5 bg-[#02060C]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO SECTION (Image Only) */}
          <div className="flex items-center cursor-pointer">
            <div className="relative w-12 h-12"> {/* Increased size slightly since text is gone */}
                <Image 
                    src="/logo.png" 
                    alt="Orbit Digitals Logo"
                    fill
                    className="object-contain"
                />
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            {['Services', 'Portfolio', 'Pricing', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-[#3CB7FF] transition-colors text-sm font-medium">
                {item}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#050A14] border-b border-white/10 absolute w-full">
            <div className="px-4 pt-2 pb-6 space-y-2">
             {['Services', 'Portfolio', 'Pricing', 'Contact'].map((item) => (
              <a key={item} 
                 href={`#${item.toLowerCase()}`}
                 onClick={() => setIsOpen(false)}
                 className="block px-3 py-3 text-gray-300 hover:text-[#3CB7FF] hover:bg-white/5 rounded-md text-base font-medium">
                {item}
              </a>
            ))}
            </div>
        </div>
      )}
    </nav>
  );
}