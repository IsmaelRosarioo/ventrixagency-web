"use client";

import React, { useState } from "react";
import { AlertTriangle, RotateCw, Gauge, CheckCircle2 } from "lucide-react";

type RPMValue = 16 | 64 | 128 | 256;

interface KineticMachine {
  id: string;
  name: string;
  baseStressPerRpm: number;
  active: boolean;
  type: string;
}

// Function to generate mathematically accurate SVG gear teeth path
function createGearPath(
  cx: number,
  cy: number,
  teeth: number,
  outerRadius: number,
  rootRadius: number,
  boreRadius: number
): { gearPath: string; spokePath: string } {
  const points: string[] = [];
  const anglePerTooth = (2 * Math.PI) / teeth;
  const toothWidthAngle = anglePerTooth * 0.25;

  for (let i = 0; i < teeth; i++) {
    const baseAngle = i * anglePerTooth;
    const a0 = baseAngle;
    const a1 = baseAngle + toothWidthAngle * 0.8;
    const a2 = baseAngle + toothWidthAngle * 1.6;
    const a3 = baseAngle + toothWidthAngle * 2.4;
    const a4 = baseAngle + anglePerTooth;

    // Root -> Pitch Inward -> Outer Tip -> Pitch Outward -> Root
    const p0x = cx + rootRadius * Math.cos(a0);
    const p0y = cy + rootRadius * Math.sin(a0);

    const p1x = cx + outerRadius * Math.cos(a1);
    const p1y = cy + outerRadius * Math.sin(a1);

    const p2x = cx + outerRadius * Math.cos(a2);
    const p2y = cy + outerRadius * Math.sin(a2);

    const p3x = cx + rootRadius * Math.cos(a3);
    const p3y = cy + rootRadius * Math.sin(a3);

    const p4x = cx + rootRadius * Math.cos(a4);
    const p4y = cy + rootRadius * Math.sin(a4);

    if (i === 0) {
      points.push(`M ${p0x.toFixed(2)} ${p0y.toFixed(2)}`);
    } else {
      points.push(`L ${p0x.toFixed(2)} ${p0y.toFixed(2)}`);
    }
    points.push(`L ${p1x.toFixed(2)} ${p1y.toFixed(2)}`);
    points.push(`L ${p2x.toFixed(2)} ${p2y.toFixed(2)}`);
    points.push(`L ${p3x.toFixed(2)} ${p3y.toFixed(2)}`);
    points.push(`L ${p4x.toFixed(2)} ${p4y.toFixed(2)}`);
  }
  points.push("Z");

  // Inner cutouts / Spokes
  const spokeCount = Math.min(teeth / 4, 6);
  const spokeHoles: string[] = [];
  const cutoutInner = boreRadius + 6;
  const cutoutOuter = rootRadius - 10;

  if (cutoutOuter > cutoutInner + 8) {
    const anglePerSpoke = (2 * Math.PI) / spokeCount;
    for (let s = 0; s < spokeCount; s++) {
      const sa1 = s * anglePerSpoke + 0.2;
      const sa2 = (s + 1) * anglePerSpoke - 0.2;

      const p1x = cx + cutoutInner * Math.cos(sa1);
      const p1y = cy + cutoutInner * Math.sin(sa1);
      const p2x = cx + cutoutOuter * Math.cos(sa1);
      const p2y = cy + cutoutOuter * Math.sin(sa1);
      const p3x = cx + cutoutOuter * Math.cos(sa2);
      const p3y = cy + cutoutOuter * Math.sin(sa2);
      const p4x = cx + cutoutInner * Math.cos(sa2);
      const p4y = cy + cutoutInner * Math.sin(sa2);

      spokeHoles.push(`M ${p1x.toFixed(2)} ${p1y.toFixed(2)} L ${p2x.toFixed(2)} ${p2y.toFixed(2)} A ${cutoutOuter} ${cutoutOuter} 0 0 1 ${p3x.toFixed(2)} ${p3y.toFixed(2)} L ${p4x.toFixed(2)} ${p4y.toFixed(2)} A ${cutoutInner} ${cutoutInner} 0 0 0 ${p1x.toFixed(2)} ${p1y.toFixed(2)} Z`);
    }
  }

  return { gearPath: points.join(" "), spokePath: spokeHoles.join(" ") };
}

