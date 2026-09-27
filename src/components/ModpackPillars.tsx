"use client";

import React, { useState } from "react";
import { Rocket, Cog, Cpu, Globe, Compass, ArrowRight, Shield, Zap, Activity } from "lucide-react";

interface PlanetSpec {
  id: string;
  name: string;
  tier: string;
  gravity: string;
  atmosphere: string;
  hazard: string;
  keyMinerals: string[];
  description: string;
}

const PLANETS: PlanetSpec[] = [
  {
    id: "moon",
    name: "The Moon",
    tier: "Tier 1 Rocket",
    gravity: "0.166g (Low Gravity)",
    atmosphere: "Total Vacuum (O2 Required)",
    hazard: "Extreme Freezing Lunar Nights",
    keyMinerals: ["Desh Ore", "Cheese Ore", "Moon Stone"],
    description: "The primary proving ground. Establish pressurized surface bases, explore Lunarian subterranean ruins, and smelt Desh ingots for deep-space propulsion.",
  },
  {
    id: "mars",
    name: "Mars",
    tier: "Tier 2 Rocket",
    gravity: "0.380g",
    atmosphere: "Toxic Carbon Dioxide",
    hazard: "Ferrous Dust Storms & Martian Vaults",
    keyMinerals: ["Ostrum Ore", "Mars Iron", "Sub-surface Ice"],
    description: "Expansive rust-red canyon plateaus. Deploy pressurized rovers, excavate underground pyramidal dungeons, and extract Ostrum for heavy rocketry.",
  },
  {
    id: "venus",
    name: "Venus",
    tier: "Tier 3 Rocket",
    gravity: "0.904g",
    atmosphere: "Supercritical Acid Vapor",
    hazard: "Extreme Thermal Compression & Magma",
    keyMinerals: ["Calorite Ore", "Venus Gold", "Sulfur"],
    description: "A hostile pressure vessel. Requires high-temp Netherite thermal space suits and acid-resistant rovers to mine Calorite from volcanic geysers.",
  },
  {
    id: "mercury",
    name: "Mercury",
    tier: "Tier 3 Rocket",
    gravity: "0.380g",
    atmosphere: "Solar Vacuum",
    hazard: "Extreme Solar Radiation",
    keyMinerals: ["Solar Crystals", "Calorite", "Pure Iron"],
    description: "Proximal solar orbit. Build orbital beam collectors that capture uninterrupted, high-yield solar energy with zero day-night disruption.",
  },
  {
    id: "glacio",
    name: "Glacio",
    tier: "Tier 4 Deep Space",
    gravity: "1.120g (High Gravity)",
    atmosphere: "Thin Oxygen (Habitable in Valleys)",
    hazard: "Glacial Permafrost & Megafauna",
    keyMinerals: ["Permafrost Steel", "Glacio Ice", "Calorite"],
    description: "An extrasolar terrestrial body in a distant star system. Home to alien megafauna, frozen primordial forests, and ancient monolith structures.",
  },
];

