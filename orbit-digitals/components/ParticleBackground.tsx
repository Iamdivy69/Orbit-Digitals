"use client";

import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // CONFIGURATION
    const CONFIG = {
      particleBaseCount: 180,
      speedRange: [0.02, 0.12],
      twinkleIntensity: 0.35,
      minRadius: 0.4,
      maxRadius: 1.7,
      parallaxScrollFactor: 0.35,
      mouseStrength: 0.12,
    };

    let particles: any[] = [];
    let shootingStars: any[] = [];
    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // SMOOTHING VARIABLES
    // Current smoothed position (used for drawing)
    let mouse = { x: width * 0.5, y: height * 0.5 }; 
    // Target position (where your actual cursor is)
    let targetMouse = { x: width * 0.5, y: height * 0.5 }; 
    
    let targetScroll = window.scrollY;
    let smoothedScroll = targetScroll;

    const resizeCanvas = () => {
      const DPR = Math.max(1, window.devicePixelRatio || 1);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * DPR);
      canvas.height = Math.round(height * DPR);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      seedParticles();
    };

    const seedParticles = () => {
      particles = [];
      const count = Math.round(CONFIG.particleBaseCount * (width * height) / (1366 * 768));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          depth: Math.random(),
          r: Math.random() * (CONFIG.maxRadius - CONFIG.minRadius) + CONFIG.minRadius,
          vx: (Math.random() - 0.5) * 0.05,
          vy: Math.random() * (CONFIG.speedRange[1] - CONFIG.speedRange[0]) + CONFIG.speedRange[0],
          baseAlpha: Math.random() * 0.6 + 0.12,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const createShootingStar = () => {
      if (Math.random() > 0.985 && shootingStars.length < 2) {
        shootingStars.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.5,
          len: Math.random() * 80 + 20,
          speed: Math.random() * 10 + 6,
          size: Math.random() * 1 + 0.5,
          angle: 45 * (Math.PI / 180),
          life: 100,
        });
      }
    };

    const draw = () => {
      // 1. Smooth out values
      smoothedScroll += (targetScroll - smoothedScroll) * 0.12;
      // This lerp creates the "drag" effect so it never snaps
      mouse.x += (targetMouse.x - mouse.x) * 0.1;
      mouse.y += (targetMouse.y - mouse.y) * 0.1;

      ctx.clearRect(0, 0, width, height);

      // 2. Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Use the SMOOTHED mouse values here
        const parallaxY = (smoothedScroll * CONFIG.parallaxScrollFactor) * (1 - p.depth);
        const mx = (mouse.x - width / 2) * CONFIG.mouseStrength * (1 - p.depth);
        const my = (mouse.y - height / 2) * CONFIG.mouseStrength * (1 - p.depth);

        p.x += p.vx;
        p.y -= p.vy;

        if (p.y < -20) { p.y = height + 20; p.x = Math.random() * width; }
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;

        let alpha = p.baseAlpha;
        p.twinklePhase += 0.02;
        alpha = p.baseAlpha * (1 - CONFIG.twinkleIntensity * 0.5 + Math.sin(p.twinklePhase) * CONFIG.twinkleIntensity * 0.5);

        const drawX = p.x + mx;
        const drawY = p.y + my + parallaxY;

        // Balanced Glow (4x radius)
        const glowRadius = p.r * 4;
        const g = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, glowRadius);
        g.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
        g.addColorStop(0.4, `rgba(60, 183, 255, ${alpha * 0.4})`);
        g.addColorStop(1, `rgba(60, 183, 255, 0)`);

        ctx.beginPath();
        ctx.fillStyle = g;
        ctx.arc(drawX, drawY, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Draw Shooting Stars
      createShootingStar();
      for (let i = 0; i < shootingStars.length; i++) {
        let s = shootingStars[i];
        s.x += s.speed * Math.cos(s.angle);
        s.y += s.speed * Math.sin(s.angle);
        s.life -= 2;

        if (s.life <= 0 || s.x > width || s.y > height) {
            shootingStars.splice(i, 1);
            i--;
            continue;
        }
        
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${s.life / 100})`;
        ctx.lineWidth = s.size;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.len * Math.cos(s.angle), s.y - s.len * Math.sin(s.angle));
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleScroll = () => { targetScroll = window.scrollY; };
    const handleMouseMove = (e: MouseEvent) => { 
        targetMouse.x = e.clientX; 
        targetMouse.y = e.clientY; 
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    resizeCanvas();
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-[#02060C]" />
      <div className="absolute inset-[-10%] opacity-90" 
           style={{background: 'radial-gradient(900px at 10% 30%, rgba(60,183,255,0.05), transparent)'}} />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}