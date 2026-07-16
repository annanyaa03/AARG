"use client";

import React from "react";
import { achievementsData } from "@/content/achievements";
import ScrollReveal from "@/components/ScrollReveal";
import DecryptText from "@/components/DecryptText";
import { Trophy, MapPin, Calendar } from "lucide-react";

const RANK_COLOR: Record<string, string> = {
  "1st Place":            "text-yellow-400",
  "2nd Place":            "text-slate-300",
  "3rd Place Overall":    "text-amber-600",
  "Special Recognition":  "text-primary-accent",
};

export default function MissionTimeline() {
  const { awards } = achievementsData;

  return (
    <div className="relative flex flex-col gap-0">
      {/* Vertical spine */}
      <div className="absolute left-[27px] top-0 bottom-0 w-px bg-secondary-accent/10 pointer-events-none" />

      {awards.map((award, i) => (
        <ScrollReveal key={award.id} delay={i * 0.1}>
          <div className="relative flex gap-6 pb-10 last:pb-0">
            {/* Timeline node */}
            <div className="relative z-10 flex-shrink-0 flex flex-col items-center" style={{ width: 56 }}>
              <div className="w-[14px] h-[14px] border border-primary-accent bg-bg-base flex items-center justify-center mt-1">
                <div className="w-[5px] h-[5px] bg-primary-accent" />
              </div>
              {/* Connector line (hidden on last) */}
              {i < awards.length - 1 && (
                <div className="flex-1 mt-1 w-px bg-secondary-accent/10" />
              )}
            </div>

            {/* Card */}
            <div className="flex-1 border border-secondary-accent/12 bg-surface/60 relative group hover:border-primary-accent/30 transition-colors duration-300">
              {/* HUD corners */}
              <div className="hud-corner hud-corner-tl" />
              <div className="hud-corner hud-corner-tr" />
              <div className="hud-corner hud-corner-bl" />
              <div className="hud-corner hud-corner-br" />

              <div className="p-4 md:p-5 flex flex-col gap-2">
                {/* Header row */}
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-mono text-[9px] text-primary-accent tracking-widest uppercase">
                      <DecryptText text={award.competition} />
                    </span>
                    <h3 className="font-display text-base md:text-lg font-extrabold text-secondary-accent uppercase tracking-tight leading-tight">
                      {award.title}
                    </h3>
                  </div>

                  {/* Rank badge */}
                  <span
                    className={`font-mono text-[10px] font-bold border px-2 py-1 uppercase shrink-0 ${
                      RANK_COLOR[award.rank] ?? "text-primary-accent"
                    } border-current/30`}
                  >
                    <Trophy className="inline w-3 h-3 mr-1 mb-0.5" />
                    {award.rank}
                  </span>
                </div>

                {/* Meta row */}
                <div className="flex flex-wrap gap-4 font-mono text-[9px] text-secondary-accent/40 uppercase tracking-widest">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-primary-accent/60" />
                    {award.year}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-primary-accent/60" />
                    {award.location}
                  </span>
                </div>

                {/* Description */}
                <p className="text-secondary-accent/70 font-sans text-sm leading-relaxed">
                  {award.description}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
