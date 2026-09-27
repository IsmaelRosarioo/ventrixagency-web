"use client";

import React, { useState, useMemo } from "react";
import { Search, Radio, Database, Server, Zap, Terminal } from "lucide-react";

interface StorageCell {
  id: number;
  label: string;
  type: string;
  bytesUsed: number;
  totalBytes: number;
  typesUsed: number;
  maxTypes: number;
  status: "nominal" | "io-active" | "near-full";
}

interface ItemEntry {
  id: string;
  name: string;
  category: "metals" | "crystalline" | "spacecraft" | "fluids";
  count: number;
  unit: string;
  bytes: number;
  iconColor: string;
}

const STORAGE_CELLS: StorageCell[] = [
  { id: 1, label: "DRIVE 01", type: "256K ME Storage Cell", bytesUsed: 218400, totalBytes: 262144, typesUsed: 61, maxTypes: 63, status: "near-full" },
  { id: 2, label: "DRIVE 02", type: "256K ME Storage Cell", bytesUsed: 142100, totalBytes: 262144, typesUsed: 44, maxTypes: 63, status: "io-active" },
  { id: 3, label: "DRIVE 03", type: "64K ME Storage Cell", bytesUsed: 52180, totalBytes: 65536, typesUsed: 38, maxTypes: 63, status: "nominal" },
  { id: 4, label: "DRIVE 04", type: "64K ME Storage Cell", bytesUsed: 48900, totalBytes: 65536, typesUsed: 52, maxTypes: 63, status: "nominal" },
  { id: 5, label: "DRIVE 05", type: "64K ME Storage Cell", bytesUsed: 31200, totalBytes: 65536, typesUsed: 29, maxTypes: 63, status: "nominal" },
  { id: 6, label: "DRIVE 06", type: "16K ME Storage Cell", bytesUsed: 12400, totalBytes: 16384, typesUsed: 18, maxTypes: 63, status: "nominal" },
  { id: 7, label: "DRIVE 07", type: "16K ME Fluid Cell", bytesUsed: 15200, totalBytes: 16384, typesUsed: 5, maxTypes: 5, status: "near-full" },
  { id: 8, label: "DRIVE 08", type: "Spatial Storage Cell (16³)", bytesUsed: 8192, totalBytes: 8192, typesUsed: 1, maxTypes: 1, status: "nominal" },
  { id: 9, label: "DRIVE 09", type: "256K ME Storage Cell", bytesUsed: 84300, totalBytes: 262144, typesUsed: 35, maxTypes: 63, status: "io-active" },
  { id: 10, label: "DRIVE 10", type: "256K ME Storage Cell", bytesUsed: 19800, totalBytes: 262144, typesUsed: 12, maxTypes: 63, status: "nominal" },
];

const INVENTORY_ITEMS: ItemEntry[] = [
  { id: "fluix", name: "Fluix Crystal", category: "crystalline", count: 48920, unit: "units", bytes: 39136, iconColor: "#818cf8" },
  { id: "pure-certus", name: "Pure Certus Quartz", category: "crystalline", count: 24150, unit: "units", bytes: 19320, iconColor: "#67e8f9" },
  { id: "desh", name: "Desh Ingot", category: "metals", count: 18420, unit: "ingots", bytes: 14736, iconColor: "#facc15" },
  { id: "ostrum", name: "Ostrum Ingot", category: "metals", count: 9840, unit: "ingots", bytes: 7872, iconColor: "#fb923c" },
  { id: "calorite", name: "Calorite Plate", category: "spacecraft", count: 4210, unit: "plates", bytes: 3368, iconColor: "#f87171" },
  { id: "calc-proc", name: "Calculation Processor", category: "crystalline", count: 6240, unit: "chips", bytes: 4992, iconColor: "#38bdf8" },
  { id: "netherite", name: "Netherite Ingot", category: "metals", count: 1240, unit: "ingots", bytes: 992, iconColor: "#71717a" },
  { id: "cryo-fuel", name: "Cryo-Coolant Gel", category: "fluids", count: 8500, unit: "mB", bytes: 6800, iconColor: "#22d3ee" },
  { id: "singularity", name: "Quantum Singularity", category: "spacecraft", count: 128, unit: "cores", bytes: 1024, iconColor: "#c084fc" },
  { id: "rocket-engine", name: "Tier 4 Heavy Thruster", category: "spacecraft", count: 16, unit: "engines", bytes: 128, iconColor: "#e4e4e7" },
];

