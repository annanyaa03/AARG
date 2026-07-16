"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryItem } from "@/content/gallery";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  items,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (isOpen) {
      // Keep track of the element that was focused before opening the lightbox
      triggerRef.current = document.activeElement as HTMLElement;
      // Focus the close button on mount
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      // Disable body scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Restore scrolling and return focus
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard navigation & focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      } else if (e.key === "Tab") {
        const focusableElements = document.querySelectorAll(
          '[data-lightbox-focusable="true"]'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen && shouldReduceMotion) return null;

  const currentItem = items[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="AARG Image Gallery Lightbox"
          initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
          exit={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-bg-base/95 backdrop-blur-md p-4 select-none"
        >
          {/* Top Header Controls */}
          <div className="flex w-full items-center justify-between py-2 border-b border-secondary-accent/15">
            <span className="font-mono text-[10px] tracking-widest text-primary-accent font-semibold">
              {"/// HUD_LIGHTBOX // IMAGE"} {currentIndex + 1} {"OF"} {items.length}
            </span>
            <button
              ref={closeButtonRef}
              data-lightbox-focusable="true"
              onClick={onClose}
              aria-label="Close lightbox"
              className="p-2 border border-secondary-accent/15 text-secondary-accent hover:text-primary-accent hover:border-primary-accent transition-colors focus-hud rounded-none cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Image Slider Area */}
          <div className="flex-1 flex items-center justify-between relative my-4 gap-4 px-2 md:px-8">
            {/* Previous Button */}
            <button
              data-lightbox-focusable="true"
              onClick={onPrev}
              aria-label="Previous image"
              className="p-3 border border-secondary-accent/15 bg-surface text-secondary-accent hover:text-primary-accent hover:border-primary-accent transition-colors focus-hud rounded-none cursor-pointer z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Display Image Container */}
            <div className="relative flex-1 max-w-4xl h-[60vh] border border-secondary-accent/10 bg-surface/50 overflow-hidden">
              <div className="hud-corner hud-corner-tl" />
              <div className="hud-corner hud-corner-tr" />
              <div className="hud-corner hud-corner-bl" />
              <div className="hud-corner hud-corner-br" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={shouldReduceMotion ? {} : { opacity: 0, x: 20 }}
                  animate={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
                  exit={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentItem.imageUrl}
                    alt={currentItem.description || currentItem.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 960px"
                    className="object-contain p-2"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next Button */}
            <button
              data-lightbox-focusable="true"
              onClick={onNext}
              aria-label="Next image"
              className="p-3 border border-secondary-accent/15 bg-surface text-secondary-accent hover:text-primary-accent hover:border-primary-accent transition-colors focus-hud rounded-none cursor-pointer z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Text Panel */}
          <div className="w-full text-center border-t border-secondary-accent/15 py-4 bg-surface/40 font-mono">
            <h4 className="font-display font-bold uppercase text-secondary-accent tracking-widest text-xs mb-1">
              {currentItem.title}
            </h4>
            <p className="text-[11px] text-secondary-accent/75 max-w-2xl mx-auto px-4">
              {currentItem.description}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
