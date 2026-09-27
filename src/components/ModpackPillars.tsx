"use client";

import React, { useState } from "react";
import { Rocket, Cog, Flame, CloudRain, Compass, ArrowRight, ShieldAlert, Sparkles, Database } from "lucide-react";

interface PlanetSpec {
  name: string;
  tier: string;
  gravity: string;
  atmosphere: string;
  hazard: string;
  minerals: string[];
  description: string;
}

const PLANETS: PlanetSpec[] = [
  {
    name: "The Moon",
    tier: "Tier 1 Rocket",
    gravity: "0.166g (Low Gravity)",
    atmosphere: "Vacuum (Oxygen Required)",
    hazard: "Extreme Freezing Nights",
    minerals: ["Desh Ore", "Cheese Ore", "Moon Stone"],
    description: "Your first cosmic proving ground. Explore ancient Lunarian ruins, harvest Desh for Tier 2 engines, and establish permanent pressurized lunar bases.",
  },
  {
    name: "Mars",
    tier: "Tier 2 Rocket",
    gravity: "0.38g",
    atmosphere: "Carbon Dioxide (Toxic)",
    hazard: "Sulfur Dust Storms & Martian Pyramids",
    minerals: ["Ostrum Ore", "Mars Iron", "Ice Shards"],
    description: "Dune rovers race across rust-red canyon plateaus. Conquer underground Martian boss vaults to unlock deep-space rocketry.",
  },
  {
    name: "Venus",
    tier: "Tier 3 Rocket",
    gravity: "0.904g",
    atmosphere: "Corrosive Acid Rain",
    hazard: "Supercritical Magma & Heat",
    minerals: ["Calorite Ore", "Venus Gold", "Sulfur"],
    description: "An infernal, suffocating pressure vessel. Requires high-temp Netherite thermal space suits and reinforced acid-resistant rovers.",
  },
  {
    name: "Mercury",
    tier: "Tier 3 Rocket",
    gravity: "0.38g",
    atmosphere: "Solar Scorching Vacuum",
    hazard: "Extreme Solar Radiation",
    minerals: ["Raw Iron", "Solar Crystals", "Calorite"],
    description: "Harness unlimited solar energy right next to the Sun. Construct orbital beam arrays with zero day-night disruption.",
  },
  {
    name: "Glacio",
    tier: "Tier 4 Rocket (Deep Space)",
    gravity: "1.12g (High Gravity)",
    atmosphere: "Thin Oxygen (Breathable in Valleys)",
    hazard: "Permafrost & Glacio Rams",
    minerals: ["Permafrost Steel", "Glacio Ice", "Calorite"],
    description: "An extrasolar planet in a distant star system. Home to alien megafauna, icy primordial forests, and enigmatic ancient structures.",
  },
];