// Channel definitions for the 32-channel dense Fluix smart cable
const DENSE_CHANNELS = [
  { ch: 1, name: "ME Crafting Terminal", load: "100%", type: "UI Interface" },
  { ch: 2, name: "Pattern Provider Alpha", load: "84%", type: "Automation" },
  { ch: 3, name: "Pattern Provider Beta", load: "78%", type: "Automation" },
  { ch: 4, name: "Molecular Assembler Array", load: "92%", type: "Fabrication" },
  { ch: 5, name: "Quantum Bridge (Luna Outpost)", load: "98%", type: "Interdimensional" },
  { ch: 6, name: "Quantum Bridge (Mars Station)", load: "95%", type: "Interdimensional" },
  { ch: 7, name: "Crafting CPU Core #1 (64k)", load: "45%", type: "Compute" },
  { ch: 8, name: "Crafting CPU Core #2 (64k)", load: "60%", type: "Compute" },
  { ch: 9, name: "ME Storage Bus [Ore Smeltery]", load: "88%", type: "Storage IO" },
  { ch: 10, name: "ME Storage Bus [Chemical Lab]", load: "42%", type: "Storage IO" },
  { ch: 11, name: "ME Export Bus [Rocket Fuel]", load: "70%", type: "Logistics" },
  { ch: 12, name: "ME Import Bus [Quarry Buffer]", load: "99%", type: "Logistics" },
  { ch: 13, name: "ME Fluid Interface [Cryo Tank]", load: "54%", type: "Fluids" },
  { ch: 14, name: "Spatial IO Port [Hangar]", load: "12%", type: "Spatial" },
  { ch: 15, name: "Energy Acceptor [Dallas Core]", load: "100%", type: "Power" },
  { ch: 16, name: "Dense Cable Backbone Bus 01", load: "80%", type: "Backbone" },
  { ch: 17, name: "Pattern Provider Gamma", load: "65%", type: "Automation" },
  { ch: 18, name: "Molecular Assembler Tier 2", load: "74%", type: "Fabrication" },
  { ch: 19, name: "Crafting CPU Core #3 (256k)", load: "30%", type: "Compute" },
  { ch: 20, name: "ME Level Emitter [Desh Stock]", load: "20%", type: "Monitoring" },
  { ch: 21, name: "ME Level Emitter [Calorite]", load: "25%", type: "Monitoring" },
  { ch: 22, name: "ME Interface [Create Train Hub]", load: "82%", type: "Inter-Mod IO" },
  { ch: 23, name: "ME Security Terminal", load: "10%", type: "Security" },
  { ch: 24, name: "Wireless Access Point (500m)", load: "68%", type: "Wireless" },
  // 25 - 32 are unallocated channels
  ...Array.from({ length: 8 }, (_, i) => ({
    ch: 25 + i,
    name: "Unallocated Fluix Fiber",
    load: "0%",
    type: "Available Bandwidth",
  })),
];

