"use client";

import React, { useState, useEffect } from "react";
import {
  Train,
  MapPin,
  Clock,
  Gauge,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Box,
  CheckCircle2,
  Radio,
} from "lucide-react";

export interface RailwayRoute {
  id: string;
  name: string;
  code: string;
  origin: {
    name: string;
    code: string;
    coords: string;
    type: string;
  };
  destination: {
    name: string;
    code: string;
    coords: string;
    type: string;
  };
  distanceBlocks: number;
  durationFormatted: string;
  trainSpeed: string;
  frequency: string;
  trainClass: string;
  cargoCapacity: number; // percentage
  cargoManifest: string[];
  cargoType: string;
  signalBlocks: number;
  signalStatus: "CLEAR" | "CAUTION" | "OCCUPIED";
  platform: string;
  departureCountdownInitial: number; // in seconds
  elevationDelta: string;
  pathCoordinates: { x1: number; y1: number; cx: number; cy: number; x2: number; y2: number };
}

export const RAIL_ROUTES: RailwayRoute[] = [
  {
    id: "central-mesa",
    name: "Line 01 // Aurelia Transcontinental Express",
    code: "EXP-01",
    origin: {
      name: "Central Spaceport Hub",
      code: "CSP",
      coords: "X: 0 // Y: 72 // Z: 0",
      type: "Orbital Launch Facility & Rail Terminal",
    },
    destination: {
      name: "Northern Mesa Outpost",
      code: "NMO",
      coords: "X: +4,280 // Y: 128 // Z: -1,920",
      type: "Terralith Badlands Heavy Quarry",
    },
    distanceBlocks: 4691,
    durationFormatted: "1m 44s",
    trainSpeed: "45.0 m/s (162 km/h)",
    frequency: "Every 3.5 min",
    trainClass: "Mark IV Superheated Steam Bogie",
    cargoCapacity: 94,
    cargoManifest: [
      "Smelted Desh Ingots (64 stacks)",
      "High-Density Terracotta",
      "Brass Mechanism Casing",
      "Cryogenic Gas Canisters",
    ],
    cargoType: "Automated Ore Hopper & Fluid Vaults",
    signalBlocks: 48,
    signalStatus: "CLEAR",
    platform: "Platform 01 // Northbound Rapid",
    departureCountdownInitial: 42,
    elevationDelta: "+56m (Y: 72 -> Y: 128)",
    pathCoordinates: { x1: 250, y1: 250, cx: 320, cy: 150, x2: 400, y2: 90 },
  },
  {
    id: "central-fjord",
    name: "Line 02 // Borealis High-Latitude Corridor",
    code: "BOR-02",
    origin: {
      name: "Central Spaceport Hub",
      code: "CSP",
      coords: "X: 0 // Y: 72 // Z: 0",
      type: "Orbital Launch Facility & Rail Terminal",
    },
    destination: {
      name: "Glacial Fjord Terminal",
      code: "GFT",
      coords: "X: -3,640 // Y: 84 // Z: +5,120",
      type: "Maritime Permafrost Research Depot",
    },
    distanceBlocks: 6282,
    durationFormatted: "2m 19s",
    trainSpeed: "45.0 m/s (162 km/h)",
    frequency: "Every 5.0 min",
    trainClass: "Borealis Heavy-Duty Double-Bogie Engine",
    cargoCapacity: 98,
    cargoManifest: [
      "Liquid Oxygen Fluid (64,000 mB)",
      "Packed Glacial Ice Matrices",
      "Permafrost Titanium Plating",
      "Biological Specimen Pods",
    ],
    cargoType: "Pressurized Hermetic Cryo-Tankers",
    signalBlocks: 64,
    signalStatus: "CLEAR",
    platform: "Platform 03 // Deep North Track",
    departureCountdownInitial: 78,
    elevationDelta: "+12m (Y: 72 -> Y: 84)",
    pathCoordinates: { x1: 250, y1: 250, cx: 160, cy: 330, x2: 90, y2: 410 },
  },
  {
    id: "central-caverns",
    name: "Line 03 // Abyssal Subterranean Freight",
    code: "ABY-03",
    origin: {
      name: "Central Spaceport Hub",
      code: "CSP",
      coords: "X: 0 // Y: 72 // Z: 0",
      type: "Orbital Launch Facility & Rail Terminal",
    },
    destination: {
      name: "Deep Caverns Freight Depot",
      code: "DCF",
      coords: "X: +1,840 // Y: -42 // Z: +3,310",
      type: "Sub-crust Bedrock Excavation Complex",
    },
    distanceBlocks: 3788,
    durationFormatted: "1m 24s",
    trainSpeed: "45.0 m/s (162 km/h)",
    frequency: "Continuous Automated Loop",
    trainClass: "Invar-Armored Geothermal Locomotive",
    cargoCapacity: 88,
    cargoManifest: [
      "Raw Deepslate Diamond Ores",
      "Ancient Debris Ingot Casks",
      "Redstone Flux Generators",
      "Lava Vault Thermocouples",
    ],
    cargoType: "Reinforced Blast-Proof Container Fleet",
    signalBlocks: 36,
    signalStatus: "CLEAR",
    platform: "Sub-Level -04 // Heavy Shunt Track",
    departureCountdownInitial: 19,
    elevationDelta: "-114m Incline (Y: 72 -> Y: -42)",
    pathCoordinates: { x1: 250, y1: 250, cx: 330, cy: 300, x2: 380, y2: 390 },
  },
  {
    id: "mesa-fjord",
    name: "Line 04 // Frontier Rimland Circumferential",
    code: "FRC-04",
    origin: {
      name: "Northern Mesa Outpost",
      code: "NMO",
      coords: "X: +4,280 // Y: 128 // Z: -1,920",
      type: "Terralith Badlands Heavy Quarry",
    },
    destination: {
      name: "Glacial Fjord Terminal",
      code: "GFT",
      coords: "X: -3,640 // Y: 84 // Z: +5,120",
      type: "Maritime Permafrost Research Depot",
    },
    distanceBlocks: 10578,
    durationFormatted: "3m 55s",
    trainSpeed: "45.0 m/s (162 km/h)",
    frequency: "Every 8.0 min",
    trainClass: "Long-Range Brass Courier Locomotive",
    cargoCapacity: 76,
    cargoManifest: [
      "Modular Colonist Sleeper Cars",
      "Agricultural Terrarium Crates",
      "Solar Panel Array Assemblies",
      "Bulk Steam Coal Bunkers",
    ],
    cargoType: "Multi-Unit Passenger & Cargo Hybrid",
    signalBlocks: 108,
    signalStatus: "CLEAR",
    platform: "Platform 02 // Continental Shunt",
    departureCountdownInitial: 145,
    elevationDelta: "-44m (Y: 128 -> Y: 84)",
    pathCoordinates: { x1: 400, y1: 90, cx: 210, cy: 220, x2: 90, y2: 410 },
  },
];

