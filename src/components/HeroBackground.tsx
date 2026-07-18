"use client";

import React from "react";

// Particle shader removed — keep a lightweight placeholder element so layout/z-index remains
export default function HeroBackground() {
  return <div className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}
