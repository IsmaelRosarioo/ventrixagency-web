"use client";

import React from "react";
import { Orbit } from "lucide-react";
import { OrbitalRadarCanvas } from "./pillars/OrbitalRadarCanvas";

export function CelestialRadarSection() {
  return (
    <section id="radar" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Ambient background bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-radial from-cyan-500/[0.04] via-indigo-500/[0.02] to-transparent pointer-events-none blur-3xl" />

      {/* Section Header */}
      <div className="max-w-3xl mb-16 text-left relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400 font-mono text-[11px] uppercase tracking-widest mb-4">
          <Orbit className="w-3.5 h-3.5 text-cyan-400" />
          CELESTIAL RECONNAISSANCE // ORBITAL RADAR MATRIX
        </div>
        <h2 className="text-4xl sm:text-6xl font-serif text-white tracking-[-0.02em] font-normal mb-6">
          The Solar System. Charted and Accessible.
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg font-normal leading-relaxed">
          Four celestial horizons. From the cratered dust plains of Luna to the frozen permafrost of extrasolar Glacio, each planetary body possesses unique gravitational physics, hostile atmospheric hazards, and essential mineral deposits required for deep-space expansion.
        </p>
      </div>

      {/* The 3D Dotted Canvas Globe & Telemetry Suite */}
      <div className="relative z-10">
        <OrbitalRadarCanvas />
      </div>
    </section>
  );
}