export function ModpackPillars() {
  const [activeTab, setActiveTab] = useState<"cosmos" | "kinetic" | "arcane" | "realism">("cosmos");
  const [selectedPlanetIndex, setSelectedPlanetIndex] = useState(0);

  const selectedPlanet = PLANETS[selectedPlanetIndex];

  return (
    <section id="pillars" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Compass className="w-3.5 h-3.5" />
          The Architectural Pillars
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Engineered for Wonder & Progression
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          No generic filler or chaotic item bloat. Every mechanic connects deeply into our unified survival loop.
        </p>

        {/* Pillar Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md max-w-2xl mx-auto">
          <button
            onClick={() => setActiveTab("cosmos")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "cosmos"
                ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Rocket className="w-4 h-4" />
            The Cosmos
          </button>

          <button
            onClick={() => setActiveTab("kinetic")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "kinetic"
                ? "bg-gradient-to-r from-amber-600 to-orange-500 text-white shadow-lg shadow-amber-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Cog className="w-4 h-4" />
            Kinetic Engineering
          </button>

          <button
            onClick={() => setActiveTab("arcane")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "arcane"
                ? "bg-gradient-to-r from-purple-600 to-indigo-500 text-white shadow-lg shadow-purple-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Flame className="w-4 h-4" />
            Arcane Mysteries
          </button>

          <button
            onClick={() => setActiveTab("realism")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "realism"
                ? "bg-gradient-to-r from-teal-600 to-emerald-500 text-white shadow-lg shadow-teal-500/20"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <CloudRain className="w-4 h-4" />
            Living Atmosphere
          </button>
        </div>
      </div>

      {/* Tab Content Display */}

      {/* 1. THE COSMOS */}
      {activeTab === "cosmos" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Planet selector list */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider px-2">
              Select Planetary Destination
            </h3>
            {PLANETS.map((planet, index) => (
              <button
                key={planet.name}
                onClick={() => setSelectedPlanetIndex(index)}
                className={`w-full flex items-center justify-between p-4 rounded-xl text-left border transition-all cursor-pointer ${
                  selectedPlanetIndex === index
                    ? "bg-blue-600/15 border-cyan-500/50 shadow-md shadow-cyan-500/10"
                    : "bg-[#0b0e17]/60 border-white/[0.06] hover:bg-white/[0.04] text-slate-300"
                }`}
              >
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    {planet.name}
                    {index === 4 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        DEEP SPACE
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">{planet.tier}</div>
                </div>
                <ArrowRight className={`w-4 h-4 ${selectedPlanetIndex === index ? "text-cyan-400" : "text-slate-600"}`} />
              </button>
            ))}
          </div>

          {/* Interactive Spec Deck for Selected Planet */}
          <div className="lg:col-span-8 bg-[#0b0e17]/80 backdrop-blur-xl border border-white/[0.1] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Planetary Telemetry</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{selectedPlanet.name}</h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] font-mono text-xs text-slate-300">
                  {selectedPlanet.tier} Required
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                {selectedPlanet.description}
              </p>

              {/* Data Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06]">
                  <span className="text-[11px] font-mono text-slate-500 uppercase">Gravity Metric</span>
                  <div className="text-sm font-bold text-cyan-300 mt-1">{selectedPlanet.gravity}</div>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06]">
                  <span className="text-[11px] font-mono text-slate-500 uppercase">Atmosphere Class</span>
                  <div className="text-sm font-bold text-amber-300 mt-1">{selectedPlanet.atmosphere}</div>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06]">
                  <span className="text-[11px] font-mono text-slate-500 uppercase">Primary Environmental Threat</span>
                  <div className="text-sm font-bold text-rose-300 mt-1">{selectedPlanet.hazard}</div>
                </div>
              </div>

              {/* Minerals & Resources */}
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2.5">
                  Exclusive Minerals & Tech Components
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedPlanet.minerals.map((m) => (
                    <span
                      key={m}
                      className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-cyan-300 font-mono"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 mt-8 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Mod: Ad Astra 1.16.25 + Giselle Addon</span>
              <span>Fully Compatible with Live 3D BlueMap</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. KINETIC ENGINEERING */}
      {activeTab === "kinetic" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
                <Cog className="w-6 h-6 animate-[spin_10s_linear_infinite]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Rotational Power</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Harness water wheels, steam engines, and windmills to drive kinetic stress networks. Precision speed controllers regulate intricate mechanical assemblies.
              </p>
            </div>
            <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-amber-400">
              Create: Connected + Brass Gearboxes
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Automated Railways</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Construct transcontinental trains that transport cargo and players across thousands of blocks. Real-time train schedules, signals, and station display boards.
              </p>
            </div>
            <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-orange-400">
              Railways Navigator + Pocket Nav
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 mb-6">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Matter Replication</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Scan items once, feed raw matter to disintegrators, and synthesize copies on demand. Full integration with Create logistical belts and storage vaults.
              </p>
            </div>
            <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-yellow-400">
              Replication + Digital Logistics
            </div>
          </div>
        </div>
      )}

      {/* 3. ARCANE MYSTERIES */}
      {activeTab === "arcane" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Malum Spirit Forging</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Reap spirit motes from fallen foes using enchanted scythes. Channel sacred and aerial spirits through stone altars to craft soul-stained steel relics.
              </p>
            </div>
            <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-purple-400">
              Malum + Lodestone Engine
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Hexerei Witchery</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Brew herbal concoctions in large heated mixing cauldrons. Fly on custom willow brooms, tame courier crows for player errands, and harvest wild sage.
              </p>
            </div>
            <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-indigo-400">
              Hexerei Witchcraft & Herbology
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 mb-6">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Mowzie&apos;s Boss Hunts</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Face handcrafted mini-bosses in procedural wilderness: defeat the Frostmaw in icy caves, break the impenetrable Ferrous Wroughtnaut, and raid Umvuthana groves.
              </p>
            </div>
            <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-fuchsia-400">
              Mowzie&apos;s Mobs + Unique Drops
            </div>
          </div>
        </div>
      )}

      {/* 4. LIVING ATMOSPHERE */}
      {activeTab === "realism" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-6">
                <CloudRain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Dynamic Seasons</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Full 4-season agricultural cycles via Serene Seasons. Rivers freeze in winter, snow physically accumulates on exposed machinery, and crops require greenhouse warmth.
              </p>
            </div>
            <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-teal-400">
              Serene Seasons + GlitchCore
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Severe Weather & Defenses</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Dynamic localized F1-F5 supercells, weather radar screens, pocket storm detectors, and Weather Deflector shields protect your bases against violent microbursts.
              </p>
            </div>
            <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-emerald-400">
              Weather2 + Expanded Dynamics
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Acoustic Immersion</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Sound Physics Remastered calculates realistic cave echoes and storm baffling inside underground bunkers. Step sounds crunch dynamically on snow and gravel.
              </p>
            </div>
            <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-cyan-400">
              Sound Physics + Presence Footsteps
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
