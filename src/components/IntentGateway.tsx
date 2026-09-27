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
  const [copied, setCopied] = useState(false);
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
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="gateway" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400 font-mono text-[11px] uppercase tracking-widest mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            EXPEDITION ARCHITECTURE // INTENT GATEWAY
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium text-white tracking-[-0.035em] leading-[1.08] mb-3">
            Tailored for Every Pioneer.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Select your operational pathway. First-time visitors receive a concise 3-minute onboarding sequence, while returning commanders access real-time Dallas Core cluster telemetry, 3.0.2 patch highlights, and orbital BlueMap cartography.
          </p>
        </div>

        {/* Dual-Track Segmented Controller */}
        <div className="inline-flex p-1.5 rounded-2xl bg-[#090a0e] border border-white/[0.08] shrink-0 self-start md:self-auto shadow-inner">
          <button
            onClick={() => setActiveTrack("explorer")}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-mono text-xs transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer select-none ${
              activeTrack === "explorer"
                ? "bg-white text-black font-semibold shadow-md shadow-white/5"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]"
            }`}
          >
            <Compass className="w-4 h-4" />
            <div className="text-left leading-tight">
              <span className="block font-medium">New Explorer</span>
              <span className={`block text-[10px] ${activeTrack === "explorer" ? "text-zinc-600" : "text-zinc-500"}`}>
                3-MIN QUICKSTART
              </span>
            </div>
          </button>

          <button
            onClick={() => setActiveTrack("pioneer")}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-mono text-xs transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer select-none ${
              activeTrack === "pioneer"
                ? "bg-white text-black font-semibold shadow-md shadow-white/5"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]"
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <div className="text-left leading-tight">
              <span className="block font-medium">Returning Pioneer</span>
              <span className={`block text-[10px] ${activeTrack === "pioneer" ? "text-zinc-600" : "text-zinc-500"}`}>
                LIVE TELEMETRY & 3.0.2
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* TRACK A: NEW EXPLORER */}
      {activeTrack === "explorer" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Timeline Bar Indicator */}
          <div className="hidden md:grid grid-cols-3 gap-4 pb-2 border-b border-white/[0.06] text-xs font-mono text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">01</span>
              <span>Client Launcher Choice</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">02</span>
              <span>8–10 GB RAM Allocation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">03</span>
              <span>Direct Node Connect</span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Card 1: Launcher Choice (Prism / CurseForge) */}
            <div className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#0c0d12] border border-white/[0.08] hover:border-white/[0.14] transition-all duration-200">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-4 pb-3 border-b border-white/[0.05]">
                  <span>STEP 01 // RUNTIME ENGINE</span>
                  <span className="text-zinc-400 font-medium">~60 SEC</span>
                </div>

                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-200 mb-4">
                  <Download className="w-4 h-4" />
                </div>

                <h3 className="text-xl font-medium text-white tracking-[-0.035em] mb-2">
                  Client Launcher Choice
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                  Select your client orchestrator. Both options automatically resolve modpack dependencies, configure NeoForge 21.1.249, and isolate Java 21 runtimes.
                </p>

                {/* Launcher Selection Options */}
                <div className="space-y-2.5 mb-6">
                  <a
                    href="https://prismlauncher.org/download/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.18] hover:bg-white/[0.06] active:scale-[0.98] transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white group-hover:text-white">
                          Prism Launcher
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.08] text-zinc-200">
                          Recommended
                        </span>
                      </div>
                      <span className="text-xs text-zinc-400 font-mono">Clean instance isolation • Java 21 auto-detect</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors shrink-0" />
                  </a>

                  <a
                    href="https://www.curseforge.com/download/app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.18] hover:bg-white/[0.06] active:scale-[0.98] transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white group-hover:text-white">
                          CurseForge App
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-zinc-400">
                          One-Click
                        </span>
                      </div>
                      <span className="text-xs text-zinc-400 font-mono">Automated package synchronization</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors shrink-0" />
                  </a>
                </div>
              </div>

              {/* Monospace Footer Spec */}
              <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>PROFILE: 3.0.2</span>
                <span>NEOFORGE 21.1.249</span>
              </div>
            </div>

            {/* Card 2: 8-10 GB RAM Allocation Guide */}
            <div className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#0c0d12] border border-white/[0.08] hover:border-white/[0.14] transition-all duration-200">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-4 pb-3 border-b border-white/[0.05]">
                  <span>STEP 02 // HEAP CALIBRATION</span>
                  <span className="text-amber-400 font-medium">8–10 GB REQUIRED</span>
                </div>

                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-200 mb-4">
                  <Cpu className="w-4 h-4" />
                </div>

                <h3 className="text-xl font-medium text-white tracking-[-0.035em] mb-2">
                  8 GB – 10 GB RAM Allocation
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                  Ventrix: Frontier harmonizes 514 complex modifications. Allocating 8 to 10 GB in your launcher settings eliminates Java GC micro-stutters during orbital re-entry and kinetic rail operation.
                </p>

                {/* Memory Allocation Gauge */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] mb-5">
                  <div className="flex justify-between items-center text-xs font-mono mb-2">
                    <span className="text-zinc-400">Target Heap Range</span>
                    <span className="text-white font-medium">8,192 MB – 10,240 MB</span>
                  </div>

                  {/* Multi-segment memory gauge */}
                  <div className="grid grid-cols-4 gap-1.5 h-2 rounded-full overflow-hidden bg-white/[0.04] p-0.5 mb-3">
                    <div className="bg-zinc-700 rounded-sm" title="<6GB: Inadequate" />
                    <div className="bg-zinc-700 rounded-sm" title="6GB: Marginal" />
                    <div className="bg-white rounded-sm" title="8GB: Baseline Target" />
                    <div className="bg-zinc-300 rounded-sm" title="10GB: Recommended High-Fidelity" />
                  </div>

                  <div className="grid grid-cols-4 gap-1 text-[10px] font-mono text-center text-zinc-400">
                    <span>4 GB</span>
                    <span>6 GB</span>
                    <span className="text-white font-medium">8 GB</span>
                    <span className="text-zinc-200 font-medium">10 GB</span>
                  </div>
                </div>

                {/* Architecture JVM Argument */}
                <div className="p-3 rounded-lg bg-black/40 border border-white/[0.06] text-xs font-mono text-zinc-400 space-y-1">
                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <Zap className="w-3 h-3 text-zinc-400" />
                    <span>Recommended Java 21 GC Flags</span>
                  </div>
                  <div className="text-[11px] text-zinc-300 select-all break-all">
                    -XX:+UseZGC -XX:+ZGenerational
                  </div>
                </div>
              </div>

              {/* Monospace Footer Spec */}
              <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>GARBAGE COLLECTION: ZGC</span>
                <span>SUB-1MS PAUSES</span>
              </div>
            </div>

            {/* Card 3: Direct Handshake (mc.ventrixagency.com) */}
            <div className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#0c0d12] border border-white/[0.08] hover:border-white/[0.14] transition-all duration-200">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-4 pb-3 border-b border-white/[0.05]">
                  <span>STEP 03 // CLUSTER HANDSHAKE</span>
                  <span className="text-emerald-400 font-medium">PUBLIC NODE</span>
                </div>

                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-200 mb-4">
                  <Terminal className="w-4 h-4" />
                </div>

                <h3 className="text-xl font-medium text-white tracking-[-0.035em] mb-2">
                  Direct Connect Address
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                  Launch Minecraft Java Edition 1.21.1, navigate to <strong>Multiplayer</strong> &rarr; <strong>Direct Connection</strong>, and input the official cluster endpoint below.
                </p>

                {/* IP address box */}
                <div className="p-4 rounded-xl bg-black/60 border border-white/[0.1] mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
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
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#ededed] active:bg-[#e4e4e7] text-black text-xs font-semibold transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer shrink-0 select-none shadow-sm"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied" : "Copy IP"}</span>
                    </button>
                  </div>
                </div>

                {/* Direct modal launcher button */}
                {onOpenJoinModal && (
                  <button
                    onClick={onOpenJoinModal}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.06] text-xs font-mono text-zinc-300 hover:text-white transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer select-none"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
                    <span>View Step-by-Step Interactive Guide</span>
                  </button>
                )}
              </div>

              {/* Monospace Footer Spec */}
              <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>PORT: 25686 (DEFAULT)</span>
                <span>NO WHITELIST REQUIRED</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TRACK B: RETURNING PIONEER */}
      {activeTrack === "pioneer" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Top Banner Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono">
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
              <span>{telemetry.players.online} Pioneers Active</span>
              <span>20.0 Tick Engine</span>
              <span>{telemetry.latency}ms Ping</span>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Card 1: Dallas Core Telemetry */}
            <div className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#0c0d12] border border-white/[0.08] hover:border-white/[0.14] transition-all duration-200">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-4 pb-3 border-b border-white/[0.05]">
                  <span>LIVE TELEMETRY // DALLAS CORE</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    ONLINE
                  </span>
                </div>

                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-200 mb-4">
                  <Activity className="w-4 h-4" />
                </div>

                <h3 className="text-xl font-medium text-white tracking-[-0.035em] mb-2">
                  Dallas Core Alpha Node
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                  Direct telemetry broadcast from the primary Ventrix Cloud Core production cluster in Dallas, Texas. High-throughput bare metal allocation.
                </p>

                {/* Telemetry Matrix Grid */}
                <div className="grid grid-cols-2 gap-2.5 p-4 rounded-xl bg-black/60 border border-white/[0.06] font-mono text-xs mb-6">
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
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] font-mono text-xs">
                  <span className="text-zinc-300">mc.ventrixagency.com</span>
                  <button
                    onClick={handleCopyIp}
                    className="text-zinc-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1 active:scale-[0.98]"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>

              {/* Monospace Footer Spec */}
              <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>CPU: AMD RYZEN 9 9950X3D</span>
                <span>5.7 GHZ BOOST</span>
              </div>
            </div>

            {/* Card 2: 3.0.2 Changelog Highlights (Glacio, Continental Rail, Expanded Quest Act IV) */}
            <div className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#0c0d12] border border-white/[0.08] hover:border-white/[0.14] transition-all duration-200">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-4 pb-3 border-b border-white/[0.05]">
                  <span>FIRMWARE UPDATE // PATCH 3.0.2</span>
                  <span className="text-zinc-300 font-medium">LATEST RELEASE</span>
                </div>

                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-200 mb-4">
                  <Sliders className="w-4 h-4" />
                </div>

                <h3 className="text-xl font-medium text-white tracking-[-0.035em] mb-2">
                  3.0.2 Changelog Highlights
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed mb-5">
                  Three major mechanical overhauls deployed across the frontier, expanding space logistics, rail automation, and quest milestones.
                </p>

                {/* Three Editorial Highlights */}
                <div className="space-y-3 mb-4">
                  {/* Highlight 1: Glacio Deep-Space Sector */}
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Rocket className="w-3.5 h-3.5 text-zinc-300" />
                      <h4 className="text-xs font-semibold text-white tracking-tight">
                        Glacio Deep-Space Sector
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Tier-4 aerospace rocket staging, extreme sub-zero cryo atmospheres, permafrost extraction drills, and frozen biome outpost colonization.
                    </p>
                  </div>

                  {/* Highlight 2: Continental Rail Corridors */}
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Train className="w-3.5 h-3.5 text-zinc-300" />
                      <h4 className="text-xs font-semibold text-white tracking-tight">
                        Continental Rail Corridors
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Automated semaphore block signaling, station schedule conductors, collision mitigation interlocking, and long-range transcontinental freight routing.
                    </p>
                  </div>

                  {/* Highlight 3: Expanded Quest Act IV */}
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                      <Layers className="w-3.5 h-3.5 text-zinc-300" />
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
              <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>BRANCH: FRONTIER-STABLE</span>
                <span>NEOFORGE 1.21.1</span>
              </div>
            </div>

            {/* Card 3: 3D BlueMap Launcher */}
            <div className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#0c0d12] border border-white/[0.08] hover:border-white/[0.14] transition-all duration-200">
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-4 pb-3 border-b border-white/[0.05]">
                  <span>CARTOGRAPHY // ORBITAL MESH</span>
                  <span className="text-zinc-300 font-medium">60 FPS 3D</span>
                </div>

                <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-200 mb-4">
                  <Map className="w-4 h-4" />
                </div>

                <h3 className="text-xl font-medium text-white tracking-[-0.035em] mb-2">
                  3D BlueMap Launcher
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                  Inspect world territory, rail junctions, settlement claims, and expedition coordinates through our live GPU-accelerated volumetric 3D satellite feed.
                </p>

                {/* Map telemetry box */}
                <div className="p-4 rounded-xl bg-black/60 border border-white/[0.06] font-mono text-xs space-y-3 mb-6">
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
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white hover:bg-[#ededed] active:bg-[#e4e4e7] text-black text-xs font-semibold transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer shadow-md shadow-white/5 select-none"
                    >
                      <Map className="w-4 h-4" />
                      <span>Launch 3D World Map (Modal)</span>
                    </button>
                  )}

                  <a
                    href="/map"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.06] active:bg-white/[0.04] text-xs font-mono text-zinc-300 hover:text-white transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] select-none"
                  >
                    <span>Open in Dedicated Browser Window</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                  </a>
                </div>
              </div>

              {/* Monospace Footer Spec */}
              <div className="pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-zinc-400">
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
