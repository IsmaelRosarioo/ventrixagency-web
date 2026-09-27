"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { CosmosOrbitalMap } from "./pillars/CosmosOrbitalMap";
import { ContinentalRailways } from "./pillars/ContinentalRailways";
import { CivilizationClaims } from "./pillars/CivilizationClaims";
import { LivingWorldExplorer } from "./pillars/LivingWorldExplorer";

export function ModpackPillars() {
  const [activeTab, setActiveTab] = useState<"space" | "rail" | "civilization" | "world">("space");

  return (
    <section id="pillars" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="max-w-3xl mb-16 text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400 font-mono text-[11px] uppercase tracking-widest mb-4 backdrop-blur-md">
          <Compass className="w-3 h-3 text-zinc-400" />
          SYSTEM SPECIFICATION // TIER-ONE ARCHITECTURE
        </div>
        <h2 className="text-4xl sm:text-6xl font-medium text-white tracking-[-0.035em] mb-4">
          The Frontier Experience. Four Pillars of Civilization.
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg font-normal leading-relaxed">
          Ventrix: Frontier is designed as an enduring multiplayer world. Every system interconnects to support long-term settlement, continental trade, and cooperative deep-space exploration.
        </p>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2 mt-8">
          <button
            onClick={() => setActiveTab("space")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer select-none ${
              activeTab === "space"
                ? "bg-white text-black font-semibold shadow-lg shadow-white/10"
                : "bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <Rocket className="w-3.5 h-3.5" />
            01 // Interplanetary Space Program
          </button>

          <button
            onClick={() => setActiveTab("rail")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer select-none ${
              activeTab === "rail"
                ? "bg-white text-black font-semibold shadow-lg shadow-white/10"
                : "bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <Train className="w-3.5 h-3.5" />
            02 // Continental Rail & Transit
          </button>

          <button
            onClick={() => setActiveTab("civilization")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer select-none ${
              activeTab === "civilization"
                ? "bg-white text-black font-semibold shadow-lg shadow-white/10"
                : "bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            03 // Sovereign Claims & Civilizations
          </button>

          <button
            onClick={() => setActiveTab("world")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer select-none ${
              activeTab === "world"
                ? "bg-white text-black font-semibold shadow-lg shadow-white/10"
                : "bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            04 // Living World & Biomes
          </button>
        </div>
      </div>

      {/* 01 // INTERPLANETARY SPACE PROGRAM (AD ASTRA) */}
      {activeTab === "space" && (
        <div className="space-y-8 animate-fadeIn">
          {/* Cinematic Showcase: Deep-Space Expedition Visual */}
          <div className="relative rounded-3xl sm:rounded-[32px] overflow-hidden border border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.8),0_0_60px_rgba(6,182,212,0.12)] group bg-black">
            <div className="relative aspect-[16/8] sm:aspect-[21/9] w-full overflow-hidden">
              <Image
                src="/branding/space-expedition-cinematic.jpg"
                alt="Ventrix Deep-Space Colonization Expedition Visual"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.015]"
              />

              {/* Seamless Vignette Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-black/30 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#050608]/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050608]/60 via-transparent to-[#050608]/60 pointer-events-none" />

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
                    <span>EXTRASOLAR TARGET: GLACIO</span>
                  </div>
                </div>

                <div className="max-w-2xl pointer-events-auto">
                  <div className="inline-flex items-center gap-2 text-[11px] font-mono text-cyan-400 uppercase tracking-widest mb-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-cyan-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Interstellar Colonization Protocol</span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-medium text-white tracking-[-0.035em] mb-2.5 text-balance leading-tight">
                    Pioneer the Celestial Frontier Beyond the Overworld.
                  </h3>
                  <p className="text-xs sm:text-base text-zinc-300 leading-relaxed font-normal text-balance max-w-xl">
                    Construct cryogenic rocketry launch complexes, survive toxic planetary atmospheres, and establish pressurized domed settlements across the Moon, Mars, Venus, and extrasolar Glacio.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive SVG Orbital Trajectory Map */}
          <CosmosOrbitalMap />

          {/* Subsystem Specifications Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
            <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl hover:border-white/[0.14] transition-all duration-300 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
              <div>
                <div className="w-9 h-9 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <Rocket className="w-4 h-4" />
                </div>
                <h4 className="text-base font-semibold text-white mb-2">Staged Multi-Tier Rocketry</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Progress through Tier 1 to Tier 4 launch vehicles. Fabricate cryo-fuel refineries, thermal heat shields, and deep-space life-support suits.
                </p>
              </div>
              <div className="mt-5 pt-3.5 border-t border-white/[0.06] text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                PROPULSION: CRYOGENIC OXYGEN + HYDROGEN
              </div>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl hover:border-white/[0.14] transition-all duration-300 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
              <div>
                <div className="w-9 h-9 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <Activity className="w-4 h-4" />
                </div>
                <h4 className="text-base font-semibold text-white mb-2">Pressurized Surface Domes</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Deploy oxygen distributors, carbon scrubbers, and airlocks to cultivate terrestrial biospheres across vacuum and acid-dense planetary surfaces.
                </p>
              </div>
              <div className="mt-5 pt-3.5 border-t border-white/[0.06] text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                LIFE SUPPORT: HERMETIC SEALED REGIONS
              </div>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl hover:border-white/[0.14] transition-all duration-300 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
              <div>
                <div className="w-9 h-9 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <Compass className="w-4 h-4" />
                </div>
                <h4 className="text-base font-semibold text-white mb-2">Alien Resource Extraction</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Mine Desh from the Moon, Ostrum from Martian ravines, and Calorite from supercritical Venusian volcanoes to forge interstellar hyperdrive cores.
                </p>
              </div>
              <div className="mt-5 pt-3.5 border-t border-white/[0.06] text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                METALLURGY: EXOTIC PLANETARY ORES
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 02 // CONTINENTAL RAIL & TRANSIT (CREATE RAILWAYS) */}
      {activeTab === "rail" && (
        <div className="space-y-8 animate-fadeIn">
          {/* Interactive Continental Transit Dispatch HUD */}
          <ContinentalRailways />

          {/* Three Complementary Rail Specs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
            <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl hover:border-white/[0.14] transition-all duration-300 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
              <div>
                <div className="w-9 h-9 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <Train className="w-4 h-4" />
                </div>
                <h4 className="text-base font-semibold text-white mb-2">Scheduled Passenger Lines</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Connect settlements across thousands of blocks with automated high-speed steam and electric locomotives running on deterministic schedule tables.
                </p>
              </div>
              <div className="mt-5 pt-3.5 border-t border-white/[0.06] text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                PASSENGER: 45.0 M/S HIGH-SPEED RAPID
              </div>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl hover:border-white/[0.14] transition-all duration-300 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
              <div>
                <div className="w-9 h-9 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <Box className="w-4 h-4" />
                </div>
                <h4 className="text-base font-semibold text-white mb-2">Automated Bulk Freight</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Seamlessly shuttle heavy ores, fluids, and building materials between remote mining outposts and industrial complexes via Portable Storage Interfaces.
                </p>
              </div>
              <div className="mt-5 pt-3.5 border-t border-white/[0.06] text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                LOGISTICS: SUB-TICK CARGO TRANSFER
              </div>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl hover:border-white/[0.14] transition-all duration-300 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
              <div>
                <div className="w-9 h-9 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-base font-semibold text-white mb-2">Collision-Mitigated Signaling</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Optical track block observers and automated signal semaphores dynamically govern track occupancy, preventing derailments and rear-end collisions.
                </p>
              </div>
              <div className="mt-5 pt-3.5 border-t border-white/[0.06] text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                SAFETY: DALLAS CORE TICK SYNC
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 03 // SOVEREIGN CLAIMS & CIVILIZATIONS (OPENPARTIESANDCLAIMS) */}
      {activeTab === "civilization" && (
        <div className="space-y-8 animate-fadeIn">
          {/* Interactive Sovereign Claims & Player Civilizations Matrix */}
          <CivilizationClaims />

          {/* Three Complementary Claims Specs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
            <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl hover:border-white/[0.14] transition-all duration-300 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
              <div>
                <div className="w-9 h-9 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <Shield className="w-4 h-4" />
                </div>
                <h4 className="text-base font-semibold text-white mb-2">Instant Chunk Protection</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Claim land instantly from bedrock (Y=-64) to skybox (Y=+320) with deterministic anti-grief protection. Zero Creeper damage, zero fire spread, zero TNT griefing.
                </p>
              </div>
              <div className="mt-5 pt-3.5 border-t border-white/[0.06] text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                SECURITY: 100% GRIEF-PROOF RADIUS
              </div>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl hover:border-white/[0.14] transition-all duration-300 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
              <div>
                <div className="w-9 h-9 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <Landmark className="w-4 h-4" />
                </div>
                <h4 className="text-base font-semibold text-white mb-2">Collaborative Town Founding</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Charter towns and confederations with friends. Unlock collective chunk loading for 24/7 continuous factory processing and unified municipal borders.
                </p>
              </div>
              <div className="mt-5 pt-3.5 border-t border-white/[0.06] text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                GOVERNANCE: SHARED TOWN HALL BEACONS
              </div>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl hover:border-white/[0.14] transition-all duration-300 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
              <div>
                <div className="w-9 h-9 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <Users className="w-4 h-4" />
                </div>
                <h4 className="text-base font-semibold text-white mb-2">Atomic Player Trading</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Establish sovereign player shops and trade depots with cryptographic chest locks and visitor passage whitelists that foster a thriving player economy.
                </p>
              </div>
              <div className="mt-5 pt-3.5 border-t border-white/[0.06] text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                ECONOMY: FRAUD-PROOF BARTER & CURRENCY
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 04 // LIVING WORLD & BIOMES (TERRALITH & ALEX'S MOBS) */}
      {activeTab === "world" && (
        <div className="space-y-8 animate-fadeIn">
          {/* Interactive 85+ Procedural Biomes & Elevation Stratigraphy Scanner */}
          <LivingWorldExplorer />

          {/* Three Complementary Living World Specs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
            <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl hover:border-white/[0.14] transition-all duration-300 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
              <div>
                <div className="w-9 h-9 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <Mountain className="w-4 h-4" />
                </div>
                <h4 className="text-base font-semibold text-white mb-2">Vertical Elevation Y=-64 to 320</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Terralith 2.0 expands the world into dramatic verticality. Traverse 384 meters of sheer elevation relief from sub-crustal caverns to towering alpine spires.
                </p>
              </div>
              <div className="mt-5 pt-3.5 border-t border-white/[0.06] text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                WORLDGEN: 384-BLOCK VERTICAL RELIEF
              </div>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl hover:border-white/[0.14] transition-all duration-300 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
              <div>
                <div className="w-9 h-9 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <Activity className="w-4 h-4" />
                </div>
                <h4 className="text-base font-semibold text-white mb-2">89+ Modeled Creatures</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Alex&apos;s Mobs populates every ecoregion with complex behavioral AI, natural predator-prey dynamics, territorial habitats, and unique taming mechanics.
                </p>
              </div>
              <div className="mt-5 pt-3.5 border-t border-white/[0.06] text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                ECOLOGY: COMPLEX FAUNA SIMULATION
              </div>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl hover:border-white/[0.14] transition-all duration-300 flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
              <div>
                <div className="w-9 h-9 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-base font-semibold text-white mb-2">Vanilla Palette Harmony</h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Over 85 unique procedural biomes formed exclusively from native vanilla blocks (deepslate, calcite, basalt, tuff). Guarantees flawless client FPS and zero missing textures.
                </p>
              </div>
              <div className="mt-5 pt-3.5 border-t border-white/[0.06] text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                FIDELITY: PURE VANILLA COMPATIBILITY
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