export function QuantumDriveBay() {
  const [selectedCellId, setSelectedCellId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredChannel, setHoveredChannel] = useState<number | null>(null);
  const [pulseActive, setPulseActive] = useState<boolean>(false);
  const [queryLog, setQueryLog] = useState<{ query: string; latency: string; bytes: number } | null>({
    query: "INITIALIZE // DALLAS ME CORE",
    latency: "0.08 ms",
    bytes: 48920,
  });

  const selectedCell = STORAGE_CELLS.find((c) => c.id === selectedCellId) || STORAGE_CELLS[0];

  // Filter items
  const filteredItems = useMemo(() => {
    return INVENTORY_ITEMS.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = activeCategory === "all" || item.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, activeCategory]);

  // Trigger simulated real-time query pulse
  const triggerQuery = (item: ItemEntry) => {
    setPulseActive(true);
    const latency = (0.04 + ((item.bytes % 13) + 3) / 200).toFixed(2);
    setQueryLog({
      query: `RETRIEVE // ${item.name.toUpperCase()}`,
      latency: `${latency} ms`,
      bytes: item.bytes,
    });
    setTimeout(() => {
      setPulseActive(false);
    }, 800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* 32-Channel Smart Cable & Digital Drive Bay Rack (Left Column) */}
      <div className="lg:col-span-7 bg-[#0c0d12] border border-white/[0.08] rounded-2xl p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden">
        {/* Top Channel Telemetry Header */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.06] mb-5">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${pulseActive ? "bg-cyan-400 animate-ping" : "bg-emerald-400 animate-pulse"}`} />
              <span className="font-mono text-[11px] text-zinc-300 uppercase tracking-wider">
                DENSE FLUIX CABLE BUS // 32 CHANNELS
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="text-zinc-500">ALLOCATION:</span>
              <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-white font-medium">
                24 / 32 ACTIVE (75%)
              </span>
            </div>
          </div>

          {/* 32-Channel Interactive Visual Grid */}
          <div className="mb-6 p-4 rounded-xl bg-black/60 border border-white/[0.06]">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-2.5">
              <span>FLUIX OPTICAL SMART STRANDS (CH 01 - CH 32)</span>
              <span>{hoveredChannel ? `INSPECTING CH ${hoveredChannel}` : "HOVER TO INSPECT"}</span>
            </div>

            <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5">
              {DENSE_CHANNELS.map((channel) => {
                const isActive = channel.ch <= 24;
                const isHovered = hoveredChannel === channel.ch;

                return (
                  <div
                    key={channel.ch}
                    onMouseEnter={() => setHoveredChannel(channel.ch)}
                    onMouseLeave={() => setHoveredChannel(null)}
                    className={`h-7 rounded flex flex-col items-center justify-center transition-all cursor-pointer border ${
                      isHovered
                        ? "bg-white text-black border-white shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                        : isActive
                        ? "bg-cyan-950/40 border-cyan-500/30 text-cyan-300 hover:border-cyan-400"
                        : "bg-white/[0.02] border-white/[0.04] text-zinc-600 hover:border-white/[0.15]"
                    }`}
                  >
                    <span className="font-mono text-[9px] font-bold">{channel.ch}</span>
                    <span
                      className={`w-1 h-1 rounded-full ${
                        isHovered ? "bg-black" : isActive ? "bg-cyan-400" : "bg-zinc-700"
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Hovered Channel Telemetry Popup Strip */}
            <div className="mt-3 pt-2 border-t border-white/[0.04] flex items-center justify-between text-[11px] font-mono">
              {hoveredChannel ? (
                <>
                  <span className="text-zinc-300 font-medium">
                    CH {hoveredChannel.toString().padStart(2, "0")}: {DENSE_CHANNELS[hoveredChannel - 1].name}
                  </span>
                  <span className="text-cyan-400 font-mono">
                    {`TYPE: ${DENSE_CHANNELS[hoveredChannel - 1].type} // LOAD: ${DENSE_CHANNELS[hoveredChannel - 1].load}`}
                  </span>
                </>
              ) : (
                <>
                  <span className="text-zinc-500">Backbone: 32 Channels Dense Fluix Smart Cable</span>
                  <span className="text-emerald-400">Zero Channel Bottleneck</span>
                </>
              )}
            </div>
          </div>

          {/* ME DRIVE BAY RACK (10 Hot-Swap Slots) */}
          <div className="mb-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-2">
              <span className="flex items-center gap-1.5">
                <Server className="w-3 h-3 text-zinc-400" />
                CRYSTALLINE STORAGE DRIVE BAY RACK // 10 SLOTS
              </span>
              <span>CLICK DRIVE TO INSPECT</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {STORAGE_CELLS.map((cell) => {
                const isSelected = selectedCellId === cell.id;
                const fillPercent = Math.round((cell.bytesUsed / cell.totalBytes) * 100);

                return (
                  <button
                    key={cell.id}
                    onClick={() => setSelectedCellId(cell.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#141822] border-white/30 shadow-lg text-white"
                        : "bg-black/40 border-white/[0.06] hover:bg-white/[0.03] text-zinc-400"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[9px] font-semibold text-zinc-300">{cell.label}</span>
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          cell.status === "near-full"
                            ? "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.8)]"
                            : cell.status === "io-active"
                            ? "bg-cyan-400 animate-ping shadow-[0_0_6px_rgba(34,211,238,0.8)]"
                            : "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]"
                        }`}
                      />
                    </div>

                    <div className="font-mono text-[10px] text-zinc-200 font-medium truncate mb-1">
                      {cell.type.replace("ME Storage Cell", "").replace("ME Fluid Cell", "Fluid")}
                    </div>

                    <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          fillPercent > 80 ? "bg-amber-400" : "bg-white"
                        }`}
                        style={{ width: `${fillPercent}%` }}
                      />
                    </div>

                    <div className="flex justify-between items-center text-[8px] font-mono text-zinc-500 mt-1">
                      <span>{fillPercent}%</span>
                      <span>{cell.typesUsed}/{cell.maxTypes} T</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Drive Telemetry Bar */}
        <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between text-xs font-mono gap-2">
          <div className="flex items-center gap-2">
            <Database className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-zinc-300 font-medium">{selectedCell.label}: {selectedCell.type}</span>
          </div>
          <div className="flex items-center gap-3 text-zinc-400 text-[11px]">
            <span>BYTES: {selectedCell.bytesUsed.toLocaleString()} / {selectedCell.totalBytes.toLocaleString()}</span>
            <span>TYPES: {selectedCell.typesUsed}/{selectedCell.maxTypes}</span>
          </div>
        </div>
      </div>

      {/* Terminal Real-Time Query Simulation (Right Column) */}
      <div className="lg:col-span-5 bg-[#0c0d12] border border-white/[0.08] rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block">
                APPLIED ENERGISTICS 2 // OPTICAL BUS
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mt-0.5">
                Crystalline ME Terminal
              </h3>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] font-mono text-[11px] text-zinc-300">
              <Zap className="w-3 h-3 text-cyan-400" />
              <span>184.2 AE/t</span>
            </div>
          </div>

          {/* Interactive Search Bar */}
          <div className="relative mb-3">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ME crystalline network..."
              className="w-full bg-black/60 border border-white/[0.08] focus:border-white/30 rounded-xl pl-9 pr-4 py-2 text-xs font-mono text-white placeholder-zinc-600 focus:outline-none transition-colors"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1 mb-4">
            {["all", "metals", "crystalline", "spacecraft", "fluids"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-2.5 py-1 rounded-md font-mono text-[10px] uppercase transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-white text-black font-semibold"
                    : "bg-white/[0.02] border border-white/[0.06] text-zinc-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Interactive Item Inventory Matrix */}
          <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1 mb-4">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                onClick={() => triggerQuery(item)}
                className="w-full p-2 rounded-lg bg-black/40 hover:bg-white/[0.04] border border-white/[0.04] hover:border-white/[0.12] flex items-center justify-between transition-all cursor-pointer group text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full group-hover:scale-125 transition-transform"
                    style={{ backgroundColor: item.iconColor }}
                  />
                  <div>
                    <span className="text-xs font-medium text-white group-hover:text-cyan-300 transition-colors">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 block">
                      {item.bytes.toLocaleString()} Bytes Allocated
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-xs font-semibold text-zinc-200">
                    {item.count.toLocaleString()}
                  </span>
                  <span className="text-[9px] text-zinc-500 block">{item.unit}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Real-time Query Latency Monitor */}
          {queryLog && (
            <div className="p-3 rounded-xl bg-black/70 border border-white/[0.06] font-mono text-xs space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-cyan-400" />
                  OPTICAL BUS TRANSACTION
                </span>
                <span className="text-emerald-400 font-semibold">{queryLog.latency}</span>
              </div>
              <div className="text-white text-[11px] font-medium truncate">
                {queryLog.query}
              </div>
              <div className="flex justify-between text-[10px] text-zinc-400">
                <span>Data Volume: {queryLog.bytes.toLocaleString()} Bytes</span>
                <span className="text-cyan-400">Deterministic Dematerialization</span>
              </div>
            </div>
          )}
        </div>

        {/* Quantum Singularity Link Status */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-500">QUANTUM LINK:</span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            DALLAS CORE // INTERPLANETARY ENTANGLED
          </span>
        </div>
      </div>
    </div>
  );
}
