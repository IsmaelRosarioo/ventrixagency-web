"use client";

import React from "react";
import Image from "next/image";
import { Train, ShieldCheck, Globe, ArrowRight } from "lucide-react";

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Editorial Column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400 font-mono text-[11px] uppercase tracking-widest">
              <Train className="w-3.5 h-3.5 text-amber-400" />
              INFRASTRUCTURE // HIGH-SPEED CORRIDORS
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-[-0.02em] font-normal leading-[1.12]">
              Transcontinental Transit. Across Living Biomes.
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base font-normal leading-relaxed">
              Travel across thousands of blocks seamlessly. Players build automated train networks with custom steam and electric locomotives, scheduled timetables, and multi-track stations connecting every settlement.
            </p>

            <div className="space-y-3 pt-2 text-xs font-mono text-zinc-300">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>45.0 m/s Superheated Steam Bogies</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Multi-Track Optical Collision Signals</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Automated Bulk Inter-City Freight</span>
              </div>
            </div>

            {onOpenBlueMapModal && (
              <div className="pt-4">
                <button
                  onClick={onOpenBlueMapModal}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.08] text-xs font-mono uppercase tracking-wider text-white transition-all duration-200 cursor-pointer group"
                >
                  <span>Trace Lines on 3D BlueMap</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </div>

          {/* Visual Showcase Column */}
          <div className="lg:col-span-7">
            <div className="relative rounded-[32px] border border-white/[0.1] bg-[#0c0d12] shadow-[0_34px_90px_rgba(0,0,0,0.6)] overflow-hidden group">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src="/branding/frontier-hero-cinematic.jpg"
                  alt="Alpine Mountain Railway Viaduct"
                  fill
                  className="object-cover object-center transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                />
                {/* Soft gradient vignetting */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-transparent to-black/20 pointer-events-none" />

                {/* Floating Glass Pill HUD Badges */}
                <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-xl text-[11px] font-mono text-zinc-200 flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>Line 01 // Aurelia Transcontinental Express</span>
                </div>

                <div className="absolute bottom-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-xl text-[11px] font-mono text-zinc-300 flex items-center gap-2 shadow-lg">
                  <span>45.0 m/s • 0 Collision Incidents</span>
                </div>
              </div>
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Showcase Column */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative rounded-[32px] border border-white/[0.1] bg-[#0c0d12] shadow-[0_34px_90px_rgba(0,0,0,0.6)] overflow-hidden group">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src="/branding/sovereign-city-cinematic.jpg"
                  alt="Sovereign Player City and Fortress"
                  fill
                  className="object-cover object-center transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
                />
                {/* Soft gradient vignetting */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-transparent to-black/20 pointer-events-none" />

                {/* Floating Glass Pill HUD Badges */}
                <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-xl text-[11px] font-mono text-zinc-200 flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Chartered Settlement // New Alexandria</span>
                </div>

                <div className="absolute bottom-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-xl text-[11px] font-mono text-zinc-300 flex items-center gap-2 shadow-lg">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Anti-Grief Protection Guaranteed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Column */}
          <div className="lg:col-span-5 space-y-6 text-left order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400 font-mono text-[11px] uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              CIVIL JURISDICTION // PEACEFUL SMP
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-[-0.02em] font-normal leading-[1.12]">
              Sovereign Land Claims. Unyielding Security.
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base font-normal leading-relaxed">
              Build your dream city with complete peace of mind. Our mathematical chunk-claim system guarantees 100% grief protection, party permission sharing, and community governance with zero command complexity.
            </p>

            <div className="space-y-3 pt-2 text-xs font-mono text-zinc-300">
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.08] text-xs font-mono uppercase tracking-wider text-white transition-all duration-200 cursor-pointer group"
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
      {/* 03 // LIVING WORLD & 85+ TERRALITH BIOMES (FULL-WIDTH IMMERSIVE) */}
      {/* ========================================================================= */}
      <div id="biomes" className="relative space-y-12">
        <div className="max-w-3xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400 font-mono text-[11px] uppercase tracking-widest mb-4">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            CARTOGRAPHY // 85+ PROCEDURAL BIOMES
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-[-0.02em] font-normal leading-[1.12] mb-4">
            Colossal Topography. Bedrock to Stratosphere.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-normal leading-relaxed">
            Powered by the acclaimed Terralith terrain engine, the world features realistic mountain elevations, towering waterfalls, and crystal cavern systems across a stratigraphic span of 384 blocks (Y=-64 to Y=320).
          </p>
        </div>

        <div className="relative rounded-[32px] border border-white/[0.1] bg-[#0c0d12] shadow-[0_34px_90px_rgba(0,0,0,0.6)] overflow-hidden group">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
            <Image
              src="/branding/terralith-biomes-cinematic.jpg"
              alt="Terralith Biomes Panoramic Landscape"
              fill
              className="object-cover object-center transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02]"
            />
            {/* Soft gradient vignetting */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-transparent to-black/20 pointer-events-none" />

            {/* Floating Glass Pill HUD Badges */}
            <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-xl text-[11px] font-mono text-zinc-200 flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>Stratigraphic Span: Y=-64 to Y=320</span>
            </div>

            <div className="absolute bottom-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-xl text-[11px] font-mono text-zinc-300 flex items-center gap-2 shadow-lg">
              <span>85+ Procedural Biomes • Pure Vanilla Block Palette</span>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
