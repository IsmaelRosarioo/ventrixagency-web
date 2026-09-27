"use client";

import React, { useState } from "react";
import { Compass, Rocket, Cog, Cpu, Globe, Radio, Layers, Activity, Shield, Train, Wrench } from "lucide-react";
import { CosmosOrbitalMap } from "./pillars/CosmosOrbitalMap";
import { KineticDrivetrain } from "./pillars/KineticDrivetrain";
import { QuantumDriveBay } from "./pillars/QuantumDriveBay";
import { AcousticWaveformVisualizer } from "./pillars/AcousticWaveformVisualizer";

export function ModpackPillars() {
  const [activeTab, setActiveTab] = useState<"cosmos" | "kinetic" | "ae2" | "ecology">("cosmos");

  return (
    <section id="pillars" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Header */}
      <div className="max-w-3xl mb-16 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400 font-mono text-[11px] uppercase tracking-widest mb-4">
          <Compass className="w-3 h-3 text-zinc-400" />
          SYSTEM SPECIFICATION // TIER-ONE ARCHITECTURE
        </div>
        <h2 className="text-4xl sm:text-6xl font-medium text-white tracking-[-0.035em] mb-4">
          Four Core Pillars. One Cohesive World.
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg font-normal leading-relaxed">
          Ventrix: Frontier eliminates mod bloat and recipe conflicts. Every mechanic connects directly into a unified progression framework engineered for deep-space colonization and automated industrial scale.
        </p>

        {/* Tab Switcher */}
        <div className="flex flex-wrap gap-2 mt-8">
          <button
            onClick={() => setActiveTab("cosmos")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer select-none ${
              activeTab === "cosmos"
                ? "bg-white text-black font-semibold shadow-lg shadow-white/10"
                : "bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <Rocket className="w-3.5 h-3.5" />
            01 // Orbital Cosmos
          </button>

          <button
            onClick={() => setActiveTab("kinetic")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer select-none ${
              activeTab === "kinetic"
                ? "bg-white text-black font-semibold shadow-lg shadow-white/10"
                : "bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <Cog className="w-3.5 h-3.5" />
            02 // Kinetic Engineering
          </button>

          <button
            onClick={() => setActiveTab("ae2")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer select-none ${
              activeTab === "ae2"
                ? "bg-white text-black font-semibold shadow-lg shadow-white/10"
                : "bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            03 // Quantum Logistics
          </button>

          <button
            onClick={() => setActiveTab("ecology")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer select-none ${
              activeTab === "ecology"
                ? "bg-white text-black font-semibold shadow-lg shadow-white/10"
                : "bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.15]"
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            04 // Living Ecology
          </button>
        </div>
      </div>

      {/* 01 // ORBITAL COSMOS (AD ASTRA) */}
      {activeTab === "cosmos" && (
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
                <h4 className="text-sm font-semibold text-white mb-1.5">Planetary Rovers & Exploration</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Traverse treacherous planetary terrain with specialized exploratory rovers equipped with storage containers, headlights, and high-traction suspension.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/[0.04] text-[10px] font-mono text-zinc-500">
                MOBILITY: ALL-TERRAIN CRYO SUSPENSION
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 02 // KINETIC ENGINEERING (CREATE) */}
      {activeTab === "kinetic" && (
        <div className="space-y-8 animate-fadeIn">
          {/* Interactive Rotational Drivetrain with Animated Gears & RPM Selector */}
          <KineticDrivetrain />

          {/* Complementary Kinetic Subsystems */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="p-6 rounded-2xl bg-[#0c0d12] border border-white/[0.08] flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <Train className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">Automated Transcontinental Rail</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  Engineer automated high-speed locomotives connecting distant mining quarries, factory compounds, and rocket launch complexes with precision schedule tables and multi-track switching.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-black/50 border border-white/[0.06] font-mono text-[11px] text-zinc-300 space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Signal Frequency:</span>
                  <span>Sub-tick Block Sync</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Track Gauge:</span>
                  <span>Custom Bogie Curvature</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Cargo Transfer:</span>
                  <span>Portable Storage Interfaces</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c0d12] border border-white/[0.08] flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <Wrench className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">Sequenced Precision Assembly</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  Construct automated conveyor tracks featuring mechanical deployers, presses, and spouts for multi-step precision crafting of electronic circuits and heavy machinery.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-black/50 border border-white/[0.06] font-mono text-[11px] text-zinc-300 space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Production Rate:</span>
                  <span>64 Items / 2.4s Cycle</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Yield Reliability:</span>
                  <span>100% Deterministic</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Mechanism:</span>
                  <span>Precision Brass Invar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 03 // QUANTUM LOGISTICS (AE2) */}
      {activeTab === "ae2" && (
        <div className="space-y-8 animate-fadeIn">
          {/* Interactive Crystalline Drive Bay & 32-Channel Smart Cable HUD */}
          <QuantumDriveBay />

          {/* Complementary AE2 Subsystems */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="p-6 rounded-2xl bg-[#0c0d12] border border-white/[0.08] flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <Radio className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">Interdimensional Quantum Link</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  Bridge remote outposts across planetary space dimensions using Quantum Entangled Singularities with zero latency, synchronized channels, and shared power grids.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-black/50 border border-white/[0.06] font-mono text-[11px] text-zinc-300 space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Cross-Dimension Lag:</span>
                  <span>0.0ms True Real-Time</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Quantum Range:</span>
                  <span>Infinite (Interplanetary)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Singularity Status:</span>
                  <span className="text-emerald-400">Dallas Core Linked</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c0d12] border border-white/[0.08] flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">Multi-Thread Auto-Crafting</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  Assemble multi-core CPU co-processors to compute deeply nested recipes instantly. Order complex spacecraft parts and rocket components with a single terminal click.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-black/50 border border-white/[0.06] font-mono text-[11px] text-zinc-300 space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Co-processors:</span>
                  <span>64 Execution Cores</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Recursive Solver:</span>
                  <span>Sub-tick Tree Compute</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Automation Mode:</span>
                  <span>Pattern Provider Loop</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 04 // LIVING ECOLOGY (TERRALITH & SOUND PHYSICS) */}
      {activeTab === "ecology" && (
        <div className="space-y-8 animate-fadeIn">
          {/* Interactive Volumetric Acoustic Waveform Visualizer */}
          <AcousticWaveformVisualizer />

          {/* Complementary Ecological Subsystems */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="p-6 rounded-2xl bg-[#0c0d12] border border-white/[0.08] flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <Globe className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">Terralith Biome Engine</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  Over 85 realistic procedural biomes including volcanic calderas, glacial fjords, and alpine highlands built completely with vanilla block architecture and dramatic elevation gradients.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-black/50 border border-white/[0.06] font-mono text-[11px] text-zinc-300 space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-500">World Elevation:</span>
                  <span>Y=-64 to Y=320</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Underground:</span>
                  <span>Volumetric Cave Systems</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Biome Diversity:</span>
                  <span>85+ Unique Ecoregions</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c0d12] border border-white/[0.08] flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                  <Shield className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">Dynamic Wildlife Ecology</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  Alex&apos;s Mobs brings 89+ biologically modeled creatures with behavioral AI, realistic territorial habits, unique taming, and natural food webs across every climate zone.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-black/50 border border-white/[0.06] font-mono text-[11px] text-zinc-300 space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Fauna Roster:</span>
                  <span>89+ Dynamic Species</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Behavioral AI:</span>
                  <span>Territorial & Adaptive</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Tick Optimization:</span>
                  <span>Multi-threaded Entity AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
