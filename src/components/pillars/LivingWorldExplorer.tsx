"use client";

import React, { useState } from "react";
import {
  Globe,
  Mountain,
  Thermometer,
  Droplets,
  Activity,
  ShieldCheck,
} from "lucide-react";

export interface BiomeSpec {
  id: string;
  name: string;
  category: string;
  yMin: number;
  yMax: number;
  temperature: string;
  humidity: string;
  climateZone: string;
  description: string;
  nativeFlora: string[];
  wildlife: string[];
  landmarks: string[];
  vanillaBlocks: string[];
  accentColor: string;
  accentGlow: string;
  elevationHighlight: { topPct: number; heightPct: number }; // Percentage in the -64 to 320 range
}

export const BIOMES: BiomeSpec[] = [
  {
    id: "glacial-fjords",
    name: "Glacial Spire Fjords",
    category: "Sub-Polar Alpine",
    yMin: 64,
    yMax: 280,
    temperature: "-0.4°C (Permafrost)",
    humidity: "85% (Snow & Ice)",
    climateZone: "Cryo-Alpine Maritime",
    description:
      "Towering packed-ice needles erupting from deep ocean fjords. Steep snowpack crags rise into the cloudline, carved by ancient glaciers and punctuated by crystalline caverns.",
    nativeFlora: ["Frosted Blue Spruce", "Lichen Encrusted Moss", "Winter Heather", "Alpine Edelweiss"],
    wildlife: ["Snow Leopards (Alex's Mobs)", "Arctic Foxes", "Moose Herds", "Coastal Seals"],
    landmarks: ["Glacial Sea Arches", "Crystalline Ice Spire Ridges", "Sub-glacial Pack Ice Grottos"],
    vanillaBlocks: ["Packed Ice", "Blue Ice", "Calcite", "Dripstone", "Snow Blocks", "Diorite"],
    accentColor: "#38bdf8",
    accentGlow: "rgba(56, 189, 248, 0.35)",
    elevationHighlight: { topPct: 10.4, heightPct: 56.25 },
  },
  {
    id: "volcanic-caldera",
    name: "Volcanic Caldera Rift",
    category: "Geothermal Trench",
    yMin: 32,
    yMax: 198,
    temperature: "+42.5°C (Hyperthermic)",
    humidity: "10% (Ash Vapor)",
    climateZone: "Basaltic Magma Basin",
    description:
      "A massive tectonic fissure spilling supercritical lava into basalt columns. Thermal plumes erupt continuously from subterranean magma vents across smoking blackstone plateaus.",
    nativeFlora: ["Fireweed Shrubs", "Scorched Briar", "Ash-fed Lichen", "Charcoal Ferns"],
    wildlife: ["Magma Beetles", "Crimson Mosquitos", "Lavasioths", "Cinder Skinks"],
    landmarks: ["Active Magma Geysers", "Hexagonal Basalt Spires", "Obsidian Flow Channels"],
    vanillaBlocks: ["Basalt", "Smooth Basalt", "Magma Blocks", "Blackstone", "Obsidian", "Tuff"],
    accentColor: "#f97316",
    accentGlow: "rgba(249, 115, 22, 0.35)",
    elevationHighlight: { topPct: 31.8, heightPct: 43.2 },
  },
  {
    id: "redwood-highlands",
    name: "Whispering Redwood Highlands",
    category: "Ancient Canopy",
    yMin: 96,
    yMax: 240,
    temperature: "+15.8°C (Temperate)",
    humidity: "75% (Dense Morning Fog)",
    climateZone: "Pacific Rainforest Ridge",
    description:
      "Ancient monolithic conifers climbing up to 60 meters into the mist. Massive moss-covered trunks carpeted in podzol and ferns, offering elevated natural vantage points over the continent.",
    nativeFlora: ["Colossal Giant Redwoods", "Spruce Undergrowth", "Broadleaf Sword Ferns", "Wild Cloudberries"],
    wildlife: ["Grizzly Bears (Alex's Mobs)", "Bald Eagles", "Highland Cougars", "Raccoons"],
    landmarks: ["Hollow Giant Stumps", "High-Canopy Natural Arches", "Cascading Moss Waterfalls"],
    vanillaBlocks: ["Spruce Logs", "Podzol", "Coarse Dirt", "Moss Blocks", "Mud Bricks", "Leaves"],
    accentColor: "#10b981",
    accentGlow: "rgba(16, 185, 129, 0.35)",
    elevationHighlight: { topPct: 20.8, heightPct: 37.5 },
  },
  {
    id: "deep-caverns",
    name: "Colossal Deep Caverns (Y=-64)",
    category: "Sub-Crustal Abyssal",
    yMin: -64,
    yMax: 12,
    temperature: "+26.0°C (Geothermal)",
    humidity: "95% (Dripping Groundwater)",
    climateZone: "Abyssal Geode Chasm",
    description:
      "A gargantuan subterranean cavern complex stretching directly above bedrock. Vast subterranean lakes, giant amethyst geodes, and bioluminescent spore clusters illuminate the abyssal depths.",
    nativeFlora: ["Sculk Vein Networks", "Glow Lichen Mats", "Spore Blossoms", "Flowering Dripleaf"],
    wildlife: ["Cave Centipedes", "Spectres", "Bioluminescent Jellyfish", "Subterranean Bats"],
    landmarks: ["Colossal Amethyst Pockets", "Abyssal Lava Waterfalls", "Bedrock Void Vaults"],
    vanillaBlocks: ["Deepslate", "Grimstone", "Tuff Bricks", "Amethyst Cluster", "Sculk", "Pointed Dripstone"],
    accentColor: "#a855f7",
    accentGlow: "rgba(168, 85, 247, 0.35)",
    elevationHighlight: { topPct: 80.2, heightPct: 19.8 },
  },
];

