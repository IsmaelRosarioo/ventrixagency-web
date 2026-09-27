"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check, ArrowRight, Map, Cpu, Activity, Globe, Terminal } from "lucide-react";

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
    <section className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-subtle-grid">
      {/* Subtle refined radial lighting spotlight */}
      <div className="absolute inset-0 hero-spotlight pointer-events-none" />

      <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8">
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

        {/* Monochromatic Display Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.035em] text-white max-w-4xl leading-[1.06] mb-6 text-balance">
          Engineering at Planetary Scale.
          <span className="block text-zinc-400 font-normal mt-2">
            The Standard for Modded Survival.
          </span>
        </h1>

        {/* Editorial Subheadline */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl font-normal leading-relaxed mb-10 text-balance">
          A high-performance Minecraft simulation environment. Engineered with 514 curated modifications, 6 cosmic bodies, kinetic rotary automation, and persistent 20.0 TPS cloud infrastructure.
        </p>

        {/* Mission Control / Hardware Telemetry Console */}
        <div className="w-full max-w-2xl bg-[#0b0d13]/90 border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-2xl shadow-black mb-8 text-left">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-300">
                Foxomy Dallas Node // US-Central
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400">
              <span>{serverData.tps.toFixed(1)} TPS</span>
              <span className="text-zinc-600">•</span>
              <span>{serverData.players.online} / {serverData.players.max} Online</span>
              <span className="text-zinc-600">•</span>
              <span>{serverData.latency}ms RTT</span>
            </div>
          </div>

          {/* Copy Address Bar */}
          <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="flex-1 flex items-center justify-between px-3.5 py-2.5 bg-black/60 border border-white/[0.07] rounded-xl font-mono text-xs sm:text-sm text-zinc-200">
              <span className="select-all">mc.ventrixagency.com</span>
              <span className="text-[11px] text-zinc-500 font-sans hidden sm:inline">Port: 25686</span>
            </div>

            <button
              onClick={triggerCopy}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all cursor-pointer ${
                copied
                  ? "bg-emerald-500 text-black"
                  : "bg-white text-black hover:bg-zinc-200 active:scale-[0.98]"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Address Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>

          {/* Micro Telemetry Footer */}
          <div className="mt-4 pt-3 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-zinc-400" />
              AMD Ryzen 9 9950X3D • DDR5 ECC
            </span>
            <span>GARBAGE COLLECTOR: GEN-ZGC (ZERO PAUSES)</span>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          <button
            onClick={onOpenJoinModal}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-medium text-xs sm:text-sm hover:bg-zinc-200 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Connect to Server</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <a
            href="#pillars"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] text-zinc-300 hover:text-white font-medium text-xs sm:text-sm transition-all"
          >
            <span>Explore Modpack Specs</span>
          </a>

          <button
            onClick={onOpenBlueMapModal}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] text-zinc-300 hover:text-white font-medium text-xs sm:text-sm transition-all cursor-pointer"
          >
            <Map className="w-3.5 h-3.5 text-zinc-400" />
            <span>3D World Map</span>
          </button>
        </div>

        {/* Minimalist Spec Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden w-full max-w-4xl">
          <div className="flex flex-col items-center justify-center p-5 bg-[#050608]">
            <span className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">514</span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mt-1">Curated Mods</span>
          </div>
          <div className="flex flex-col items-center justify-center p-5 bg-[#050608]">
            <span className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">6</span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mt-1">Planetary Bodies</span>
          </div>
          <div className="flex flex-col items-center justify-center p-5 bg-[#050608]">
            <span className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">513</span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mt-1">Quest Directives</span>
          </div>
          <div className="flex flex-col items-center justify-center p-5 bg-[#050608]">
            <span className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">20.0</span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mt-1">Cloud TPS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
