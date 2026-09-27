"use client";

import React from "react";
import { Train, ShieldCheck, ArrowRight, Globe } from "lucide-react";
import { ContinentalRailways } from "./pillars/ContinentalRailways";
import { CivilizationClaims } from "./pillars/CivilizationClaims";
import { LivingWorldExplorer } from "./pillars/LivingWorldExplorer";

interface FrontierShowcaseProps {
  onOpenBlueMapModal?: () => void;
  onOpenJoinModal?: () => void;
}

export function FrontierShowcase({ onOpenBlueMapModal, onOpenJoinModal }: FrontierShowcaseProps) {
  return (
    <section id="showcase" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-36">
      
      {/* ========================================================================= */}
      {/* 01 // CONTINENTAL RAILWAYS (EDITORIAL SPLIT) */}
      {/* ========================================================================= */}
      <div id="corridors" className="relative">
        {/* Soft Ambient Light Glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-radial from-amber-500/[0.04] to-transparent pointer-events-none blur-3xl" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Editorial Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400 font-mono text-[11px] uppercase tracking-widest">
              <Train className="w-3.5 h-3.5 text-amber-400" />
              INFRASTRUCTURE // HIGH-SPEED TRANSIT
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-[-0.02em] font-normal leading-[1.12]">
              Continental Rail Corridors.
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base font-normal leading-relaxed">
              Travel across thousands of blocks seamlessly. Players build automated train networks with custom steam and electric locomotives, scheduled timetables, and multi-track stations connecting every biome.
            </p>

            <div className="space-y-3 pt-2 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Automated Inter-City Freight</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Multi-Track Optical Signaling</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>45.0 m/s Superheated Steam Bogies</span>
              </div>
            </div>

            {onOpenBlueMapModal && (
              <div className="pt-4">
                <button
                  onClick={onOpenBlueMapModal}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white hover:text-amber-300 transition-colors group cursor-pointer"
                >
                  <span>Trace Lines on 3D BlueMap</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </div>

          {/* Interactive Widget Column */}
          <div className="lg:col-span-8">
            <div className="rounded-[30px] border border-white/[0.08] bg-[#0c0d12] shadow-[0_34px_90px_rgba(0,0,0,0.6)] overflow-hidden">
              <ContinentalRailways />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 02 // SOVEREIGN CLAIMS & CIVILIZATIONS (EDITORIAL SPLIT) */}
      {/* ========================================================================= */}
      <div id="sovereignty" className="relative">
        {/* Soft Ambient Light Glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-radial from-emerald-500/[0.04] to-transparent pointer-events-none blur-3xl" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Interactive Widget Column */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <div className="rounded-[30px] border border-white/[0.08] bg-[#0c0d12] shadow-[0_34px_90px_rgba(0,0,0,0.6)] overflow-hidden">
              <CivilizationClaims />
            </div>
          </div>

          {/* Editorial Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6 text-left order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400 font-mono text-[11px] uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              CIVIL JURISDICTION // PEACEFUL SMP
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-[-0.02em] font-normal leading-[1.12]">
              Sovereign Land Claims.
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base font-normal leading-relaxed">
              Build your dream city with complete peace of mind. Our mathematical chunk-claim system guarantees 100% grief protection, party permission sharing, and community governance with zero command complexity.
            </p>

            <div className="space-y-3 pt-2 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Instant Chunk Minimap Claiming</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Anti-Grief, Vault, & Redstone Locks</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Scam-Proof Player Trading</span>
              </div>
            </div>

            {onOpenJoinModal && (
              <div className="pt-4">
                <button
                  onClick={onOpenJoinModal}
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white hover:text-emerald-300 transition-colors group cursor-pointer"
                >
                  <span>Charter Your Settlement</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 03 // LIVING WORLD & BIOMES (FULL-WIDTH IMMERSIVE) */}
      {/* ========================================================================= */}
      <div id="biomes" className="relative">
        <div className="max-w-3xl mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400 font-mono text-[11px] uppercase tracking-widest mb-4">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            CARTOGRAPHY // WORLD GENERATION
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-[-0.02em] font-normal leading-[1.12] mb-4">
            85+ Procedural Biomes & Massive Landscapes.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-normal leading-relaxed">
            Powered by the acclaimed Terralith terrain engine, the world features realistic mountain elevations, towering cliffs, lush cavern systems, and rich wildlife ecosystems from bedrock to stratosphere.
          </p>
        </div>

        <div className="rounded-[30px] border border-white/[0.08] bg-[#0c0d12] shadow-[0_34px_90px_rgba(0,0,0,0.6)] overflow-hidden">
          <LivingWorldExplorer />
        </div>
      </div>

    </section>
  );
}
