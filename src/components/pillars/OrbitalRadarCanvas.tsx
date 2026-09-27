"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Globe,
  Compass,
  Radio,
  Activity,
  Shield,
  Crosshair,
  RefreshCw,
  Zap,
  Play,
  Pause,
  Orbit,
  Server,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// ============================================================================
// Types & Celestial Dossier Definitions
// ============================================================================

export type RadarMode = "map" | "physics" | "spectrometry";

export interface CelestialNode {
  id: string;
  name: string;
  kicker: string;
  system: string;
  classification: string;
  unitPos: [number, number, number]; // [x, y, z] on unit sphere
  accentColor: string;
  glowColor: string;
  dotColor: string;
  coordinates: { x: string; y: string; z: string };
  distanceFromEarth: string;
  gravity: string;
  gravityNumeric: number; // e.g. 1.0, 0.166, 0.38, 1.12, 0.0
  atmosphere: string;
  atmospherePressure: string;
  pressureNumeric: number;
  deltaV: string;
  status: string;
  statusBadge: "emerald" | "amber" | "cyan";
  hazard: string;
  keyResources: string[];
  strategicBrief: string;
  orbitalPeriod: string;
  phaseAngle: string;
  propulsionTier: string;
  sensorFrequency: string;
  spectrometryYields: { name: string; grade: string; utility: string }[];
}

// Normalize unit vectors to exactly 1.000000 length
function norm(x: number, y: number, z: number): [number, number, number] {
  const l = Math.hypot(x, y, z);
  return [x / l, y / l, z / l];
}

