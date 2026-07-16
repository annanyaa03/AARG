"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      targetOpacity: number;
      label: string;
    }> = [];

    // Initialize slow-moving particles
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: Math.random() * 1.5 + 1,
        opacity: Math.random() * 0.25 + 0.05,
        targetOpacity: Math.random() * 0.25 + 0.05,
        label: `NODE_${Math.floor(Math.random() * 899 + 100)} [${(Math.random() * 9.9).toFixed(1)}]`,
      });
    }

    let frameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint technical lines/grids
      ctx.strokeStyle = "rgba(180, 77, 11, 0.03)";
      ctx.lineWidth = 1;
      
      // Draw telemetry dots
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Boundary wrap
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Slow opacity pulse
        if (Math.random() < 0.005) {
          p.targetOpacity = Math.random() * 0.25 + 0.05;
        }
        p.opacity += (p.targetOpacity - p.opacity) * 0.05;

        // Draw particle
        ctx.fillStyle = `rgba(180, 77, 11, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Draw technical text code next to particle
        ctx.font = "8px var(--font-ibm-plex-mono), monospace";
        ctx.fillStyle = `rgba(209, 202, 191, ${p.opacity * 0.3})`;
        ctx.fillText(p.label, p.x + 6, p.y + 3);

        // Faint connecting lines if dots are close
        particles.forEach((other) => {
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 150) {
            ctx.strokeStyle = `rgba(180, 77, 11, ${(1 - dist / 150) * 0.015})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      });

      frameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0"
    />
  );
}
