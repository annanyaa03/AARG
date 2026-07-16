import React from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { Mail, Phone, MapPin } from "lucide-react";

// Inline brand SVGs for social media icons
const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Youtube = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Team", href: "/team" },
    { name: "Achievements", href: "/achievements" },
    { name: "Sponsors", href: "/sponsors" },
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
          <div className="flex items-center gap-3 mt-2">
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AARG on Instagram"
              className="p-2 border border-secondary-accent/10 hover:border-primary-accent hover:text-primary-accent transition-colors focus-hud rounded-none"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AARG on LinkedIn"
              className="p-2 border border-secondary-accent/10 hover:border-primary-accent hover:text-primary-accent transition-colors focus-hud rounded-none"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={siteConfig.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="AARG on YouTube"
              className="p-2 border border-secondary-accent/10 hover:border-primary-accent hover:text-primary-accent transition-colors focus-hud rounded-none"
            >
              <Youtube className="w-4 h-4" />
            </a>
            {siteConfig.socials.github && (
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="AARG on GitHub"
                className="p-2 border border-secondary-accent/10 hover:border-primary-accent hover:text-primary-accent transition-colors focus-hud rounded-none"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
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
            <div className="flex items-start gap-2 leading-relaxed font-sans">
              <MapPin className="w-4 h-4 text-primary-accent shrink-0 mt-0.5" />
              <div>
                <span className="font-mono text-[9px] block text-secondary-accent/50 uppercase font-semibold">
                  Lab Location:
                </span>
                {siteConfig.labRoom}, {siteConfig.department}, <br />
                {siteConfig.college}, {siteConfig.city}, {siteConfig.state} - {siteConfig.pincode}
              </div>
            </div>
            <div className="flex items-center gap-2 leading-relaxed">
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
