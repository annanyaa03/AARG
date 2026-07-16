"use client";

import React, { useEffect, useRef, useState } from "react";
import { sponsorsData } from "@/content/sponsors";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";

export default function SponsorMarquee() {
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Extract and combine sponsors
  const allSponsors = [
    ...sponsorsData.tiers.title,
    ...sponsorsData.tiers.platinum,
    ...sponsorsData.tiers.gold,
    ...sponsorsData.tiers.associate,
  ];

  // Double the sponsors for seamless infinite scrolling loop
  const marqueeItems = [...allSponsors, ...allSponsors];

  // Motion value for horizontal scroll position
  const xPos = useMotionValue(0);
  const speedRef = useRef(0.6); // Base speed in pixels per frame
  const currentSpeedRef = useRef(0.6);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const track = trackRef.current;
    if (!track) return;

    // The reset threshold is half the scroll track width (i.e. the width of one full set of sponsors)
    const resetThreshold = track.scrollWidth / 2;

    let animFrameId: number;

    const updateScroll = () => {
      // Smoothly interpolate current speed towards target speed (0 if hovered, 0.6 if active)
      const targetSpeed = isHovered ? 0 : speedRef.current;
      currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * 0.08;

      let nextX = xPos.get() - currentSpeedRef.current;
      
      // If we scroll past the first set, reset back to 0 seamlessly
      if (nextX <= -resetThreshold) {
        nextX += resetThreshold;
      }
      
      xPos.set(nextX);
      animFrameId = requestAnimationFrame(updateScroll);
    };

    animFrameId = requestAnimationFrame(updateScroll);

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [isHovered, xPos, shouldReduceMotion, marqueeItems.length]);

  return (
    <div 
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full overflow-hidden border-y border-secondary-accent/10 bg-surface/30 py-8 cursor-grab active:cursor-grabbing"
    >
      {/* HUD vignette gradient masks for fading edges */}
      <div className="absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-bg-base to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-bg-base to-transparent pointer-events-none" />

      <div className="flex select-none overflow-hidden">
        {shouldReduceMotion ? (
          <div className="flex flex-wrap gap-6 justify-center w-full px-4">
            {allSponsors.map((sponsor, index) => (
              <a
                key={`${sponsor.name}-${index}`}
                href={sponsor.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center min-w-[200px] h-16 border border-secondary-accent/15 bg-surface/80 p-4 text-center text-xs font-mono font-bold tracking-widest text-secondary-accent uppercase hover:border-primary-accent"
              >
                <span className="text-secondary-accent/40 text-[9px] mb-1 font-semibold">
                  {"// PARTNER"}
                </span>
                <span>{sponsor.name}</span>
              </a>
            ))}
          </div>
        ) : (
          <motion.div 
            ref={trackRef}
            style={{ x: xPos }}
            className="flex gap-8 items-center whitespace-nowrap"
          >
            {marqueeItems.map((sponsor, index) => (
              <motion.a
                key={`${sponsor.name}-${index}`}
                href={sponsor.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                className="flex flex-col items-center justify-center min-w-[220px] h-16 border border-secondary-accent/15 bg-surface/80 p-4 text-center hover:border-primary-accent hover:text-secondary-accent/90 transition-all duration-200 focus-hud text-xs font-mono font-bold tracking-widest text-secondary-accent uppercase"
              >
                <span className="text-secondary-accent/40 text-[9px] mb-1 font-semibold group-hover:text-primary-accent/80">
                  {"// PARTNER"}
                </span>
                <span>{sponsor.name}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
