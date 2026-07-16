"use client";

import React, { useEffect, useState, useRef } from "react";
import { useScroll, useTransform, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  value: string; // e.g., "40+", "5+", "98.8%"
  onComplete?: () => void;
}

export default function AnimatedCounter({ value, onComplete }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Extract number and suffix (like "+" or "%")
  const numericPart = parseInt(value.replace(/[^0-9]/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  const [count, setCount] = useState(shouldReduceMotion ? numericPart : 0);
  const [completedTriggered, setCompletedTriggered] = useState(false);

  // Monitor scroll progress of the stats item
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });

  // Map scroll progress to raw count
  const rawCount = useTransform(scrollYProgress, [0, 1], [0, numericPart]);

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(numericPart);
      if (onComplete && !completedTriggered) {
        onComplete();
        setCompletedTriggered(true);
      }
      return;
    }

    return rawCount.onChange((latest) => {
      // Calculate progress fraction
      const progress = numericPart > 0 ? latest / numericPart : 1;
      
      // Easing: easeOutQuad = progress * (2 - progress)
      const easeProgress = progress * (2 - progress);
      const currentCount = Math.floor(easeProgress * numericPart);
      
      setCount(currentCount);

      // Trigger completion animation if count reaches maximum
      if (currentCount >= numericPart && !completedTriggered) {
        setCompletedTriggered(true);
        if (onComplete) onComplete();
      } else if (currentCount < numericPart && completedTriggered) {
        setCompletedTriggered(false);
      }
    });
  }, [rawCount, numericPart, shouldReduceMotion, onComplete, completedTriggered]);

  return (
    <span ref={ref} className="font-display">
      {count}
      {suffix}
    </span>
  );
}
