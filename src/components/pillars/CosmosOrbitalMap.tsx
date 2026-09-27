"use client";

import React, { useState, useEffect } from "react";
import { Activity, Compass, Shield } from "lucide-react";

export interface CelestialBody {
  id: string;
  name: string;
  system: string;
  tier: string;
  orbitRadius: number; // in SVG units
  baseSpeed: number; // orbital period factor
  size: number;
  color: string;
  glowColor: string;
  gravity: string;
  atmosphere: string;
  hazard: string;
  distanceFromEarth: string;
  deltaV: string;
  keyMinerals: string[];
  description: string;
  coordinates: { x: string; y: string; z: string };
  launchWindow: string;
}

export const CELESTIAL_BODIES: CelestialBody[] = [
  {
    id: "moon",
    name: "The Moon (Luna)",
    system: "Earth-Moon System",
    tier: "Tier 1 Rocket",
    orbitRadius: 92,
    baseSpeed: 0.9,
    size: 7,
    color: "#d4d4d8",
    glowColor: "rgba(212, 212, 216, 0.4)",
    gravity: "0.166g (Low Gravity)",
    atmosphere: "100% Vacuum (Oxygen Required)",
    hazard: "Extreme Freezing Lunar Nights",
    distanceFromEarth: "384,400 km",
    deltaV: "2,840 m/s",
    keyMinerals: ["Desh Ore", "Cheese Ore", "Moon Stone", "Basalt"],
    description: "The primary proving ground. Establish pressurized surface domes, explore Lunarian subterranean ruins, and smelt Desh ingots for deep-space propulsion stages.",
    coordinates: { x: "+0.0026 AU", y: "-0.0008 AU", z: "+0.0001 AU" },
    launchWindow: "Continuous // Open Every 27.3 Earth Days",
  },
  {
    id: "mars",
    name: "Mars",
    system: "Inner Solar System",
    tier: "Tier 2 Rocket",
    orbitRadius: 136,
    baseSpeed: 0.55,
    size: 8.5,
    color: "#e06c4b",
    glowColor: "rgba(224, 108, 75, 0.45)",
    gravity: "0.380g",
    atmosphere: "Toxic Carbon Dioxide (0.006 atm)",
    hazard: "Ferrous Dust Storms & Martian Crypts",
    distanceFromEarth: "78,340,000 km",
    deltaV: "4,120 m/s",
    keyMinerals: ["Ostrum Ore", "Mars Iron", "Sub-surface Ice", "Red Sand"],
    description: "Expansive rust-red canyon plateaus. Deploy pressurized rovers, excavate underground pyramidal dungeons, and extract Ostrum for heavy rocketry engines.",
    coordinates: { x: "+0.5241 AU", y: "+0.1892 AU", z: "-0.0418 AU" },
    launchWindow: "Optimal Window Open // Phase Angle +44.2°",
  },
  {
    id: "venus",
    name: "Venus",
    system: "Inner Solar System",
    tier: "Tier 3 Rocket",
    orbitRadius: 174,
    baseSpeed: 0.75,
    size: 9,
    color: "#eab308",
    glowColor: "rgba(234, 179, 8, 0.4)",
    gravity: "0.904g",
    atmosphere: "Supercritical Acid Vapor (92 atm)",
    hazard: "Thermal Compression & Basalt Magma",
    distanceFromEarth: "41,400,000 km",
    deltaV: "5,860 m/s",
    keyMinerals: ["Calorite Ore", "Venus Gold", "Sulfur", "Volcanic Ash"],
    description: "A hostile planetary pressure vessel. Requires high-temp Netherite thermal space suits and acid-resistant rovers to mine Calorite from volcanic geysers.",
    coordinates: { x: "-0.2810 AU", y: "-0.4190 AU", z: "+0.0210 AU" },
    launchWindow: "Phase Alignment In 18h 40m",
  },
  {
    id: "mercury",
    name: "Mercury",
    system: "Proximal Solar Orbit",
    tier: "Tier 3 Rocket",
    orbitRadius: 58,
    baseSpeed: 1.4,
    size: 6,
    color: "#a1a1aa",
    glowColor: "rgba(161, 161, 170, 0.4)",
    gravity: "0.380g",
    atmosphere: "Solar Vacuum (Trace Sodium)",
    hazard: "Extreme Solar Radiation (+430°C / -180°C)",
    distanceFromEarth: "91,700,000 km",
    deltaV: "7,400 m/s",
    keyMinerals: ["Solar Crystals", "Calorite", "Pure Iron", "Refractory Carbon"],
    description: "Proximal solar orbit. Build orbital beam collectors that capture uninterrupted, high-yield solar energy with zero day-night disruption.",
    coordinates: { x: "+0.3871 AU", y: "-0.0921 AU", z: "+0.0529 AU" },
    launchWindow: "Solar Clearance Synchronized",
  },
  {
    id: "glacio",
    name: "Glacio",
    system: "Extrasolar Cryo-System",
    tier: "Tier 4 Deep Space",
    orbitRadius: 216,
    baseSpeed: 0.32,
    size: 11,
    color: "#67e8f9",
    glowColor: "rgba(103, 232, 249, 0.45)",
    gravity: "1.120g (High Gravity)",
    atmosphere: "Thin Oxygen (Breathable in Low Valleys)",
    hazard: "Glacial Permafrost & Alien Megafauna",
    distanceFromEarth: "4.24 Light Years (Hyper-jump)",
    deltaV: "14,800 m/s (Interstellar)",
    keyMinerals: ["Permafrost Steel", "Glacio Ice", "Calorite", "Ancient Monolith Ore"],
    description: "An extrasolar terrestrial body in a distant star system. Home to alien megafauna, frozen primordial forests, and ancient monolith structures.",
    coordinates: { x: "+14.892 LY", y: "-3.109 LY", z: "+8.023 LY" },
    launchWindow: "Hyperdrive Warp Vector Locked",
  },
];