export function ContinentalRailways() {
  const [selectedRouteId, setSelectedRouteId] = useState<string>("central-mesa");
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [trainProgress, setTrainProgress] = useState<number>(0.28);
  const [countdown, setCountdown] = useState<number>(42);
  const [dispatchFlash, setDispatchFlash] = useState<boolean>(false);

  const activeRoute =
    RAIL_ROUTES.find((r) => r.id === selectedRouteId) || RAIL_ROUTES[0];

  const handleSelectRoute = (routeId: string) => {
    setSelectedRouteId(routeId);
    const route = RAIL_ROUTES.find((r) => r.id === routeId);
    if (route) {
      setCountdown(route.departureCountdownInitial);
      setTrainProgress(0.15);
    }
  };

  // Train position loop along SVG path
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setTrainProgress((prev) => {
        const next = prev + 0.008;
        return next > 1 ? 0 : next;
      });

      setCountdown((prev) => (prev > 1 ? prev - 1 : activeRoute.departureCountdownInitial));
    }, 100);

    return () => clearInterval(interval);
  }, [isSimulating, activeRoute.departureCountdownInitial]);

  const handleManualDispatch = () => {
    setDispatchFlash(true);
    setTrainProgress(0);
    setCountdown(activeRoute.departureCountdownInitial);
    setTimeout(() => {
      setDispatchFlash(false);
    }, 1400);
  };

  // Interpolate along the quadratic bezier curve
  const { x1, y1, cx, cy, x2, y2 } = activeRoute.pathCoordinates;
  const t = trainProgress;
  const trainX = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2;
  const trainY = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Schematic Map & Dispatch Canvas (Left Column) */}
      <div className="lg:col-span-7 bg-[#0c0d12] border border-white/[0.08] rounded-2xl p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden">
        {/* Top Dispatch Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.06] mb-3 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] text-zinc-300 uppercase tracking-wider">
              CONTINENTAL TRANSIT DISPATCH // CREATE TRAINS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className="px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] font-mono text-[10px] text-zinc-300 uppercase transition-colors cursor-pointer select-none active:scale-[0.98]"
            >
              {isSimulating ? "Hold Signals" : "Release Signals"}
            </button>
            <button
              onClick={handleManualDispatch}
              className="px-2.5 py-1 rounded bg-white text-black hover:bg-zinc-200 font-mono text-[10px] uppercase font-semibold transition-all duration-200 cursor-pointer select-none active:scale-[0.98] shadow-sm flex items-center gap-1.5"
            >
              <Zap className="w-3 h-3 text-black fill-black" />
              Dispatch Locomotive
            </button>
          </div>
        </div>

        {/* Dispatch Alert Banner */}
        {dispatchFlash && (
          <div className="absolute top-16 left-6 right-6 z-20 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs flex items-center justify-between animate-fadeIn">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              HIGH-SPEED DEPARTURE AUTHORIZED // OPTICAL SIGNAL INTERLOCK ACQUIRED
            </span>
            <span className="text-[10px] uppercase">TICKS SYNCED</span>
          </div>
        )}

        {/* SVG Railway Schematic */}
        <div className="relative w-full aspect-square max-h-[460px] mx-auto flex items-center justify-center my-2">
          <svg
            viewBox="0 0 500 500"
            className="w-full h-full select-none"
            style={{ filter: "drop-shadow(0 0 35px rgba(0,0,0,0.85))" }}
          >
            <defs>
              {/* Active Route Gradient */}
              <linearGradient id="active-rail-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#ffffff" />
              </linearGradient>

              {/* Sub-crust Gradient */}
              <linearGradient id="abyssal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>

              {/* Glow Filter */}
              <filter id="rail-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Background Grid Coordinates */}
            <line x1="250" y1="20" x2="250" y2="480" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3 4" />
            <line x1="20" y1="250" x2="480" y2="250" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3 4" />
            <circle cx="250" cy="250" r="160" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" strokeDasharray="2 6" />
            <circle cx="250" cy="250" r="230" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="1" />

            {/* Inactive Corridor Lines */}
            {RAIL_ROUTES.map((route) => {
              const isActive = route.id === selectedRouteId;
              const { x1: rx1, y1: ry1, cx: rcx, cy: rcy, x2: rx2, y2: ry2 } = route.pathCoordinates;

              return (
                <g key={`track-bg-${route.id}`}>
                  {/* Outer Bed Ties */}
                  <path
                    d={`M ${rx1} ${ry1} Q ${rcx} ${rcy} ${rx2} ${ry2}`}
                    fill="none"
                    stroke={isActive ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.04)"}
                    strokeWidth={isActive ? "8" : "4"}
                    strokeDasharray={isActive ? "2 6" : "2 8"}
                    className="transition-all duration-300"
                  />
                  {/* Steel Rails */}
                  <path
                    d={`M ${rx1} ${ry1} Q ${rcx} ${rcy} ${rx2} ${ry2}`}
                    fill="none"
                    stroke={isActive ? "url(#active-rail-gradient)" : "rgba(255,255,255,0.12)"}
                    strokeWidth={isActive ? "2.5" : "1.2"}
                    filter={isActive ? "url(#rail-glow)" : undefined}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}

            {/* Dynamic Signal Gate Markers Along Active Track */}
            {[0.25, 0.5, 0.75].map((fraction, idx) => {
              const sx = (1 - fraction) * (1 - fraction) * x1 + 2 * (1 - fraction) * fraction * cx + fraction * fraction * x2;
              const sy = (1 - fraction) * (1 - fraction) * y1 + 2 * (1 - fraction) * fraction * cy + fraction * fraction * y2;
              return (
                <g key={`signal-post-${idx}`}>
                  <circle cx={sx} cy={sy} r="3" fill="#10b981" />
                  <circle cx={sx} cy={sy} r="5" fill="none" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="0.8" />
                </g>
              );
            })}

            {/* Real-Time Animated Train Locomotive & Carriages */}
            <g
              transform={`translate(${trainX}, ${trainY})`}
              className="transition-transform duration-75"
            >
              {/* Outer Locomotive Pulse Ring */}
              <circle
                r="14"
                fill="none"
                stroke="rgba(255, 255, 255, 0.4)"
                strokeWidth="1.2"
                strokeDasharray="2 3"
                className="animate-spin"
                style={{ animationDuration: "6s" }}
              />

              {/* Locomotive Chassis Body */}
              <circle r="7.5" fill="#ffffff" filter="url(#rail-glow)" />
              <circle r="4" fill="#0c0d12" />

              {/* Forward Headlight Cone */}
              <polygon
                points="0,0 22,-8 22,8"
                fill="rgba(255,255,255,0.22)"
                className="pointer-events-none"
              />

              {/* Telemetry Tag */}
              <rect
                x="-26"
                y="-24"
                width="52"
                height="13"
                rx="3"
                fill="#050608"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="0.8"
              />
              <text
                x="0"
                y="-15"
                textAnchor="middle"
                fontSize="6.5"
                fontFamily="monospace"
                fill="#ffffff"
                fontWeight="bold"
              >
                {`${activeRoute.code} // 45m/s`}
              </text>
            </g>

            {/* Station Terminal Nodes */}
            {/* 1. Central Spaceport Hub (Origin) */}
            <g
              transform="translate(250, 250)"
              onClick={() => handleSelectRoute("central-mesa")}
              className="cursor-pointer group"
            >
              <circle r="24" fill="transparent" />
              <circle r="14" fill="#0c0d12" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
              <circle r="6" fill="#38bdf8" />
              <text
                x="0"
                y="26"
                textAnchor="middle"
                fontSize="7.5"
                fontFamily="monospace"
                fill="#ffffff"
                fontWeight="600"
                className="uppercase tracking-wider"
              >
                Central Spaceport
              </text>
              <text
                x="0"
                y="34"
                textAnchor="middle"
                fontSize="6"
                fontFamily="monospace"
                fill="#71717a"
              >
                {"[0, 0, 72] // CSP-HUB"}
              </text>
            </g>

            {/* 2. Northern Mesa Outpost */}
            <g
              transform="translate(400, 90)"
              onClick={() => handleSelectRoute("central-mesa")}
              className="cursor-pointer group"
            >
              <circle r="22" fill="transparent" />
              <circle
                r="11"
                fill="#0c0d12"
                stroke={selectedRouteId === "central-mesa" || selectedRouteId === "mesa-fjord" ? "#ffffff" : "rgba(255,255,255,0.25)"}
                strokeWidth={selectedRouteId === "central-mesa" ? "2" : "1"}
              />
              <circle r="4.5" fill="#f59e0b" />
              <text
                x="0"
                y="-17"
                textAnchor="middle"
                fontSize="7.5"
                fontFamily="monospace"
                fill="#ffffff"
                fontWeight="600"
                className="uppercase tracking-wider"
              >
                Northern Mesa Outpost
              </text>
              <text
                x="0"
                y="-9"
                textAnchor="middle"
                fontSize="6"
                fontFamily="monospace"
                fill="#71717a"
              >
                {"[+4280, -1920] // NMO-QUARRY"}
              </text>
            </g>

            {/* 3. Glacial Fjord Terminal */}
            <g
              transform="translate(90, 410)"
              onClick={() => handleSelectRoute("central-fjord")}
              className="cursor-pointer group"
            >
              <circle r="22" fill="transparent" />
              <circle
                r="11"
                fill="#0c0d12"
                stroke={selectedRouteId === "central-fjord" || selectedRouteId === "mesa-fjord" ? "#ffffff" : "rgba(255,255,255,0.25)"}
                strokeWidth={selectedRouteId === "central-fjord" ? "2" : "1"}
              />
              <circle r="4.5" fill="#67e8f9" />
              <text
                x="0"
                y="22"
                textAnchor="middle"
                fontSize="7.5"
                fontFamily="monospace"
                fill="#ffffff"
                fontWeight="600"
                className="uppercase tracking-wider"
              >
                Glacial Fjord Terminal
              </text>
              <text
                x="0"
                y="30"
                textAnchor="middle"
                fontSize="6"
                fontFamily="monospace"
                fill="#71717a"
              >
                {"[-3640, +5120] // GFT-COAST"}
              </text>
            </g>

            {/* 4. Deep Caverns Freight Depot */}
            <g
              transform="translate(380, 390)"
              onClick={() => handleSelectRoute("central-caverns")}
              className="cursor-pointer group"
            >
              <circle r="22" fill="transparent" />
              <circle
                r="11"
                fill="#0c0d12"
                stroke={selectedRouteId === "central-caverns" ? "#ffffff" : "rgba(255,255,255,0.25)"}
                strokeWidth={selectedRouteId === "central-caverns" ? "2" : "1"}
              />
              <circle r="4.5" fill="#ec4899" />
              <text
                x="0"
                y="22"
                textAnchor="middle"
                fontSize="7.5"
                fontFamily="monospace"
                fill="#ffffff"
                fontWeight="600"
                className="uppercase tracking-wider"
              >
                Deep Caverns Freight
              </text>
              <text
                x="0"
                y="30"
                textAnchor="middle"
                fontSize="6"
                fontFamily="monospace"
                fill="#71717a"
              >
                {"[+1840, +3310, Y:-42] // DCF-MINING"}
              </text>
            </g>
          </svg>
        </div>

        {/* Bottom Route Selector Bar */}
        <div className="pt-3 border-t border-white/[0.06] z-10">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-2">
            <span>SELECT TRANSIT CORRIDOR:</span>
            <span className="text-zinc-400">CREATE SUB-TICK SCHEDULER</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {RAIL_ROUTES.map((route) => {
              const isSelected = route.id === selectedRouteId;
              return (
                <button
                  key={route.id}
                  onClick={() => handleSelectRoute(route.id)}
                  className={`p-2.5 rounded-xl text-left font-mono transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                    isSelected
                      ? "bg-white text-black font-semibold shadow-lg shadow-white/5"
                      : "bg-white/[0.02] border border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.05] hover:border-white/[0.12]"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className={isSelected ? "text-zinc-800 font-bold" : "text-zinc-500"}>
                      {route.code}
                    </span>
                    <span className={isSelected ? "text-emerald-700 font-semibold" : "text-emerald-400"}>
                      {route.signalStatus}
                    </span>
                  </div>
                  <div className="text-xs truncate font-medium">
                    {route.destination.name.replace(" Terminal", "").replace(" Outpost", "").replace(" Depot", "")}
                  </div>
                  <div className={`text-[10px] mt-0.5 ${isSelected ? "text-zinc-700" : "text-zinc-500"}`}>
                    {route.distanceBlocks.toLocaleString()} blk // {route.durationFormatted}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Telemetry & Cargo Manifest Dispatch HUD (Right Column) */}
      <div className="lg:col-span-5 bg-[#0c0d12] border border-white/[0.08] rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block">
                {`${activeRoute.code} // AUTOMATED FREIGHT & PASSENGER`}
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mt-0.5">
                {activeRoute.name}
              </h3>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] font-mono text-[11px] text-zinc-300">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span>ACTIVE</span>
            </div>
          </div>

          {/* Route Vectors Origin -> Destination Banner */}
          <div className="p-4 rounded-xl bg-black/60 border border-white/[0.06] mb-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                <span className="font-mono text-xs font-medium text-white">
                  {activeRoute.origin.code} ({activeRoute.origin.name})
                </span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-mono text-xs font-medium text-white">
                  {activeRoute.destination.code} ({activeRoute.destination.name})
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-400 pt-2 border-t border-white/[0.04]">
              <div>
                <span className="text-zinc-600 block">ORIGIN TELEMETRY</span>
                <span className="text-zinc-300">{activeRoute.origin.coords}</span>
              </div>
              <div>
                <span className="text-zinc-600 block">DESTINATION TELEMETRY</span>
                <span className="text-zinc-300">{activeRoute.destination.coords}</span>
              </div>
            </div>
          </div>

          {/* Four Core Metric Cards */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
              <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                <Gauge className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] uppercase tracking-wider">Track Distance</span>
              </div>
              <span className="font-mono text-sm sm:text-base font-semibold text-white">
                {activeRoute.distanceBlocks.toLocaleString()} Blocks
              </span>
              <span className="font-mono text-[10px] text-zinc-500 block mt-0.5">
                {activeRoute.elevationDelta}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
              <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] uppercase tracking-wider">Transit Time</span>
              </div>
              <span className="font-mono text-sm sm:text-base font-semibold text-white">
                {activeRoute.durationFormatted}
              </span>
              <span className="font-mono text-[10px] text-zinc-500 block mt-0.5">
                Top Speed: 45.0 m/s
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
              <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                <Train className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] uppercase tracking-wider">Locomotive Class</span>
              </div>
              <span className="font-mono text-xs font-medium text-zinc-200 line-clamp-1">
                {activeRoute.trainClass}
              </span>
              <span className="font-mono text-[10px] text-emerald-400 block mt-0.5">
                Automatic Schedule Table
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06]">
              <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                <Radio className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] uppercase tracking-wider">Next Dispatch</span>
              </div>
              <span className="font-mono text-sm sm:text-base font-semibold text-white">
                00:{countdown < 10 ? `0${countdown}` : countdown}
              </span>
              <span className="font-mono text-[10px] text-zinc-500 block mt-0.5">
                {activeRoute.frequency}
              </span>
            </div>
          </div>

          {/* Automated Cargo Load Status */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] mb-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Box className="w-3.5 h-3.5 text-zinc-400" />
                <span className="font-mono text-xs font-medium text-white">
                  Cargo Capacity // {activeRoute.cargoType}
                </span>
              </div>
              <span className="font-mono text-xs font-semibold text-emerald-400">
                {activeRoute.cargoCapacity}% FULL
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-sky-400 rounded-full transition-all duration-500"
                style={{ width: `${activeRoute.cargoCapacity}%` }}
              />
            </div>

            {/* Manifest tags */}
            <div className="flex flex-wrap gap-1.5">
              {activeRoute.cargoManifest.map((item, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-zinc-300 font-mono text-[10px]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Sub-tick Collision Mitigation Shield */}
          <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block">
                Collision-Mitigated Signaling Guarantee
              </span>
              <p className="text-zinc-400 text-[11px] leading-relaxed mt-0.5">
                {activeRoute.signalBlocks} optical track block observers synchronized with Dallas Core tick loops. Trains automatically decelerate if an ahead section is occupied, preventing runaway collisions.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Hardware Spec */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>SPEC: CREATE 0.5.1 RAIL INFRASTRUCTURE</span>
          <span className="text-zinc-400">BOGIE CURVATURE: ZERO DERAILEMENT</span>
        </div>
      </div>
    </div>
  );
}