export function KineticDrivetrain() {
  const [rpm, setRpm] = useState<RPMValue>(64);
  const [machines, setMachines] = useState<KineticMachine[]>([
    { id: "press", name: "Mechanical Press", baseStressPerRpm: 128, active: true, type: "Heavy Forging" },
    { id: "mixer", name: "Mechanical Mixer + Basin", baseStressPerRpm: 64, active: true, type: "Thermal Alloying" },
    { id: "crusher", name: "Crushing Wheel Pair", baseStressPerRpm: 256, active: true, type: "Ore Milling" },
    { id: "deployer", name: "Sequenced Deployer Track", baseStressPerRpm: 96, active: true, type: "Precision Assembly" },
  ]);

  const toggleMachine = (id: string) => {
    setMachines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, active: !m.active } : m))
    );
  };

  // Base Max Capacity from Steam Boiler Level 18
  const maxCapacity = 524288;

  // Compute active stress units
  const totalBaseStressPerRpm = machines
    .filter((m) => m.active)
    .reduce((acc, m) => acc + m.baseStressPerRpm, 0);

  // Basal transmission friction (constant minimum overhead)
  const transmissionOverhead = 2048;
  const currentStress = Math.min(
    Math.round(totalBaseStressPerRpm * rpm + transmissionOverhead),
    maxCapacity * 1.2
  );

  const stressPercentage = Math.min(100, Math.round((currentStress / maxCapacity) * 100));
  const isOverburdened = currentStress > maxCapacity;

  // Kinetic rotation duration in seconds: 60 / RPM, normalized for smooth visualization
  // 16 RPM -> 10s
  // 64 RPM -> 2.5s
  // 128 RPM -> 1.25s
  // 256 RPM -> 0.625s
  const baseCycleSec = (160 / rpm).toFixed(3);

  // Calculate Gears
  // Gear 1 (Main Driver): Large Cogwheel (Teeth: 24, R=75, root=63, bore=16)
  // Gear 2 (Intermediary): Medium Cogwheel (Teeth: 16, R=50, root=40, bore=12) - meshes with Gear 1
  // Gear 3 (Flywheel / Crown): Small Cogwheel (Teeth: 12, R=38, root=30, bore=10) - meshes with Gear 2
  const gear1 = createGearPath(140, 160, 24, 72, 60, 16);
  const gear2 = createGearPath(250, 160, 16, 48, 40, 12);
  const gear3 = createGearPath(330, 160, 12, 36, 29, 10);
  const gear4 = createGearPath(400, 160, 16, 48, 40, 12);

  // Animation durations:
  // Gear 1: baseCycleSec (CW)
  // Gear 2: baseCycleSec * (16/24) = baseCycleSec * 0.667 (CCW)
  // Gear 3: baseCycleSec * (12/24) = baseCycleSec * 0.5 (CW)
  // Gear 4: baseCycleSec * (16/24) = baseCycleSec * 0.667 (CCW)
  const g1Dur = `${baseCycleSec}s`;
  const g2Dur = `${(parseFloat(baseCycleSec) * (16 / 24)).toFixed(3)}s`;
  const g3Dur = `${(parseFloat(baseCycleSec) * (12 / 24)).toFixed(3)}s`;
  const g4Dur = `${(parseFloat(baseCycleSec) * (16 / 24)).toFixed(3)}s`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Interactive Rotational Drivetrain Canvas (Left) */}
      <div className="lg:col-span-7 bg-[#0c0d12] border border-white/[0.08] rounded-2xl p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden">
        {/* Top Control Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.06] mb-4 z-10">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isOverburdened ? "bg-red-500 animate-ping" : "bg-emerald-400 animate-pulse"
              }`}
            />
            <span className="font-mono text-[11px] text-zinc-300 uppercase tracking-wider">
              ROTATIONAL DRIVETRAIN {"//"} CREATE KINETICS
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-black/60 p-1 rounded-lg border border-white/[0.08]">
            <span className="font-mono text-[10px] text-zinc-500 px-2 uppercase">RPM:</span>
            {([16, 64, 128, 256] as RPMValue[]).map((val) => (
              <button
                key={val}
                onClick={() => setRpm(val)}
                className={`px-2.5 py-1 rounded font-mono text-xs transition-all cursor-pointer ${
                  rpm === val
                    ? "bg-white text-black font-semibold shadow"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic SVG Gear Mechanics */}
        <div className="relative w-full aspect-[16/10] max-h-[360px] mx-auto flex items-center justify-center bg-black/40 rounded-xl border border-white/[0.04] p-2">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-subtle-grid opacity-30 pointer-events-none" />

          {/* Drivetrain Inline Style for Keyframes */}
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes spin-cw {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes spin-ccw {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(-360deg); }
            }
            .gear-spin-g1 {
              transform-origin: 140px 160px;
              animation: spin-cw ${g1Dur} linear infinite;
            }
            .gear-spin-g2 {
              transform-origin: 250px 160px;
              animation: spin-ccw ${g2Dur} linear infinite;
            }
            .gear-spin-g3 {
              transform-origin: 330px 160px;
              animation: spin-cw ${g3Dur} linear infinite;
            }
            .gear-spin-g4 {
              transform-origin: 400px 160px;
              animation: spin-ccw ${g4Dur} linear infinite;
            }
            @keyframes shaft-pulse {
              0% { stroke-dashoffset: 0; }
              100% { stroke-dashoffset: -20; }
            }
            .shaft-anim {
              animation: shaft-pulse ${baseCycleSec}s linear infinite;
            }
          `}} />

          <svg
            viewBox="0 0 480 320"
            className="w-full h-full select-none"
            style={{ filter: "drop-shadow(0 0 25px rgba(0,0,0,0.9))" }}
          >
            <defs>
              <linearGradient id="gear-brass" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d4d4d8" />
                <stop offset="50%" stopColor="#71717a" />
                <stop offset="100%" stopColor="#3f3f46" />
              </linearGradient>

              <linearGradient id="gear-highlight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f4f4f5" />
                <stop offset="100%" stopColor="#a1a1aa" />
              </linearGradient>

              <radialGradient id="shaft-cap" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#71717a" />
                <stop offset="100%" stopColor="#18181b" />
              </radialGradient>
            </defs>

            {/* Backplane Transmission Shaft */}
            <rect x="60" y="154" width="370" height="12" fill="#18181b" rx="2" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <line
              x1="60"
              y1="160"
              x2="430"
              y2="160"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="2"
              strokeDasharray="4 6"
              className="shaft-anim"
            />

            {/* Steam Boiler Input Indicator */}
            <g transform="translate(45, 130)">
              <rect x="0" y="0" width="32" height="60" rx="6" fill="#10131a" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <text x="16" y="24" textAnchor="middle" fill="#71717a" fontSize="7" fontFamily="monospace">INPUT</text>
              <text x="16" y="38" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">LV18</text>
              <circle cx="16" cy="48" r="3" fill="#10b981" />
            </g>

            {/* GEAR 1: Large Drive Gear (CW) */}
            <g className="gear-spin-g1">
              <path d={gear1.gearPath} fill="url(#gear-brass)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
              <path d={gear1.spokePath} fill="#0c0d12" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <circle cx="140" cy="160" r="16" fill="url(#shaft-cap)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
              <rect x="138" y="154" width="4" height="12" fill="#000000" />
            </g>

            {/* GEAR 2: Medium Pinion (CCW) */}
            <g className="gear-spin-g2">
              <path d={gear2.gearPath} fill="url(#gear-brass)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
              <path d={gear2.spokePath} fill="#0c0d12" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <circle cx="250" cy="160" r="12" fill="url(#shaft-cap)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
              <rect x="248" y="155" width="4" height="10" fill="#000000" />
            </g>

            {/* GEAR 3: Speed Multiplier Pinion (CW) */}
            <g className="gear-spin-g3">
              <path d={gear3.gearPath} fill="url(#gear-highlight)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" />
              <circle cx="330" cy="160" r="10" fill="url(#shaft-cap)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
            </g>

            {/* GEAR 4: Output Driver Pinion (CCW) */}
            <g className="gear-spin-g4">
              <path d={gear4.gearPath} fill="url(#gear-brass)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
              <path d={gear4.spokePath} fill="#0c0d12" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <circle cx="400" cy="160" r="12" fill="url(#shaft-cap)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
              <rect x="398" y="155" width="4" height="10" fill="#000000" />
            </g>

            {/* Rotational Direction Arrows & Vector Overlay */}
            <g transform="translate(140, 68)">
              <text x="0" y="0" textAnchor="middle" fill="#a1a1aa" fontSize="9" fontFamily="monospace">
                DRIVE COGWHEEL (24T)
              </text>
              <text x="0" y="12" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="monospace">
                {rpm} RPM
              </text>
            </g>

            <g transform="translate(330, 240)">
              <text x="0" y="0" textAnchor="middle" fill="#a1a1aa" fontSize="8" fontFamily="monospace">
                STEP-UP PINION (12T)
              </text>
              <text x="0" y="12" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">
                {rpm * 2} RPM (2.0x RATIO)
              </text>
            </g>

            {/* Overburden Flash Warning Overlay if > 100% */}
            {isOverburdened && (
              <g transform="translate(240, 160)">
                <rect x="-100" y="-30" width="200" height="60" rx="8" fill="rgba(220, 38, 38, 0.9)" stroke="#fca5a5" strokeWidth="2" />
                <text x="0" y="-5" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="monospace">
                  OVERBURDENED
                </text>
                <text x="0" y="15" textAnchor="middle" fill="#fee2e2" fontSize="9" fontFamily="monospace">
                  KINETIC STRESS OVERFLOW
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Dynamic Stress Unit (SU) Impact Gauge */}
        <div className="pt-4 mt-2 border-t border-white/[0.06] z-10">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="flex items-center gap-2 text-zinc-400">
              <Gauge className="w-3.5 h-3.5 text-zinc-300" />
              NETWORK STRESS CAPACITY {"//"} SU
            </span>
            <span className={isOverburdened ? "text-red-400 font-bold" : "text-white font-medium"}>
              {currentStress.toLocaleString()} / {maxCapacity.toLocaleString()} SU ({stressPercentage}%)
            </span>
          </div>

          <div className="w-full h-3 bg-white/[0.05] rounded-full overflow-hidden p-0.5 border border-white/[0.08]">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isOverburdened
                  ? "bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]"
                  : stressPercentage > 75
                  ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                  : "bg-white shadow-[0_0_6px_rgba(255,255,255,0.4)]"
              }`}
              style={{ width: `${stressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Kinetic Telemetry & Attached Machinery (Right) */}
      <div className="lg:col-span-5 bg-[#0c0d12] border border-white/[0.08] rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block">
                CREATE 0.5.1 KINETICS {"//"} DALLAS CORE ENGINE
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mt-0.5">
                Stress Capacity HUD
              </h3>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] font-mono text-[11px] text-zinc-300">
              <RotateCw className="w-3 h-3 text-emerald-400 animate-spin" style={{ animationDuration: `${baseCycleSec}s` }} />
              <span>{rpm} RPM ACTIVE</span>
            </div>
          </div>

          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-5">
            Rotational kinetic energy scales linearly with shaft speed. As RPM steps up, downstream mechanical stress units multiply proportionally across all connected deployers, crushing wheels, and presses.
          </p>

          {/* Connected Machines Toggle Rack */}
          <div className="mb-5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 block mb-2">
              CONNECTED KINETIC ACTUATORS (CLICK TO TOGGLE):
            </span>
            <div className="space-y-2">
              {machines.map((m) => {
                const machineSU = m.active ? m.baseStressPerRpm * rpm : 0;
                return (
                  <button
                    key={m.id}
                    onClick={() => toggleMachine(m.id)}
                    className={`w-full p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                      m.active
                        ? "bg-white/[0.04] border-white/[0.15] text-white"
                        : "bg-black/30 border-white/[0.04] text-zinc-500 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 text-left">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          m.active ? "bg-emerald-400" : "bg-zinc-600"
                        }`}
                      />
                      <div>
                        <div className="text-xs font-medium">{m.name}</div>
                        <div className="text-[10px] font-mono text-zinc-500">{m.type}</div>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <span className="text-xs font-semibold text-zinc-200">
                        {m.active ? `+${machineSU.toLocaleString()} SU` : "OFFLINE"}
                      </span>
                      <span className="text-[9px] text-zinc-500 block">
                        ({m.baseStressPerRpm} SU / RPM)
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subsystem Specifications Grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06]">
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block mb-0.5">
                Shaft Angular Velocity
              </span>
              <span className="font-mono text-xs sm:text-sm font-medium text-white">
                {(rpm * 0.10472).toFixed(2)} rad/s ({rpm} RPM)
              </span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06]">
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block mb-0.5">
                Calculated Kinetic Torque
              </span>
              <span className="font-mono text-xs sm:text-sm font-medium text-white">
                {Math.round(maxCapacity / (rpm || 1)).toLocaleString()} N·m
              </span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06]">
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block mb-0.5">
                Boiler Efficiency
              </span>
              <span className="font-mono text-xs font-medium text-emerald-400">
                99.8% (Zero Thermal Leak)
              </span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06]">
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block mb-0.5">
                Transmission Loss
              </span>
              <span className="font-mono text-xs font-medium text-zinc-200">
                0.00% (Sub-tick Sync)
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Alert / Status banner */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-500">MECHANICAL STATUS:</span>
          {isOverburdened ? (
            <span className="flex items-center gap-1.5 text-red-400 font-bold">
              <AlertTriangle className="w-3.5 h-3.5" />
              SAFETY CLUTCH ENGAGED
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              NETWORK STABLE & BALANCED
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