export function LivingWorldExplorer() {
  const [selectedBiomeId, setSelectedBiomeId] = useState<string>("glacial-fjords");

  const activeBiome =
    BIOMES.find((b) => b.id === selectedBiomeId) || BIOMES[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Visual Elevation Gauge & Stratigraphy Scanner (Left Column) */}
      <div className="lg:col-span-7 bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl rounded-3xl p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.36)] hover:border-white/[0.14] transition-all duration-300">
        {/* Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.06] mb-4 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] text-zinc-300 uppercase tracking-wider">
              ELEVATION STRATIGRAPHY // TERRALITH 2.0 WORLDGEN
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] font-mono text-[10px] text-zinc-300">
            <Mountain className="w-3.5 h-3.5 text-zinc-400" />
            <span>TOTAL RANGE: Y=-64 TO Y=+320</span>
          </div>
        </div>

        {/* Stratigraphy Depth Meter Visualization */}
        <div className="relative my-2 flex items-stretch gap-4 sm:gap-6 bg-black/60 border border-white/[0.06] rounded-2xl p-4 sm:p-5">
          {/* Vertical Y-Level Depth Ruler */}
          <div className="flex flex-col justify-between items-end font-mono text-[10px] text-zinc-500 py-1 pr-2 border-r border-white/[0.06] select-none shrink-0 w-20">
            <div className="text-right">
              <span className="text-white font-semibold block">Y: +320</span>
              <span className="text-[9px] text-zinc-600">Space Border</span>
            </div>
            <div className="text-right">
              <span className="text-zinc-300 font-medium block">Y: +240</span>
              <span className="text-[9px] text-zinc-600">Alpine Peaks</span>
            </div>
            <div className="text-right">
              <span className="text-zinc-300 font-medium block">Y: +192</span>
              <span className="text-[9px] text-zinc-600">Cloud Ceiling</span>
            </div>
            <div className="text-right">
              <span className="text-zinc-300 font-medium block">Y: +128</span>
              <span className="text-[9px] text-zinc-600">High Plateaus</span>
            </div>
            <div className="text-right">
              <span className="text-sky-400 font-medium block">Y: +64</span>
              <span className="text-[9px] text-zinc-600">Sea Level</span>
            </div>
            <div className="text-right">
              <span className="text-zinc-400 font-medium block">Y: 0</span>
              <span className="text-[9px] text-zinc-600">Deepslate Cut</span>
            </div>
            <div className="text-right">
              <span className="text-purple-400 font-semibold block">Y: -64</span>
              <span className="text-[9px] text-zinc-600">Bedrock Base</span>
            </div>
          </div>

          {/* Interactive Strata Column */}
          <div className="relative flex-1 rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden min-h-[340px] flex flex-col justify-between">
            {/* Horizontal guideline markers */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-between opacity-25">
              <div className="border-b border-dashed border-white/40 h-0" />
              <div className="border-b border-dashed border-white/20 h-0" />
              <div className="border-b border-dashed border-sky-400/50 h-0" />
              <div className="border-b border-dashed border-white/20 h-0" />
              <div className="border-b border-dashed border-purple-500/50 h-0" />
            </div>

            {/* Active Biome Elevation Envelope Indicator */}
            <div
              className="absolute left-2 right-2 rounded-lg border transition-all duration-500 flex flex-col justify-between p-2.5 backdrop-blur-sm"
              style={{
                top: `${activeBiome.elevationHighlight.topPct}%`,
                height: `${activeBiome.elevationHighlight.heightPct}%`,
                borderColor: activeBiome.accentColor,
                backgroundColor: activeBiome.accentGlow,
                boxShadow: `0 0 25px ${activeBiome.accentGlow}`,
              }}
            >
              <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-white">
                <span className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: activeBiome.accentColor }}
                  />
                  {activeBiome.name} Envelope
                </span>
                <span className="bg-black/50 px-2 py-0.5 rounded text-[10px] border border-white/10">
                  Span: {activeBiome.yMax - activeBiome.yMin}m
                </span>
              </div>

              {/* Sub-label inside the highlighted zone */}
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-300">
                <span>Base: Y={activeBiome.yMin}</span>
                <span>Peak: Y={activeBiome.yMax}</span>
              </div>
            </div>

            {/* Background Geological Stratigraphy Labels */}
            <div className="p-3 text-[9px] font-mono text-zinc-600 flex justify-between z-0 pointer-events-none">
              <span>ATMOSPHERIC TROPOSPHERE</span>
              <span>LOW GRAVITY HORIZON</span>
            </div>
            <div className="p-3 text-[9px] font-mono text-zinc-600 flex justify-between z-0 pointer-events-none">
              <span>SUB-CRUST GEOTHERMAL VOID</span>
              <span>COMPACTED BEDROCK STRATUM</span>
            </div>
          </div>
        </div>

        {/* Bottom Biome Switcher Pills */}
        <div className="pt-3 border-t border-white/[0.06] z-10">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-2">
            <span>EXPLORE PROCEDURAL BIOMES:</span>
            <span className="text-zinc-400">85+ UNIQUE ECOREGIONS</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {BIOMES.map((biome) => {
              const isSelected = biome.id === selectedBiomeId;
              return (
                <button
                  key={biome.id}
                  onClick={() => setSelectedBiomeId(biome.id)}
                  className={`p-2.5 rounded-xl text-left font-mono transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                    isSelected
                      ? "bg-white text-black font-semibold shadow-lg shadow-white/5"
                      : "bg-white/[0.02] border border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.05] hover:border-white/[0.12]"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: isSelected ? "#000000" : biome.accentColor,
                      }}
                    />
                    <span className={isSelected ? "text-zinc-700" : "text-zinc-500"}>
                      Y:{biome.yMin}..{biome.yMax}
                    </span>
                  </div>
                  <div className="text-xs truncate font-medium">
                    {biome.name.split(" ")[0]} {biome.name.split(" ")[1] || ""}
                  </div>
                  <div className={`text-[10px] mt-0.5 ${isSelected ? "text-zinc-700" : "text-zinc-500"}`}>
                    {biome.category}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Biome Climate & Ecological Stratigraphy HUD (Right Column) */}
      <div className="lg:col-span-5 bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.36)] hover:border-white/[0.14] transition-all duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block">
                {`TERRALITH // ${activeBiome.category}`}
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mt-0.5">
                {activeBiome.name}
              </h3>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] font-mono text-[11px] text-zinc-300">
              <Globe className="w-3 h-3 text-sky-400" />
              <span>OVERWORLD</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-5">
            {activeBiome.description}
          </p>

          {/* Four Climate & Physical Metric Cards */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
              <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                <Mountain className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] uppercase tracking-wider">Vertical Strata</span>
              </div>
              <span className="font-mono text-base font-semibold text-white">
                Y: {activeBiome.yMin} to +{activeBiome.yMax}
              </span>
              <span className="font-mono text-[10px] text-zinc-500 block mt-0.5">
                {activeBiome.yMax - activeBiome.yMin}m Relief Range
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
              <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                <Thermometer className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] uppercase tracking-wider">Ambient Temp</span>
              </div>
              <span className="font-mono text-base font-semibold text-white">
                {activeBiome.temperature.split(" ")[0]}
              </span>
              <span className="font-mono text-[10px] text-zinc-400 block mt-0.5 truncate">
                {activeBiome.climateZone}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
              <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                <Droplets className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] uppercase tracking-wider">Precipitation</span>
              </div>
              <span className="font-mono text-xs font-semibold text-white">
                {activeBiome.humidity}
              </span>
              <span className="font-mono text-[10px] text-zinc-500 block mt-0.5">
                Volumetric Weather
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
              <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                <Activity className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] uppercase tracking-wider">Fauna Density</span>
              </div>
              <span className="font-mono text-xs font-semibold text-emerald-400">
                High // Alex&apos;s Mobs
              </span>
              <span className="font-mono text-[10px] text-zinc-500 block mt-0.5">
                89+ Native Species
              </span>
            </div>
          </div>

          {/* Flora & Fauna Specimen Matrix */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] mb-5 space-y-3">
            <div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-1.5">
                Documented Wildlife (Alex&apos;s Mobs AI):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeBiome.wildlife.map((animal, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-zinc-200 font-mono text-[10px]"
                  >
                    {animal}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.04]">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-1.5">
                Natural Structural Landmarks:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeBiome.landmarks.map((lm, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-zinc-300 font-mono text-[10px]"
                  >
                    {lm}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 100% Pure Vanilla Palette Guarantee Badge */}
          <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider block">
                Pure Vanilla Block Palette Guarantee
              </span>
              <p className="text-zinc-400 text-[11px] leading-relaxed mt-0.5">
                Terralith crafts complex geological formations exclusively out of native vanilla blocks (deepslate, calcite, basalt, tuff). Zero custom block IDs ensure smooth 60+ FPS client rendering and zero texture glitches.
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {activeBiome.vanillaBlocks.map((block, idx) => (
                  <span
                    key={idx}
                    className="px-1.5 py-0.2 rounded bg-white/[0.06] text-zinc-300 font-mono text-[9px]"
                  >
                    {block}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Spec */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>WORLD GENERATOR: TERRALITH 2.0 (FABRIC)</span>
          <span className="text-zinc-400">BIOME REGISTRY: 85+ BIOMES</span>
        </div>
      </div>
    </div>
  );
}
