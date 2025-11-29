"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function RevealOnScroll({ children }: { children: React.ReactNode }) {
  // Check if we are on client to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  if (!isClient) return <div className="opacity-0">{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 75 }} // Start invisible and 75px down
      whileInView={{ opacity: 1, y: 0 }} // Animate to visible and original position
      viewport={{ once: true, margin: "-100px" }} // Trigger when 100px into view
      transition={{ duration: 0.8, ease: "easeOut" }} // Smooth 0.8s slide
    >
      {children}
    </motion.div>
  );
}