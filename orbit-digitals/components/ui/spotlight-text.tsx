"use client";
import React, { useRef, useState } from "react";

export const SpotlightText = ({ 
  text, 
  className = "" 
}: { 
  text: string; 
  className?: string;
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [opacity, setOpacity] = useState(0);

  // --- THE LOGIC IS HERE (Lines 15-25) ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    
    // Calculates where your mouse is relative to the text box (0% to 100%)
    const positionX = ((e.clientX - rect.left) / rect.width) * 100;
    const positionY = ((e.clientY - rect.top) / rect.height) * 100;

    setPosition({ x: positionX, y: positionY });
    setOpacity(1);
  };

  return (
    <div 
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setOpacity(0)}
        className={`relative inline-block cursor-default select-none ${className}`}
    >
        {/* LAYER 1: BASE TEXT (Always Visible - Dark Grey) */}
        <span className="relative z-10 text-slate-600">
            {text}
        </span>

        {/* LAYER 2: SPOTLIGHT OVERLAY (Appears on Hover) */}
        <span
            className="absolute top-0 left-0 z-20 text-transparent bg-clip-text transition-opacity duration-200"
            style={{
                opacity: opacity,
                backgroundImage: `radial-gradient(
                    150px circle at ${position.x}% ${position.y}%, 
                    #FFFFFF 0%, 
                    #00C6FF 50%, 
                    transparent 100%
                )`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
            }}
        >
            {text}
        </span>
    </div>
  );
};