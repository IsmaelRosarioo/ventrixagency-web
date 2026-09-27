"use client";

import React, { useState } from "react";
import {
  Shield,
  ShieldCheck,
  Users,
  Landmark,
  Sliders,
  Sparkles,
  MapPin,
  Zap,
} from "lucide-react";

export type ClaimTier = "solo" | "town" | "confederation";

export interface ClaimTierData {
  id: ClaimTier;
  label: string;
  badge: string;
  name: string;
  chunkCapacity: number;
  forcedLoadedChunks: number;
  maxCitizens: string;
  territorySize: string;
  description: string;
  gridRadius: number; // radius in the 7x7 grid to show as claimed
}

export const CLAIM_TIERS: Record<ClaimTier, ClaimTierData> = {
  solo: {
    id: "solo",
    label: "01 // Solo Homestead",
    badge: "TIER I",
    name: "Frontier Homestead",
    chunkCapacity: 16,
    forcedLoadedChunks: 2,
    maxCitizens: "1 - 2 Pioneers",
    territorySize: "256 x 256 Blocks",
    description:
      "Instant bedrock-to-skyline personal perimeter. Protect your initial workshop, blast furnaces, and underground mines with zero upkeep fees or complex commands.",
    gridRadius: 1,
  },
  town: {
    id: "town",
    label: "02 // Colony / Town",
    badge: "TIER II",
    name: "Autonomous Township",
    chunkCapacity: 64,
    forcedLoadedChunks: 8,
    maxCitizens: "3 - 12 Citizens",
    territorySize: "1,024 x 1,024 Blocks",
    description:
      "Chartered settlement with town hall beacon. Unlocks shared chunk-loading for uninterrupted Create factory processing, automated rail transit terminals, and communal chest vaults.",
    gridRadius: 2,
  },
  confederation: {
    id: "confederation",
    label: "03 // Allied Confederation",
    badge: "TIER III",
    name: "Sovereign Nation-State",
    chunkCapacity: 256,
    forcedLoadedChunks: 24,
    maxCitizens: "12 - 50+ Pioneers",
    territorySize: "4,096 x 4,096 Blocks",
    description:
      "Transcontinental civilization territory. Secures multi-kilometer high-speed railway corridors, shared orbital launchpads, atomic player trading districts, and mutual defense pacts.",
    gridRadius: 3,
  },
};

