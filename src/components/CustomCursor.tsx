"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Motion values for coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Springs for smooth movement
  const springConfig = { damping: 30, stiffness: 250, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (shouldReduceMotion) return;

    // Check if device supports touch only (mobile)
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Dynamic hover detection of interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.tagName === "INPUT" || 
        target.tagName === "TEXTAREA" || 
        target.tagName === "SELECT" ||
        target.closest("a") || 
        target.closest("button") || 
        target.closest('[role="button"]') ||
        target.closest(".hud-interactive") ||
        target.closest(".cursor-pointer");

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseOver);

    // Hide original cursor
    document.documentElement.classList.add("cursor-none-global");

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.classList.remove("cursor-none-global");
    };
  }, [cursorX, cursorY, isVisible, shouldReduceMotion]);

  if (shouldReduceMotion || !isVisible) return null;

  return (
    <>
      {/* Global CSS to disable cursor - fallback handled in useEffect cleanup */}
      <style jsx global>{`
        @media (pointer: fine) {
          .cursor-none-global,
          .cursor-none-global * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Main outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-primary-accent rounded-full pointer-events-none z-50 mix-blend-screen flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovered ? 1.5 : 1,
          borderColor: isHovered ? "#b44d0b" : "#d1cabf",
          borderWidth: isHovered ? "1px" : "1px",
        }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        {/* Inside target indicators for hovered locking state */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Target Reticle Crosshairs */}
            <div className="absolute w-[2px] h-2 bg-primary-accent top-0" />
            <div className="absolute w-[2px] h-2 bg-primary-accent bottom-0" />
            <div className="absolute h-[2px] w-2 bg-primary-accent left-0" />
            <div className="absolute h-[2px] w-2 bg-primary-accent right-0" />
          </motion.div>
        )}
      </motion.div>

      {/* Central target dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-primary-accent rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 1.5 : isHovered ? 0.5 : 1,
          backgroundColor: isHovered ? "#b44d0b" : "#b44d0b",
        }}
      />
    </>
  );
}