export const CELESTIAL_NODES: CelestialNode[] = [
  {
    id: "earth",
    name: "Terra Prime (Earth)",
    kicker: "01 // HOMEWORLD & RAIL CORE",
    system: "Sol-Terra Primary",
    classification: "Homeworld // Cradle of Civilization",
    unitPos: norm(0.416, 0.174, 0.892),
    accentColor: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.4)",
    dotColor: "#0284c7",
    coordinates: { x: "0.0000 AU", y: "1.0000 AU", z: "0.0000 AU" },
    distanceFromEarth: "0 km (Origin Hub)",
    gravity: "1.000g (Standard Terrestrial)",
    gravityNumeric: 1.0,
    atmosphere: "1.00 atm (78% N₂ / 21% O₂ // Breathable)",
    atmospherePressure: "1.000 atm",
    pressureNumeric: 1.0,
    deltaV: "0 m/s (Primary Departure Hub)",
    status: "HOMED // CONTINUOUS OPERATION",
    statusBadge: "emerald",
    hazard: "None • Continental Weather Cycles & Monsoons",
    keyResources: ["Raw Iron", "Redstone", "Terracotta", "Diamond", "Liquid Hydrocarbons"],
    strategicBrief:
      "The logistical anchor of civilization. High-speed transcontinental rail arteries, sprawling agrarian settlements, and heavy launchpad facilities feeding automated supply payloads into orbital transfer vectors.",
    orbitalPeriod: "365.25 Earth Days",
    phaseAngle: "0.00° (Reference Origin)",
    propulsionTier: "Tier 0 Surface Infrastructure",
    sensorFrequency: "1420.405 MHz (Terrestrial Core)",
    spectrometryYields: [
      { name: "Raw Iron & Redstone", grade: "Grade A", utility: "Continental Rail Automation & Logic Gates" },
      { name: "Diamond & Obsidian", grade: "Ultra-Dense", utility: "Industrial Blast Furnaces & Tools" },
      { name: "Liquid Hydrocarbons", grade: "Refined", utility: "Cryogenic Propellant Precursors" },
    ],
  },
  {
    id: "luna",
    name: "Luna (The Moon)",
    kicker: "02 // LOW-GRAVITY PROVING GROUND",
    system: "Earth-Moon Orbital Resonance",
    classification: "Low-Gravity Proving Ground",
    unitPos: norm(0.853, -0.469, 0.228),
    accentColor: "#e4e4e7",
    glowColor: "rgba(228, 228, 231, 0.4)",
    dotColor: "#a1a1aa",
    coordinates: { x: "+0.0026 AU", y: "-0.0008 AU", z: "+0.0001 AU" },
    distanceFromEarth: "384,400 km",
    gravity: "0.166g (Low Gravitational Field)",
    gravityNumeric: 0.166,
    atmosphere: "0.00 atm (Hard Vacuum // Oxygen Gear Mandatory)",
    atmospherePressure: "0.000 atm",
    pressureNumeric: 0.0,
    deltaV: "2,840 m/s",
    status: "OPTIMAL // ORBITAL WINDOW OPEN",
    statusBadge: "emerald",
    hazard: "Cryogenic Lunar Nights (-130°C) • Micrometeoroid Cratering",
    keyResources: ["Desh Ore", "Cheese Ore", "Moon Stone", "Basalt Ingots"],
    strategicBrief:
      "The crucible of spaceflight. Pioneers construct hermetically pressurized surface domes, excavate subterranean Lunarian catacombs, and smelt heavy Desh ingots to forge deep-space propulsion assemblies.",
    orbitalPeriod: "27.3 Earth Days",
    phaseAngle: "+14.2° Orbital Vector",
    propulsionTier: "Tier 1 Chemical Propulsion Rocket",
    sensorFrequency: "2.295 GHz (Lunar Transceiver)",
    spectrometryYields: [
      { name: "Desh Ore", grade: "Refractory", utility: "Tier 1 Rocket Plating & Pressurized Airlocks" },
      { name: "Basalt & Moon Stone", grade: "Vitreous", utility: "Radiation-Proof Hermetic Dome Castings" },
      { name: "Cheese Ore", grade: "Organic Variant", utility: "Lunarian Bio-Research & Sustenance" },
    ],
  },
  {
    id: "mars",
    name: "Ares Planitia (Mars)",
    kicker: "03 // FERROUS RED DESERT",
    system: "Inner Solar System",
    classification: "Ferrous Desert // Ancient Red World",
    unitPos: norm(-0.240, 0.375, -0.896),
    accentColor: "#f97316",
    glowColor: "rgba(249, 115, 22, 0.45)",
    dotColor: "#c2410c",
    coordinates: { x: "+0.5241 AU", y: "+0.1892 AU", z: "-0.0418 AU" },
    distanceFromEarth: "78,340,000 km",
    gravity: "0.380g (Intermediate Gravity)",
    gravityNumeric: 0.38,
    atmosphere: "0.006 atm (Toxic Carbon Dioxide)",
    atmospherePressure: "0.006 atm",
    pressureNumeric: 0.006,
    deltaV: "4,120 m/s",
    status: "SYNCHRONIZED // PHASE ANGLE +44.2°",
    statusBadge: "amber",
    hazard: "Ferrous Dust Storms • High Solar Radiation • Subterranean Pyramidal Crypts",
    keyResources: ["Ostrum Ore", "Martian Iron", "Sub-surface Permafrost Ice", "Red Sandstone"],
    strategicBrief:
      "Expansive rust-red canyon plateaus and ancient dried river systems. Explorers deploy tracked rovers, breach sealed subterranean pyramidal dungeons, and extract Ostrum to fuel cryogenic interstellar jump drives.",
    orbitalPeriod: "687.0 Earth Days",
    phaseAngle: "+44.2° Transfer Vector",
    propulsionTier: "Tier 2 Heavy Launch Vehicle",
    sensorFrequency: "8.410 GHz (Deep Space Network)",
    spectrometryYields: [
      { name: "Ostrum Ore", grade: "Super-Alloy", utility: "Tier 2 Heavy Thrusters & High-Temp Heat Shields" },
      { name: "Sub-surface Ice", grade: "Cryo-Volatile", utility: "Electrolytic Fuel Cells & Oxygen Generation" },
      { name: "Martian Iron", grade: "Ferrous-Dense", utility: "High-Stress Tracked Planetary Rover Chassis" },
    ],
  },
  {
    id: "glacio",
    name: "Glacio (Extrasolar)",
    kicker: "04 // CRYO-TERRESTRIAL OUTLIER",
    system: "Extrasolar Star System Alpha",
    classification: "Cryo-Terrestrial Outlier",
    unitPos: norm(-0.646, -0.743, 0.173),
    accentColor: "#67e8f9",
    glowColor: "rgba(103, 232, 249, 0.45)",
    dotColor: "#0891b2",
    coordinates: { x: "+14.892 LY", y: "-3.109 LY", z: "+8.023 LY" },
    distanceFromEarth: "4.24 Light Years (Sub-space Transit)",
    gravity: "1.120g (High Gravity Field)",
    gravityNumeric: 1.12,
    atmosphere: "0.72 atm (Thin Oxygen // Breathable in Low Valleys)",
    atmospherePressure: "0.720 atm",
    pressureNumeric: 0.72,
    deltaV: "14,800 m/s (Interstellar Warp Vector)",
    status: "LOCKED // HYPERSPACE BEACON ACTIVE",
    statusBadge: "cyan",
    hazard: "Glacial Permafrost Blizzards (-85°C) • Alien Megafauna (Glacio Rams, Cryo-Beasts)",
    keyResources: ["Permafrost Steel", "Glacio Ice", "Calorite Veins", "Primordial Monolith Relics"],
    strategicBrief:
      "An alien frozen frontier illuminated by distant sapphire starlight. Home to towering petrified ice spires, roaming glacial megafauna, and ancient monoliths holding apex technological relics.",
    orbitalPeriod: "1,420 Earth Days",
    phaseAngle: "Subspace Warp Resonance",
    propulsionTier: "Tier 4 Antimatter Warp Cruiser",
    sensorFrequency: "32.15 GHz (Hyperspace Beacon)",
    spectrometryYields: [
      { name: "Permafrost Steel", grade: "Cryo-Tempered", utility: "Warp Reactor Pressure Vessels & Armor" },
      { name: "Calorite Veins", grade: "Exothermic", utility: "Supercritical Thermal Core Catalysts" },
      { name: "Monolith Relics", grade: "Precursor Archival", utility: "Subspace Navigation Computers" },
    ],
  },
  {
    id: "dallas-core",
    name: "Dallas Core Hub",
    kicker: "05 // ORBITAL COMMUNICATIONS RELAY",
    system: "Dallas Core Cluster (Tier 4 Facility)",
    classification: "Orbital Communications Relay // 20.0 TPS",
    unitPos: norm(-0.198, 0.643, 0.740),
    accentColor: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.45)",
    dotColor: "#059669",
    coordinates: { x: "+0.0000 AU", y: "+0.0420 AU", z: "+0.0120 AU" },
    distanceFromEarth: "35,786 km (Geostationary Sync)",
    gravity: "0.000g (Micro-Gravity Geosynchronous)",
    gravityNumeric: 0.0,
    atmosphere: "1.00 atm (Pressurized Nitrogen Silicon Vault)",
    atmospherePressure: "1.000 atm",
    pressureNumeric: 1.0,
    deltaV: "1,280 m/s (Stationkeeping Vector)",
    status: "ONLINE // 20.0 TPS LOCKED",
    statusBadge: "emerald",
    hazard: "Cosmic Ray Flux • 5.7 GHz 3D V-Cache Heat Dissipation",
    keyResources: ["Dedicated 9950X3D Silicon", "20.0 Locked TPS", "Optical Uplink", "ZGC Engine"],
    strategicBrief:
      "The primary orbital telemetry and routing matrix. Synchronizes player coordinates, continental train timetable dispatches, and high-frequency chunk-loading packets across the entire planetary cluster with 100% tick stability.",
    orbitalPeriod: "23h 56m 04s (Geosynchronous)",
    phaseAngle: "Locked at 0.00° Nadir",
    propulsionTier: "Ion Stationkeeping Thrusters",
    sensorFrequency: "10 Gbps Redundant Optical Carrier",
    spectrometryYields: [
      { name: "Dedicated AMD 9950X3D", grade: "Tier-4 Enterprise", utility: "Sub-millisecond Server Tick Computations" },
      { name: "64 GB DDR5 6000MHz", grade: "ECC Low-Latency", utility: "Zero-Stall Real-Time World Simulation" },
      { name: "Redundant Optical Fiber", grade: "10 Gbps Uplink", utility: "Sub-15ms Packet Routing & Satellite Sync" },
    ],
  },
];

