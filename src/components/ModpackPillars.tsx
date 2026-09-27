"use client";

import React, { useState } from "react";
import { Rocket, Cog, Cpu, Globe, Compass, ArrowRight, Shield, Zap, Activity, Radio, Layers } from "lucide-react";

interface PlanetSpec {
  id: string;
  name: string;
  tier: string;
  orbitIndex: number;
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
    orbitIndex: 1,
    gravity: "0.166g (Low Gravity)",
    atmosphere: "100% Vacuum (Oxygen Required)",
    hazard: "Extreme Freezing Lunar Nights",
    keyMinerals: ["Desh Ore", "Cheese Ore", "Moon Stone"],
    description: "The primary proving ground. Establish pressurized surface domes, explore Lunarian subterranean ruins, and smelt Desh ingots for deep-space propulsion stages.",
  },
  {
    id: "mars",
    name: "Mars",
    tier: "Tier 2 Rocket",
    orbitIndex: 2,
    gravity: "0.380g",
    atmosphere: "Toxic Carbon Dioxide",
    hazard: "Ferrous Dust Storms & Martian Vaults",
    keyMinerals: ["Ostrum Ore", "Mars Iron", "Sub-surface Ice"],
    description: "Expansive rust-red canyon plateaus. Deploy pressurized rovers, excavate underground pyramidal dungeons, and extract Ostrum for heavy rocketry engines.",
  },
  {
    id: "venus",
    name: "Venus",
    tier: "Tier 3 Rocket",
    orbitIndex: 3,
    gravity: "0.904g",
    atmosphere: "Supercritical Acid Vapor",
    hazard: "Thermal Compression & Basalt Magma",
    keyMinerals: ["Calorite Ore", "Venus Gold", "Sulfur"],
    description: "A hostile planetary pressure vessel. Requires high-temp Netherite thermal space suits and acid-resistant rovers to mine Calorite from volcanic geysers.",
  },
  {
    id: "mercury",
    name: "Mercury",
    tier: "Tier 3 Rocket",
    orbitIndex: 4,
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
    orbitIndex: 5,
    gravity: "1.120g (High Gravity)",
    atmosphere: "Thin Oxygen (Breathable in Valleys)",
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
    <section id="pillars" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Header */}
      <div className="max-w-3xl mb-16 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400 font-mono text-[11px] uppercase tracking-widest mb-4">
          <Compass className="w-3 h-3 text-zinc-400" />
          SYSTEM SPECIFICATION
        </div>
        <h2 className="text-4xl sm:text-6xl font-medium text-white tracking-[-0.035em] mb-4">
          Four Core Pillars. One Cohesive World.
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg font-normal leading-relaxed">
          Ventrix: Frontier eliminates mod bloat and recipe conflicts. Every mechanic connects directly into a unified progression framework.
        </p>

        {/* Tab Switcher */}
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
            04 // Living Ecology
          </button>
        </div>
      </div>

      {/* 01 // ORBITAL COSMOS */}
      {activeTab === "cosmos" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Planet Switcher Column */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {PLANETS.map((planet, index) => (
              <button
                key={planet.id}
                onClick={() => setSelectedPlanetIndex(index)}
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  selectedPlanetIndex === index
                    ? "bg-[#10131a] border-white/[0.2] text-white shadow-xl"
                    : "bg-[#090b10] border-white/[0.06] hover:bg-white/[0.02] text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm text-white">{planet.name}</span>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase">{planet.tier}</span>
                </div>
                <div className="text-xs font-mono text-zinc-500">
                  {planet.gravity} • {planet.atmosphere.split(" ")[0]}
                </div>
              </button>
            ))}
          </div>

          {/* Telemetry Display HUD */}
          <div className="lg:col-span-8 bg-[#0c0d12] border border-white/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06] mb-6">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                    DESTINATION TELEMETRY // {selectedPlanet.tier}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mt-1">
                    {selectedPlanet.name}
                  </h3>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 border border-white/[0.08] font-mono text-xs text-zinc-300">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>TRAJECTORY SYNCHRONIZED</span>
                </div>
              </div>

              {/* Visual Orbit Vector Tracker */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] mb-6">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-2">
                  <span>ORBITAL TRANSIT SIMULATION</span>
                  <span>STAGE {selectedPlanet.orbitIndex} OF 5</span>
                </div>
                <div className="w-full h-2 bg-white/[0.04] rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-white transition-all duration-500"
                    style={{ width: `${selectedPlanet.orbitIndex * 20}%` }}
                  />
                </div>
              </div>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-8">
                {selectedPlanet.description}
              </p>

              {/* Data Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-black/50 border border-white/[0.06]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 block mb-1">
                    Gravity Coefficient
                  </span>
                  <span className="font-mono text-sm font-medium text-white">{selectedPlanet.gravity}</span>
                </div>
                <div className="p-4 rounded-xl bg-black/50 border border-white/[0.06]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 block mb-1">
                    Atmosphere Matrix
                  </span>
                  <span className="font-mono text-sm font-medium text-zinc-200">{selectedPlanet.atmosphere}</span>
                </div>
                <div className="p-4 rounded-xl bg-black/50 border border-white/[0.06]">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 block mb-1">
                    Hazard Classification
                  </span>
                  <span className="font-mono text-sm font-medium text-zinc-200">{selectedPlanet.hazard}</span>
                </div>
              </div>
            </div>

            {/* Mineral Stratigraphy */}
            <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <span className="text-zinc-500">SURFACE MINERAL DEPOSITS:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedPlanet.keyMinerals.map((mineral) => (
                  <span key={mineral} className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-zinc-300">
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
          <div className="p-6 rounded-2xl bg-[#0c0d12] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                <Cog className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Rotational Drivetrains</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Harness water wheels, high-pressure steam boilers, and windmills to produce Stress Units (SU). Transmit rotational kinetic torque with zero power loss over long distances.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-black/50 border border-white/[0.06] font-mono text-[11px] text-zinc-300 space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-500">Max Shaft Speed:</span>
                <span>256 RPM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Boiler Capacity:</span>
                <span>Level 18 Steam Engine</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Stress Capacity:</span>
                <span>524,288 SU Network</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0c0d12] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Automated Transcontinental Rail</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Engineer automated high-speed locomotives connecting distant mining quarries, factory compounds, and rocket launch complexes with precision schedule tables.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-black/50 border border-white/[0.06] font-mono text-[11px] text-zinc-300 space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-500">Signal Frequency:</span>
                <span>Sub-tick Block Sync</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Track Gauge:</span>
                <span>Standard & Custom Trains</span>
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
                <Zap className="w-4 h-4" />
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
      )}

      {/* 03 // QUANTUM LOGISTICS (AE2) */}
      {activeTab === "ae2" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0c0d12] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Crystalline Digital Storage</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Dematerialize millions of physical items into crystalline ME storage drives. Query and retrieve any item instantly across your entire planetary base.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-black/50 border border-white/[0.06] font-mono text-[11px] text-zinc-300 space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-500">Drive Capacity:</span>
                <span>Up to 256K Byte Cells</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Channel Mode:</span>
                <span>Dense Smart Cable (32 Ch)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Access Latency:</span>
                <span>Instantaneous</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0c0d12] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                <Radio className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Interdimensional Quantum Link</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Bridge remote outposts across planetary space dimensions using Quantum Entangled Singularities with zero latency and shared power grids.
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
                <span className="text-emerald-400">Synchronized</span>
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
                Assemble multi-core CPU co-processors to compute deeply nested recipes instantly. Order complex spacecraft parts with a single terminal click.
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
      )}

      {/* 04 // LIVING ECOLOGY */}
      {activeTab === "ecology" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#0c0d12] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 mb-4">
                <Globe className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Terralith Biome Engine</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Over 85 realistic procedural biomes including volcanic calderas, glacial fjords, and alpine highlands built completely with vanilla block architecture.
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
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">Acoustic Reverberation Raytracing</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Sound Physics Remastered calculates real-time acoustic reverberation, absorption, and occlusion through rock, water, and vast underground halls.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-black/50 border border-white/[0.06] font-mono text-[11px] text-zinc-300 space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-500">Audio Processing:</span>
                <span>3D Positional Raycasting</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Material Model:</span>
                <span>Reflective & Absorbent</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Cave Echoes:</span>
                <span>Dynamic Impulse Response</span>
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
                Alex&apos;s Mobs brings 89+ biologically modeled creatures with behavioral AI, realistic territorial habits, unique taming, and natural food webs.
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
      )}
    </section>
  );
}
