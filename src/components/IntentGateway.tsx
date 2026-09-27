"use client";

import React, { useState, useEffect } from "react";
import {
  Compass,
  RotateCcw,
  Download,
  Cpu,
  Layers,
  Check,
  Copy,
  ExternalLink,
  Map,
  Activity,
  Terminal,
  Train,
  Rocket,
  BookOpen,
  Zap,
  Sliders,
  ShieldCheck,
} from "lucide-react";

interface IntentGatewayProps {
  onOpenJoinModal?: () => void;
  onOpenBlueMapModal?: () => void;
}

interface ServerTelemetry {
  online: boolean;
  players: { online: number; max: number };
  latency: number;
  version: string;
  tps: number;
  motdClean: string;
}

export function IntentGateway({
  onOpenJoinModal,
  onOpenBlueMapModal,
}: IntentGatewayProps) {
  const [activeTrack, setActiveTrack] = useState<"explorer" | "pioneer">("explorer");
  const [ramAllocation, setRamAllocation] = useState<number>(8);
  const [copiedIp, setCopiedIp] = useState<boolean>(false);
  const [copiedJvm, setCopiedJvm] = useState<boolean>(false);
  const [telemetry, setTelemetry] = useState<ServerTelemetry>({
    online: true,
    players: { online: 0, max: 20 },
    latency: 24,
    version: "1.21.1 NeoForge",
    tps: 20.0,
    motdClean: "Ventrix — Frontier\nAn uncharted adventure awaits.",
  });

  useEffect(() => {
    fetch("/api/server-status")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.online === "boolean") {
          setTelemetry(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleCopyIp = () => {
    navigator.clipboard.writeText("mc.ventrixagency.com");
    setCopiedIp(true);
    setTimeout(() => setCopiedIp(false), 2000);
  };

  const handleCopyJvm = () => {
    const jvmString = `-Xms${ramAllocation}G -Xmx${ramAllocation}G -XX:+UseZGC -XX:+ZGenerational`;
    navigator.clipboard.writeText(jvmString);
    setCopiedJvm(true);
    setTimeout(() => setCopiedJvm(false), 2000);
  };

  // RAM allocation status calculation
  const getRamEvaluation = (gb: number) => {
    if (gb < 6) {
      return {
        label: "Inadequate for 514 Mods",
        colorText: "text-rose-400",
        bgBadge: "bg-rose-500/10 border-rose-500/20 text-rose-300",
        meterGradient: "from-rose-500 to-amber-500",
        recommendation: "Increase to at least 8 GB to avoid Java heap exhaustion.",
      };
    }
    if (gb < 8) {
      return {
        label: "Marginal // Light Shaders",
        colorText: "text-amber-400",
        bgBadge: "bg-amber-500/10 border-amber-500/20 text-amber-300",
        meterGradient: "from-amber-500 to-yellow-400",
        recommendation: "Playable at default settings; 8 GB recommended for stable tick rate.",
      };
    }
    if (gb <= 10) {
      return {
        label: "Optimal Target // Recommended",
        colorText: "text-emerald-400",
        bgBadge: "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
        meterGradient: "from-emerald-500 to-cyan-400",
        recommendation: "Perfect balance for 514 mods, high-speed rail, and orbital re-entry.",
      };
    }
    return {
      label: "High-Fidelity // Distant Shaders",
      colorText: "text-cyan-400",
      bgBadge: "bg-cyan-500/10 border-cyan-500/20 text-cyan-300",
      meterGradient: "from-cyan-500 to-indigo-400",
      recommendation: "Ideal for 32+ chunk render distance with Iris shaders enabled.",
    };
  };

  const ramEvaluation = getRamEvaluation(ramAllocation);
  const ramMeterPercent = Math.min(100, Math.max(0, ((ramAllocation - 4) / 12) * 100));

  return (
    <section id="gateway" className="feature-section immersive-section relative py-28 md:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Dynamic Ambient Atmospheric Blooms */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-emerald-500/10 via-cyan-500/5 to-transparent blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(16,185,129,0.06),transparent_70%)] pointer-events-none -z-10" />

      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400 font-mono text-xs uppercase tracking-[0.22em] mb-4 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>EXPEDITION ARCHITECTURE // INTENT GATEWAY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-[-0.02em] font-normal leading-[1.12] mb-3">
            Tailored for Every Pioneer.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed text-balance">
            Select your operational pathway. First-time explorers receive a streamlined 3-minute onboarding terminal with interactive heap calibration, while returning commanders access real-time Dallas Core cluster telemetry, 3.0.2 changelog briefs, and orbital BlueMap cartography.
          </p>
        </div>

        {/* Floating Dual-Track Segmented Controller */}
        <div className="inline-flex p-1.5 rounded-full bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl shrink-0 self-start md:self-auto shadow-inner gap-1">
          <button
            onClick={() => setActiveTrack("explorer")}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full font-mono text-xs transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer select-none ${
              activeTrack === "explorer"
                ? "bg-white text-black font-semibold shadow-lg shadow-white/10"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            <Compass className="w-4 h-4" />
            <div className="text-left leading-tight">
              <span className="block font-medium">New Explorer</span>
              <span className={`block text-[10px] uppercase tracking-wider ${activeTrack === "explorer" ? "text-zinc-600" : "text-zinc-500"}`}>
                3-MIN QUICKSTART
              </span>
            </div>
          </button>

          <button
            onClick={() => setActiveTrack("pioneer")}
            className={`flex items-center gap-2.5 px-6 py-2.5 rounded-full font-mono text-xs transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer select-none ${
              activeTrack === "pioneer"
                ? "bg-white text-black font-semibold shadow-lg shadow-white/10"
                : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <div className="text-left leading-tight">
              <span className="block font-medium">Returning Pioneer</span>
              <span className={`block text-[10px] uppercase tracking-wider ${activeTrack === "pioneer" ? "text-zinc-600" : "text-zinc-500"}`}>
                OPERATIONAL BRIEFING
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TRACK A: NEW EXPLORER 3-MINUTE ONBOARDING                                 */}
      {/* ========================================================================= */}
      {activeTrack === "explorer" && (
        <div className="space-y-8 animate-fadeIn">
          {/* Timeline Bar Indicator */}
          <div className="hidden md:grid grid-cols-3 gap-6 pb-3 border-b border-white/[0.06] text-xs font-mono text-zinc-500">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center text-[10px] font-medium">01</span>
              <span className="text-zinc-300">Client Launcher Choice</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center text-[10px] font-medium">02</span>
              <span className="text-zinc-300">8–10 GB RAM Allocation</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center text-[10px] font-medium">03</span>
              <span className="text-zinc-300">Direct Handshake</span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Card 1: Launcher Choice (Prism / CurseForge) */}
            <div className="floating-showcase-panel rounded-[30px] p-6 sm:p-8 border border-white/10 shadow-[0_34px_90px_rgba(0,0,0,0.5)] flex flex-col justify-between hover:border-white/[0.18] transition-all duration-300">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.22em] text-zinc-500 mb-4 pb-3 border-b border-white/[0.05]">
                  <span>STEP 01 // RUNTIME ENGINE</span>
                  <span className="text-zinc-400 font-medium">~60 SEC</span>
                </div>

                <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-200 mb-4">
                  <Download className="w-4 h-4 text-cyan-400" />
                </div>

                <h3 className="text-xl font-medium text-white tracking-[-0.035em] mb-2">
                  Client Launcher Choice
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                  Select your client orchestrator. Both options automatically resolve modpack dependencies, configure NeoForge 21.1.249, and isolate Java 21 runtimes.
                </p>

                {/* Launcher Selection Options */}
                <div className="space-y-3 mb-6">
                  <a
                    href="https://prismlauncher.org/download/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.18] hover:bg-white/[0.06] active:scale-[0.98] transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">
                          Prism Launcher
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                          Recommended
                        </span>
                      </div>
                      <span className="text-xs text-zinc-400 font-mono block mt-0.5">
                        Clean instance isolation • Java 21 auto-detect
                      </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors shrink-0" />
                  </a>

                  <a
                    href="https://www.curseforge.com/download/app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.18] hover:bg-white/[0.06] active:scale-[0.98] transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors">
                          CurseForge App
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-zinc-400">
                          One-Click
                        </span>
                      </div>
                      <span className="text-xs text-zinc-400 font-mono block mt-0.5">
                        Automated package synchronization
                      </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors shrink-0" />
                  </a>
                </div>
              </div>

              {/* Monospace Footer Spec */}
              <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>PROFILE: 3.0.2</span>
                <span>NEOFORGE 21.1.249</span>
              </div>
            </div>

            {/* Card 2: Interactive RAM Allocation Slider & Visual Meter */}
            <div className="floating-showcase-panel rounded-[30px] p-6 sm:p-8 border border-white/10 shadow-[0_34px_90px_rgba(0,0,0,0.5)] flex flex-col justify-between hover:border-white/[0.18] transition-all duration-300">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.22em] text-zinc-500 mb-4 pb-3 border-b border-white/[0.05]">
                  <span>STEP 02 // HEAP CALIBRATION</span>
                  <span className={`font-medium ${ramEvaluation.colorText}`}>
                    {ramAllocation} GB ALLOCATED
                  </span>
                </div>

                <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-200 mb-4">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                </div>

                <h3 className="text-xl font-medium text-white tracking-[-0.035em] mb-2">
                  RAM Allocation & Heap Calibration
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed mb-5">
                  Ventrix: Frontier harmonizes 514 complex modifications. Allocating 8 to 10 GB in your launcher settings eliminates Java GC micro-stutters during orbital re-entry and kinetic rail operation.
                </p>

                {/* Interactive Smooth Visual Meter Panel */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-4 space-y-3.5">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-zinc-400">Target Memory Heap</span>
                    <span className="text-white font-semibold">{ramAllocation} GB ({ramAllocation * 1024} MB)</span>
                  </div>

                  {/* Smooth Visual Progress Bar */}
                  <div className="relative w-full h-3 bg-white/[0.05] rounded-full overflow-hidden p-0.5 border border-white/[0.05]">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${ramEvaluation.meterGradient} transition-all duration-200 ease-out`}
                      style={{ width: `${ramMeterPercent}%` }}
                    />
                  </div>

                  {/* Slider Control */}
                  <div className="space-y-1">
                    <input
                      type="range"
                      min={4}
                      max={16}
                      step={1}
                      value={ramAllocation}
                      onChange={(e) => setRamAllocation(Number(e.target.value))}
                      className="w-full h-2 bg-white/[0.08] rounded-lg appearance-none cursor-pointer accent-white focus:outline-none"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-zinc-400 pt-1">
                      <span>4 GB</span>
                      <span className="text-zinc-400">6 GB</span>
                      <span className="text-emerald-400 font-semibold">8 GB (Target)</span>
                      <span className="text-cyan-400 font-semibold">10 GB</span>
                      <span>16 GB</span>
                    </div>
                  </div>

                  {/* Quick-Select Presets */}
                  <div className="flex items-center gap-1.5 pt-1">
                    {[6, 8, 10, 12].map((gb) => (
                      <button
                        key={gb}
                        onClick={() => setRamAllocation(gb)}
                        className={`flex-1 py-1 rounded-lg text-[10px] font-mono transition-all duration-150 cursor-pointer ${
                          ramAllocation === gb
                            ? "bg-white text-black font-semibold shadow-sm"
                            : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08]"
                        }`}
                      >
                        {gb} GB
                      </button>
                    ))}
                  </div>

                  {/* Status Indicator Badge */}
                  <div className={`p-2.5 rounded-xl border text-[11px] font-mono ${ramEvaluation.bgBadge} flex items-center justify-between`}>
                    <span>{ramEvaluation.label}</span>
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  </div>
                </div>

                {/* Java 21 Flags Box with Instant Copy */}
                <div className="p-3.5 rounded-2xl bg-black/50 border border-white/[0.08] text-xs font-mono text-zinc-400 space-y-1.5 backdrop-blur-md">
                  <div className="flex items-center justify-between text-zinc-300">
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Java 21 Generational ZGC Flags</span>
                    </div>
                    <button
                      onClick={handleCopyJvm}
                      className="text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 active:scale-[0.98]"
                    >
                      {copiedJvm ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span className="text-[10px]">{copiedJvm ? "Copied" : "Copy Flags"}</span>
                    </button>
                  </div>
                  <div className="text-[11px] text-zinc-300 select-all break-all font-mono">
                    -Xms{ramAllocation}G -Xmx{ramAllocation}G -XX:+UseZGC -XX:+ZGenerational
                  </div>
                </div>
              </div>

              {/* Monospace Footer Spec */}
              <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-zinc-400 mt-4">
                <span>GARBAGE COLLECTION: ZGC</span>
                <span>SUB-1MS PAUSES</span>
              </div>
            </div>

            {/* Card 3: Direct Handshake (mc.ventrixagency.com) */}
            <div className="floating-showcase-panel rounded-[30px] p-6 sm:p-8 border border-white/10 shadow-[0_34px_90px_rgba(0,0,0,0.5)] flex flex-col justify-between hover:border-white/[0.18] transition-all duration-300">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.22em] text-zinc-500 mb-4 pb-3 border-b border-white/[0.05]">
                  <span>STEP 03 // CLUSTER HANDSHAKE</span>
                  <span className="text-emerald-400 font-medium">PUBLIC NODE</span>
                </div>

                <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-200 mb-4">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                </div>

                <h3 className="text-xl font-medium text-white tracking-[-0.035em] mb-2">
                  Direct Connect Endpoint
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                  Launch Minecraft Java Edition 1.21.1, navigate to <strong>Multiplayer</strong> &rarr; <strong>Direct Connection</strong>, and input the official cluster endpoint below.
                </p>

                {/* IP address box */}
                <div className="p-4 rounded-2xl bg-black/50 border border-white/[0.08] backdrop-blur-md mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-zinc-500">
                      PRIMARY SERVER ADDRESS
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      20.0 TPS LOCKED
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-sm sm:text-base font-semibold text-white tracking-wide">
                      mc.ventrixagency.com
                    </span>
                    <button
                      onClick={handleCopyIp}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-zinc-200 active:bg-zinc-300 text-black text-xs font-semibold transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer shrink-0 select-none shadow-sm"
                    >
                      {copiedIp ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedIp ? "Copied" : "Copy IP"}</span>
                    </button>
                  </div>
                </div>

                {/* Direct modal launcher button */}
                {onOpenJoinModal && (
                  <button
                    onClick={onOpenJoinModal}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.06] text-xs font-mono text-zinc-300 hover:text-white transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer select-none"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
                    <span>View Step-by-Step Interactive Guide</span>
                  </button>
                )}
              </div>

              {/* Monospace Footer Spec */}
              <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-zinc-400 mt-4">
                <span>PORT: 25686 (DEFAULT)</span>
                <span>NO WHITELIST REQUIRED</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TRACK B: RETURNING PIONEER OPERATIONAL BRIEFING                           */}
      {/* ========================================================================= */}
      {activeTrack === "pioneer" && (
        <div className="space-y-8 animate-fadeIn">
          {/* Top Banner Status Bar */}
          <div className="floating-showcase-panel rounded-2xl p-4 sm:p-5 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-white font-medium">Dallas Core Cluster Status: Operational</span>
              <span className="text-zinc-500 hidden sm:inline">|</span>
              <span className="text-zinc-400 hidden sm:inline">Firmware: Ventrix Frontier v3.0.2</span>
            </div>

            <div className="flex items-center gap-4 text-zinc-400">
              <span className="text-white">{telemetry.players.online} Pioneers Active</span>
              <span className="text-emerald-400">20.0 TPS Engine</span>
              <span>{telemetry.latency}ms Ping</span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Card 1: Dallas Core Telemetry */}
            <div className="floating-showcase-panel rounded-[30px] p-6 sm:p-8 border border-white/10 shadow-[0_34px_90px_rgba(0,0,0,0.5)] flex flex-col justify-between hover:border-white/[0.18] transition-all duration-300">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.22em] text-zinc-500 mb-4 pb-3 border-b border-white/[0.05]">
                  <span>LIVE TELEMETRY // DALLAS CORE</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    ONLINE
                  </span>
                </div>

                <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-200 mb-4">
                  <Activity className="w-4 h-4 text-emerald-400" />
                </div>

                <h3 className="text-xl font-medium text-white tracking-[-0.035em] mb-2">
                  Dallas Core Alpha Node
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                  Direct telemetry broadcast from the primary Ventrix Cloud Core production cluster in Dallas, Texas. High-throughput bare metal allocation.
                </p>

                {/* Telemetry Matrix Grid */}
                <div className="grid grid-cols-2 gap-2.5 p-4 rounded-2xl bg-black/50 border border-white/[0.06] backdrop-blur-md font-mono text-xs mb-6">
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block mb-0.5">Explorers Online</span>
                    <span className="text-white font-semibold text-sm">
                      {telemetry.players.online} <span className="text-zinc-500 text-xs font-normal">/ {telemetry.players.max}</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block mb-0.5">Tick Stability</span>
                    <span className="text-emerald-400 font-semibold text-sm">20.0 TPS (100%)</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block mb-0.5">Dallas Uplink</span>
                    <span className="text-white font-semibold text-sm">{telemetry.latency} ms</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-500 uppercase block mb-0.5">Cluster Node</span>
                    <span className="text-zinc-300 text-xs">US-Central Core</span>
                  </div>
                </div>

                {/* Host Quick Copy */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] font-mono text-xs">
                  <span className="text-zinc-300 font-medium">mc.ventrixagency.com</span>
                  <button
                    onClick={handleCopyIp}
                    className="text-zinc-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 active:scale-[0.98]"
                  >
                    {copiedIp ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedIp ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>

              {/* Monospace Footer Spec */}
              <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-zinc-400 mt-4">
                <span>CPU: AMD RYZEN 9 9950X3D</span>
                <span>5.7 GHZ BOOST</span>
              </div>
            </div>

            {/* Card 2: 3.0.2 Changelog Highlights */}
            <div className="floating-showcase-panel rounded-[30px] p-6 sm:p-8 border border-white/10 shadow-[0_34px_90px_rgba(0,0,0,0.5)] flex flex-col justify-between hover:border-white/[0.18] transition-all duration-300">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.22em] text-zinc-500 mb-4 pb-3 border-b border-white/[0.05]">
                  <span>FIRMWARE UPDATE // PATCH 3.0.2</span>
                  <span className="text-zinc-300 font-medium">LATEST RELEASE</span>
                </div>

                <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-200 mb-4">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                </div>

                <h3 className="text-xl font-medium text-white tracking-[-0.035em] mb-2">
                  3.0.2 Changelog Highlights
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed mb-5">
                  Three major mechanical overhauls deployed across the frontier, expanding space logistics, rail automation, and quest milestones.
                </p>

                {/* Three Editorial Highlights */}
                <div className="space-y-3 mb-4">
                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Rocket className="w-3.5 h-3.5 text-cyan-400" />
                      <h4 className="text-xs font-semibold text-white tracking-tight">
                        Glacio Deep-Space Sector
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Tier-4 aerospace rocketry staging, extreme sub-zero cryo atmospheres, permafrost extraction drills, and frozen biome outpost colonization.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Train className="w-3.5 h-3.5 text-emerald-400" />
                      <h4 className="text-xs font-semibold text-white tracking-tight">
                        Continental Rail Corridors
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Automated semaphore block signaling, station schedule conductors, collision mitigation interlocking, and long-range transcontinental freight routing.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Layers className="w-3.5 h-3.5 text-violet-400" />
                      <h4 className="text-xs font-semibold text-white tracking-tight">
                        Expanded Quest Act IV: The Cosmic Voyage
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Comprehensive cosmic progression objectives, deep-space automation tiers, endgame relic integration, and milestone exploration rewards.
                    </p>
                  </div>
                </div>
              </div>

              {/* Monospace Footer Spec */}
              <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-zinc-400 mt-4">
                <span>BRANCH: FRONTIER-STABLE</span>
                <span>NEOFORGE 1.21.1</span>
              </div>
            </div>

            {/* Card 3: 3D BlueMap Launcher */}
            <div className="floating-showcase-panel rounded-[30px] p-6 sm:p-8 border border-white/10 shadow-[0_34px_90px_rgba(0,0,0,0.5)] flex flex-col justify-between hover:border-white/[0.18] transition-all duration-300">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.22em] text-zinc-500 mb-4 pb-3 border-b border-white/[0.05]">
                  <span>CARTOGRAPHY // ORBITAL MESH</span>
                  <span className="text-zinc-300 font-medium">60 FPS 3D</span>
                </div>

                <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-200 mb-4">
                  <Map className="w-4 h-4 text-cyan-400" />
                </div>

                <h3 className="text-xl font-medium text-white tracking-[-0.035em] mb-2">
                  3D BlueMap Launcher
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                  Inspect world territory, rail junctions, settlement claims, and expedition coordinates through our live GPU-accelerated volumetric 3D satellite feed.
                </p>

                {/* Map telemetry box */}
                <div className="p-4 rounded-2xl bg-black/50 border border-white/[0.06] backdrop-blur-md font-mono text-xs space-y-3 mb-6">
                  <div className="flex justify-between items-center pb-2 border-b border-white/[0.06]">
                    <span className="text-zinc-500">Volumetric Engine</span>
                    <span className="text-white">BlueMap v5.x</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-white/[0.06]">
                    <span className="text-zinc-500">Surface Mesh</span>
                    <span className="text-emerald-400">High-Res Isometric 3D</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500">Territory Claims</span>
                    <span className="text-zinc-300">Live FTB Chunks Sync</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2.5">
                  {onOpenBlueMapModal && (
                    <button
                      onClick={onOpenBlueMapModal}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white hover:bg-zinc-200 active:bg-zinc-300 text-black text-xs font-semibold transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer shadow-md shadow-white/5 select-none"
                    >
                      <Map className="w-4 h-4" />
                      <span>Launch 3D World Map (Modal)</span>
                    </button>
                  )}

                  <a
                    href="/map"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.06] active:bg-white/[0.04] text-xs font-mono text-zinc-300 hover:text-white transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] select-none"
                  >
                    <span>Open in Dedicated Browser Window</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                  </a>
                </div>
              </div>

              {/* Monospace Footer Spec */}
              <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-zinc-400 mt-4">
                <span>RESOLUTION: 1:1 VOXEL</span>
                <span>REAL-TIME OVERLAY</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
