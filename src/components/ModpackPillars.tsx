"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Compass,
  Rocket,
  Train,
  Shield,
  Globe,
  Activity,
  Box,
  ShieldCheck,
  Landmark,
  Users,
  Mountain,
  Orbit,
} from "lucide-react";
import { OrbitalRadarCanvas } from "./pillars/OrbitalRadarCanvas";
import { CosmosOrbitalMap } from "./pillars/CosmosOrbitalMap";
import { ContinentalRailways } from "./pillars/ContinentalRailways";
import { CivilizationClaims } from "./pillars/CivilizationClaims";
import { LivingWorldExplorer } from "./pillars/LivingWorldExplorer";

export function ModpackPillars() {
  const [activeTab, setActiveTab] = useState<"space" | "rail" | "civilization" | "world">("space");
  const [spaceSubView, setSpaceSubView] = useState<"canvas" | "system">("canvas");

  useEffect(() => {
    const handleTabChange = (e: Event) => {
      const custom = e as CustomEvent<"space" | "rail" | "civilization" | "world">;
      if (custom.detail) {
        setActiveTab(custom.detail);
      }
    };
    window.addEventListener("ventrix:set-pillar-tab", handleTabChange);
    return () => window.removeEventListener("ventrix:set-pillar-tab", handleTabChange);
  }, []);

  return (
    <section id="pillars" className="feature-section immersive-section relative py-28 md:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Dynamic Ambient Atmospheric Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-cyan-500/10 via-indigo-500/5 to-transparent blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(120,119,198,0.08),transparent_70%)] pointer-events-none -z-10" />

      {/* Header Container */}
      <div className="max-w-3xl mb-16 text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400 font-mono text-xs uppercase tracking-[0.22em] mb-4 backdrop-blur-md">
          <Compass className="w-3.5 h-3.5 text-zinc-400" />
          <span>ARCHITECTURAL FOUNDATION // FOUR PILLARS</span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-medium text-white tracking-[-0.035em] mb-4 leading-[1.08]">
          The Frontier Experience. Four Pillars of Civilization.
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg font-normal leading-relaxed text-balance">
          Ventrix: Frontier is designed as an enduring multiplayer civilization. Every system interconnects to support long-term territorial settlement, synchronized continental transit, and cooperative deep-space colonization.
        </p>

        {/* Smooth Pill Navigation for the 4 Pillars */}
        <div className="inline-flex flex-wrap p-1.5 rounded-full bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl shadow-inner mt-8 gap-1.5">
          <button
            onClick={() => setActiveTab("space")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer select-none ${
              activeTab === "space"
                ? "bg-white text-black font-semibold shadow-lg shadow-white/10"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>01 // Interplanetary Space Program</span>
          </button>

          <button
            onClick={() => setActiveTab("rail")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer select-none ${
              activeTab === "rail"
                ? "bg-white text-black font-semibold shadow-lg shadow-white/10"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            <Train className="w-3.5 h-3.5" />
            <span>02 // Continental Rail Corridors</span>
          </button>

          <button
            onClick={() => setActiveTab("civilization")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer select-none ${
              activeTab === "civilization"
                ? "bg-white text-black font-semibold shadow-lg shadow-white/10"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>03 // Sovereign Claims & Civilizations</span>
          </button>

          <button
            onClick={() => setActiveTab("world")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer select-none ${
              activeTab === "world"
                ? "bg-white text-black font-semibold shadow-lg shadow-white/10"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>04 // Living World & Biomes</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 01 // INTERPLANETARY SPACE PROGRAM (AD ASTRA)                             */}
      {/* ========================================================================= */}
      {activeTab === "space" && (
        <div className="space-y-10 animate-fadeIn">
          {/* Floating Showcase Panel 1: 8K Space Expedition Cinematic */}
          <div className="floating-showcase-panel rounded-[30px] overflow-hidden border border-white/10 shadow-[0_34px_90px_rgba(0,0,0,0.5)] group bg-black">
            <div className="relative aspect-[16/8] sm:aspect-[21/9] w-full overflow-hidden">
              <Image
                src="/branding/space-expedition-cinematic.jpg"
                alt="Ventrix Deep-Space Colonization Expedition Visual"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.015]"
              />

              {/* Seamless Dark Gradient Vignettes */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-black/35 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#050608]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050608]/70 via-transparent to-[#050608]/70 pointer-events-none" />

              {/* Overlaid Floating HUD Capsules */}
              <div className="absolute inset-0 p-5 sm:p-7 md:p-9 flex flex-col justify-between pointer-events-none">
                <div className="flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-xs font-mono text-zinc-200 shadow-xl">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span>DEEP-SPACE EXPEDITION PROGRAM</span>
                    <span className="text-zinc-500 hidden sm:inline">{"//"}</span>
                    <span className="text-cyan-300 font-medium hidden sm:inline">TIER-4 STAGING ACTIVE</span>
                  </div>

                  <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-xs font-mono text-zinc-300 shadow-xl">
                    <Rocket className="w-3.5 h-3.5 text-cyan-400" />
                    <span>EXTRASOLAR TARGET: GLACIO (4.24 LY)</span>
                  </div>
                </div>

                <div className="max-w-2xl pointer-events-auto">
                  <div className="inline-flex items-center gap-2 text-[11px] font-mono text-cyan-400 uppercase tracking-[0.22em] mb-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-cyan-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>ARCHITECTURAL PILLAR 01 // INTERPLANETARY SPACE PROGRAM</span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-medium text-white tracking-[-0.035em] mb-2.5 text-balance leading-tight">
                    Beyond the Atmosphere. Four Tiers of Cosmic Conquest.
                  </h3>
                  <p className="text-xs sm:text-base text-zinc-300 leading-relaxed font-normal text-balance max-w-xl">
                    Construct cryogenic rocketry launch complexes, survive toxic planetary atmospheres, and establish pressurized domed settlements across the Moon, Mars, Venus, and extrasolar Glacio.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Celestial Reconnaissance Suite Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl">
            <div className="flex items-center gap-2.5">
              <Orbit className="w-4 h-4 text-cyan-400" />
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.22em] text-zinc-400 block">
                  CELESTIAL RECONNAISSANCE SUITE
                </span>
                <span className="text-sm font-medium text-white">
                  {spaceSubView === "canvas"
                    ? "Interactive 3D Dotted Canvas Globe & Celestial Radar Matrix"
                    : "System-Wide Orbital Trajectory Resonance Simulator"}
                </span>
              </div>
            </div>

            <div className="inline-flex p-1 rounded-full bg-white/[0.03] border border-white/[0.08] shrink-0 self-start sm:self-auto">
              <button
                onClick={() => setSpaceSubView("canvas")}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-mono text-xs transition-all duration-200 cursor-pointer ${
                  spaceSubView === "canvas"
                    ? "bg-white text-black font-semibold shadow-md"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>3D Planetary Globe</span>
              </button>
              <button
                onClick={() => setSpaceSubView("system")}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-mono text-xs transition-all duration-200 cursor-pointer ${
                  spaceSubView === "system"
                    ? "bg-white text-black font-semibold shadow-md"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                <Orbit className="w-3.5 h-3.5" />
                <span>Orbital Trajectory Map</span>
              </button>
            </div>
          </div>

          {/* Interactive Celestial Displays */}
          {spaceSubView === "canvas" ? (
            <div className="floating-showcase-panel rounded-[30px] p-2 sm:p-4 border border-white/10 shadow-[0_34px_90px_rgba(0,0,0,0.5)]">
              <OrbitalRadarCanvas />
            </div>
          ) : (
            <div className="floating-showcase-panel rounded-[30px] p-4 sm:p-6 border border-white/10 shadow-[0_34px_90px_rgba(0,0,0,0.5)]">
              <CosmosOrbitalMap />
            </div>
          )}

          {/* Staged Rocketry Subsystem Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="floating-showcase-panel rounded-[30px] p-6 sm:p-8 border border-white/10 shadow-[0_34px_90px_rgba(0,0,0,0.5)] flex flex-col justify-between hover:border-white/[0.18] transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <Rocket className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.22em] mb-1">
                  TIER 1 TO TIER 4
                </div>
                <h4 className="text-base font-semibold text-white mb-2">Staged Multi-Tier Rocketry</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  Progress through four technological launch vehicle tiers. Fabricate cryo-fuel refineries, thermal ablation heat shields, and deep-space EVA life-support suits.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.06] text-[10px] font-mono text-zinc-400 uppercase tracking-[0.22em]">
                PROPULSION: CRYOGENIC OXYGEN + HYDROGEN
              </div>
            </div>

            <div className="floating-showcase-panel rounded-[30px] p-6 sm:p-8 border border-white/10 shadow-[0_34px_90px_rgba(0,0,0,0.5)] flex flex-col justify-between hover:border-white/[0.18] transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <Activity className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-[0.22em] mb-1">
                  ATMOSPHERIC ISOLATION
                </div>
                <h4 className="text-base font-semibold text-white mb-2">Pressurized Surface Domes</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  Deploy oxygen distributors, carbon scrubbers, and airlocks to cultivate terrestrial biospheres across vacuum and acid-dense planetary surfaces.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.06] text-[10px] font-mono text-zinc-400 uppercase tracking-[0.22em]">
                LIFE SUPPORT: HERMETIC SEALED REGIONS
              </div>
            </div>

            <div className="floating-showcase-panel rounded-[30px] p-6 sm:p-8 border border-white/10 shadow-[0_34px_90px_rgba(0,0,0,0.5)] flex flex-col justify-between hover:border-white/[0.18] transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <Compass className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-[10px] font-mono text-amber-400 uppercase tracking-[0.22em] mb-1">
                  OFF-WORLD METALLURGY
                </div>
                <h4 className="text-base font-semibold text-white mb-2">Alien Resource Extraction</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  Mine Desh from the Moon, Ostrum from Martian ravines, and Calorite from supercritical Venusian volcanoes to forge interstellar hyperdrive cores.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.06] text-[10px] font-mono text-zinc-400 uppercase tracking-[0.22em]">
                METALLURGY: EXOTIC PLANETARY ORES
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 02 // CONTINENTAL RAIL CORRIDORS (CREATE RAILWAYS)                        */}
      {/* ========================================================================= */}
      {activeTab === "rail" && (
        <div className="space-y-10 animate-fadeIn">
          {/* Floating Showcase Panel: Continental Rail Logistics HUD */}
          <div className="floating-showcase-panel rounded-[30px] p-4 sm:p-7 border border-white/10 shadow-[0_34px_90px_rgba(0,0,0,0.5)]">
            <div className="mb-6 pb-4 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Train className="w-4 h-4 text-emerald-400" />
                <div>
                  <span className="text-xs font-mono uppercase tracking-[0.22em] text-zinc-400 block">
                    ARCHITECTURAL PILLAR 02 // CONTINENTAL RAIL LOGISTICS
                  </span>
                  <h3 className="text-xl sm:text-2xl font-medium text-white tracking-[-0.035em]">
                    Arteries of Empire. High-Speed Transcontinental Transit.
                  </h3>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>AUTOMATED DISPATCH ACTIVE</span>
              </div>
            </div>

            <ContinentalRailways />
          </div>

          {/* Three Complementary Rail Specs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="floating-showcase-panel rounded-[30px] p-6 sm:p-8 border border-white/10 shadow-[0_34px_90px_rgba(0,0,0,0.5)] flex flex-col justify-between hover:border-white/[0.18] transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <Train className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-[0.22em] mb-1">
                  RAPID TRANSIT
                </div>
                <h4 className="text-base font-semibold text-white mb-2">Scheduled Passenger Lines</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  Connect settlements across thousands of blocks with automated high-speed steam and electric locomotives running on deterministic schedule tables.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.06] text-[10px] font-mono text-zinc-400 uppercase tracking-[0.22em]">
                PASSENGER: 45.0 M/S HIGH-SPEED RAPID
              </div>
            </div>

            <div className="floating-showcase-panel rounded-[30px] p-6 sm:p-8 border border-white/10 shadow-[0_34px_90px_rgba(0,0,0,0.5)] flex flex-col justify-between hover:border-white/[0.18] transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <Box className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.22em] mb-1">
                  SUPPLY CHAIN LOGISTICS
                </div>
                <h4 className="text-base font-semibold text-white mb-2">Automated Bulk Freight</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  Seamlessly shuttle heavy ores, fluids, and building materials between remote mining outposts and industrial complexes via Portable Storage Interfaces.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.06] text-[10px] font-mono text-zinc-400 uppercase tracking-[0.22em]">
                LOGISTICS: SUB-TICK CARGO TRANSFER
              </div>
            </div>

            <div className="floating-showcase-panel rounded-[30px] p-6 sm:p-8 border border-white/10 shadow-[0_34px_90px_rgba(0,0,0,0.5)] flex flex-col justify-between hover:border-white/[0.18] transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <ShieldCheck className="w-4 h-4 text-violet-400" />
                </div>
                <div className="text-[10px] font-mono text-violet-400 uppercase tracking-[0.22em] mb-1">
                  FAIL-SAFE INTERLOCKING
                </div>
                <h4 className="text-base font-semibold text-white mb-2">Collision-Mitigated Signaling</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  Optical track block observers and automated signal semaphores dynamically govern track occupancy, preventing derailments and rear-end collisions.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.06] text-[10px] font-mono text-zinc-400 uppercase tracking-[0.22em]">
                SAFETY: DALLAS CORE TICK SYNC
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 03 // SOVEREIGN CLAIMS & CIVILIZATIONS (OPENPARTIESANDCLAIMS)              */}
      {/* ========================================================================= */}
      {activeTab === "civilization" && (
        <div className="space-y-10 animate-fadeIn">
          {/* Floating Showcase Panel: Civilization Claims Matrix */}
          <div className="floating-showcase-panel rounded-[30px] p-4 sm:p-7 border border-white/10 shadow-[0_34px_90px_rgba(0,0,0,0.5)]">
            <div className="mb-6 pb-4 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-indigo-400" />
                <div>
                  <span className="text-xs font-mono uppercase tracking-[0.22em] text-zinc-400 block">
                    ARCHITECTURAL PILLAR 03 // SOVEREIGN JURISDICTION & CLAIMS
                  </span>
                  <h3 className="text-xl sm:text-2xl font-medium text-white tracking-[-0.035em]">
                    Unyielding Security. Mathematical Territorial Sovereignty.
                  </h3>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                <span>100% GRIEF-PROOF RADIUS</span>
              </div>
            </div>

            <CivilizationClaims />
          </div>

          {/* Three Complementary Claims Specs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="floating-showcase-panel rounded-[30px] p-6 sm:p-8 border border-white/10 shadow-[0_34px_90px_rgba(0,0,0,0.5)] flex flex-col justify-between hover:border-white/[0.18] transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <Shield className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-[10px] font-mono text-indigo-400 uppercase tracking-[0.22em] mb-1">
                  BEDROCK TO SKYBOX
                </div>
                <h4 className="text-base font-semibold text-white mb-2">Instant Chunk Protection</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  Claim land instantly from bedrock (Y=-64) to skybox (Y=+320) with deterministic anti-grief protection. Zero Creeper damage, zero fire spread, zero TNT griefing.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.06] text-[10px] font-mono text-zinc-400 uppercase tracking-[0.22em]">
                SECURITY: 100% GRIEF-PROOF RADIUS
              </div>
            </div>

            <div className="floating-showcase-panel rounded-[30px] p-6 sm:p-8 border border-white/10 shadow-[0_34px_90px_rgba(0,0,0,0.5)] flex flex-col justify-between hover:border-white/[0.18] transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <Landmark className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-[0.22em] mb-1">
                  MUNICIPAL CHARTER
                </div>
                <h4 className="text-base font-semibold text-white mb-2">Collaborative Town Founding</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  Charter towns and confederations with friends. Unlock collective chunk loading for 24/7 continuous factory processing and unified municipal borders.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.06] text-[10px] font-mono text-zinc-400 uppercase tracking-[0.22em]">
                GOVERNANCE: SHARED TOWN HALL BEACONS
              </div>
            </div>

            <div className="floating-showcase-panel rounded-[30px] p-6 sm:p-8 border border-white/10 shadow-[0_34px_90px_rgba(0,0,0,0.5)] flex flex-col justify-between hover:border-white/[0.18] transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <Users className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-[10px] font-mono text-amber-400 uppercase tracking-[0.22em] mb-1">
                  SECURE COMMERCE
                </div>
                <h4 className="text-base font-semibold text-white mb-2">Atomic Player Trading</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  Establish sovereign player shops and trade depots with cryptographic chest locks and visitor passage whitelists that foster a thriving player economy.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.06] text-[10px] font-mono text-zinc-400 uppercase tracking-[0.22em]">
                ECONOMY: FRAUD-PROOF BARTER & CURRENCY
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 04 // LIVING WORLD & BIOMES (TERRALITH & ALEX'S MOBS)                     */}
      {/* ========================================================================= */}
      {activeTab === "world" && (
        <div className="space-y-10 animate-fadeIn">
          {/* Floating Showcase Panel: Living World Stratigraphy Explorer */}
          <div className="floating-showcase-panel rounded-[30px] p-4 sm:p-7 border border-white/10 shadow-[0_34px_90px_rgba(0,0,0,0.5)]">
            <div className="mb-6 pb-4 border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-cyan-400" />
                <div>
                  <span className="text-xs font-mono uppercase tracking-[0.22em] text-zinc-400 block">
                    ARCHITECTURAL PILLAR 04 // LIVING BIOSPHERE & STRATIGRAPHY
                  </span>
                  <h3 className="text-xl sm:text-2xl font-medium text-white tracking-[-0.035em]">
                    Colossal Topography. 85+ Dynamic Living Ecosystems.
                  </h3>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>85+ PROCEDURAL BIOMES SCANNER</span>
              </div>
            </div>

            <LivingWorldExplorer />
          </div>

          {/* Three Complementary Living World Specs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="floating-showcase-panel rounded-[30px] p-6 sm:p-8 border border-white/10 shadow-[0_34px_90px_rgba(0,0,0,0.5)] flex flex-col justify-between hover:border-white/[0.18] transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <Mountain className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.22em] mb-1">
                  STRATIGRAPHIC RELIEF
                </div>
                <h4 className="text-base font-semibold text-white mb-2">Vertical Elevation Y=-64 to 320</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  Terralith 2.0 expands the world into dramatic verticality. Traverse 384 meters of sheer elevation relief from sub-crustal caverns to towering alpine spires.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.06] text-[10px] font-mono text-zinc-400 uppercase tracking-[0.22em]">
                WORLDGEN: 384-BLOCK VERTICAL RELIEF
              </div>
            </div>

            <div className="floating-showcase-panel rounded-[30px] p-6 sm:p-8 border border-white/10 shadow-[0_34px_90px_rgba(0,0,0,0.5)] flex flex-col justify-between hover:border-white/[0.18] transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <Activity className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-[0.22em] mb-1">
                  BIOLOGICAL DIVERSITY
                </div>
                <h4 className="text-base font-semibold text-white mb-2">89+ Modeled Creatures</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  Alex&apos;s Mobs populates every ecoregion with complex behavioral AI, natural predator-prey dynamics, territorial habitats, and unique taming mechanics.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.06] text-[10px] font-mono text-zinc-400 uppercase tracking-[0.22em]">
                ECOLOGY: COMPLEX FAUNA SIMULATION
              </div>
            </div>

            <div className="floating-showcase-panel rounded-[30px] p-6 sm:p-8 border border-white/10 shadow-[0_34px_90px_rgba(0,0,0,0.5)] flex flex-col justify-between hover:border-white/[0.18] transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-[10px] font-mono text-amber-400 uppercase tracking-[0.22em] mb-1">
                  TEXTURE INTEGRITY
                </div>
                <h4 className="text-base font-semibold text-white mb-2">Vanilla Palette Harmony</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  Over 85 unique procedural biomes formed exclusively from native vanilla blocks (deepslate, calcite, basalt, tuff). Guarantees flawless client FPS and zero missing textures.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/[0.06] text-[10px] font-mono text-zinc-400 uppercase tracking-[0.22em]">
                FIDELITY: PURE VANILLA COMPATIBILITY
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