// ============================================================================
// Fibonacci Sphere Phyllotaxis Precomputation (Zero Allocation during RAF)
// ============================================================================

const DOT_COUNT = 14000;
const SPHERE_POSITIONS = new Float32Array(DOT_COUNT * 3);
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5)); // ~2.399963229728653 rad

// Populate sunflower distribution once at module initialization
for (let i = 0; i < DOT_COUNT; i++) {
  const y = 1 - (i / (DOT_COUNT - 1)) * 2; // +1 to -1
  const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = GOLDEN_ANGLE * i;

  SPHERE_POSITIONS[i * 3] = Math.cos(theta) * radiusAtY;
  SPHERE_POSITIONS[i * 3 + 1] = y;
  SPHERE_POSITIONS[i * 3 + 2] = Math.sin(theta) * radiusAtY;
}

// 16 Alpha buckets for batched canvas drawing to achieve 60 FPS
const BUCKET_COUNT = 16;
const PRECOMPUTED_COLORS: string[] = [];
for (let b = 0; b < BUCKET_COUNT; b++) {
  const normVal = b / (BUCKET_COUNT - 1);
  const alpha = 0.2 + 0.8 * normVal;
  // Dual-tone: back dots slightly bluer/zinc, front dots brilliant diamond white/cyan
  if (normVal < 0.45) {
    PRECOMPUTED_COLORS[b] = `rgba(160, 190, 235, ${alpha.toFixed(3)})`;
  } else {
    PRECOMPUTED_COLORS[b] = `rgba(235, 245, 255, ${alpha.toFixed(3)})`;
  }
}

// Pre-allocated coordinates for the 16 buckets
const BUCKET_X: Float32Array[] = [];
const BUCKET_Y: Float32Array[] = [];
const BUCKET_S: Float32Array[] = [];
const BUCKET_COUNTS = new Int32Array(BUCKET_COUNT);

for (let b = 0; b < BUCKET_COUNT; b++) {
  BUCKET_X[b] = new Float32Array(DOT_COUNT);
  BUCKET_Y[b] = new Float32Array(DOT_COUNT);
  BUCKET_S[b] = new Float32Array(DOT_COUNT);
}

// ============================================================================
// Main Component
// ============================================================================

