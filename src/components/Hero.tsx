"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, ArrowRight, Map, Activity } from "lucide-react";

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

const appleEase = [0.16, 1, 0.3, 1] as const;

export function Hero({ onOpenJoinModal, onOpenBlueMapModal }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const [activeConsoleTab, setActiveConsoleTab] = useState<"telemetry" | "hardware" | "capabilities">("telemetry");
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
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: appleEase, delay: 0.05 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 transition-colors duration-300 hover:border-white/[0.18]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-300">
            OFFICIAL MULTIPLAYER SERVER // VENTRIX: FRONTIER 3.0.2
          </span>
          <span className="h-3 w-px bg-white/10" />
          <span className="font-mono text-[11px] text-zinc-400">NEOFORGE 1.21.1</span>
        </motion.div>

        {/* Apple-grade Monumental Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: appleEase, delay: 0.16 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-medium tracking-[-0.04em] text-white max-w-4xl leading-[1.0] mb-8 text-balance"
        >
          A Living Multiplayer Frontier.
        </motion.h1>

        {/* Editorial Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: appleEase, delay: 0.28 }}
          className="text-base sm:text-xl text-zinc-400 max-w-2xl font-normal leading-relaxed mb-10 text-balance"
        >
          Establish sovereign civilizations, engineer automated continental railways, and pioneer interplanetary space expeditions on a dedicated, grief-protected Minecraft survival server.
        </motion.p>

        {/* Quick-action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: appleEase, delay: 0.38 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          <button
            onClick={onOpenJoinModal}
            className="group flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#ededed] active:bg-[#e4e4e7] text-black font-medium text-sm transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] shadow-lg shadow-white/5 hover:shadow-[0_4px_24px_rgba(255,255,255,0.18)] cursor-pointer select-none"
          >
            <span>Join the Server</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5" />
          </button>

          <button
            onClick={triggerCopy}
            className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/[0.04] border border-white/[0.09] hover:border-white/[0.22] hover:bg-white/[0.07] active:bg-white/[0.05] text-zinc-300 hover:text-white font-mono text-xs sm:text-sm transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer select-none"
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
            className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] hover:bg-white/[0.06] active:bg-white/[0.04] text-zinc-400 hover:text-white text-xs sm:text-sm transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer select-none"
          >
            <Map className="w-4 h-4" />
            <span>3D Satellite Map</span>
          </button>
        </motion.div>
      </div>

      {/* Cinematic Showcase Window (Apple Hardware / Software Frame) */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.95, ease: appleEase, delay: 0.46 }}
        className="relative w-full max-w-5xl mx-auto rounded-2xl border border-white/[0.1] bg-[#0c0d12] shadow-2xl shadow-black overflow-hidden"
      >
        {/* macOS / Terminal Titlebar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#080a0f] border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
            <span className="ml-2 font-mono text-[11px] text-zinc-500">
              ventrix-frontier // dallas-core-01 // us-central
            </span>
          </div>

          <div className="flex items-center gap-1 bg-white/[0.02] p-0.5 rounded-lg border border-white/[0.05]">
            {(
              [
                { id: "telemetry", label: "Live Telemetry" },
                { id: "hardware", label: "Server Hardware" },
                { id: "capabilities", label: "Server Capabilities" },
              ] as const
            ).map((tab) => {
              const isActive = activeConsoleTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveConsoleTab(tab.id)}
                  className={`relative px-3 py-1 rounded-md text-[11px] font-mono transition-colors duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] cursor-pointer select-none ${
                    isActive
                      ? "text-white"
                      : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="hero-console-tab"
                      className="absolute inset-0 rounded-md bg-white/[0.1] border border-white/[0.08] shadow-sm"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Viewport Content */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
          {/* Official HD In-Game Artwork Background */}
          <Image
            src="/branding/hero-bg.png"
            alt="Ventrix Frontier World Visual"
            fill
            className="object-cover opacity-85 transition-opacity duration-700 ease-out"
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
                <span className="text-zinc-300">{serverData.tps.toFixed(1)} TPS LOCKED</span>
              </div>

              <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/[0.08] text-xs font-mono text-zinc-300">
                <Activity className="w-3.5 h-3.5 text-zinc-400" />
                <span>Dallas Core • {serverData.latency}ms Latency</span>
              </div>
            </div>

            {/* Bottom Overlay Info Card with Silky Crossfade */}
            <div className="max-w-md p-5 rounded-xl bg-black/80 backdrop-blur-xl border border-white/[0.1] text-left pointer-events-auto shadow-2xl">
              <AnimatePresence mode="wait">
                {activeConsoleTab === "telemetry" && (
                  <motion.div
                    key="telemetry"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.22, ease: appleEase }}
                  >
                    <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1">
                      REAL-TIME NODE TELEMETRY
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2">
                      Dallas Core Alpha Node
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
                        <span className="text-zinc-500 block text-[10px]">HOST UPLINK</span>
                        <span>mc.ventrixagency.com</span>
                      </div>
                      <div>
                        <span className="text-zinc-500 block text-[10px]">FACILITY STATUS</span>
                        <span className="text-zinc-200">Dallas Tier-4 Active</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeConsoleTab === "hardware" && (
                  <motion.div
                    key="hardware"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.22, ease: appleEase }}
                  >
                    <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1">
                      SERVER HARDWARE SPECIFICATION
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2">
                      AMD Ryzen 9 9950X3D @ 5.7 GHz
                    </h3>
                    <div className="space-y-1.5 text-xs font-mono text-zinc-300 pt-2 border-t border-white/[0.06]">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Core Architecture:</span>
                        <span>16 Cores / 32 Threads (3D V-Cache)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Memory Matrix:</span>
                        <span>64 GB DDR5 6000MHz ECC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Garbage Collector:</span>
                        <span>Eclipse Temurin 21 Gen-ZGC (&lt;1ms)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Facility Location:</span>
                        <span>Dallas Core, Texas, USA</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeConsoleTab === "capabilities" && (
                  <motion.div
                    key="capabilities"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.22, ease: appleEase }}
                  >
                    <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1">
                      SERVER CAPABILITIES
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2">
                      Sovereign Civilization Infrastructure
                    </h3>
                    <div className="space-y-1.5 text-xs font-mono text-zinc-300 pt-2 border-t border-white/[0.06]">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Space Program:</span>
                        <span>Interplanetary Expeditions (Moon, Mars, Glacio)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Continental Rail:</span>
                        <span>Automated Create Train Transit & Signaling</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Sovereignty:</span>
                        <span>100% Grief-Free Land Claims [M]</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">Progression:</span>
                        <span>500+ Guided Quests with Milestones</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Stat Strip: 6 Cosmic Worlds, 500+ Guided Quests, 100% Grief Protection, 20.0 Locked TPS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] border-t border-white/[0.08]">
          <div className="flex flex-col items-center justify-center p-4 bg-[#080a0f] hover:bg-white/[0.02] transition-colors duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]">
            <span className="text-xl sm:text-2xl font-semibold text-white tracking-tight">6</span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mt-0.5">Cosmic Worlds</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-[#080a0f] hover:bg-white/[0.02] transition-colors duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]">
            <span className="text-xl sm:text-2xl font-semibold text-white tracking-tight">500+</span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mt-0.5">Guided Quests</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-[#080a0f] hover:bg-white/[0.02] transition-colors duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]">
            <span className="text-xl sm:text-2xl font-semibold text-white tracking-tight">100%</span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mt-0.5">Grief Protection</span>
          </div>
          <div className="flex flex-col items-center justify-center p-4 bg-[#080a0f] hover:bg-white/[0.02] transition-colors duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]">
            <span className="text-xl sm:text-2xl font-semibold text-white tracking-tight">20.0</span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mt-0.5">Locked TPS</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
