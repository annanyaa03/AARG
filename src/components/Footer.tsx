import React from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Projects", href: "/projects" },
    { name: "Achievements", href: "/achievements" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="bg-bg-base border-t border-secondary-accent/15 py-12 md:py-16 font-mono text-[11px] relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {/* Brand Description */}
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="font-display font-bold text-lg tracking-wider text-secondary-accent flex items-center gap-2 focus-hud"
          >
            <span className="text-primary-accent font-mono">[+]</span>
            {siteConfig.name}
          </Link>
          <p className="text-secondary-accent/70 leading-relaxed font-sans max-w-sm">
            {siteConfig.description}
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="text-primary-accent font-bold uppercase tracking-widest text-[10px]">
            {"QUICK_LINKS"}
          </h4>
          <nav className="grid grid-cols-2 gap-2 text-secondary-accent/80 font-medium">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-primary-accent transition-colors duration-200 focus-hud py-1"
              >
                {"//"} {link.name}
              </Link>
            ))}
            <Link
              href="/join"
              className="text-primary-accent hover:underline font-bold py-1 focus-hud"
            >
              {"// Join Us"}
            </Link>
          </nav>
        </div>

        {/* Contact Block */}
        <div className="flex flex-col gap-4">
          <h4 className="text-primary-accent font-bold uppercase tracking-widest text-[10px]">
            {"CONTACT_TELEMETRY"}
          </h4>
          <div className="flex flex-col gap-3 text-secondary-accent/80">
            <div className="flex items-center gap-2 leading-relaxed mt-1">
              <Mail className="w-4 h-4 text-primary-accent shrink-0" />
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-primary-accent hover:underline focus-hud font-mono"
              >
                {siteConfig.email}
              </a>
            </div>
            <div className="flex items-center gap-2 leading-relaxed">
              <Phone className="w-4 h-4 text-primary-accent shrink-0" />
              <a
                href={`tel:${siteConfig.phone}`}
                className="hover:text-primary-accent hover:underline focus-hud font-mono"
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>

        {/* GPS Coordinates/Telemetry panel */}
        <div className="flex flex-col gap-4">
          <h4 className="text-primary-accent font-bold uppercase tracking-widest text-[10px]">
            {"SITE_METRICS"}
          </h4>
          <div className="border border-secondary-accent/15 bg-surface/30 p-4 relative h-32 flex flex-col justify-between">
            <div className="hud-corner hud-corner-tl" />
            <div className="hud-corner hud-corner-tr" />
            <div className="hud-corner hud-corner-bl" />
            <div className="hud-corner hud-corner-br" />
            <div className="text-[9px] text-secondary-accent/60 uppercase flex justify-between">
              <span>SYSTEM STATE:</span>
              <span className="text-green-500 font-bold">ONLINE</span>
            </div>
            <div className="text-[9px] text-secondary-accent/60 uppercase flex justify-between">
              <span>LATITUDE:</span>
              <span>12.9716° N</span>
            </div>
            <div className="text-[9px] text-secondary-accent/60 uppercase flex justify-between">
              <span>LONGITUDE:</span>
              <span>77.5946° E</span>
            </div>
            <div className="text-[9px] text-secondary-accent/40 border-t border-secondary-accent/10 pt-2 flex justify-between">
              <span>ESTABLISHED:</span>
              <span>{siteConfig.foundingYear}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 border-t border-secondary-accent/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-secondary-accent/50 gap-4">
        <div>
          © {new Date().getFullYear()} {siteConfig.name}. Student Engineering Team.
        </div>
        <div className="flex gap-4">
          <span className="hover:text-primary-accent cursor-pointer transition-colors duration-200">
            {"FLIGHT_AUTH // 256B"}
          </span>
          <span>|</span>
          <span className="hover:text-primary-accent cursor-pointer transition-colors duration-200">
            {"FAA_COMPLIANT // MOCK"}
          </span>
        </div>
      </div>
    </footer>
  );
}
