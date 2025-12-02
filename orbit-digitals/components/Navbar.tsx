"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#services" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    // OPTIMIZATION: Removed useScroll listeners. Uses simple CSS fixed positioning.
    <nav
      className={cn(
        "fixed top-0 inset-x-0 z-[5000] w-full",
        "flex items-center justify-between px-6 py-4", // Reduced padding slightly for performance
        "backdrop-blur-md bg-black/40 border-b border-white/5" // Static glass effect
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="relative w-12 h-12">
            <Image 
                src="/LOGO.png" 
                alt="Orbit Logo" 
                fill 
                className="object-contain rounded-full"
                priority // Load logo immediately
            />
          </div>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((navItem, idx) => (
            <Link
                key={`link=${idx}`}
                href={navItem.href}
                className="relative text-neutral-300 hover:text-[#3CB7FF] transition-colors font-medium text-sm"
            >
                <span>{navItem.name}</span>
            </Link>
            ))}
        </div>

        {/* CTA BUTTON */}
        <div className="flex items-center gap-4">
            <div className="hidden md:block">
                <Link href="#contact">
                    <HoverBorderGradient
                        containerClassName="rounded-full"
                        as="button"
                        className="bg-[#050A14] text-white flex items-center space-x-2 px-6 py-2 text-sm"
                    >
                        <span>Book Call</span>
                    </HoverBorderGradient>
                </Link>
            </div>

            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="md:hidden text-white p-2 hover:text-[#3CB7FF] transition-colors"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full backdrop-blur-xl bg-[#050A14]/90 border-b border-white/10 shadow-2xl md:hidden flex flex-col"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-gray-300 hover:text-[#3CB7FF] hover:bg-white/5 px-6 py-4 border-b border-white/5 last:border-none"
              >
                {link.name}
              </Link>
            ))}
            <div className="p-6">
                <Link 
                    href="#contact" 
                    onClick={() => setIsOpen(false)}
                    className="block w-full bg-[#3CB7FF] hover:bg-white text-black transition-colors py-3 rounded-xl font-bold text-center shadow-lg"
                >
                    Book Strategy Call
                </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}