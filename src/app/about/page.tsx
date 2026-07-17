"use client";

import React from "react";
import ScrollReveal from "@/components/ScrollReveal";

export default function About() {
  return (
    <div className="relative w-full flex flex-col min-h-screen bg-bg-base py-12 md:py-20 px-4 md:px-8">
      {/* HUD background grid textures */}
      <div className="absolute inset-0 hud-grid pointer-events-none opacity-40" />
      <div className="absolute inset-0 hud-grid-fine pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col gap-16 md:gap-24">

        {/* Page Header */}
        <div className="border-b border-secondary-accent/15 pb-6">
          <span className="font-mono text-xs text-primary-accent tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary-accent" />
            OPERATIONAL_SYSTEM // ABOUT_AARG
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-secondary-accent uppercase tracking-tight mt-2">
            Who We Are &amp; Why We Fly
          </h1>
        </div>

        {/* Editorial text blocks */}
        <div className="flex flex-col gap-16">

          {/* Section 01 — Who We Are */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-col gap-5">
              {/* Eyebrow */}
              <div className="flex items-center gap-4">
                <span className="font-mono text-2xl md:text-3xl font-semibold text-primary-accent leading-none opacity-70">01</span>
                <div className="hud-divider-v" style={{ height: "2.5rem" }} />
                <span className="font-mono text-[10px] text-primary-accent/70 uppercase tracking-widest">Foundational Overview</span>
              </div>
              <div className="hud-divider-h" />
              <h2 className="font-display text-xl md:text-2xl font-bold text-secondary-accent uppercase tracking-tight">
                WHO WE ARE
              </h2>
              <div className="font-sans text-sm md:text-base text-secondary-accent/85 space-y-4 leading-relaxed max-w-3xl">
                <p>
                  Advanced Aerial Robotics Group (AARG) is the official student-led aerial robotics organization at AISSMS Institute of Information Technology, bringing together students with a shared passion for aerospace, robotics, embedded systems, and autonomous technologies. Founded to foster innovation through hands-on engineering, AARG provides a collaborative environment where members transform ideas into practical aerial robotic systems while developing the technical skills required to solve real-world engineering challenges.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Section 02 — What We Do */}
          <ScrollReveal delay={0.2}>
            <div className="flex flex-col gap-5">
              {/* Eyebrow */}
              <div className="flex items-center gap-4">
                <span className="font-mono text-2xl md:text-3xl font-semibold text-primary-accent leading-none opacity-70">02</span>
                <div className="hud-divider-v" style={{ height: "2.5rem" }} />
                <span className="font-mono text-[10px] text-primary-accent/70 uppercase tracking-widest">Operations &amp; Focus</span>
              </div>
              <div className="hud-divider-h" />
              <h2 className="font-display text-xl md:text-2xl font-bold text-secondary-accent uppercase tracking-tight">
                WHAT WE DO
              </h2>
              <div className="font-sans text-sm md:text-base text-secondary-accent/85 space-y-4 leading-relaxed max-w-3xl">
                <p>
                  At AARG, learning happens by building. Our members work on the complete spectrum of aerial robotics, including unmanned aerial vehicles, embedded flight controllers, autonomous navigation, computer vision, control systems, and intelligent mission planning. Through research-oriented projects, technical workshops, competitions, and collaborative development, we encourage a culture of curiosity, experimentation, and continuous improvement.
                </p>
                <p>
                  Whether designing custom hardware, developing flight software, or integrating AI into autonomous platforms, every project is driven by a commitment to engineering excellence.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Section 03 — Our Goal */}
          <ScrollReveal delay={0.3}>
            <div className="flex flex-col gap-5">
              {/* Eyebrow */}
              <div className="flex items-center gap-4">
                <span className="font-mono text-2xl md:text-3xl font-semibold text-primary-accent leading-none opacity-70">03</span>
                <div className="hud-divider-v" style={{ height: "2.5rem" }} />
                <span className="font-mono text-[10px] text-primary-accent/70 uppercase tracking-widest">Mission &amp; Vision</span>
              </div>
              <div className="hud-divider-h" />
              <h2 className="font-display text-xl md:text-2xl font-bold text-secondary-accent uppercase tracking-tight">
                OUR GOAL
              </h2>
              <div className="font-sans text-sm md:text-base text-secondary-accent/85 space-y-4 leading-relaxed max-w-3xl">
                <p>
                  Our goal is to create a strong community of innovators who are eager to explore the future of aerial robotics and autonomous systems. By providing opportunities to learn beyond the classroom, collaborate across disciplines, and work on meaningful engineering projects, AARG aims to prepare students for careers in aerospace, robotics, and advanced technology while contributing to a growing culture of innovation at AISSMS IoIT.
                </p>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </div>
  );
}
