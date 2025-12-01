"use client";

import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const CONFIG = {
      particleCount: 60, // Keep count low for performance
      maxRadius: 1.8,
    };

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: any[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      const DPR = Math.max(1, window.devicePixelRatio || 1);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * DPR);
      canvas.height = Math.round(height * DPR);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < CONFIG.particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * CONFIG.maxRadius,
          a: Math.random() * 0.5 + 0.1, // Opacity
          vy: Math.random() * 0.2 + 0.1, // Constant slow upward float
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < CONFIG.particleCount; i++) {
        const p = particles[i];

        // Move Particle Upwards (Automatic only)
        p.y -= p.vy; 

        // Reset if out of bounds (Infinite Loop)
        if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
        }

        // Draw Star
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // Only listen for resize (No Mouse/Scroll tracking)
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Just the canvas, no background color so the Gradient shows through */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}