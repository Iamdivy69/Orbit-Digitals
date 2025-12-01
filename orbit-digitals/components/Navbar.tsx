"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

export default function Navbar() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Handle Scroll Behavior
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true); // Always show at top
      } else {
        if (direction < 0) {
          setVisible(true); // Show scrolling UP
        } else {
          setVisible(false); // Hide scrolling DOWN
        }
      }
    }
  });

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#services" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed top-0 inset-x-0 z-[5000] w-full",
          // CHANGED: Increased padding from py-4 to py-6 for a taller navbar
          "flex items-center justify-between px-6 py-6",
          "backdrop-blur-sm" 
        )}
      >
        {/* CONTAINER */}
        <div className="container mx-auto flex items-center justify-between">
            
            {/* 1. LOGO - INCREASED SIZE */}
            <Link href="/" className="flex items-center gap-2 cursor-pointer">
                {/* Changed w-10 h-10 to w-14 h-14 (56px) */}
                <div className="relative w-14 h-14"> 
                <Image 
                    src="/LOGO.png" 
                    alt="Orbit Logo" 
                    fill 
                    className="object-contain rounded-full"
                />
                </div>
            </Link>

            {/* 2. DESKTOP LINKS - INCREASED FONT SIZE */}
            <div className="hidden md:flex items-center space-x-10"> {/* Increased spacing space-x-8 -> space-x-10 */}
                {navLinks.map((navItem, idx) => (
                <Link
                    key={`link=${idx}`}
                    href={navItem.href}
                    className={cn(
                    // Changed text-sm to text-base for better readability
                    "relative text-neutral-300 hover:text-[#3CB7FF] transition-colors font-medium text-base"
                    )}
                >
                    <span>{navItem.name}</span>
                </Link>
                ))}
            </div>

            {/* 3. CTA BUTTON */}
            <div className="flex items-center gap-4">
                <div className="hidden md:block">
                    <Link href="#contact">
                        <HoverBorderGradient
                            containerClassName="rounded-full"
                            as="button"
                            // Increased padding px-8 py-3 for a larger button
                            className="bg-[#050A14] text-white flex items-center space-x-2 px-8 py-3 text-sm"
                        >
                            <span>Book Call</span>
                        </HoverBorderGradient>
                    </Link>
                </div>

                <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="md:hidden text-white p-2 hover:text-[#3CB7FF] transition-colors"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />} {/* Increased icon size */}
                </button>
            </div>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full backdrop-blur-sm bg-black/50 border-b border-white/10 shadow-2xl md:hidden flex flex-col"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-gray-300 hover:text-[#3CB7FF] hover:bg-white/5 px-6 py-5 border-b border-white/5 last:border-none"
              >
                {link.name}
              </Link>
            ))}
            <div className="p-6">
                <Link 
                    href="#contact" 
                    onClick={() => setIsOpen(false)}
                    className="block w-full btn-orbit py-4 rounded-xl font-bold text-white text-center shadow-lg"
                >
                    Book Strategy Call
                </Link>
            </div>
          </motion.div>
        )}

      </motion.nav>
    </AnimatePresence>
  );
}