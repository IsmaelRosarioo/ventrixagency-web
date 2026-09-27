"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, Waves, Play, Sliders } from "lucide-react";

interface AcousticEnvironment {
  id: string;
  name: string;
  elevation: string;
  biome: string;
  rt60: number; // in seconds
  reverbWetPercent: number;
  reflectionCoefficient: number;
  absorptionRate: string;
  roomVolume: string;
  description: string;
  rayBounces: number;
}

const ACOUSTIC_ENVIRONMENTS: AcousticEnvironment[] = [
  {
    id: "open_plains",
    name: "Open Plains (Grassland)",
    elevation: "Y=68",
    biome: "Terralith Steppe",
    rt60: 0.08,
    reverbWetPercent: 5,
    reflectionCoefficient: 0.04,
    absorptionRate: "96.0% (Atmospheric Falloff)",
    roomVolume: "Infinite Free-Field",
    description: "Free-field acoustics. Direct acoustic pressure wave attenuates strictly by inverse-square law with zero ground reflection clutter.",
    rayBounces: 1,
  },
  {
    id: "redwood_forest",
    name: "Redwood Canopy",
    elevation: "Y=84",
    biome: "Terralith Giant Taiga",
    rt60: 0.42,
    reverbWetPercent: 28,
    reflectionCoefficient: 0.22,
    absorptionRate: "78.0% (Canopy Foliage Damping)",
    roomVolume: "Semi-Open Canopy",
    description: "High-frequency attenuation through biological canopy foliage. Soft diffuse scattering with gentle low-frequency reflections.",
    rayBounces: 4,
  },
  {
    id: "deep_cavern",
    name: "Deepslate Grand Cavern",
    elevation: "Y=-52",
    biome: "Terralith Abyssal Chasm",
    rt60: 3.85,
    reverbWetPercent: 82,
    reflectionCoefficient: 0.92,
    absorptionRate: "8.0% (Hard Polished Stone)",
    roomVolume: "284,000 m³ Volumetric Cavity",
    description: "Massive subterranean cavity. Polished deepslate vault walls produce long reverberant impulse tails and dramatic low-frequency resonances.",
    rayBounces: 16,
  },
  {
    id: "dripstone_chasm",
    name: "Dripstone Cathedral",
    elevation: "Y=-28",
    biome: "Terralith Karst Chasm",
    rt60: 5.40,
    reverbWetPercent: 94,
    reflectionCoefficient: 0.96,
    absorptionRate: "4.0% (Specular Stalactite Echo)",
    roomVolume: "492,000 m³ Natural Cathedral",
    description: "Immense vertical chasm. Distinct flutter echoes with secondary wavefront reflections bouncing between distant stalactites.",
    rayBounces: 24,
  },
];

