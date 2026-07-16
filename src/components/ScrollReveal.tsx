"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  duration = 0.4,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: 24, x: 0 };
      case "down":
        return { y: -24, x: 0 };
      case "left":
        return { y: 0, x: 24 };
      case "right":
        return { y: 0, x: -24 };
      default:
        return { y: 0, x: 0 };
    }
  };

  const offset = getDirectionOffset();

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Custom easeOutQuart transition
      }}
    >
      {children}
    </motion.div>
  );
}