export function CosmosOrbitalMap() {
  const [selectedId, setSelectedId] = useState<string>("moon");
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [time, setTime] = useState<number>(0);
  const [transitAnimationActive, setTransitAnimationActive] = useState<boolean>(false);

  const selectedBody = CELESTIAL_BODIES.find((b) => b.id === selectedId) || CELESTIAL_BODIES[0];

  // Orbital progression timer
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setTime((prev) => (prev + 0.5) % 3600);
    }, 50);
    return () => clearInterval(interval);
  }, [isSimulating]);

  // Trigger launch trajectory pulse
  const triggerTrajectoryLaunch = () => {
    setTransitAnimationActive(true);
    setTimeout(() => {
      setTransitAnimationActive(false);
    }, 2400);
  };

  // Center coordinate of SVG map
  const cx = 250;
  const cy = 250;

  // Earth coordinates (orbital radius = 114)
  const earthOrbitRadius = 114;
  const earthAngle = ((time * 0.7) % 360) * (Math.PI / 180);
  const earthX = cx + earthOrbitRadius * Math.cos(earthAngle);
  const earthY = cy + earthOrbitRadius * Math.sin(earthAngle);

  // Calculate current positions of bodies
  const bodyPositions = CELESTIAL_BODIES.reduce((acc, body) => {
    const angle = ((time * body.baseSpeed * 0.8 + (body.orbitRadius * 17)) % 360) * (Math.PI / 180);
    const x = cx + body.orbitRadius * Math.cos(angle);
    const y = cy + body.orbitRadius * Math.sin(angle);
    acc[body.id] = { x, y, angle };
    return acc;
  }, {} as Record<string, { x: number; y: number; angle: number }>);

  const targetPos = bodyPositions[selectedBody.id] || { x: cx + selectedBody.orbitRadius, y: cy };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Interactive SVG Orbital Map (Left Column) */}
      <div className="lg:col-span-7 bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl rounded-3xl p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.36)] hover:border-white/[0.14] transition-all duration-300">
        {/* Top HUD Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.06] mb-4 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] text-zinc-300 uppercase tracking-wider">
              ORBITAL TRAJECTORY RADAR // AD ASTRA
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className="px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] font-mono text-[10px] text-zinc-300 uppercase transition-colors cursor-pointer"
            >
              {isSimulating ? "Pause Orbits" : "Resume Orbits"}
            </button>
            <button
              onClick={triggerTrajectoryLaunch}
              disabled={transitAnimationActive}
              className="px-2.5 py-1 rounded bg-white text-black hover:bg-zinc-200 font-mono text-[10px] uppercase font-medium transition-colors cursor-pointer disabled:opacity-50"
            >
              Simulate Transit
            </button>
          </div>
        </div>

        {/* The Bespoke SVG Canvas */}
        <div className="relative w-full aspect-square max-h-[480px] mx-auto flex items-center justify-center">
          <svg
            viewBox="0 0 500 500"
            className="w-full h-full select-none"
            style={{ filter: "drop-shadow(0 0 30px rgba(0,0,0,0.8))" }}
          >
            <defs>
              {/* Radial Gradients */}
              <radialGradient id="sun-corona" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="40%" stopColor="#fef08a" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#eab308" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ca8a04" stopOpacity="0" />
              </radialGradient>

              <radialGradient id="earth-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
                <stop offset="60%" stopColor="#0284c7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0369a1" stopOpacity="0.2" />
              </radialGradient>

              {/* Trajectory Gradient */}
              <linearGradient id="trajectory-line" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
              </linearGradient>

              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Grid Crosshairs */}
            <line x1="250" y1="20" x2="250" y2="480" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="20" y1="250" x2="480" y2="250" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3 3" />
            
            {/* Outer Boundary Reticle */}
            <circle cx={cx} cy={cy} r="238" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <circle cx={cx} cy={cy} r="242" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" strokeDasharray="2 6" />

            {/* Orbital Rings */}
            {CELESTIAL_BODIES.map((body) => (
              <circle
                key={`orbit-${body.id}`}
                cx={cx}
                cy={cy}
                r={body.orbitRadius}
                fill="none"
                stroke={selectedId === body.id ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.06)"}
                strokeWidth={selectedId === body.id ? "1.5" : "1"}
                strokeDasharray={selectedId === body.id ? "none" : "4 4"}
                className="transition-all duration-300"
              />
            ))}

            {/* Earth's Orbit Ring */}
            <circle
              cx={cx}
              cy={cy}
              r={earthOrbitRadius}
              fill="none"
              stroke="rgba(56, 189, 248, 0.2)"
              strokeWidth="1"
              strokeDasharray="2 4"
            />

            {/* Active Transfer Trajectory Vector (Earth -> Target Body) */}
            {selectedId !== "earth" && (
              <g>
                <path
                  d={`M ${earthX} ${earthY} Q ${cx + (targetPos.x - cx) * 0.3} ${cy + (targetPos.y - cy) * 0.3} ${targetPos.x} ${targetPos.y}`}
                  fill="none"
                  stroke="url(#trajectory-line)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  strokeDashoffset={transitAnimationActive ? "-100" : "0"}
                  className={transitAnimationActive ? "transition-all duration-1000 ease-out" : ""}
                />

                {/* Animated Probe Shuttle traveling on trajectory */}
                {transitAnimationActive && (
                  <circle
                    cx={(earthX + targetPos.x) / 2}
                    cy={(earthY + targetPos.y) / 2}
                    r="3.5"
                    fill="#ffffff"
                    filter="url(#glow)"
                  >
                    <animate
                      attributeName="r"
                      values="2.5;4.5;2.5"
                      dur="0.8s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            )}

            {/* Central Sun */}
            <g>
              <circle cx={cx} cy={cy} r="24" fill="url(#sun-corona)" />
              <circle cx={cx} cy={cy} r="12" fill="#fffbeb" filter="url(#glow)" />
              <text
                x={cx}
                y={cy + 3}
                textAnchor="middle"
                fontSize="6"
                fontFamily="monospace"
                fill="#000000"
                fontWeight="bold"
                className="pointer-events-none"
              >
                SOL
              </text>
            </g>

            {/* Earth (Overworld Origin) */}
            <g
              transform={`translate(${earthX}, ${earthY})`}
              className="cursor-pointer"
            >
              <circle r="12" fill="none" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1" />
              <circle r="7" fill="url(#earth-glow)" />
              <text
                x="0"
                y="15"
                textAnchor="middle"
                fontSize="7"
                fontFamily="monospace"
                fill="#38bdf8"
                fontWeight="500"
              >
                EARTH
              </text>
            </g>

            {/* Celestial Bodies */}
            {CELESTIAL_BODIES.map((body) => {
              const pos = bodyPositions[body.id] || { x: cx, y: cy };
              const isSelected = selectedId === body.id;

              return (
                <g
                  key={body.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onClick={() => setSelectedId(body.id)}
                  className="cursor-pointer group"
                >
                  {/* Invisible enlarged hit target for easy clicking */}
                  <circle r="22" fill="transparent" />

                  {/* Selection Reticle Corners */}
                  {isSelected && (
                    <g>
                      <circle
                        r={body.size + 9}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.6)"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                        className="animate-spin"
                        style={{ transformOrigin: "0px 0px", animationDuration: "8s" }}
                      />
                      {/* Targeting brackets */}
                      <path
                        d={`M -${body.size + 12} -${body.size + 6} L -${body.size + 12} -${body.size + 12} L -${body.size + 6} -${body.size + 12}`}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d={`M ${body.size + 6} -${body.size + 12} L ${body.size + 12} -${body.size + 12} L ${body.size + 12} -${body.size + 6}`}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d={`M -${body.size + 12} ${body.size + 6} L -${body.size + 12} ${body.size + 12} L -${body.size + 6} ${body.size + 12}`}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d={`M ${body.size + 6} ${body.size + 12} L ${body.size + 12} ${body.size + 12} L ${body.size + 12} ${body.size + 6}`}
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        fill="none"
                      />
                    </g>
                  )}

                  {/* Body Outer Glow on Hover */}
                  <circle
                    r={body.size + 4}
                    fill={body.glowColor}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />

                  {/* Planetary Body Circle */}
                  <circle
                    r={body.size}
                    fill={body.color}
                    stroke={isSelected ? "#ffffff" : "rgba(255,255,255,0.2)"}
                    strokeWidth={isSelected ? 1.5 : 0.8}
                    filter={isSelected ? "url(#glow)" : undefined}
                  />

                  {/* Planet Label */}
                  <text
                    x="0"
                    y={body.size + 13}
                    textAnchor="middle"
                    fontSize="7.5"
                    fontFamily="monospace"
                    fill={isSelected ? "#ffffff" : "#a1a1aa"}
                    fontWeight={isSelected ? "600" : "400"}
                    className="transition-colors uppercase tracking-wider"
                  >
                    {body.name.split(" ")[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Bottom Legend */}
        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500 z-10">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
              Origin: Earth
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white" />
              Target: {selectedBody.name}
            </span>
          </div>
          <span className="hidden sm:inline">COORDINATE MAPPING: DALLAS CORE TELEMETRY</span>
        </div>
      </div>

      {/* Telemetry Display HUD (Right Column) */}
      <div className="lg:col-span-5 bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.36)] hover:border-white/[0.14] transition-all duration-300">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block">
                {`${selectedBody.system} // ${selectedBody.tier}`}
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mt-0.5">
                {selectedBody.name}
              </h3>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] font-mono text-[11px] text-zinc-300">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span>SYNCED</span>
            </div>
          </div>

          {/* Planet Switcher Quick Buttons */}
          <div className="grid grid-cols-5 gap-1.5 mb-5">
            {CELESTIAL_BODIES.map((b) => (
              <button
                key={b.id}
                onClick={() => setSelectedId(b.id)}
                className={`py-1.5 px-1 rounded text-center font-mono text-[10px] uppercase transition-all cursor-pointer ${
                  selectedId === b.id
                    ? "bg-white text-black font-semibold shadow"
                    : "bg-white/[0.02] border border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {b.id}
              </button>
            ))}
          </div>

          {/* Real-Time Coordinates Banner */}
          <div className="p-4 rounded-2xl bg-black/50 border border-white/[0.06] backdrop-blur-md mb-5 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3 h-3 text-zinc-400" />
                VIRTUAL ASTROMETRY VECTORS
              </span>
              <span className="text-emerald-400">0.00° DRIFT</span>
            </div>
            <div className="grid grid-cols-3 gap-2 font-mono text-xs">
              <div className="bg-white/[0.03] p-2 rounded-xl border border-white/[0.04]">
                <span className="text-zinc-500 text-[9px] block">X-AXIS</span>
                <span className="text-zinc-200">{selectedBody.coordinates.x}</span>
              </div>
              <div className="bg-white/[0.03] p-2 rounded-xl border border-white/[0.04]">
                <span className="text-zinc-500 text-[9px] block">Y-AXIS</span>
                <span className="text-zinc-200">{selectedBody.coordinates.y}</span>
              </div>
              <div className="bg-white/[0.03] p-2 rounded-xl border border-white/[0.04]">
                <span className="text-zinc-500 text-[9px] block">Z-AXIS</span>
                <span className="text-zinc-200">{selectedBody.coordinates.z}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-5">
            {selectedBody.description}
          </p>

          {/* Telemetry Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.06] backdrop-blur-sm">
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block mb-0.5">
                Distance From Earth
              </span>
              <span className="font-mono text-xs sm:text-sm font-medium text-white">
                {selectedBody.distanceFromEarth}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.06] backdrop-blur-sm">
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block mb-0.5">
                Required Transit Δv
              </span>
              <span className="font-mono text-xs sm:text-sm font-medium text-white">
                {selectedBody.deltaV}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.06] backdrop-blur-sm">
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block mb-0.5">
                Gravity Coefficient
              </span>
              <span className="font-mono text-xs font-medium text-zinc-200">
                {selectedBody.gravity}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.06] backdrop-blur-sm">
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block mb-0.5">
                Atmosphere Class
              </span>
              <span className="font-mono text-xs font-medium text-zinc-200 truncate block">
                {selectedBody.atmosphere}
              </span>
            </div>
          </div>

          {/* Hazard Notice */}
          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-5 flex items-start gap-2.5">
            <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block">
                Environmental Hazard
              </span>
              <span className="text-zinc-200">{selectedBody.hazard}</span>
            </div>
          </div>
        </div>

        {/* Minerals stratigraphy */}
        <div className="pt-4 border-t border-white/[0.06]">
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-2">
            Target Mineral Stratigraphy:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {selectedBody.keyMinerals.map((mineral) => (
              <span
                key={mineral}
                className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-zinc-300 font-mono text-[11px]"
              >
                {mineral}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
