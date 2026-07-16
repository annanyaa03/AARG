"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface HudCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  corners?: boolean;
  hoverGlow?: boolean;
  eyebrow?: string;
  title?: string;
}

export default function HudCard({
  children,
  corners = true,
  hoverGlow = true,
  eyebrow,
  title,
  className = "",
  ...props
}: HudCardProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div
        className={`relative bg-surface border border-secondary-accent/15 rounded-none p-5 md:p-6 transition-all duration-300 ${
          hoverGlow ? "hover:border-primary-accent/40 glow-primary-hover" : ""
        } ${className}`}
        {...props}
      >
        {corners && (
          <>
            <div className="hud-corner hud-corner-tl" />
            <div className="hud-corner hud-corner-tr" />
            <div className="hud-corner hud-corner-bl" />
            <div className="hud-corner hud-corner-br" />
          </>
        )}
        {(eyebrow || title) && (
          <div className="mb-4 border-b border-secondary-accent/10 pb-3 font-mono">
            {eyebrow && (
              <div className="text-[10px] uppercase tracking-widest text-primary-accent font-semibold">
                {"///"} {eyebrow}
              </div>
            )}
            {title && (
              <h3 className="font-display text-lg font-bold tracking-tight text-secondary-accent uppercase mt-1">
                {title}
              </h3>
            )}
          </div>
        )}
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className={`relative bg-surface border border-secondary-accent/15 rounded-none p-5 md:p-6 transition-colors duration-300 ${
        hoverGlow ? "glow-primary-hover hover:border-primary-accent/30" : ""
      } ${className}`}
      {...(props as any)}
    >
      {/* 1. Draw SVG Border on hover */}
      {hoverGlow && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" fill="none">
          <motion.rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            stroke="#b44d0b"
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            variants={{
              hover: { pathLength: 1, opacity: 0.8 }
            }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
          />
        </svg>
      )}

      {/* 2. Target Reticle Corners locking-on animation */}
      {corners && (
        <>
          <motion.div
            variants={{
              initial: { x: -3, y: -3, borderColor: "#b44d0b" },
              hover: { x: 0, y: 0, borderColor: "#b44d0b", scale: 1.1 }
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="hud-corner hud-corner-tl"
          />
          <motion.div
            variants={{
              initial: { x: 3, y: -3, borderColor: "#b44d0b" },
              hover: { x: 0, y: 0, borderColor: "#b44d0b", scale: 1.1 }
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="hud-corner hud-corner-tr"
          />
          <motion.div
            variants={{
              initial: { x: -3, y: 3, borderColor: "#b44d0b" },
              hover: { x: 0, y: 0, borderColor: "#b44d0b", scale: 1.1 }
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="hud-corner hud-corner-bl"
          />
          <motion.div
            variants={{
              initial: { x: 3, y: 3, borderColor: "#b44d0b" },
              hover: { x: 0, y: 0, borderColor: "#b44d0b", scale: 1.1 }
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="hud-corner hud-corner-br"
          />
        </>
      )}

      {/* Telemetry Header Style */}
      {(eyebrow || title) && (
        <div className="mb-4 border-b border-secondary-accent/10 pb-3 font-mono">
          {eyebrow && (
            <div className="text-[10px] uppercase tracking-widest text-primary-accent font-semibold">
              {"///"} {eyebrow}
            </div>
          )}
          {title && (
            <h3 className="font-display text-lg font-bold tracking-tight text-secondary-accent uppercase mt-1">
              {title}
            </h3>
          )}
        </div>
      )}

      {children}
    </motion.div>
  );
}