export function OrbitalRadarCanvas() {
  const [selectedId, setSelectedId] = useState<string>("earth");
  const [radarMode, setRadarMode] = useState<RadarMode>("map");
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Vector calculation animation states
  const [isCalculatingVector, setIsCalculatingVector] = useState<boolean>(false);
  const [vectorAcquired, setVectorAcquired] = useState<boolean>(false);
  const [vectorProgress, setVectorProgress] = useState<number>(0);

  // Telemetry statistics for display
  const [facingCount, setFacingCount] = useState<number>(3);
  const [currentRotX, setCurrentRotX] = useState<number>(0.2);
  const [currentRotY, setCurrentRotY] = useState<number>(0.0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Physics rotation states (in radians)
  const rotXRef = useRef<number>(0.2);
  const rotYRef = useRef<number>(0.0);
  const targetRotXRef = useRef<number>(0.2);
  const targetRotYRef = useRef<number>(0.0);

  // Interaction tracking
  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const autoRotateRef = useRef<boolean>(true);

  // Keep auto-rotate ref in sync with state
  useEffect(() => {
    autoRotateRef.current = isAutoRotating;
  }, [isAutoRotating]);

  const selectedNode = useMemo(() => {
    return CELESTIAL_NODES.find((node) => node.id === selectedId) || CELESTIAL_NODES[0];
  }, [selectedId]);

  // Smoothly orient the globe toward a newly selected celestial body
  const smoothOrientToBody = useCallback((body: CelestialNode) => {
    const [ux, uy, uz] = body.unitPos;
    // Calculate rotation Y and X to bring this point to front-center
    const targetY = -Math.atan2(ux, uz);
    const targetX = Math.max(-0.6, Math.min(0.6, Math.asin(uy)));
    targetRotYRef.current = targetY;
    targetRotXRef.current = targetX;
  }, []);

  const handleSelectNode = useCallback(
    (id: string) => {
      setSelectedId(id);
      const targetBody = CELESTIAL_NODES.find((n) => n.id === id);
      if (targetBody) {
        smoothOrientToBody(targetBody);
      }
      setVectorAcquired(false);
      setIsCalculatingVector(false);
      setVectorProgress(0);
    },
    [smoothOrientToBody]
  );

  // Trigger flight vector trajectory calculation sequence
  const handleCalculateVector = () => {
    if (isCalculatingVector) return;
    setIsCalculatingVector(true);
    setVectorAcquired(false);
    setVectorProgress(0);

    const startTime = performance.now();
    const duration = 3420; // 3.42s as specified in copy deck

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(100, Math.round((elapsed / duration) * 100));
      setVectorProgress(progress);

      if (elapsed >= duration) {
        clearInterval(interval);
        setIsCalculatingVector(false);
        setVectorAcquired(true);
      }
    }, 40);
  };

  const resetOrientation = () => {
    targetRotXRef.current = 0.2;
    targetRotYRef.current = 0.0;
  };

  // ============================================================================
  // Canvas Animation & 3D Projection RAF Loop
  // ============================================================================
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let lastTelemetryUpdate = 0;

    // Handle HiDPI scaling
    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Camera constants
    const CAMERA_D = 3.2;

    const render = (time: number) => {
      // 1. Autonomous Orbit Rotation & Inertia Damping
      if (!isDraggingRef.current && autoRotateRef.current) {
        targetRotYRef.current += 0.0018; // +0.0018 rad/frame
      }

      // Critically damped spring lerp (lerp factor: 0.08)
      rotYRef.current += (targetRotYRef.current - rotYRef.current) * 0.08;
      rotXRef.current += (targetRotXRef.current - rotXRef.current) * 0.08;

      const rotX = rotXRef.current;
      const rotY = rotYRef.current;

      // Update telemetry display once every 120ms to avoid React re-render churn
      if (time - lastTelemetryUpdate > 120) {
        lastTelemetryUpdate = time;
        setCurrentRotX(rotX);
        setCurrentRotY(rotY);
      }

      // Precalculate trigonometric constants for this frame
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Viewport dimensions
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.38;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // 2. Ambient Deep Space Glow & Halo
      const haloGrad = ctx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius * 1.35);
      haloGrad.addColorStop(0, "rgba(56, 189, 248, 0.07)");
      haloGrad.addColorStop(0.45, "rgba(99, 102, 241, 0.035)");
      haloGrad.addColorStop(0.85, "rgba(14, 16, 22, 0.01)");
      haloGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // 3. Subtle Celestial Orbit Trajectory & Equatorial Grid Rings
      ctx.lineWidth = 1;
      const ringSteps = 72;
      for (const ringLat of [-0.45, 0.0, 0.45]) {
        const ringR = Math.sqrt(Math.max(0, 1 - ringLat * ringLat));
        ctx.beginPath();
        let first = true;

        for (let s = 0; s <= ringSteps; s++) {
          const a = (s / ringSteps) * Math.PI * 2;
          const x0 = Math.cos(a) * ringR;
          const y0 = ringLat;
          const z0 = Math.sin(a) * ringR;

          // Rotate
          const y1 = y0 * cosX - z0 * sinX;
          const z1 = y0 * sinX + z0 * cosX;
          const x2 = x0 * cosY + z1 * sinY;
          const z2 = -x0 * sinY + z1 * cosY;
          const y2 = y1;

          const p = CAMERA_D / (CAMERA_D - z2);
          const px = cx + x2 * radius * p;
          const py = cy - y2 * radius * p;

          if (first) {
            ctx.moveTo(px, py);
            first = false;
          } else {
            ctx.lineTo(px, py);
          }
        }

        ctx.strokeStyle =
          ringLat === 0.0 ? "rgba(56, 189, 248, 0.14)" : "rgba(255, 255, 255, 0.04)";
        ctx.setLineDash(ringLat === 0.0 ? [4, 4] : [2, 6]);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // 4. Batch 14,000 Fibonacci Dotted Particles into 16 Alpha Buckets
      BUCKET_COUNTS.fill(0);

      for (let i = 0; i < DOT_COUNT; i++) {
        const x0 = SPHERE_POSITIONS[i * 3];
        const y0 = SPHERE_POSITIONS[i * 3 + 1];
        const z0 = SPHERE_POSITIONS[i * 3 + 2];

        // 3D Matrix Rotation (rotX tilt, then rotY spin)
        const y1 = y0 * cosX - z0 * sinX;
        const z1 = y0 * sinX + z0 * cosX;
        const x2 = x0 * cosY + z1 * sinY;
        const z2 = -x0 * sinY + z1 * cosY;
        const y2 = y1;

        // Depth fading: alpha = 0.2 + 0.8 * (z + 1) / 2
        const alpha = 0.2 + 0.8 * ((z2 + 1) * 0.5);

        // Perspective Projection
        const persp = CAMERA_D / (CAMERA_D - z2);
        const px = cx + x2 * radius * persp;
        const py = cy - y2 * radius * persp;

        // Front dots are slightly larger and brighter
        const size = (z2 > 0 ? 1.4 : 0.95) * (persp * 0.62);

        // Alpha bucket index (0 to 15)
        const bucketIdx = Math.min(15, Math.max(0, Math.floor((alpha - 0.2) / 0.8 * 16)));
        const count = BUCKET_COUNTS[bucketIdx];

        BUCKET_X[bucketIdx][count] = px - size * 0.5;
        BUCKET_Y[bucketIdx][count] = py - size * 0.5;
        BUCKET_S[bucketIdx][count] = size;
        BUCKET_COUNTS[bucketIdx]++;
      }

      // Draw each bucket in a single draw call (Only 16 fill calls per frame!)
      for (let b = 0; b < BUCKET_COUNT; b++) {
        const count = BUCKET_COUNTS[b];
        if (count === 0) continue;

        ctx.fillStyle = PRECOMPUTED_COLORS[b];
        ctx.beginPath();
        const bx = BUCKET_X[b];
        const by = BUCKET_Y[b];
        const bs = BUCKET_S[b];
        for (let k = 0; k < count; k++) {
          ctx.rect(bx[k], by[k], bs[k], bs[k]);
        }
        ctx.fill();
      }

      // 5. Atmospheric Horizon Rim Stroke
      ctx.strokeStyle = "rgba(56, 189, 248, 0.18)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // 6. Surface Normal Occlusion & Orbiting HTML Chips Placement
      let visibleCount = 0;
      let earthScreenPos: { x: number; y: number; facing: number } | null = null;
      let targetScreenPos: { x: number; y: number; facing: number } | null = null;

      for (let i = 0; i < CELESTIAL_NODES.length; i++) {
        const node = CELESTIAL_NODES[i];
        const [ux, uy, uz] = node.unitPos;

        // Rotate coordinate
        const y1 = uy * cosX - uz * sinX;
        const z1 = uy * sinX + uz * cosX;
        const x2 = ux * cosY + z1 * sinY;
        const z2 = -ux * sinY + z1 * cosY;
        const y2 = y1;

        // Surface normal facing factor: facing = normal.z = z2
        const facing = z2;
        const isVisible = facing > 0.08;

        const persp = CAMERA_D / (CAMERA_D - z2);
        const px = cx + x2 * radius * persp;
        const py = cy - y2 * radius * persp;

        if (node.id === "earth") {
          earthScreenPos = { x: px, y: py, facing };
        }
        if (node.id === selectedId) {
          targetScreenPos = { x: px, y: py, facing };
        }

        // Direct DOM ref update (Zero React re-render overhead!)
        const chipEl = chipRefs.current[i];
        if (chipEl) {
          if (isVisible) {
            visibleCount++;
            const scale = 0.72 + 0.42 * Math.max(0, Math.min(1, facing));
            const opacity = Math.min(1, Math.max(0, (facing - 0.08) / 0.22));
            const zIndex = Math.round(100 + facing * 50);

            chipEl.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
            chipEl.style.opacity = opacity.toFixed(3);
            chipEl.style.zIndex = zIndex.toString();
            chipEl.style.pointerEvents = opacity > 0.35 ? "auto" : "none";
          } else {
            chipEl.style.opacity = "0";
            chipEl.style.pointerEvents = "none";
          }
        }
      }

      setFacingCount(visibleCount);

      // 7. Active Transfer Trajectory Vector Curve (Earth -> Target Body)
      if (
        selectedId !== "earth" &&
        earthScreenPos &&
        targetScreenPos &&
        (earthScreenPos.facing > 0 || targetScreenPos.facing > 0)
      ) {
        const midX = (earthScreenPos.x + targetScreenPos.x) / 2 + (targetScreenPos.y - earthScreenPos.y) * 0.15;
        const midY = (earthScreenPos.y + targetScreenPos.y) / 2 - (targetScreenPos.x - earthScreenPos.x) * 0.15;

        ctx.strokeStyle = "rgba(56, 189, 248, 0.45)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.lineDashOffset = -time * 0.04;
        ctx.beginPath();
        ctx.moveTo(earthScreenPos.x, earthScreenPos.y);
        ctx.quadraticCurveTo(midX, midY, targetScreenPos.x, targetScreenPos.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [selectedId]);

  // ============================================================================
  // Pointer Drag Interaction Handlers (Inertia Damped)
  // ============================================================================

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastMousePosRef.current.x;
    const deltaY = e.clientY - lastMousePosRef.current.y;

    // Physics constants from GLOBE_PHYSICS: dragSensitivity = 0.005
    targetRotYRef.current += deltaX * 0.005;
    targetRotXRef.current += deltaY * 0.005;

    // Clamp pitch tilt between -1.15 and +1.15 radians to prevent inversion
    targetRotXRef.current = Math.max(-1.15, Math.min(1.15, targetRotXRef.current));

    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignored if pointer capture release is not supported
    }
  };

  // Node icon resolver
  const renderNodeIcon = (node: CelestialNode) => {
    switch (node.id) {
      case "earth":
        return <Globe className="w-4 h-4 text-cyan-400" />;
      case "luna":
        return <Orbit className="w-4 h-4 text-zinc-300" />;
      case "mars":
        return <Compass className="w-4 h-4 text-orange-400" />;
      case "glacio":
        return <Sparkles className="w-4 h-4 text-cyan-300" />;
      case "dallas-core":
        return <Server className="w-4 h-4 text-emerald-400" />;
      default:
        return <Globe className="w-4 h-4 text-white" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Editorial Section Sub-Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-white/[0.06]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-[10px] uppercase tracking-widest mb-2 backdrop-blur-md">
            <Radio className="w-3 h-3 text-cyan-400" />
            CELESTIAL RECONNAISSANCE // ORBITAL RADAR MATRIX
          </div>
          <h3 className="text-2xl sm:text-3xl font-medium text-white tracking-[-0.035em]">
            The Solar System. Charted and Accessible.
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-md font-normal leading-relaxed text-balance">
          Four celestial frontiers plus the Dallas Core orbital relay. Every planetary body features unique gravitational physics, atmospheric hazards, and mineral deposits.
        </p>
      </div>

      {/* Main Grid: 3D Canvas Globe (Left) & Technical Dossier HUD (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: 3D Dotted Canvas Globe & Orbit Chips */}
        <div className="lg:col-span-7 bg-[#0c0d12]/90 border border-white/[0.08] backdrop-blur-2xl rounded-3xl p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.6)] hover:border-white/[0.16] transition-all duration-300">
          {/* Header Controls HUD */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.06] mb-2 z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[11px] text-zinc-300 uppercase tracking-wider">
                3D CELESTIAL CANVAS // {facingCount} / 5 BODIES OCCLUSION-CLEAR
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] font-mono text-[10px] text-zinc-300 uppercase tracking-wider transition-colors cursor-pointer select-none"
                title={isAutoRotating ? "Pause auto-rotation" : "Resume auto-rotation"}
              >
                {isAutoRotating ? (
                  <>
                    <Pause className="w-3 h-3 text-cyan-400" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 text-emerald-400" />
                    <span>Auto-Orbit</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={resetOrientation}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] font-mono text-[10px] text-zinc-300 uppercase tracking-wider transition-colors cursor-pointer select-none"
                title="Reset globe orientation to default"
              >
                <RefreshCw className="w-3 h-3 text-zinc-400" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Interactive Globe Container */}
          <div
            ref={containerRef}
            className="globe-canvas-container relative w-full aspect-square max-h-[500px] mx-auto flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {/* Pure HTML5 3D Canvas */}
            <canvas id="globeCanvas" ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

            {/* Orbiting HTML Chips with Normal Occlusion (Facing > 0.08) */}
            {CELESTIAL_NODES.map((node, idx) => {
              const isSelected = selectedId === node.id;
              const isHovered = hoveredNodeId === node.id;

              return (
                <div
                  key={node.id}
                  ref={(el) => {
                    chipRefs.current[idx] = el;
                  }}
                  className={`globe-chip group ${isSelected ? "active" : ""}`}
                  style={{
                    borderColor: isSelected ? node.accentColor : undefined,
                    boxShadow: isSelected ? `0 0 0 2px ${node.accentColor}40, 0 12px 32px rgba(0,0,0,0.7)` : undefined,
                  }}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectNode(node.id);
                  }}
                >
                  {/* Subtle Node Accent Ring */}
                  <div
                    className="absolute inset-0 rounded-full opacity-20 pointer-events-none transition-opacity group-hover:opacity-40"
                    style={{ backgroundColor: node.accentColor }}
                  />

                  {/* Node Icon */}
                  <div className="relative z-10 transition-transform duration-200 group-hover:scale-110">
                    {renderNodeIcon(node)}
                  </div>

                  {/* Pulsing beacon center dot */}
                  <span
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-black"
                    style={{ backgroundColor: node.accentColor }}
                  />

                  {/* Hover Tooltip */}
                  <div className={`globe-tooltip ${isHovered ? "visible" : ""}`}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: node.accentColor }} />
                    <span className="font-semibold text-white">{node.name}</span>
                    <span className="text-zinc-400 font-mono text-[10px]">{node.distanceFromEarth}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom HUD Bar & Drag Instructions */}
          <div className="pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-zinc-500 z-10">
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-zinc-400" />
              <span>DRAG TO ROTATE // INERTIA DAMPED LERP (0.08)</span>
            </div>
            <div className="flex items-center gap-3">
              <span>
                ROT: [X: {((currentRotX * 180) / Math.PI).toFixed(1)}°, Y: {((currentRotY * 180) / Math.PI).toFixed(1)}°]
              </span>
              <span className="text-zinc-600 hidden sm:inline">{"//"}</span>
              <span className="text-cyan-400 hidden sm:inline">FIBONACCI: 14,000 DOTS</span>
            </div>
          </div>
        </div>

        {/* Right Column: Celestial Technical Dossier & Radar Modes */}
        <div className="lg:col-span-5 bg-[#0c0d12]/90 border border-white/[0.08] backdrop-blur-2xl rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_16px_48px_rgba(0,0,0,0.6)] hover:border-white/[0.16] transition-all duration-300">
          <div>
            {/* Header: System, Classification & Active Status */}
            <div className="flex items-start justify-between pb-4 border-b border-white/[0.06] mb-5 gap-3">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 block mb-1">
                  {selectedNode.kicker}
                </span>
                <h4 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  {selectedNode.name}
                </h4>
                <span className="text-xs text-zinc-400 mt-0.5 block">{selectedNode.classification}</span>
              </div>
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-mono text-[10px] uppercase tracking-wider shrink-0"
                style={{
                  backgroundColor: `${selectedNode.accentColor}12`,
                  borderColor: `${selectedNode.accentColor}30`,
                  color: selectedNode.accentColor,
                }}
              >
                <Activity className="w-3 h-3 animate-pulse" />
                <span>{selectedNode.status.split("//")[0].trim()}</span>
              </div>
            </div>

            {/* Quick Switcher Strip (All 5 Bodies) */}
            <div className="grid grid-cols-5 gap-1.5 mb-5">
              {CELESTIAL_NODES.map((body) => {
                const isActive = selectedId === body.id;
                return (
                  <button
                    key={body.id}
                    type="button"
                    onClick={() => handleSelectNode(body.id)}
                    className={`py-2 px-1 rounded-xl text-center font-mono text-[10px] uppercase transition-all duration-200 cursor-pointer flex flex-col items-center gap-1 ${
                      isActive
                        ? "bg-white text-black font-semibold shadow-lg shadow-white/10 scale-[1.02]"
                        : "bg-white/[0.02] border border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: isActive ? "#000" : body.accentColor }}
                    />
                    <span className="truncate w-full">{body.id.replace("-", " ")}</span>
                  </button>
                );
              })}
            </div>

            {/* Radar Mode Switcher Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-black/50 border border-white/[0.06] mb-5">
              <button
                type="button"
                onClick={() => setRadarMode("map")}
                className={`flex-1 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                  radarMode === "map"
                    ? "bg-white/[0.12] text-white font-medium border border-white/[0.1]"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Celestial Map
              </button>
              <button
                type="button"
                onClick={() => setRadarMode("physics")}
                className={`flex-1 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                  radarMode === "physics"
                    ? "bg-white/[0.12] text-white font-medium border border-white/[0.1]"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Physics Telemetry
              </button>
              <button
                type="button"
                onClick={() => setRadarMode("spectrometry")}
                className={`flex-1 py-1.5 rounded-lg font-mono text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
                  radarMode === "spectrometry"
                    ? "bg-white/[0.12] text-white font-medium border border-white/[0.1]"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Spectrometry
              </button>
            </div>

            {/* 3D Astrometry Coordinates Reticle */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/[0.06] backdrop-blur-md mb-5 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <Crosshair className="w-3 h-3 text-cyan-400" />
                  REAL-TIME 3D ASTROMETRY VECTOR
                </span>
                <span className="text-emerald-400">0.00° DRIFT // SYNCED</span>
              </div>
              <div className="grid grid-cols-3 gap-2 font-mono text-xs">
                <div className="bg-white/[0.03] p-2.5 rounded-xl border border-white/[0.05]">
                  <span className="text-zinc-500 text-[9px] block">X-AXIS</span>
                  <span className="text-zinc-200 font-medium">{selectedNode.coordinates.x}</span>
                </div>
                <div className="bg-white/[0.03] p-2.5 rounded-xl border border-white/[0.05]">
                  <span className="text-zinc-500 text-[9px] block">Y-AXIS</span>
                  <span className="text-zinc-200 font-medium">{selectedNode.coordinates.y}</span>
                </div>
                <div className="bg-white/[0.03] p-2.5 rounded-xl border border-white/[0.05]">
                  <span className="text-zinc-500 text-[9px] block">Z-AXIS</span>
                  <span className="text-zinc-200 font-medium">{selectedNode.coordinates.z}</span>
                </div>
              </div>
            </div>

            {/* TAB CONTENT: 01 CELESTIAL MAP */}
            {radarMode === "map" && (
              <div className="space-y-4">
                {/* Strategic Brief */}
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                  {selectedNode.strategicBrief}
                </p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/[0.06]">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block mb-0.5">
                      Distance from Homeworld
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-medium text-white truncate block">
                      {selectedNode.distanceFromEarth}
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/[0.06]">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block mb-0.5">
                      Required Transit Δv
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-medium text-white">
                      {selectedNode.deltaV}
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/[0.06]">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block mb-0.5">
                      Surface Gravity
                    </span>
                    <span className="font-mono text-xs font-medium text-zinc-200">
                      {selectedNode.gravity}
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/[0.06]">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block mb-0.5">
                      Atmospheric Class
                    </span>
                    <span className="font-mono text-xs font-medium text-zinc-200 truncate block">
                      {selectedNode.atmospherePressure}
                    </span>
                  </div>
                </div>

                {/* Environmental Hazard Notice */}
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-2.5">
                  <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block">
                      Environmental Hazard Profile
                    </span>
                    <span className="text-zinc-200">{selectedNode.hazard}</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: 02 PHYSICS TELEMETRY */}
            {radarMode === "physics" && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.06] space-y-3">
                  {/* Gravity Gauge */}
                  <div>
                    <div className="flex justify-between text-[10px] font-mono mb-1">
                      <span className="text-zinc-400">SURFACE GRAVITY GRADIENT</span>
                      <span className="text-white">{selectedNode.gravity}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-400 transition-all duration-500"
                        style={{ width: `${Math.min(100, (selectedNode.gravityNumeric / 1.2) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Atmospheric Pressure Gauge */}
                  <div>
                    <div className="flex justify-between text-[10px] font-mono mb-1">
                      <span className="text-zinc-400">BAROMETRIC ATMOSPHERE</span>
                      <span className="text-white">{selectedNode.atmospherePressure}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 transition-all duration-500"
                        style={{ width: `${Math.min(100, selectedNode.pressureNumeric * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/[0.06]">
                    <span className="text-zinc-500 text-[9px] uppercase tracking-wider block mb-0.5">
                      Orbital Period
                    </span>
                    <span className="text-zinc-200 font-medium">{selectedNode.orbitalPeriod}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/[0.06]">
                    <span className="text-zinc-500 text-[9px] uppercase tracking-wider block mb-0.5">
                      Phase Alignment
                    </span>
                    <span className="text-zinc-200 font-medium">{selectedNode.phaseAngle}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/[0.06]">
                    <span className="text-zinc-500 text-[9px] uppercase tracking-wider block mb-0.5">
                      Propulsion Class
                    </span>
                    <span className="text-zinc-200 font-medium">{selectedNode.propulsionTier}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/[0.06]">
                    <span className="text-zinc-500 text-[9px] uppercase tracking-wider block mb-0.5">
                      Sensor Frequency
                    </span>
                    <span className="text-zinc-200 font-medium">{selectedNode.sensorFrequency}</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: 03 RESOURCE SPECTROMETRY */}
            {radarMode === "spectrometry" && (
              <div className="space-y-3">
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block">
                  Strategic Spectrometry Analysis:
                </span>
                <div className="space-y-2">
                  {selectedNode.spectrometryYields.map((yieldItem) => (
                    <div
                      key={yieldItem.name}
                      className="p-3 rounded-2xl bg-black/40 border border-white/[0.06] flex items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: selectedNode.accentColor }} />
                          <span className="font-semibold text-white">{yieldItem.name}</span>
                        </div>
                        <span className="text-[11px] text-zinc-400">{yieldItem.utility}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-white/[0.06] font-mono text-[10px] text-zinc-300 shrink-0">
                        {yieldItem.grade}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Strategic Mineral Chips & Action Capsule */}
          <div className="pt-5 border-t border-white/[0.06] space-y-4">
            <div>
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-2">
                Primary Mineral Deposits:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.keyResources.map((mineral) => (
                  <span
                    key={mineral}
                    className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 font-mono text-[10px] tracking-wide"
                  >
                    {mineral}
                  </span>
                ))}
              </div>
            </div>

            {/* Trajectory Calculation Action Bar */}
            <div className="pt-2">
              {isCalculatingVector ? (
                <div className="p-3 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-300">
                    <span className="flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                      CALCULATING FLIGHT VECTOR...
                    </span>
                    <span>{vectorProgress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 transition-all duration-100 ease-out"
                      style={{ width: `${vectorProgress}%` }}
                    />
                  </div>
                </div>
              ) : vectorAcquired ? (
                <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="font-semibold block">TRANSIT VECTOR ACQUIRED</span>
                      <span className="text-[10px] font-mono text-emerald-400/80">
                        ESTIMATED ARRIVAL: 3.42s // 45.0 KM/S IMPULSE
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCalculateVector}
                    className="px-3 py-1.5 rounded-full bg-emerald-400/20 hover:bg-emerald-400/30 border border-emerald-400/40 text-emerald-200 font-mono text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Recalculate
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleCalculateVector}
                  className="w-full py-3 px-5 rounded-full bg-white text-black hover:bg-zinc-200 font-medium text-xs font-mono uppercase tracking-wider transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] shadow-lg shadow-white/10 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 fill-black" />
                  <span>CALCULATE FLIGHT VECTOR</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