export function AcousticWaveformVisualizer() {
  const [selectedEnvId, setSelectedEnvId] = useState<string>("deep_cavern");
  const [customWetMix, setCustomWetMix] = useState<number | null>(null);
  const [testSoundType, setTestSoundType] = useState<"footstep" | "pickaxe" | "droplet">("pickaxe");
  const [impulseTime, setImpulseTime] = useState<number>(0);
  const [isPlayingImpulse, setIsPlayingImpulse] = useState<boolean>(false);

  const selectedEnv = ACOUSTIC_ENVIRONMENTS.find((e) => e.id === selectedEnvId) || ACOUSTIC_ENVIRONMENTS[2];
  const activeWetMix = customWetMix !== null ? customWetMix : selectedEnv.reverbWetPercent;

  // Waveform animation frame
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Trigger test impulse
  const fireImpulse = () => {
    setImpulseTime(Date.now());
    setIsPlayingImpulse(true);
    setTimeout(() => {
      setIsPlayingImpulse(false);
    }, Math.max(800, selectedEnv.rt60 * 1000));
  };

  // Real-time canvas rendering of impulse response & volumetric reverberation
  useEffect(() => {
    let animationFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let localClock = 0;

    const render = () => {
      localClock += 0.03;
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Draw Center Baseline
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.07)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Calculate impulse decay factor
      const timeSinceImpulse = (Date.now() - impulseTime) / 1000;
      const decayDuration = selectedEnv.rt60;
      const impulseActive = timeSinceImpulse >= 0 && timeSinceImpulse <= decayDuration + 0.2;
      const impulseEnvelope = impulseActive ? Math.exp(-timeSinceImpulse * (3.0 / (selectedEnv.rt60 || 0.1))) : 0;

      // Draw Volumetric Waveform Bars (64 columns)
      const barCount = 56;
      const barWidth = width / barCount - 2;

      for (let i = 0; i < barCount; i++) {
        const x = i * (barWidth + 2) + 2;
        const normalizedX = i / barCount;

        // Base ambient flutter (subtle acoustic breath)
        const ambientFlutter = Math.sin(normalizedX * 12 + localClock * 2) * Math.cos(normalizedX * 6 - localClock) * 4;

        // Impulse wavefront
        let impulseAmplitude = 0;
        if (impulseActive) {
          // Primary Direct wave
          const directWave = Math.sin(normalizedX * 24 - timeSinceImpulse * 30) * Math.exp(-normalizedX * 2.5);

          // Late Reverberation tail based on activeWetMix and RT60
          const reverbFactor = activeWetMix / 100;
          const lateReverb =
            Math.sin(normalizedX * 18 + localClock * 4) *
            Math.cos(normalizedX * 36 - localClock * 2) *
            reverbFactor *
            impulseEnvelope *
            (selectedEnv.rt60 / 1.5);

          // Frequency signature based on sound type
          const freqMod = testSoundType === "pickaxe" ? 1.6 : testSoundType === "droplet" ? 2.8 : 0.9;

          impulseAmplitude = (directWave * (1 - reverbFactor * 0.5) + lateReverb) * impulseEnvelope * 48 * freqMod;
        }

        const totalHeight = Math.max(2, Math.abs(ambientFlutter + impulseAmplitude));
        const yTop = centerY - totalHeight;

        // Gradient color for acoustic wave
        const alpha = impulseActive
          ? Math.min(1, 0.4 + (impulseEnvelope * (activeWetMix > 50 ? 0.6 : 0.4)))
          : 0.2;

        ctx.fillStyle = impulseActive
          ? activeWetMix > 60
            ? `rgba(103, 232, 249, ${alpha})` // Cryo-cyan for wet cavern reverberation
            : `rgba(255, 255, 255, ${alpha})` // Pure white for direct sound
          : `rgba(255, 255, 255, ${alpha * 0.8})`;

        // Rounded bar caps
        ctx.fillRect(x, yTop, barWidth, totalHeight * 2);
      }

      // Draw Smooth Continuous Raycast Envelope Spline
      ctx.beginPath();
      ctx.strokeStyle = activeWetMix > 60 ? "rgba(103, 232, 249, 0.75)" : "rgba(255, 255, 255, 0.8)";
      ctx.lineWidth = 1.5;

      for (let i = 0; i < barCount; i++) {
        const x = i * (barWidth + 2) + barWidth / 2;
        const normalizedX = i / barCount;
        const decayCurve = Math.exp(-normalizedX * (3.5 / (selectedEnv.rt60 + 0.05)));
        const envelopeHeight = impulseActive ? decayCurve * impulseEnvelope * 60 : 4;
        const y = centerY - envelopeHeight;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [selectedEnv, activeWetMix, impulseTime, testSoundType]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Interactive Waveform Oscilloscope (Left Column) */}
      <div className="lg:col-span-7 bg-[#0c0d12] border border-white/[0.08] rounded-2xl p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden">
        {/* Top Header */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.06] mb-4">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isPlayingImpulse ? "bg-cyan-400 animate-ping" : "bg-emerald-400 animate-pulse"}`} />
              <span className="font-mono text-[11px] text-zinc-300 uppercase tracking-wider">
                VOLUMETRIC ACOUSTICS {"//"} SOUND PHYSICS REMASTERED
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fireImpulse}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white text-black hover:bg-zinc-200 font-mono text-[11px] uppercase font-semibold transition-colors cursor-pointer"
              >
                <Play className="w-3 h-3 fill-current" />
                Emit Acoustic Impulse
              </button>
            </div>
          </div>

          {/* Sound Source Type Selector */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-500 uppercase">
              <Volume2 className="w-3 h-3 text-zinc-400" />
              IMPULSE STIMULUS:
            </div>
            <div className="flex items-center gap-1.5">
              {(["pickaxe", "footstep", "droplet"] as const).map((sound) => (
                <button
                  key={sound}
                  onClick={() => setTestSoundType(sound)}
                  className={`px-2 py-0.5 rounded font-mono text-[10px] uppercase transition-all cursor-pointer ${
                    testSoundType === sound
                      ? "bg-white/[0.1] text-white border border-white/[0.2]"
                      : "text-zinc-500 hover:text-zinc-300 border border-transparent"
                  }`}
                >
                  {sound === "pickaxe" ? "4.2kHz Strike" : sound === "footstep" ? "250Hz Step" : "8kHz Droplet"}
                </button>
              ))}
            </div>
          </div>

          {/* Real-time Oscilloscope Canvas */}
          <div className="relative w-full aspect-[16/9] max-h-[280px] bg-black/70 rounded-xl border border-white/[0.06] p-2 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-subtle-grid opacity-20 pointer-events-none" />

            <canvas
              ref={canvasRef}
              width={560}
              height={260}
              className="w-full h-full select-none"
            />

            {/* In-canvas Telemetry Badge */}
            <div className="absolute top-3 left-3 flex items-center gap-2 font-mono text-[10px] bg-black/60 backdrop-blur px-2.5 py-1 rounded border border-white/[0.08]">
              <span className="text-zinc-500">DECAY PROFILE:</span>
              <span className="text-white font-medium">RT60 = {selectedEnv.rt60.toFixed(2)}s</span>
              <span className="text-cyan-400 font-semibold">({activeWetMix}% WET)</span>
            </div>

            {isPlayingImpulse && (
              <div className="absolute top-3 right-3 font-mono text-[9px] uppercase px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 animate-pulse">
                Raytracing Wavefront Propagating
              </div>
            )}
          </div>

          {/* Interactive Wet/Dry Reverberation Slider */}
          <div className="mt-4 p-3 rounded-xl bg-black/50 border border-white/[0.06]">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="flex items-center gap-1.5 text-zinc-400">
                <Sliders className="w-3.5 h-3.5 text-zinc-300" />
                TACTILE REVERB BLEND (DRY ↔ WET):
              </span>
              <span className="text-white font-medium">
                {100 - activeWetMix}% Dry / {activeWetMix}% Wet
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={activeWetMix}
              onChange={(e) => setCustomWetMix(parseInt(e.target.value, 10))}
              className="w-full accent-white h-1.5 bg-white/[0.1] rounded-lg cursor-pointer"
            />

            <div className="flex justify-between text-[9px] font-mono text-zinc-500 mt-1">
              <span>0% (Anechoic Chamber)</span>
              <span>Default: {selectedEnv.reverbWetPercent}%</span>
              <span>100% (Grand Cathedral)</span>
            </div>
          </div>
        </div>

        {/* Bottom Raytracing Spec */}
        <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-500">
          <span>RAYCAST TRACER: {selectedEnv.rayBounces} SPECULAR BOUNCES / PULSE</span>
          <span className="text-emerald-400 font-medium">ZERO TICK DROP (SUB-MS CACHE)</span>
        </div>
      </div>

      {/* Environment Acoustic Profiles (Right Column) */}
      <div className="lg:col-span-5 bg-[#0c0d12] border border-white/[0.08] rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-4">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block">
                TERRALITH &amp; SOUND PHYSICS {"//"} DALLAS CORE
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mt-0.5">
                Acoustic Raytracing
              </h3>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] font-mono text-[11px] text-zinc-300">
              <Waves className="w-3.5 h-3.5 text-cyan-400" />
              <span>3D RAYCAST</span>
            </div>
          </div>

          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4">
            Every cubic block casts acoustic ray reflections. Sound waves bounce realistically off subterranean deepslate, echo through giant caverns, and absorb gently into dense forest foliage.
          </p>

          {/* Environment Selector Radio Cards */}
          <div className="space-y-2 mb-5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 block mb-1">
              SELECT VOLUMETRIC ENVIRONMENT:
            </span>
            {ACOUSTIC_ENVIRONMENTS.map((env) => {
              const isSelected = selectedEnvId === env.id;
              return (
                <button
                  key={env.id}
                  onClick={() => {
                    setSelectedEnvId(env.id);
                    setCustomWetMix(null); // Reset to preset value
                  }}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white/[0.06] border-white/30 text-white shadow-md"
                      : "bg-black/30 border-white/[0.04] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-semibold">{env.name}</span>
                    <span className="font-mono text-[10px] text-cyan-400">RT60: {env.rt60}s</span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500">
                    <span>{env.biome}</span>
                    <span>{env.elevation} • {env.reverbWetPercent}% Wet</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Telemetry Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06]">
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block mb-0.5">
                Volumetric Chamber
              </span>
              <span className="font-mono text-xs sm:text-sm font-medium text-white truncate block">
                {selectedEnv.roomVolume}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06]">
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block mb-0.5">
                Impulse Decay (RT60)
              </span>
              <span className="font-mono text-xs sm:text-sm font-medium text-white">
                {selectedEnv.rt60.toFixed(2)} seconds
              </span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06]">
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block mb-0.5">
                Reflection Coefficient
              </span>
              <span className="font-mono text-xs font-medium text-zinc-200">
                {(selectedEnv.reflectionCoefficient * 100).toFixed(0)}% Hard Surface
              </span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06]">
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block mb-0.5">
                Material Damping
              </span>
              <span className="font-mono text-xs font-medium text-zinc-200 truncate block">
                {selectedEnv.absorptionRate}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Spec Details */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-500">PHYSICS ENGINE:</span>
          <span className="text-zinc-300 font-medium">SOUND PHYSICS REMASTERED 1.20.1</span>
        </div>
      </div>
    </div>
  );
}
