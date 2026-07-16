"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/content/site";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "@/components/Magnetic";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Accessibility: Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Domains", href: "/domains" },
    { name: "Achievements", href: "/achievements" },
    { name: "Sponsors", href: "/sponsors" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
          scrolled
            ? "bg-bg-base/80 backdrop-blur-md border-secondary-accent/15 py-3 shadow-md"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="font-display font-bold text-lg md:text-xl tracking-wider text-secondary-accent flex items-center gap-2 group focus-hud"
          >
            <span className="text-primary-accent group-hover:text-secondary-accent transition-colors duration-250 font-mono">
              [+]
            </span>
            {siteConfig.name}
            <span className="text-[9px] font-mono text-secondary-accent/40 font-normal tracking-normal ml-1 hidden sm:inline">
              SYS_ACTIVE
            </span>
          </Link>

          {/* Desktop Navigation Link Strip */}
          <nav className="hidden lg:flex items-center gap-6 font-mono text-[11px] font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`hover:text-primary-accent transition-colors duration-200 focus-hud px-2 py-1 relative ${
                    isActive ? "text-primary-accent font-semibold" : "text-secondary-accent/80"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 h-[1.5px] bg-primary-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Primary Call-to-Action */}
          <div className="hidden lg:block">
            <Magnetic>
              <Link
                href="/join"
                className="group relative overflow-hidden font-mono text-[10px] font-bold border border-primary-accent bg-primary-accent/10 px-4 py-2 hover:bg-primary-accent hover:text-white transition-all duration-250 focus-hud rounded-none flex items-center gap-1.5"
              >
                <span className="relative z-10">{"JOIN_US // REC_OPEN"}</span>
                <span className="animate-sweep" />
              </Link>
            </Magnetic>
          </div>

          {/* Mobile Drawer Trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="lg:hidden p-2 border border-secondary-accent/15 text-secondary-accent hover:border-primary-accent hover:text-primary-accent transition-colors focus-hud rounded-none cursor-pointer"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-41 bg-bg-base/70 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[270px] z-42 bg-surface border-l border-secondary-accent/15 p-6 flex flex-col justify-between lg:hidden"
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between pb-4 border-b border-secondary-accent/10">
                  <span className="font-mono text-[10px] tracking-widest text-primary-accent font-semibold">
                    {"/// UAV_SYS_NAV"}
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                    className="p-1 border border-secondary-accent/10 text-secondary-accent hover:text-primary-accent hover:border-primary-accent transition-colors focus-hud rounded-none cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <nav className="flex flex-col gap-3 font-mono text-xs">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`hover:text-primary-accent transition-colors duration-200 focus-hud py-2 ${
                          isActive
                            ? "text-primary-accent font-bold pl-2 border-l border-primary-accent"
                            : "text-secondary-accent/80"
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="flex flex-col gap-3 border-t border-secondary-accent/10 pt-6">
                <Link
                  href="/join"
                  onClick={() => setIsOpen(false)}
                  className="font-mono text-xs font-bold text-center border border-primary-accent bg-primary-accent/10 py-3 hover:bg-primary-accent hover:text-white transition-all duration-250 focus-hud rounded-none block"
                >
                  {"JOIN_US // REC_OPEN"}
                </Link>
                <div className="text-center font-mono text-[9px] text-secondary-accent/40 uppercase">
                  AARG Flight Console v1.0.0
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
