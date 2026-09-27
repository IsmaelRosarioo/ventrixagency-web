"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Copy, Check, Sparkles, Activity, ShieldCheck, Cpu, ArrowRight, Map, Globe, Download } from "lucide-react";
import confetti from "canvas-confetti";

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
    latency: 48,
    version: "1.21.1 NeoForge",
    tps: 20.0,
    motdClean: "Ventrix — Frontier\nAn uncharted adventure awaits.",
  });

  useEffect(() => {
    fetch("/api/server-status")
      .then((res) => res.json())
      .then((data) => {
        if (data) setServerData(data);
      })
      .catch(() => {});
  }, []);

  const triggerCopy = () => {
    navigator.clipboard.writeText("mc.ventrixagency.com");
    setCopied(true);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.75 },
      colors: ["#3b82f6", "#06b6d4", "#a855f7", "#10b981"],
    });
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grid-pattern">
      {/* Ambient background lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-blue-600/15 via-cyan-500/15 to-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Release Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md shadow-inner mb-8 hover:border-cyan-500/40 transition-colors">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs font-semibold tracking-wide text-slate-200">
            VENTRIX: FRONTIER 3.0.2 IS LIVE
          </span>
          <span className="h-3.5 w-px bg-white/20" />
          <span className="text-[11px] font-mono text-cyan-400 font-medium">NEOFORGE 1.21.1</span>
        </div>

        {/* Main Flagship Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.08] mb-6">
          The Frontier of{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
            Modded Survival
          </span>
        </h1>

        {/* Cinematic Subtitle */}
        <p className="text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-10 text-balance">
          Traverse deep space rocketry, master kinetic brass engineering, explore ancient spirit arcana, and conquer dynamic seasonal wilderness.
        </p>

        {/* Live Server Telemetry HUD Card */}
        <div className="w-full max-w-2xl bg-[#0b0e17]/80 backdrop-blur-xl border border-white/[0.1] rounded-2xl p-4 sm:p-6 shadow-2xl shadow-black/80 mb-10 transition-all hover:border-cyan-500/30">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
            {/* Server Status Pill */}
            <div className="flex items-center gap-3">
              <div className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  Foxomy Dallas Node
                  <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    20.0 TPS LOCKED
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {serverData.players.online} / {serverData.players.max} Explorers Online • {serverData.latency}ms Ping
                </div>
              </div>
            </div>

            {/* Micro Hardware Specs */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-black/40 px-3 py-1.5 rounded-lg border border-white/[0.04]">
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span>Ryzen 9 9950X3D • Gen-ZGC</span>
            </div>
          </div>

          {/* Direct Address Copy Bar */}
          <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1 flex items-center justify-between px-4 py-3 bg-black/50 border border-white/[0.08] rounded-xl font-mono text-xs sm:text-sm text-cyan-300">
              <span className="truncate">mc.ventrixagency.com</span>
              <span className="text-[11px] text-slate-500 font-sans hidden sm:inline">Port: 25686 (Default)</span>
            </div>

            <button
              onClick={triggerCopy}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-lg cursor-pointer ${
                copied
                  ? "bg-emerald-500 text-black shadow-emerald-500/25"
                  : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 stroke-[2.5]" />
                  <span>Address Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Server IP</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Action Button Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={onOpenJoinModal}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-950 font-bold text-sm hover:bg-slate-100 hover:shadow-xl hover:shadow-white/10 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>How to Join the Server</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenBlueMapModal}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#121724] border border-white/[0.1] text-slate-200 font-semibold text-sm hover:bg-white/[0.05] hover:border-cyan-500/40 hover:text-white transition-all cursor-pointer"
          >
            <Map className="w-4 h-4 text-emerald-400" />
            <span>Launch 3D World Map</span>
          </button>
        </div>

        {/* Flagship Spec Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-8 border-t border-white/[0.08]">
          <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02]">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">514</span>
            <span className="text-xs text-slate-400 font-medium">Curated Modpack Jars</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02]">
            <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400">6</span>
            <span className="text-xs text-slate-400 font-medium">Planetary Dimensions</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02]">
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-400">513</span>
            <span className="text-xs text-slate-400 font-medium">Quests & Reward Tables</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02]">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">20.0</span>
            <span className="text-xs text-slate-400 font-medium">Locked Cloud TPS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
