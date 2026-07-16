"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════════════════
   HeroSchematic — CAD/Engineering Blueprint UAV Schematic
   Palette: cool-grey lines (#C8D0D8) on charcoal (#0B0C0E)
   Accent : cyan #3AA0FF (active) · amber #FF8A00 (stress)
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── Deterministic pseudo-random (avoids SSR hydration mismatch) ──────────
function srand(seed: number) {
  return ((Math.sin(seed * 127.1) * 43758.5453) % 1 + 1) % 1;
}
void srand; // suppress unused warning

// ─── Colour constants ──────────────────────────────────────────────────────
const C = {
  lineHeavy:  "#D0D8E0",  // primary outlines
  line:       "#B8C4CE",  // secondary surfaces
  muted:      "#5A6A7A",  // construction lines & labels
  grid:       "#8A9AAE",  // used for grid pattern stroke
  accent:     "#3AA0FF",  // active / selected state
  accentAmb:  "#FF8A00",  // stress-mode accent
  diagGreen:  "#3ADBA0",  // diagnostics-mode colour
  label:      "#6A7A8A",  // callout labels
  value:      "#DCE4EC",  // callout values
  stress1:    "#E8834A",  // stress heatmap root
  stress2:    "#D4A44A",  // stress heatmap mid
  stress3:    "#6A8FBF",  // stress heatmap tip
  bg:         "#0B0C0E",
};

// ─── UAV Wireframe path definitions ───────────────────────────────────────
// Top-down orthographic. 400×400 viewBox, centre (200, 200).
// Layers:
//   "outline"      — primary closed shapes   (1px, lineHeavy)
//   "surface"      — control-surface hinge lines (0.7px, line)
//   "detail"       — nacelles, bay, dome     (0.8px, line)
//   "construction" — spars, ribs, C/L datum  (dashed, muted)

type Layer = "outline" | "surface" | "detail" | "construction";
interface WPath { d: string; w: number; o: number; delay: number; layer: Layer }

const WIREFRAME: WPath[] = [
  // ── FUSELAGE (closed, tapered nose → tail boom) ──────────────────────────
  {
    d: "M200,48 C203,53 210,65 212,86 C215,107 216,128 216,148 C216,178 215,218 213,248 C211,278 209,308 207,334 C205,354 202,370 200,382 C198,370 195,354 193,334 C191,308 189,278 187,248 C185,218 184,178 184,148 C184,128 185,107 188,86 C190,65 197,53 200,48 Z",
    w: 1, o: 0.82, delay: 0, layer: "outline",
  },
  // ── LEFT WING (swept, tapered planform) ──────────────────────────────────
  {
    d: "M184,138 L46,174 Q40,181 42,194 L50,196 L184,168 Z",
    w: 1, o: 0.82, delay: 0.18, layer: "outline",
  },
  // ── RIGHT WING ────────────────────────────────────────────────────────────
  {
    d: "M216,138 L354,174 Q360,181 358,194 L350,196 L216,168 Z",
    w: 1, o: 0.82, delay: 0.18, layer: "outline",
  },
  // ── LEFT HORIZONTAL STABILISER ────────────────────────────────────────────
  {
    d: "M191,327 L126,341 Q120,347 122,355 L128,356 L191,345 Z",
    w: 1, o: 0.78, delay: 0.36, layer: "outline",
  },
  // ── RIGHT HORIZONTAL STABILISER ───────────────────────────────────────────
  {
    d: "M209,327 L274,341 Q280,347 278,355 L272,356 L209,345 Z",
    w: 1, o: 0.78, delay: 0.36, layer: "outline",
  },
  // ── VERTICAL FIN (top-down silhouette: very narrow symmetric shape) ───────
  {
    d: "M199,333 L199,380 L201,380 L201,333 Z",
    w: 0.8, o: 0.55, delay: 0.42, layer: "outline",
  },

  // ── LEFT AILERON HINGE LINE (outer ≈35 % span) ───────────────────────────
  { d: "M94,181 L50,193", w: 0.7, o: 0.52, delay: 0.55, layer: "surface" },
  // ── RIGHT AILERON HINGE LINE ─────────────────────────────────────────────
  { d: "M306,181 L350,193", w: 0.7, o: 0.52, delay: 0.55, layer: "surface" },
  // ── LEFT FLAP HINGE LINE (inner ≈40 % span) ──────────────────────────────
  { d: "M184,159 L128,177", w: 0.7, o: 0.52, delay: 0.60, layer: "surface" },
  // ── RIGHT FLAP HINGE LINE ────────────────────────────────────────────────
  { d: "M216,159 L272,177", w: 0.7, o: 0.52, delay: 0.60, layer: "surface" },
  // ── LEFT ELEVATOR HINGE LINE ─────────────────────────────────────────────
  { d: "M191,338 L130,352", w: 0.7, o: 0.5,  delay: 0.70, layer: "surface" },
  // ── RIGHT ELEVATOR HINGE LINE ────────────────────────────────────────────
  { d: "M209,338 L270,352", w: 0.7, o: 0.5,  delay: 0.70, layer: "surface" },
  // ── RUDDER HINGE LINE (on fin) ───────────────────────────────────────────
  { d: "M200,350 L200,378", w: 0.6, o: 0.42, delay: 0.72, layer: "surface" },

  // ── LEFT ENGINE NACELLE (streamlined pod, 30 % semi-span) ────────────────
  {
    d: "M142,149 C146,144 164,144 168,149 L170,163 C166,168 146,168 142,163 Z",
    w: 0.8, o: 0.65, delay: 0.50, layer: "detail",
  },
  // ── RIGHT ENGINE NACELLE ─────────────────────────────────────────────────
  {
    d: "M232,149 C236,144 254,144 258,149 L258,163 C254,168 234,168 230,163 Z",
    w: 0.8, o: 0.65, delay: 0.50, layer: "detail",
  },
  // ── NOSE SENSOR APERTURE (small ellipse) ─────────────────────────────────
  { d: "M197,60 A3,6 0 0,0 203,60 A3,6 0 0,0 197,60", w: 0.7, o: 0.55, delay: 0.78, layer: "detail" },
  // ── PAYLOAD / INSTRUMENT BAY (elongated oval on forward fuselage) ─────────
  {
    d: "M207,90 C209,100 210,122 210,142 C206,145 194,145 190,142 C190,122 191,100 193,90 Z",
    w: 0.6, o: 0.35, delay: 0.80, layer: "detail",
  },
  // ── NACELLE INTAKE RING (left) ────────────────────────────────────────────
  { d: "M143,149 A13,5 0 0,0 167,149", w: 0.5, o: 0.4,  delay: 0.82, layer: "detail" },
  // ── NACELLE INTAKE RING (right) ──────────────────────────────────────────
  { d: "M233,149 A13,5 0 0,0 257,149", w: 0.5, o: 0.4,  delay: 0.82, layer: "detail" },

  // ── WING MAIN SPAR (≈25 % chord, full span) ──────────────────────────────
  { d: "M42,183 L358,183", w: 0.4, o: 0.18, delay: 0.46, layer: "construction" },
  // ── WING REAR SPAR (≈70 % chord) ─────────────────────────────────────────
  { d: "M48,191 L352,191", w: 0.4, o: 0.13, delay: 0.49, layer: "construction" },
  // ── H-STAB MAIN SPAR ─────────────────────────────────────────────────────
  { d: "M191,334 L130,347", w: 0.35, o: 0.14, delay: 0.74, layer: "construction" },
  { d: "M209,334 L270,347", w: 0.35, o: 0.14, delay: 0.74, layer: "construction" },
  // ── FUSELAGE CENTRELINE (vertical datum) ─────────────────────────────────
  { d: "M200,55 L200,378", w: 0.4, o: 0.10, delay: 0.12, layer: "construction" },

  // ── WING RIBS — left (cross-section at 25 %, 50 %, 75 % span) ────────────
  { d: "M150,147 L150,174", w: 0.35, o: 0.18, delay: 0.65, layer: "construction" },
  { d: "M116,158 L116,181", w: 0.35, o: 0.18, delay: 0.68, layer: "construction" },
  { d: "M82,167 L82,188",   w: 0.35, o: 0.18, delay: 0.71, layer: "construction" },
  // ── WING RIBS — right ────────────────────────────────────────────────────
  { d: "M250,147 L250,174", w: 0.35, o: 0.18, delay: 0.65, layer: "construction" },
  { d: "M284,158 L284,181", w: 0.35, o: 0.18, delay: 0.68, layer: "construction" },
  { d: "M318,167 L318,188", w: 0.35, o: 0.18, delay: 0.71, layer: "construction" },

  // ── TAIL-BOOM STRINGER LINES (port & starboard) ───────────────────────────
  { d: "M205,270 C204,302 203,332 202,356", w: 0.35, o: 0.15, delay: 0.84, layer: "construction" },
  { d: "M195,270 C196,302 197,332 198,356", w: 0.35, o: 0.15, delay: 0.84, layer: "construction" },
];

// ─── Node markers at key structural points ────────────────────────────────
const NODES = [
  { cx: 200,  cy: 52,  r: 2.2, label: "NODE_001" }, // Nose
  { cx: 44,   cy: 186, r: 1.8, label: "NODE_111" }, // L wingtip
  { cx: 356,  cy: 186, r: 1.8, label: "NODE_112" }, // R wingtip
  { cx: 200,  cy: 200, r: 3.5, label: "NODE_441" }, // CG
  { cx: 124,  cy: 352, r: 1.5, label: "NODE_301" }, // L H-stab tip
  { cx: 276,  cy: 352, r: 1.5, label: "NODE_302" }, // R H-stab tip
  { cx: 200,  cy: 378, r: 1.8, label: "NODE_099" }, // Aft / tail
];

// ─── Callouts with leader-line endpoints ──────────────────────────────────
// lx1/ly1 = structural reference point on the drawing
// lx2/ly2 = label elbow (line endpoint near text)
const CALLOUTS = [
  { key: "wingspan", x: 8,   y: 100, label: "WINGSPAN",    value: "2.4 M",
    lx1: 44,  ly1: 180, lx2: 8,   ly2: 108, anchor: "start" },
  { key: "airframe", x: 392, y: 100, label: "AIRFRAME",    value: "COMPOSITE",
    lx1: 356, ly1: 180, lx2: 392, ly2: 108, anchor: "end"   },
  { key: "payload",  x: 8,   y: 358, label: "MAX PAYLOAD", value: "5.0 KG",
    lx1: 124, ly1: 348, lx2: 8,   ly2: 362, anchor: "start" },
  { key: "endurance",x: 392, y: 358, label: "ENDURANCE",   value: "45 MIN",
    lx1: 276, ly1: 348, lx2: 392, ly2: 362, anchor: "end"   },
];

// ─── Status ticker ────────────────────────────────────────────────────────
const STATUS_MSGS = [
  "SCANNING AIRFRAME GEOMETRY...",
  "STRUCTURAL FEA ANALYSIS OK",
  "CFD SIMULATION NOMINAL",
  "AUTOPILOT FIRMWARE v4.2.1",
  "ALL SYSTEMS OPERATIONAL",
  "MISSION PARAMETERS LOADED",
  "COMMS LINK ESTABLISHED",
];

// ─── Helpers ──────────────────────────────────────────────────────────────
function modeLineColor(mode: string) {
  if (mode === "stress")      return C.stress1;
  if (mode === "diagnostics") return C.diagGreen;
  return C.line;
}
function modeAccent(mode: string) {
  if (mode === "stress")      return C.accentAmb;
  if (mode === "diagnostics") return C.diagGreen;
  return C.accent;
}

// ─── Component ────────────────────────────────────────────────────────────
export default function HeroSchematic() {
  const shouldReduce = useReducedMotion();
  const [mounted,       setMounted]       = useState(false);
  const [statusIdx,     setStatusIdx]     = useState(0);
  const [activeMode,    setActiveMode]    = useState<"wireframe" | "stress" | "diagnostics">("wireframe");
  const [activeNode,    setActiveNode]    = useState(3); // default CG
  const [isCycling,     setIsCycling]     = useState(true);
  const [hoveredCallout,setHoveredCallout]= useState<string | null>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (shouldReduce) return;
    const id = setInterval(() => setStatusIdx(p => (p + 1) % STATUS_MSGS.length), 3500);
    return () => clearInterval(id);
  }, [shouldReduce]);

  useEffect(() => {
    if (!isCycling) return;
    const id = setInterval(() => setActiveNode(p => (p + 1) % NODES.length), 4500);
    return () => clearInterval(id);
  }, [isCycling]);

  // ── SSR placeholder ─────────────────────────────────────────────────────
  if (!mounted) return (
    <div className="w-full flex items-center justify-center border border-[#1E2A38]/60 bg-[#0B0C0E]" style={{ aspectRatio: "1" }}>
      <span className="font-mono text-[9px] text-[#3AA0FF]/20 uppercase tracking-[0.25em]">LOADING SCHEMATIC...</span>
    </div>
  );

  const lineColor  = modeLineColor(activeMode);
  const accent     = modeAccent(activeMode);

  return (
    <div className="relative w-full mx-auto select-none flex flex-col gap-2" style={{ maxWidth: 520 }}>

      {/* ════════ FLAT TAB BAR ════════ */}
      <div className="flex border border-[#1E2632]/70 bg-[#0D1018]/95 backdrop-blur-md font-mono justify-between items-center relative px-2 py-1.5">
        {/* Corner brackets — thin, 1px */}
        <span className="absolute top-0 left-0  w-2.5 h-2.5 border-t border-l border-[#3AA0FF]/25 pointer-events-none" />
        <span className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#3AA0FF]/25 pointer-events-none" />
        <span className="absolute bottom-0 left-0  w-2.5 h-2.5 border-b border-l border-[#3AA0FF]/25 pointer-events-none" />
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[#3AA0FF]/25 pointer-events-none" />

        <span className="pl-1 font-mono text-[7.5px] text-[#5A6A7A] tracking-[0.18em] uppercase">
          ⌐ FLIGHT_DIAGNOSTICS ¬
        </span>

        {/* Flat tabs — bottom-border indicator only, no gradient fill */}
        <div className="flex gap-0.5 z-10">
          {([
            { id: "wireframe",   label: "WFR_01", desc: "Wireframe View"  },
            { id: "stress",      label: "STR_02", desc: "Stress Heatmap"  },
            { id: "diagnostics", label: "DIA_03", desc: "Digital Stream"  },
          ] as const).map((mode) => {
            const isActive = activeMode === mode.id;
            const tabAccent =
              mode.id === "stress"      ? C.accentAmb  :
              mode.id === "diagnostics" ? C.diagGreen  : C.accent;
            return (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                title={mode.desc}
                className="px-2 py-0.5 cursor-pointer text-[7.5px] tracking-[0.12em] transition-all duration-200 font-mono bg-transparent"
                style={{
                  color:       isActive ? tabAccent : "#4A5A6A",
                  borderBottom: isActive ? `1.5px solid ${tabAccent}` : "1.5px solid transparent",
                  borderTop:    "1.5px solid transparent",
                  borderLeft:   "none",
                  borderRight:  "none",
                  outline:      "none",
                }}
              >
                {mode.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ════════ MAIN SCHEMATIC AREA ════════ */}
      <div className="relative border border-[#1E2632]/50 bg-[#0B0C0E] overflow-hidden">
        {/* Corner brackets aligned to SVG grid */}
        <span className="absolute top-0 left-0  w-4 h-4 border-t border-l border-[#3AA0FF]/20 z-10 pointer-events-none" />
        <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#3AA0FF]/20 z-10 pointer-events-none" />
        <span className="absolute bottom-0 left-0  w-4 h-4 border-b border-l border-[#3AA0FF]/20 z-10 pointer-events-none" />
        <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#3AA0FF]/20 z-10 pointer-events-none" />

        <svg viewBox="0 0 400 400" className="w-full h-auto" style={{ display: "block" }}>
          <defs>
            {/* ── Blueprint CAD graph paper grid ─────────────────────────── */}
            <pattern id="grid-minor" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M10 0 L0 0 0 10" fill="none"
                stroke={C.grid} strokeWidth="0.18"
                opacity={activeMode === "diagnostics" ? "0.07" : "0.06"}
              />
            </pattern>
            <pattern id="grid-major" width="50" height="50" patternUnits="userSpaceOnUse">
              <rect width="50" height="50" fill="url(#grid-minor)" />
              <path d="M50 0 L0 0 0 50" fill="none"
                stroke={C.grid} strokeWidth="0.35"
                opacity={activeMode === "diagnostics" ? "0.12" : "0.10"}
              />
            </pattern>

            {/* ── Active-node subtle glow: 1-2px blur, low opacity ───────── */}
            <filter id="glow-active" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* ── Stress heatmap gradients (muted, no neon) ─────────────── */}
            <linearGradient id="stress-left"  x1="100%" y1="0%" x2="0%"   y2="0%">
              <stop offset="0%"   stopColor={C.stress1} stopOpacity="0.75" />
              <stop offset="50%"  stopColor={C.stress2} stopOpacity="0.45" />
              <stop offset="100%" stopColor={C.stress3} stopOpacity="0.20" />
            </linearGradient>
            <linearGradient id="stress-right" x1="0%"   y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor={C.stress1} stopOpacity="0.75" />
              <stop offset="50%"  stopColor={C.stress2} stopOpacity="0.45" />
              <stop offset="100%" stopColor={C.stress3} stopOpacity="0.20" />
            </linearGradient>
            <linearGradient id="stress-fuse"  x1="0%"   y1="0%" x2="0%"   y2="100%">
              <stop offset="0%"   stopColor={C.stress3} stopOpacity="0.20" />
              <stop offset="50%"  stopColor={C.stress2} stopOpacity="0.42" />
              <stop offset="100%" stopColor={C.stress1} stopOpacity="0.68" />
            </linearGradient>
          </defs>

          {/* ════════ BACKGROUND: CAD GRID ════════ */}
          <rect x="0" y="0" width="400" height="400" fill="url(#grid-major)" />

          {/* ════════ DATUM / CONSTRUCTION AXES ════════ */}
          {/* Horizontal datum at CG */}
          <line x1="15" y1="200" x2="385" y2="200"
            stroke={C.muted} strokeWidth="0.28" strokeDasharray="6 5" opacity="0.12" />
          {/* Fuselage centreline */}
          <line x1="200" y1="15" x2="200" y2="385"
            stroke={C.muted} strokeWidth="0.28" strokeDasharray="6 5" opacity="0.12" />

          {/* ════════ DIAGNOSTICS TEXT OVERLAY ════════ */}
          {activeMode === "diagnostics" && (
            <g fill={C.diagGreen} opacity="0.28" fontSize="5" fontFamily="ui-monospace,monospace" letterSpacing="0.6">
              <text x="22" y="50">SYS_CHECK // RUNNING</text>
              <text x="22" y="59">GNSS_RTK: COORD_LOCK</text>
              <text x="22" y="68">PITCH: +1.4 DEG</text>
              <text x="22" y="77">ESC_COMM: 115200BPS</text>
              <text x="268" y="50">HD_CAM // 1080P_60</text>
              <text x="268" y="59">TELEM_RSSI: 99%</text>
              <text x="268" y="68">ROLL: -0.8 DEG</text>
              <text x="268" y="77">MEM_USED: 24.1KB</text>
            </g>
          )}

          {/* ════════ STRESS HEATMAP OVERLAY ════════ */}
          {activeMode === "stress" && (
            <g opacity="0.82">
              <path d="M184,138 L46,174 Q40,181 42,194 L50,196 L184,168 Z"
                fill="none" stroke="url(#stress-left)"  strokeWidth="4" strokeLinecap="round" />
              <path d="M216,138 L354,174 Q360,181 358,194 L350,196 L216,168 Z"
                fill="none" stroke="url(#stress-right)" strokeWidth="4" strokeLinecap="round" />
              <path d="M191,327 L126,341 Q120,347 122,355 L128,356 L191,345 Z"
                fill="none" stroke="url(#stress-left)"  strokeWidth="3" />
              <path d="M209,327 L274,341 Q280,347 278,355 L272,356 L209,345 Z"
                fill="none" stroke="url(#stress-right)" strokeWidth="3" />
              <path d="M200,48 C203,53 210,65 212,86 C215,107 216,128 216,148 C216,178 215,218 213,248 C211,278 209,308 207,334 C205,354 202,370 200,382 C198,370 195,354 193,334 C191,308 189,278 187,248 C185,218 184,178 184,148 C184,128 185,107 188,86 C190,65 197,53 200,48 Z"
                fill="none" stroke="url(#stress-fuse)"  strokeWidth="3.5" />
            </g>
          )}

          {/* ════════ UAV TECHNICAL DRAWING — CRISP 1 PX LINEWORK ════════ */}
          <g>
            {WIREFRAME.map((path, i) => {
              // Per-layer colour resolution
              const isConstruction = path.layer === "construction";
              const stroke =
                activeMode === "stress"      && !isConstruction ? C.stress1      :
                activeMode === "diagnostics" && !isConstruction ? C.diagGreen    :
                path.layer === "outline"  ? C.lineHeavy :
                path.layer === "surface"  ? C.line      :
                path.layer === "detail"   ? C.line      :
                C.muted;

              const opacity =
                activeMode === "stress" && !isConstruction ? path.o * 0.32 : path.o;

              return (
                <motion.path
                  key={i}
                  d={path.d}
                  fill="none"
                  stroke={stroke}
                  strokeWidth={path.w}
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  strokeDasharray={isConstruction ? "4 4" : undefined}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity }}
                  transition={{
                    pathLength: { duration: 1.8, delay: path.delay, ease: "easeInOut" },
                    opacity:    { duration: 0.4, delay: path.delay },
                  }}
                />
              );
            })}
          </g>

          {/* ════════ CALLOUT OVERLAY GRAPHICS (hover) ════════ */}

          {/* 1 — Wingspan dimension */}
          {hoveredCallout === "wingspan" && (
            <g>
              <line x1="44" y1="188" x2="356" y2="188"
                stroke={accent} strokeWidth="0.65" strokeDasharray="3 3" opacity="0.65" />
              <line x1="44" y1="174" x2="44"  y2="200" stroke={accent} strokeWidth="0.45" opacity="0.45" />
              <line x1="356" y1="174" x2="356" y2="200" stroke={accent} strokeWidth="0.45" opacity="0.45" />
              <polygon points="44,188 52,184 52,192"   fill={accent} opacity="0.7" />
              <polygon points="356,188 348,184 348,192" fill={accent} opacity="0.7" />
              <rect x="170" y="179" width="60" height="16" fill={C.bg} stroke={accent} strokeWidth="0.55" />
              <text x="200" y="190" textAnchor="middle" fill={C.value} fontSize="6.5" fontFamily="ui-monospace,monospace">
                2400 MM
              </text>
            </g>
          )}

          {/* 2 — Airframe / main spar highlight */}
          {hoveredCallout === "airframe" && (
            <g filter="url(#glow-active)">
              <line x1="42" y1="183" x2="358" y2="183" stroke={accent} strokeWidth="1.1" opacity="0.65" />
              <line x1="48" y1="191" x2="352" y2="191" stroke={accent} strokeWidth="0.7" opacity="0.42" />
              <text x="200" y="175" textAnchor="middle" fill={accent} fontSize="6" fontFamily="ui-monospace,monospace" opacity="0.8">
                CFRP MAIN SPAR
              </text>
            </g>
          )}

          {/* 3 — Payload compartment box */}
          {hoveredCallout === "payload" && (
            <g>
              <rect x="186" y="95" width="28" height="48"
                fill="none" stroke={accent} strokeWidth="0.65" strokeDasharray="3 2" opacity="0.75" />
              <text x="200" y="152" textAnchor="middle" fill={accent} fontSize="5.5" fontFamily="ui-monospace,monospace" opacity="0.8">
                PAYLOAD BAY
              </text>
            </g>
          )}

          {/* 4 — Endurance / engine flow */}
          {hoveredCallout === "endurance" && (
            <g>
              <path d="M142,149 C146,144 164,144 168,149 L170,163 C166,168 146,168 142,163 Z"
                fill="none" stroke={accent} strokeWidth="0.75" opacity="0.8" />
              <path d="M232,149 C236,144 254,144 258,149 L258,163 C254,168 234,168 230,163 Z"
                fill="none" stroke={accent} strokeWidth="0.75" opacity="0.8" />
              {/* Propulsion flow lines */}
              <path d="M155,143 L155,96" fill="none" stroke={accent} strokeWidth="0.55" strokeDasharray="4 3" opacity="0.6">
                <animate attributeName="stroke-dashoffset" values="28;0" dur="1s" repeatCount="indefinite" />
              </path>
              <path d="M245,143 L245,96" fill="none" stroke={accent} strokeWidth="0.55" strokeDasharray="4 3" opacity="0.6">
                <animate attributeName="stroke-dashoffset" values="28;0" dur="1s" repeatCount="indefinite" />
              </path>
              <text x="200" y="89" textAnchor="middle" fill={accent} fontSize="6" fontFamily="ui-monospace,monospace" opacity="0.8">
                6S LIPO // 22.8V
              </text>
            </g>
          )}

          {/* ════════ CG CROSS MARKER ════════ */}
          <g opacity="0.45">
            <line x1="186" y1="200" x2="194" y2="200" stroke={C.line} strokeWidth="0.6" />
            <line x1="206" y1="200" x2="214" y2="200" stroke={C.line} strokeWidth="0.6" />
            <line x1="200" y1="186" x2="200" y2="194" stroke={C.line} strokeWidth="0.6" />
            <line x1="200" y1="206" x2="200" y2="214" stroke={C.line} strokeWidth="0.6" />
            <circle cx="200" cy="200" r="4.5" fill="none" stroke={C.line} strokeWidth="0.5" />
            <text x="215" y="203" fill={C.muted} fontSize="4.5" fontFamily="ui-monospace,monospace" opacity="0.7">CG</text>
          </g>

          {/* ════════ ACTIVE NODE INDICATOR ════════ */}
          <g>
            {NODES.map((n, i) => {
              if (activeNode !== i) return null;
              return (
                <g key={`indicator-${i}`} filter="url(#glow-active)">
                  {/* Slowly rotating outer ring — very subtle glow from filter */}
                  <motion.circle
                    cx={n.cx} cy={n.cy} r="10"
                    fill="none" stroke={accent} strokeWidth="0.65"
                    strokeDasharray="2.5 2"
                    opacity="0.65"
                    animate={shouldReduce ? {} : { rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
                  />
                  {/* Inner ring */}
                  <circle cx={n.cx} cy={n.cy} r="5" fill="none" stroke={accent} strokeWidth="0.45" opacity="0.45" />
                  {/* Short crosshair arms */}
                  <line x1={n.cx-18} y1={n.cy} x2={n.cx-12} y2={n.cy} stroke={accent} strokeWidth="0.45" opacity="0.65" />
                  <line x1={n.cx+12} y1={n.cy} x2={n.cx+18} y2={n.cy} stroke={accent} strokeWidth="0.45" opacity="0.65" />
                  <line x1={n.cx} y1={n.cy-18} x2={n.cx} y2={n.cy-12} stroke={accent} strokeWidth="0.45" opacity="0.65" />
                  <line x1={n.cx} y1={n.cy+12} x2={n.cx} y2={n.cy+18} stroke={accent} strokeWidth="0.45" opacity="0.65" />
                  {/* Label */}
                  <text x={n.cx+14} y={n.cy-2} fill={accent} fontSize="4.5" fontFamily="ui-monospace,monospace" opacity="0.9">
                    {n.label}
                  </text>
                  <text x={n.cx+14} y={n.cy+6} fill={accent} fontSize="4" fontFamily="ui-monospace,monospace" opacity="0.65">
                    [ACQ]
                  </text>
                </g>
              );
            })}
          </g>

          {/* ════════ NODE DOTS ════════ */}
          <g>
            {NODES.map((n, i) => {
              const isActive = activeNode === i;
              return (
                <React.Fragment key={i}>
                  <circle
                    cx={n.cx} cy={n.cy} r={n.r}
                    fill={isActive ? accent : C.muted}
                    opacity={isActive ? 1 : 0.55}
                    className="transition-all duration-300"
                  />
                  {isActive && !shouldReduce && (
                    <motion.circle
                      cx={n.cx} cy={n.cy} r={n.r}
                      fill="none" stroke={accent} strokeWidth="0.5"
                      style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
                      animate={{ scale: [1, 5], opacity: [0.55, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </g>

          {/* ════════ INVISIBLE HIT AREAS ════════ */}
          {NODES.map((n, i) => (
            <circle
              key={`hit-${i}`}
              cx={n.cx} cy={n.cy} r="16"
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => { setActiveNode(i); setIsCycling(false); }}
              onMouseLeave={() => setIsCycling(true)}
              onClick={() => { setActiveNode(i); setIsCycling(false); }}
            />
          ))}

          {/* ════════ CALLOUT LEADER LINES & LABELS ════════ */}
          {CALLOUTS.map((c, i) => {
            const isHov = hoveredCallout === c.key;
            return (
              <motion.g
                key={c.key}
                onMouseEnter={() => setHoveredCallout(c.key)}
                onMouseLeave={() => setHoveredCallout(null)}
                className="cursor-pointer select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.9 + i * 0.25 }}
              >
                {/* Leader: structural reference → label elbow */}
                <line
                  x1={c.lx1} y1={c.ly1} x2={c.lx2} y2={c.ly2}
                  stroke={isHov ? accent : C.muted}
                  strokeWidth={isHov ? "0.65" : "0.38"}
                  strokeDasharray="2 3"
                  opacity={isHov ? "0.85" : "0.38"}
                />
                {/* Reference-point dot */}
                <circle cx={c.lx1} cy={c.ly1} r="1.2"
                  fill={isHov ? accent : C.muted}
                  opacity={isHov ? "0.9" : "0.4"}
                />
                {/* Label (small-caps monospace, muted grey) */}
                <text
                  x={c.x} y={c.y}
                  textAnchor={c.anchor as "start"|"end"}
                  fill={isHov ? accent : C.label}
                  opacity={isHov ? "0.95" : "0.62"}
                  fontSize="5.5" fontFamily="ui-monospace,monospace" letterSpacing="0.9"
                >
                  {c.label}
                </text>
                {/* Value (bright near-white) */}
                <text
                  x={c.x} y={c.y + 11}
                  textAnchor={c.anchor as "start"|"end"}
                  fill={isHov ? accent : C.value}
                  opacity={isHov ? "1" : "0.88"}
                  fontSize="9" fontFamily="ui-monospace,monospace" fontWeight="bold"
                >
                  {c.value}
                </text>
              </motion.g>
            );
          })}

          {/* ════════ CORNER DIMENSION BRACKETS (grid-aligned) ════════ */}
          <path d="M25,45 L25,25 L45,25"   fill="none" stroke={C.muted} strokeWidth="0.7" opacity="0.38" />
          <path d="M375,45 L375,25 L355,25" fill="none" stroke={C.muted} strokeWidth="0.7" opacity="0.38" />
          <path d="M25,355 L25,375 L45,375"  fill="none" stroke={C.muted} strokeWidth="0.7" opacity="0.38" />
          <path d="M375,355 L375,375 L355,375" fill="none" stroke={C.muted} strokeWidth="0.7" opacity="0.38" />

          {/* Grid coordinate annotations */}
          <text x="28"  y="22"  fill={C.muted} fontSize="4"  fontFamily="ui-monospace,monospace" opacity="0.32">0,0</text>
          <text x="372" y="22"  fill={C.muted} fontSize="4"  fontFamily="ui-monospace,monospace" opacity="0.32" textAnchor="end">400,0</text>
          <text x="28"  y="392" fill={C.muted} fontSize="4"  fontFamily="ui-monospace,monospace" opacity="0.32">0,400</text>
          <text x="372" y="392" fill={C.muted} fontSize="4"  fontFamily="ui-monospace,monospace" opacity="0.32" textAnchor="end">400,400</text>

          {/* ════════ DRAWING HEADER ════════ */}
          <text x="200" y="13" textAnchor="middle"
            fill={C.muted} opacity="0.42"
            fontSize="5" fontFamily="ui-monospace,monospace" letterSpacing="2"
          >
            AIRFRAME_SCHEMATIC_01 · TOP VIEW · 1:12 SCALE
          </text>

          {/* ════════ STATUS TICKER ════════ */}
          <AnimatePresence mode="wait">
            <motion.text
              key={statusIdx}
              x="200" y="395" textAnchor="middle"
              fill={lineColor} fontSize="5"
              fontFamily="ui-monospace,monospace" letterSpacing="1.2"
              initial={{ opacity: 0, y: 399 }}
              animate={{ opacity: 0.32, y: 395 }}
              exit={{ opacity: 0, y: 391 }}
              transition={{ duration: 0.3 }}
            >
              {STATUS_MSGS[statusIdx]}
            </motion.text>
          </AnimatePresence>
        </svg>

        {/* Bottom-right mode label */}
        <div
          className="absolute bottom-1.5 right-2.5 font-mono text-[6px] tracking-[0.18em] uppercase transition-colors duration-300"
          style={{ color: `${accent}55` }}
        >
          {activeMode === "diagnostics" ? "DIAGNOSTICS_VIEW // CYCLING"
            : activeMode === "stress"  ? "STRUCTURAL_ANALYSIS // ACTIVE"
            :                            "BLUEPRINT_VIEW // NOMINAL"}
        </div>
      </div>
    </div>
  );
}
