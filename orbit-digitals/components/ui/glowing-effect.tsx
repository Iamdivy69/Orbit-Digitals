"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";

interface GlowingEffectProps {
  spread?: number;
  glow?: boolean;
  disabled?: boolean;
  proximity?: number;
  inactiveZone?: number;
  className?: string;
  variant?: "default" | "white";
}

export const GlowingEffect = ({
  spread = 40,
  glow = true,
  disabled = false,
  proximity = 64,
  inactiveZone = 0.01,
  className,
  variant = "default",
}: GlowingEffectProps) => {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current || disabled) return;

      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if mouse is near the element based on proximity
      if (
        x > -proximity &&
        x < rect.width + proximity &&
        y > -proximity &&
        y < rect.height + proximity
      ) {
        setActive(true);
        setPosition({ x, y });

        // Calculate intensity based on distance from center (optional refinement)
        // For now, we'll keep it simple: if inside proximity, show glow.
        setOpacity(1);
      } else {
        setActive(false);
        setOpacity(0);
      }
    },
    [disabled, proximity]
  );

  useEffect(() => {
    if (disabled) return;
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove, disabled]);

  return (
    <div
      ref={ref}
      className={cn(
        "pointer-events-none absolute -inset-px hidden rounded-[inherit] opacity-0 transition-opacity duration-300 md:block",
        active && "opacity-100",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0 rounded-[inherit]",
          variant === "white"
            ? "bg-gradient-to-r from-white/20 to-white/20"
            : "bg-gradient-to-r from-neutral-800/50 to-neutral-800/50"
        )}
      />
      <motion.div
        className={cn(
          "absolute inset-0 rounded-[inherit]",
          variant === "white"
            ? "bg-gradient-to-r from-white/10 via-white/5 to-transparent"
            : "bg-[radial-gradient(var(--gradient-center)_at_var(--x)_var(--y),var(--gradient-color),transparent_var(--spread))]"
        )}
        style={
          {
            "--x": `${position.x}px`,
            "--y": `${position.y}px`,
            "--spread": `${spread}%`,
            "--gradient-color":
              variant === "white" ? "#ffffff" : "rgba(255,255,255,0.1)",
            "--gradient-center": "rgba(255,255,255,0.1)",
          } as React.CSSProperties
        }
        animate={{
          opacity: active && glow ? opacity : 0,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
      />
    </div>
  );
};