export function CivilizationClaims() {
  const [activeTier, setActiveTier] = useState<ClaimTier>("town");
  const [selectedChunk, setSelectedChunk] = useState<{ x: number; z: number }>({ x: 3, z: 3 });

  // Interactive permission toggles
  const [permissions, setPermissions] = useState({
    buildBreak: true, // true = protected (only members can build/break)
    storageAccess: true, // true = protected (chests/AE2 locked)
    redstoneTransit: true, // true = protected (trains/switches locked)
    visitorWhitelist: false, // true = open visitor transit allowed
  });

  const tier = CLAIM_TIERS[activeTier];

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 7x7 grid: coordinates (0 to 6)
  const gridSize = 7;
  const center = 3;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Visual Chunk Territory Matrix (Left Column) */}
      <div className="lg:col-span-7 bg-[#0c0d12] border border-white/[0.08] rounded-2xl p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden">
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.06] mb-4 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] text-zinc-300 uppercase tracking-wider">
              SOVEREIGN CLAIMS MATRIX // SUB-CHUNK PRECISION
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] font-mono text-[10px] text-zinc-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% GRIEF-PROOF PROTOCOL</span>
          </div>
        </div>

        {/* Territory Grid & Radar Display */}
        <div className="relative my-2 flex flex-col items-center">
          <div className="w-full max-w-[420px] aspect-square p-3 rounded-2xl bg-black/60 border border-white/[0.06] flex flex-col justify-between">
            {/* Grid coordinates indicator */}
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pb-2 border-b border-white/[0.04]">
              <span>WEST &lt;--&gt; EAST (X-AXIS)</span>
              <span>NORTH &lt;--&gt; SOUTH (Z-AXIS)</span>
            </div>

            {/* The 7x7 Chunk Matrix */}
            <div className="grid grid-cols-7 gap-1.5 w-full my-auto">
              {Array.from({ length: gridSize * gridSize }).map((_, idx) => {
                const row = Math.floor(idx / gridSize);
                const col = idx % gridSize;
                const dist = Math.max(Math.abs(row - center), Math.abs(col - center));

                const isCenter = row === center && col === center;
                const isClaimed = dist <= tier.gridRadius;
                const isBuffer = dist === tier.gridRadius + 1;
                const isSelected = selectedChunk.x === col && selectedChunk.z === row;

                let cellBg = "bg-white/[0.02] border-white/[0.04] text-zinc-700 hover:bg-white/[0.06]";
                if (isCenter) {
                  cellBg = "bg-sky-500/25 border-sky-400/60 text-sky-200 shadow-sm shadow-sky-500/20";
                } else if (isClaimed) {
                  cellBg = "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25";
                } else if (isBuffer) {
                  cellBg = "bg-amber-500/5 border-amber-500/20 text-zinc-500 hover:bg-amber-500/15";
                }

                if (isSelected) {
                  cellBg += " ring-2 ring-white ring-offset-2 ring-offset-black";
                }

                return (
                  <button
                    key={`chunk-${row}-${col}`}
                    onClick={() => setSelectedChunk({ x: col, z: row })}
                    className={`aspect-square rounded-lg border transition-all duration-150 flex flex-col items-center justify-center cursor-pointer p-0.5 relative group ${cellBg}`}
                    title={`Chunk [${col - center}, ${row - center}]`}
                  >
                    {isCenter ? (
                      <Landmark className="w-3.5 h-3.5 text-sky-300" />
                    ) : isClaimed ? (
                      <Shield className="w-2.5 h-2.5 text-emerald-400" />
                    ) : isBuffer ? (
                      <span className="w-1 h-1 rounded-full bg-amber-500/40" />
                    ) : (
                      <span className="w-1 h-1 rounded-full bg-white/[0.08]" />
                    )}

                    {/* Micro-label */}
                    <span className="font-mono text-[7px] opacity-75 mt-0.5">
                      {isCenter ? "HUB" : `${col - center},${row - center}`}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Grid Legend */}
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-white/[0.04]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-2 h-2 rounded bg-emerald-500/30 border border-emerald-500/60" />
                  Protected
                </span>
                <span className="flex items-center gap-1 text-sky-400">
                  <span className="w-2 h-2 rounded bg-sky-500/30 border border-sky-400/60" />
                  Capital
                </span>
                <span className="flex items-center gap-1 text-zinc-400">
                  <span className="w-2 h-2 rounded bg-white/[0.04] border border-white/[0.08]" />
                  Wilderness
                </span>
              </div>
              <span className="text-zinc-500">1 CHUNK = 16x16 BLOCKS</span>
            </div>
          </div>

          {/* Active Inspected Chunk Inspector Banner */}
          <div className="w-full max-w-[420px] mt-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between font-mono text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-zinc-300">
                INSPECTED CHUNK [{selectedChunk.x - center}, {selectedChunk.z - center}]:
              </span>
            </div>
            <span className="font-semibold text-emerald-400">
              {Math.max(Math.abs(selectedChunk.z - center), Math.abs(selectedChunk.x - center)) <= tier.gridRadius
                ? "PROTECTED // FORCED LOADED"
                : "UNCLAIMED WILDERNESS"}
            </span>
          </div>
        </div>

        {/* Bottom Tier Selector Tabs */}
        <div className="pt-3 border-t border-white/[0.06] z-10">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-2">
            <span>SETTLEMENT SCALE TIER:</span>
            <span className="text-zinc-400">AUTOMATIC PROGRESSION EXPANSION</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {(["solo", "town", "confederation"] as ClaimTier[]).map((tId) => {
              const item = CLAIM_TIERS[tId];
              const isSelected = activeTier === tId;
              return (
                <button
                  key={tId}
                  onClick={() => setActiveTier(tId)}
                  className={`p-2.5 rounded-xl text-left font-mono transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                    isSelected
                      ? "bg-white text-black font-semibold shadow-lg shadow-white/5"
                      : "bg-white/[0.02] border border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.05] hover:border-white/[0.12]"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className={isSelected ? "text-zinc-800 font-bold" : "text-zinc-500"}>
                      {item.badge}
                    </span>
                    <span className={isSelected ? "text-zinc-900 font-medium" : "text-zinc-400"}>
                      {item.chunkCapacity} Chunks
                    </span>
                  </div>
                  <div className="text-xs truncate font-medium">
                    {item.name}
                  </div>
                  <div className={`text-[10px] mt-0.5 ${isSelected ? "text-zinc-700" : "text-zinc-500"}`}>
                    {item.maxCitizens}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Permission Switches & Sovereign Governance HUD (Right Column) */}
      <div className="lg:col-span-5 bg-[#0c0d12] border border-white/[0.08] rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block">
                {`${tier.badge} // OPENPARTIES & CLAIMS PROTOCOL`}
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mt-0.5">
                {tier.name}
              </h3>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] font-mono text-[11px] text-zinc-300">
              <Shield className="w-3 h-3 text-emerald-400" />
              <span>GRIEF-FREE</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-5">
            {tier.description}
          </p>

          {/* Core Metrics Strip */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
              <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-mono text-[10px] uppercase tracking-wider">Protected Chunks</span>
              </div>
              <span className="font-mono text-base font-semibold text-white">
                {tier.chunkCapacity} Chunks
              </span>
              <span className="font-mono text-[10px] text-zinc-500 block mt-0.5">
                {tier.territorySize}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
              <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                <Zap className="w-3.5 h-3.5 text-sky-400" />
                <span className="font-mono text-[10px] uppercase tracking-wider">Chunk Loading</span>
              </div>
              <span className="font-mono text-base font-semibold text-white">
                {tier.forcedLoadedChunks} Chunks
              </span>
              <span className="font-mono text-[10px] text-emerald-400 block mt-0.5">
                24/7 Factory Automation
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
              <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                <Users className="w-3.5 h-3.5 text-zinc-400" />
                <span className="font-mono text-[10px] uppercase tracking-wider">Party Roster</span>
              </div>
              <span className="font-mono text-xs font-semibold text-white">
                {tier.maxCitizens}
              </span>
              <span className="font-mono text-[10px] text-zinc-500 block mt-0.5">
                Shared Town Ranks
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
              <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-mono text-[10px] uppercase tracking-wider">Upkeep & Cost</span>
              </div>
              <span className="font-mono text-xs font-semibold text-emerald-400">
                100% Free Forever
              </span>
              <span className="font-mono text-[10px] text-zinc-500 block mt-0.5">
                No Rent / No Tax Drain
              </span>
            </div>
          </div>

          {/* Interactive Permission Switches Matrix */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] mb-5 space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.04]">
              <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-zinc-400" />
                Interactive Territory Permissions
              </span>
              <span className="font-mono text-[10px] text-emerald-400">LIVE SECURITY MATRIX</span>
            </div>

            {/* Switch 1: Build & Break */}
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-white">Build & Break Protection</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-white/[0.05] text-zinc-400">
                    ANTI-GRIEF
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-tight mt-0.5">
                  Restricts block placement, quarry digging, and TNT explosions to trusted party members.
                </p>
              </div>

              {/* Apple-grade tactile toggle switch */}
              <button
                type="button"
                onClick={() => togglePermission("buildBreak")}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 cursor-pointer shrink-0 focus:outline-none ${
                  permissions.buildBreak ? "bg-white" : "bg-white/10"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                    permissions.buildBreak
                      ? "translate-x-5 bg-black"
                      : "translate-x-0 bg-zinc-400"
                  }`}
                />
              </button>
            </div>

            {/* Switch 2: Storage & Chest Access */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/[0.04]">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-white">Storage & Chest Access</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-white/[0.05] text-zinc-400">
                    VAULT LOCK
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-tight mt-0.5">
                  Cryptographically seals iron chests, AE2 wireless terminals, and fluid storage tanks.
                </p>
              </div>

              <button
                type="button"
                onClick={() => togglePermission("storageAccess")}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 cursor-pointer shrink-0 focus:outline-none ${
                  permissions.storageAccess ? "bg-white" : "bg-white/10"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                    permissions.storageAccess
                      ? "translate-x-5 bg-black"
                      : "translate-x-0 bg-zinc-400"
                  }`}
                />
              </button>
            </div>

            {/* Switch 3: Redstone & Transit */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/[0.04]">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-white">Redstone & Transit Interlock</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-white/[0.05] text-zinc-400">
                    CREATE LOCK
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-tight mt-0.5">
                  Prevents non-citizens from boarding high-speed locomotives, flipping track switches, or toggling levers.
                </p>
              </div>

              <button
                type="button"
                onClick={() => togglePermission("redstoneTransit")}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 cursor-pointer shrink-0 focus:outline-none ${
                  permissions.redstoneTransit ? "bg-white" : "bg-white/10"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                    permissions.redstoneTransit
                      ? "translate-x-5 bg-black"
                      : "translate-x-0 bg-zinc-400"
                  }`}
                />
              </button>
            </div>

            {/* Switch 4: Visitor Whitelist */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/[0.04]">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-white">Public Visitor Whitelist</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-white/[0.05] text-zinc-400">
                    TRADE EMBASSY
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-tight mt-0.5">
                  Permits peaceful foreign travelers to traverse pedestrian avenues and browse player market stalls.
                </p>
              </div>

              <button
                type="button"
                onClick={() => togglePermission("visitorWhitelist")}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 cursor-pointer shrink-0 focus:outline-none ${
                  permissions.visitorWhitelist ? "bg-white" : "bg-white/10"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                    permissions.visitorWhitelist
                      ? "translate-x-5 bg-black"
                      : "translate-x-0 bg-zinc-400"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Security Guarantee Notice */}
          <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block">
                Deterministic Protection Guarantee
              </span>
              <p className="text-zinc-400 text-[11px] leading-relaxed mt-0.5">
                Creeper explosions, fire spread, Wither destruction, and offline player raids are deterministically mitigated server-side. Your builds remain permanent across months of play.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Spec */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>FRAMEWORK: OPENPARTIESANDCLAIMS (FABRIC)</span>
          <span className="text-zinc-400">AUTO-SAVED IN DALLAS CLUSTER</span>
        </div>
      </div>
    </div>
  );
}