export function ModpackPillars() {
  const [activeTab, setActiveTab] = useState<"cosmos" | "kinetic" | "ae2" | "ecology">("cosmos");
  const [selectedPlanetIndex, setSelectedPlanetIndex] = useState(0);

  const selectedPlanet = PLANETS[selectedPlanetIndex];

  return (
    <section id="pillars" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="max-w-3xl mb-16 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400 font-mono text-[11px] uppercase tracking-widest mb-4">
          <Compass className="w-3 h-3 text-zinc-400" />
          SYSTEM ARCHITECTURE
        </div>
        <h2 className="text-3xl sm:text-5xl font-semibold text-white tracking-[-0.03em] mb-4">
          Four Core Pillars. Bound by One Engine.
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg font-normal leading-relaxed">
          Ventrix: Frontier eliminates mod bloat and conflicting mechanics. Each modification connects directly into a unified progression framework.
        </p>

        {/* Minimalist Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-8">
          <button
            onClick={() => setActiveTab("cosmos")}
            className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "cosmos"
                ? "bg-white text-black font-medium"
                : "bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-white"
            }`}
          >
            01 // Orbital Cosmos
          </button>

          <button
            onClick={() => setActiveTab("kinetic")}
            className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "kinetic"
                ? "bg-white text-black font-medium"
                : "bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-white"
            }`}
          >
            02 // Kinetic Engineering
          </button>

          <button
            onClick={() => setActiveTab("ae2")}
            className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "ae2"
                ? "bg-white text-black font-medium"
                : "bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-white"
            }`}
          >
            03 // Quantum Logistics
          </button>

          <button
            onClick={() => setActiveTab("ecology")}
            className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "ecology"
                ? "bg-white text-black font-medium"
                : "bg-white/[0.03] border border-white/[0.08] text-zinc-400 hover:text-white"
            }`}
          >
            04 // Planetary Ecology
          </button>
        </div>
      </div>

      {/* 01 // ORBITAL COSMOS */}
      {activeTab === "cosmos" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Planet Selector Deck */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {PLANETS.map((planet, index) => (
              <button
                key={planet.id}
                onClick={() => setSelectedPlanetIndex(index)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  selectedPlanetIndex === index
                    ? "bg-[#10131a] border-white/[0.2] text-white shadow-lg"
                    : "bg-[#090b10] border-white/[0.06] hover:bg-white/[0.02] text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-white">{planet.name}</span>
                  <span className="font-mono text-[10px] text-zinc-400 uppercase">{planet.tier}</span>
                </div>
                <div className="text-xs font-mono text-zinc-400">
                  {planet.gravity} • {planet.atmosphere.split(" ")[0]}
                </div>
              </button>
            ))}
          </div>

          {/* Telemetry Display HUD */}
          <div className="lg:col-span-8 bg-[#0b0d13] border border-white/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06] mb-6">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-400">
                    DESTINATION TELEMETRY // {selectedPlanet.tier}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mt-1">
                    {selectedPlanet.name}
                  </h3>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] font-mono text-xs text-zinc-300">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>TRAJECTORY READY</span>
                </div>
              </div>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-8">
                {selectedPlanet.description}
              </p>

              {/* Data Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 block mb-1">
                    Gravity Coefficient
                  </span>
                  <span className="font-mono text-sm font-semibold text-white">{selectedPlanet.gravity}</span>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 block mb-1">
                    Atmosphere Matrix
                  </span>
                  <span className="font-mono text-sm font-semibold text-zinc-200">{selectedPlanet.atmosphere}</span>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 block mb-1">
                    Environmental Hazard
                  </span>
                  <span className="font-mono text-sm font-semibold text-zinc-200">{selectedPlanet.hazard}</span>
                </div>
              </div>
            </div>

            {/* Mineral Spec Footprint */}
            <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <span className="text-zinc-400">TARGET MINERAL STRATIGRAPHY:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedPlanet.keyMinerals.map((mineral) => (
                  <span key={mineral} className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-zinc-300">
                    {mineral}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 02 // KINETIC ENGINEERING */}
      {activeTab === "kinetic" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0b0d13] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                <Cog className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Rotational Drivetrains</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Harness water wheels, steam engines, and windmills to generate Stress Units (SU). Manage torque ratios through precision brass gearboxes.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] font-mono text-[11px] text-zinc-300 space-y-1">
              <div className="flex justify-between">
                <span className="text-zinc-400">Max Network RPM:</span>
                <span>256 RPM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Boiler Capacity:</span>
                <span>Level 18 Steam Engine</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0b0d13] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Automated Rail Networks</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Engineer high-speed train networks connecting remote quarries and space centers with automated schedule tables and signal blocks.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] font-mono text-[11px] text-zinc-300 space-y-1">
              <div className="flex justify-between">
                <span className="text-zinc-400">Signal Frequency:</span>
                <span>Sub-tick Block Sync</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Track Gauge:</span>
                <span>Standard & Narrow Rail</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0b0d13] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Sequenced Assembly</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Construct conveyor loops with mechanical arms, deployers, and spouts for multi-stage precision crafting of electronic circuits.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] font-mono text-[11px] text-zinc-300 space-y-1">
              <div className="flex justify-between">
                <span className="text-zinc-400">Throughput:</span>
                <span>64 Items / 2.4s Cycle</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Precision:</span>
                <span>100% Zero-Loss Yield</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 03 // QUANTUM LOGISTICS (AE2) */}
      {activeTab === "ae2" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0b0d13] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Matter Digitalization</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Dematerialize millions of physical items into crystalline ME storage drives. Access infinite inventory instantly from any terminal.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] font-mono text-[11px] text-zinc-300 space-y-1">
              <div className="flex justify-between">
                <span className="text-zinc-400">Storage Density:</span>
                <span>Up to 256K Byte Cells</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Channel Mode:</span>
                <span>Smart Cable Bus (32 Ch)</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0b0d13] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Quantum Network Bridging</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Link sub-bases across space dimensions (Earth to Mars to Glacio) using Quantum Entangled Singularities with zero latency.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] font-mono text-[11px] text-zinc-300 space-y-1">
              <div className="flex justify-between">
                <span className="text-zinc-400">Transfer Latency:</span>
                <span>0.0ms Interdimensional</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Power Drain:</span>
                <span>Dynamic AE/t Scaling</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0b0d13] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Auto-Crafting Arrays</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Assemble multi-core CPU co-processors to compute complex molecular recipes on demand in seconds without manual intervention.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] font-mono text-[11px] text-zinc-300 space-y-1">
              <div className="flex justify-between">
                <span className="text-zinc-400">Parallel Threads:</span>
                <span>64 Co-processors / Task</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Recursive Solver:</span>
                <span>Instant Tree Compute</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 04 // PLANETARY ECOLOGY */}
      {activeTab === "ecology" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0b0d13] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                <Globe className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Terralith Biome Engine</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Over 85 realistic procedural biomes including caldera peaks, glacial canyons, and temperate rainforests built entirely with vanilla blocks.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] font-mono text-[11px] text-zinc-300 space-y-1">
              <div className="flex justify-between">
                <span className="text-zinc-400">World Height:</span>
                <span>Y=-64 to Y=320</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Cave Systems:</span>
                <span>Volumetric Megacaves</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0b0d13] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Acoustic Sound Raytracing</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Sound Physics Remastered calculates real-time audio reverberation, absorption, and occlusion through solid rock, caves, and chambers.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] font-mono text-[11px] text-zinc-300 space-y-1">
              <div className="flex justify-between">
                <span className="text-zinc-400">Audio Engine:</span>
                <span>3D Positional Raycasting</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Echo Simulation:</span>
                <span>Material Absorption Models</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0b0d13] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Dynamic Wildlife Ecology</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Alex&apos;s Mobs introduces 89+ biologically authentic creatures with unique drops, taming behaviors, and natural food-chain interactions.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] font-mono text-[11px] text-zinc-300 space-y-1">
              <div className="flex justify-between">
                <span className="text-zinc-400">Species Roster:</span>
                <span>89+ Dynamic Fauna</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">AI Tick Rate:</span>
                <span>Optimized Server Ticking</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
