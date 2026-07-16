"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface DecryptTextProps {
  text: string;
  delay?: number; // Delay in seconds
  speed?: number; // Speed of scramble updates in ms
}

export default function DecryptText({ text, delay = 0, speed = 25 }: DecryptTextProps) {
  const [displayedText, setDisplayedText] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const shouldReduceMotion = useReducedMotion();

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&_[]/+=-";

  useEffect(() => {
    if (shouldReduceMotion || !isInView) {
      setDisplayedText(text);
      return;
    }

    let isMounted = true;
    let iteration = 0;
    let intervalId: NodeJS.Timeout;

    const runScramble = () => {
      intervalId = setInterval(() => {
        if (!isMounted) return;

        const result = text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            // If iteration is past this index, show original char
            if (index < iteration) {
              return text[index];
            }
            // Otherwise, return a random HUD character
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("");

        setDisplayedText(result);

        if (iteration >= text.length) {
          clearInterval(intervalId);
          setDisplayedText(text);
        }

        // Increase iteration to resolve characters step-by-step
        iteration += 0.4;
      }, speed);
    };

    const delayTimeoutId = setTimeout(runScramble, delay * 1000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
      clearTimeout(delayTimeoutId);
    };
  }, [text, isInView, speed, delay, shouldReduceMotion]);

  return (
    <span ref={ref} className="font-mono">
      {displayedText}
    </span>
  );
}
