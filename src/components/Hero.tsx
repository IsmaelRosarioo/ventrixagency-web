"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Copy, Check, ArrowRight, Map, Activity, ExternalLink, Compass } from "lucide-react";

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

const stats = [
  { value: "6", label: "Cosmic Worlds & Moons", subtitle: "Interplanetary Colonization" },
  { value: "500+", label: "Guided Quest Milestones", subtitle: "Structured 4-Act Progression" },
  { value: "100%", label: "Grief Protection", subtitle: "Sovereign Chunk Claims" },
  { value: "20.0", label: "Dedicated Tick Rate", subtitle: "Dallas Core 3D V-Cache" },
];

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
    <section className="relative min-h-screen flex flex-col items-center justify-start pt-36 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-subtle-grid">
      {/* Refined Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] hero-spotlight pointer-events-none" />

      <div className="relative max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Subtle Glowing Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: appleEase, delay: 0.05 }}
          className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 transition-colors duration-300 hover:border-white/[0.18] shadow-sm backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-zinc-300">
            OFFICIAL MULTIPLAYER SERVER
          </span>
          <span className="text-zinc-600 select-none">•</span>
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-zinc-300">
            VENTRIX: FRONTIER 3.0.2
          </span>
          <span className="text-zinc-600 select-none">•</span>
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-emerald-400 font-medium">
            20.0 TPS LOCKED
          </span>
        </motion.div>

        {/* Monumental Headline */}
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
          Establish sovereign civilizations, engineer automated continental railways, and pioneer interplanetary space expeditions on a dedicated, grief-protected survival server.
        </motion.p>

        {/* Three Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: appleEase, delay: 0.38 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {/* Apple solid white pill */}
          <button
            onClick={onOpenJoinModal}
            className="group flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[#ededed] active:bg-[#e4e4e7] text-black font-medium text-sm transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] shadow-lg shadow-white/5 hover:shadow-[0_4px_24px_rgba(255,255,255,0.18)] cursor-pointer select-none"
          >
            <span>Join the Server</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5" />
          </button>

          {/* Dark glass copy pill */}
          <button
            onClick={triggerCopy}
            className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/[0.04] border border-white/[0.09] hover:border-white/[0.22] hover:bg-white/[0.07] active:bg-white/[0.05] text-zinc-300 hover:text-white font-mono text-xs sm:text-sm transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer select-none backdrop-blur-md"
          >
            <span className="text-zinc-500 select-none">host:</span>
            <span className="text-white">mc.ventrixagency.com</span>
            {copied ? (
              <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-sans font-medium">
                <Check className="w-3.5 h-3.5" />
                Copied
              </span>
            ) : (
              <Copy className="w-3.5 h-3.5 text-zinc-400" />
            )}
          </button>

          {/* Dark glass map pill */}
          <button
            onClick={onOpenBlueMapModal}
            className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] hover:bg-white/[0.06] active:bg-white/[0.04] text-zinc-300 hover:text-white text-xs sm:text-sm transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer select-none backdrop-blur-md"
          >
            <Map className="w-4 h-4 text-zinc-400" />
            <span>3D Satellite Map</span>
          </button>
        </motion.div>
      </div>

      {/* The Cinematic Showcase Centerpiece */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.95, ease: appleEase, delay: 0.46 }}
        className="relative w-full max-w-6xl mx-auto rounded-3xl sm:rounded-[32px] border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.8),0_0_60px_rgba(59,130,246,0.12)] overflow-hidden group bg-black"
      >
        <div className="relative aspect-[16/9] md:aspect-[21/10] w-full overflow-hidden">
          <Image
            src="/branding/frontier-hero-cinematic.jpg"
            alt="Ventrix Frontier Multiplayer Cinematic Visual"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.015]"
          />

          {/* Vignette Gradients: seamlessly melts into the dark background */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-black/30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050608]/50 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050608]/40 via-transparent to-[#050608]/40 pointer-events-none" />

          {/* Floating Glass HUD Capsules Overlaid on the Visual */}
          <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-between pointer-events-none">
            {/* Top Bar: Floating Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
              {/* Top-left: Pulsing emerald beacon + Dallas Core Cluster // 20.0 TPS Locked */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-xl text-xs font-mono text-zinc-200">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-white font-medium">Dallas Core Cluster</span>
                <span className="text-zinc-500 hidden sm:inline">{"//"}</span>
                <span className="text-emerald-400 font-semibold">{serverData.tps.toFixed(1)} TPS Locked</span>
              </div>

              {/* Top-right: Live Explorers Online counter */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-xl text-xs font-mono text-zinc-200">
                <Activity className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-white font-semibold">{serverData.players.online}</span>
                <span className="text-zinc-400 hidden sm:inline">/ {serverData.players.max}</span>
                <span className="text-zinc-300">Explorers Online</span>
              </div>
            </div>

            {/* Bottom Bar: Location Marker & 3D BlueMap Launcher */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pointer-events-auto">
              {/* Bottom-left: Location Marker */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/70 backdrop-blur-xl border border-white/10 shadow-xl text-xs font-mono text-zinc-300">
                <Compass className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-white font-medium">Aurelia High-Altitude Rail</span>
                <span className="text-zinc-500">{"//"}</span>
                <span className="text-zinc-300">New Alexandria Settlement</span>
              </div>

              {/* Bottom-right: Explore 3D BlueMap Button */}
              <button
                onClick={onOpenBlueMapModal}
                className="group/btn inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/5 backdrop-blur-xl border border-white/20 hover:border-white/35 text-xs font-medium text-white shadow-xl transition-all duration-200 cursor-pointer select-none active:scale-[0.98]"
              >
                <Map className="w-3.5 h-3.5 text-zinc-300 group-hover/btn:text-white transition-colors" />
                <span>Explore 3D BlueMap</span>
                <ExternalLink className="w-3 h-3 text-zinc-400 group-hover/btn:text-white transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stat Strip Underneath: 4 elegant numbers with soft glowing halos */}
      <div className="w-full max-w-6xl mx-auto mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: appleEase, delay: 0.52 + idx * 0.08 }}
            className="relative group p-6 sm:p-7 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl hover:border-white/[0.14] transition-all duration-300 flex flex-col items-center justify-center text-center overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_32px_rgba(59,130,246,0.08)]"
          >
            {/* Soft Radial Glowing Halo */}
            <div className="absolute inset-0 bg-radial from-white/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <span className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-2">
              {stat.value}
            </span>
            <span className="relative z-10 text-xs sm:text-sm font-medium text-zinc-200 tracking-tight mb-1">
              {stat.label}
            </span>
            <span className="relative z-10 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
              {stat.subtitle}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
