"use client";

import DotField from "@/components/DotField";

/** Shared DotField background used on all pages except Home. */
export default function PageBackground() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
      <DotField
        dotRadius={2}
        dotSpacing={14}
        cursorRadius={500}
        cursorForce={0}
        bulgeOnly={false}
        bulgeStrength={67}
        glowRadius={160}
        sparkle
        sparkleChance={1}
        motionSpeed={0.65}
        waveAmplitude={0}
        gradientFrom="rgba(168, 85, 247, 0.35)"
        gradientTo="rgba(180, 151, 207, 0.25)"
        glowColor="#120F17"
      />
    </div>
  );
}
