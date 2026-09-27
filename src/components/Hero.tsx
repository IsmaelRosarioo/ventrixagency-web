"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Copy, Check, ArrowRight, Map, Cpu, Activity, Terminal, Shield, Sparkles } from "lucide-react";

interface HeroProps {
  onOpenJoinModal: () => void;
  onOpenBlueMapModal: () => void;
}

interface ServerData {
  online: boolean;
  players: { online: number; max: number };
  latency: number;
  version: string;
  tps: number;
  motdClean: string;
}

export function Hero({ onOpenJoinModal, onOpenBlueMapModal }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const [activeConsoleTab, setActiveConsoleTab] = useState<"telemetry" | "cluster" | "manifest">("telemetry");
  const [serverData, setServerData] = useState<ServerData>({
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
          setServerData(data);
        }
      })
      .catch(() => {});
  }, []);

  const triggerCopy = () => {
    navigator.clipboard.writeText("mc.ventrixagency.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start pt-36 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-subtle-grid">
      {/* Refined Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] hero-spotlight pointer-events-none" />

      <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Status Eyebrow Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 transition-colors hover:border-white/[0.15]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-300">
            VENTRIX: FRONTIER 3.0.2
          </span>
          <span className="h-3 w-px bg-white/10" />
          <span className="font-mono text-[11px] text-zinc-400">NEOFORGE 1.21.1</span>
        </div>

        {/* Apple-grade Monumental Headline */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-medium tracking-[-0.04em] text-white max-w-4xl leading-[1.0] mb-8 text-balance">
          The New Frontier of Industrial Simulation.
        </h1>

        {/* Editorial Subheadline */}
        <p className="text-base sm:text-xl text-zinc-400 max-w-2xl font-normal leading-relaxed mb-10 text-balance">
          A persistent, high-performance Minecraft chronicle. 514 curated modifications, 6 cosmic bodies, kinetic rotary automation, and dedicated 20.0 TPS cloud infrastructure.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          <button
            onClick={onOpenJoinModal}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-zinc-200 text-black font-medium text-sm transition-all active:scale-[0.98] cursor-pointer shadow-lg shadow-white/5"
          >
            <span>Connect to Server</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={triggerCopy}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.04] border border-white/[0.09] hover:border-white/[0.2] text-zinc-300 hover:text-white font-mono text-xs sm:text-sm transition-all cursor-pointer"
          >
            <span className="text-zinc-500 select-none">host:</span>
            <span className="text-white">mc.ventrixagency.com</span>
            {copied ? (
              <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-sans">
                <Check className="w-3.5 h-3.5" />
                Copied
              </span>
            ) : (
              <Copy className="w-3.5 h-3.5 text-zinc-400" />
            )}
          </button>

          <button
            onClick={onOpenBlueMapModal}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] text-zinc-400 hover:text-white text-xs sm:text-sm transition-all cursor-pointer"
          >
            <Map className="w-4 h-4" />
            <span>3D World Map</span>
          </button>
        </div>
      </div>

      {/* Cinematic Showcase Window (The Apple Hardware / Software Frame) */}
      <div className="relative w-full max-w-5xl mx-auto rounded-2xl border border-white/[0.1] bg-[#0c0d12] shadow-2xl shadow-black overflow-hidden">
        {/* macOS / Terminal Titlebar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#080a0f] border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="ml-2 font-mono text-[11px] text-zinc-500">
              ventrix-frontier // cluster-01 // us-central
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveConsoleTab("telemetry")}
              className={`px-3 py-1 rounded-md text-[11px] font-mono transition-colors ${
                activeConsoleTab === "telemetry"
                  ? "bg-white/[0.08] text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Telemetry
            </button>
            <button
              onClick={() => setActiveConsoleTab("cluster")}
              className={`px-3 py-1 rounded-md text-[11px] font-mono transition-colors ${
                activeConsoleTab === "cluster"
                  ? "bg-white/[0.08] text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Cluster Specs
            </button>
            <button
              onClick={() => setActiveConsoleTab("manifest")}
              className={`px-3 py-1 rounded-md text-[11px] font-mono transition-colors ${
                activeConsoleTab === "manifest"
                  ? "bg-white/[0.08] text-white"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              Modpack Manifest
            </button>
          </div>
        </div>

        {/* Viewport Content */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
          {/* Official HD In-Game Artwork Background */}
          <Image
            src="/branding/hero-bg.png"
            alt="Ventrix Frontier World Visual"
            fill
            className="object-cover opacity-85"
            priority
          />

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d12] via-transparent to-black/30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0d12]/90 via-transparent to-transparent pointer-events-none" />

          {/* Overlaid Telemetry Interface */}
          <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between pointer-events-none">
            {/* Top Overlay Badge */}
            <div className="flex items-center justify-between pointer-events-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/[0.08] text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-white">ONLINE</span>
                <span className="text-zinc-500">|</span>
                <span className="text-zinc-300">{serverData.tps.toFixed(1)} TPS</span>
              </div>

              <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/[0.08] text-xs font-mono text-zinc-300">
                <Activity className="w-3.5 h-3.5 text-zinc-400" />
                <span>{serverData.latency}ms Network Latency</span>
              </div>
            </div>

            {/* Bottom Overlay Info Card */}
            <div className="max-w-md p-5 rounded-xl bg-black/75 backdrop-blur-xl border border-white/[0.1] text-left pointer-events-auto">
              {activeConsoleTab === "telemetry" && (
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1">
                    REAL-TIME NODE TELEMETRY
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">
                    Dallas High-Performance Core
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-zinc-300 pt-2 border-t border-white/[0.06]">
                    <div>
                      <span className="text-zinc-500 block text-[10px]">CURRENT EXPLORERS</span>
                      <span>{serverData.players.online} / {serverData.players.max}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px]">TICK STABILITY</span>
                      <span className="text-emerald-400">100% (20.0 TPS)</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px]">PORT</span>
                      <span>25686 (Default)</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px]">RUNTIME</span>
                      <span>Java 21 Gen-ZGC</span>
                    </div>
                  </div>
                </div>
              )}

              {activeConsoleTab === "cluster" && (
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1">
                    HARDWARE ALLOCATION
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">
                    Bare-Metal AMD Ryzen 9 9950X3D
                  </h3>
                  <div className="space-y-1.5 text-xs font-mono text-zinc-300 pt-2 border-t border-white/[0.06]">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Clock Frequency:</span>
                      <span>5.7 GHz Boost</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Memory Matrix:</span>
                      <span>64 GB DDR5 ECC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Garbage Collector:</span>
                      <span>Gen-ZGC (&lt;1ms pause)</span>
                    </div>
                  </div>
                </div>
              )}

              {activeConsoleTab === "manifest" && (
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1">
                    ENGINE COMPILATION
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">
                    514 Modifications Unified
                  </h3>
                  <div className="space-y-1.5 text-xs font-mono text-zinc-300 pt-2 border-t border-white/[0.06]">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Planetary Engine:</span>
                      <span>Ad Astra Deep Space</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Mechanics:</span>
                      <span>Create + 14 Addons</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Logistics:</span>
                      <span>Applied Energistics 2</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Specs Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] border-t border-white/[0.08]">
          <div className="flex flex-col items-center justify-center p-4 bg-[#080a0f]">
            <span className="text-xl sm:text-2xl font-semibold text-white tracking-tight">514</span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mt-0.5">Curated Mods</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-[#080a0f]">
            <span className="text-xl sm:text-2xl font-semibold text-white tracking-tight">6</span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mt-0.5">Planets & Moons</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-[#080a0f]">
            <span className="text-xl sm:text-2xl font-semibold text-white tracking-tight">513</span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mt-0.5">Quests</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-[#080a0f]">
            <span className="text-xl sm:text-2xl font-semibold text-white tracking-tight">20.0</span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mt-0.5">Locked TPS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
