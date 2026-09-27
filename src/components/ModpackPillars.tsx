"use client";

import React, { useState } from "react";
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
    <section id="pillars" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Header */}
      <div className="max-w-3xl mb-16 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400 font-mono text-[11px] uppercase tracking-widest mb-4">
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
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer select-none ${
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
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer select-none ${
              activeTab === "rail"
                ? "bg-white text-black font-semibold shadow-lg shadow-white/10"
                : "bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <Train className="w-3.5 h-3.5" />
            02 // Continental Rail &amp; Transit
          </button>

          <button
            onClick={() => setActiveTab("civilization")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer select-none ${
              activeTab === "civilization"
                ? "bg-white text-black font-semibold shadow-lg shadow-white/10"
                : "bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            03 // Sovereign Claims &amp; Civilizations
          </button>

          <button
            onClick={() => setActiveTab("world")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer select-none ${
              activeTab === "world"
                ? "bg-white text-black font-semibold shadow-lg shadow-white/10"
                : "bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            04 // Living World &amp; Biomes
          </button>
        </div>
      </div>

      {/* 01 // INTERPLANETARY SPACE PROGRAM (AD ASTRA) */}
      {activeTab === "space" && (
        <div className="space-y-8 animate-fadeIn">
          {/* Interactive SVG Orbital Trajectory Map */}
          <CosmosOrbitalMap />

          {/* Subsystem Specifications Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="p-5 rounded-2xl bg-[#0c0d12] border border-white/[0.06] flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-3">
                  <Rocket className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1.5">Staged Multi-Tier Rocketry</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Progress through Tier 1 to Tier 4 launch vehicles. Fabricate cryo-fuel refineries, thermal heat shields, and deep-space life-support suits.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.04] text-[10px] font-mono text-zinc-500">
                PROPULSION: CRYOGENIC OXYGEN + HYDROGEN
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0c0d12] border border-white/[0.06] flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-3">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1.5">Pressurized Surface Domes</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Deploy oxygen distributors, carbon scrubbers, and airlocks to cultivate terrestrial biospheres across vacuum and acid-dense planetary surfaces.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.04] text-[10px] font-mono text-zinc-500">
                LIFE SUPPORT: HERMETIC SEALED REGIONS
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0c0d12] border border-white/[0.06] flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-3">
                  <Compass className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1.5">Alien Resource Extraction</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Mine Desh from the Moon, Ostrum from Martian ravines, and Calorite from supercritical Venusian volcanoes to forge interstellar hyperdrive cores.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.04] text-[10px] font-mono text-zinc-500">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="p-5 rounded-2xl bg-[#0c0d12] border border-white/[0.06] flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-3">
                  <Train className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1.5">Scheduled Passenger Lines</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Connect settlements across thousands of blocks with automated high-speed steam and electric locomotives running on deterministic schedule tables.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.04] text-[10px] font-mono text-zinc-500">
                PASSENGER: 45.0 M/S HIGH-SPEED RAPID
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0c0d12] border border-white/[0.06] flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-3">
                  <Box className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1.5">Automated Bulk Freight</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Seamlessly shuttle heavy ores, fluids, and building materials between remote mining outposts and industrial complexes via Portable Storage Interfaces.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.04] text-[10px] font-mono text-zinc-500">
                LOGISTICS: SUB-TICK CARGO TRANSFER
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0c0d12] border border-white/[0.06] flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-3">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1.5">Collision-Mitigated Signaling</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Optical track block observers and automated signal semaphores dynamically govern track occupancy, preventing derailments and rear-end collisions.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.04] text-[10px] font-mono text-zinc-500">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="p-5 rounded-2xl bg-[#0c0d12] border border-white/[0.06] flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-3">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1.5">Instant Chunk Protection</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Claim land instantly from bedrock (Y=-64) to skybox (Y=+320) with deterministic anti-grief protection. Zero Creeper damage, zero fire spread, zero TNT griefing.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.04] text-[10px] font-mono text-zinc-500">
                SECURITY: 100% GRIEF-PROOF RADIUS
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0c0d12] border border-white/[0.06] flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-3">
                  <Landmark className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1.5">Collaborative Town Founding</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Charter towns and confederations with friends. Unlock collective chunk loading for 24/7 continuous factory processing and unified municipal borders.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.04] text-[10px] font-mono text-zinc-500">
                GOVERNANCE: SHARED TOWN HALL BEACONS
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0c0d12] border border-white/[0.06] flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-3">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1.5">Atomic Player Trading</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Establish sovereign player shops and trade depots with cryptographic chest locks and visitor passage whitelists that foster a thriving player economy.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.04] text-[10px] font-mono text-zinc-500">
                ECONOMY: FRAUD-PROOF BARTER &amp; CURRENCY
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="p-5 rounded-2xl bg-[#0c0d12] border border-white/[0.06] flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-3">
                  <Mountain className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1.5">Vertical Elevation Y=-64 to 320</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Terralith 2.0 expands the world into dramatic verticality. Traverse 384 meters of sheer elevation relief from sub-crustal caverns to towering alpine spires.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.04] text-[10px] font-mono text-zinc-500">
                WORLDGEN: 384-BLOCK VERTICAL RELIEF
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0c0d12] border border-white/[0.06] flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-3">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1.5">89+ Modeled Creatures</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Alex&apos;s Mobs populates every ecoregion with complex behavioral AI, natural predator-prey dynamics, territorial habitats, and unique taming mechanics.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.04] text-[10px] font-mono text-zinc-500">
                ECOLOGY: COMPLEX FAUNA SIMULATION
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#0c0d12] border border-white/[0.06] flex flex-col justify-between">
              <div>
                <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-3">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-sm font-semibold text-white mb-1.5">Vanilla Palette Harmony</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Over 85 unique procedural biomes formed exclusively from native vanilla blocks (deepslate, calcite, basalt, tuff). Guarantees flawless client FPS and zero missing textures.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.04] text-[10px] font-mono text-zinc-500">
                FIDELITY: PURE VANILLA COMPATIBILITY
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
