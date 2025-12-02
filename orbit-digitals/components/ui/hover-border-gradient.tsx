"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  const rotateDirection = useCallback((currentDirection: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  }, [clockwise]);

  const movingMap: Record<Direction, string> = {
    TOP: "radial-gradient(20.7% 50% at 50% 0%, #3CB7FF 0%, rgba(60, 183, 255, 0) 100%)",
    LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, #3CB7FF 0%, rgba(60, 183, 255, 0) 100%)",
    BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, #3CB7FF 0%, rgba(60, 183, 255, 0) 100%)",
    RIGHT: "radial-gradient(16.2% 41.199999999999996% at 100% 50%, #3CB7FF 0%, rgba(60, 183, 255, 0) 100%)",
  };

  const highlight = "radial-gradient(75% 181.15942028985506% at 50% 50%, #3CB7FF 0%, rgba(60, 183, 255, 0) 100%)";

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, rotateDirection]);

  return (
    <Tag
      suppressHydrationWarning={true}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        // BASE STYLES
        "relative flex rounded-full border border-white/10 content-center bg-black/20 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit",
        // --- NEW ANIMATION CLASSES ADDED BELOW ---
        "transition-all duration-300 ease-out", // Smooth physics
        "hover:scale-105",                      // Grows 5% larger
        "hover:-translate-y-1",                 // Lifts up 1 pixel
        "hover:shadow-[0_10px_20px_-10px_rgba(60,183,255,0.5)]", // Blue glow shadow
        "active:scale-95",                      // Shrinks when clicked (Tactile feel)
        // ----------------------------------------
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "w-auto text-white z-10 bg-[#050A14] px-8 py-4 rounded-[inherit] font-bold text-sm tracking-wide",
          className
        )}
      >
        {children}
      </div>
      <motion.div
        className={cn(
          "flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
        )}
        style={{
          filter: "blur(2px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />
      <div className="bg-black absolute z-1 flex-none inset-[2px] rounded-[100px]" />
    </Tag>
  );
}