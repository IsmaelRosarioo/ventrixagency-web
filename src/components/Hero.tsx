"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  ArrowRight,
  Map,
  Activity,
  Radio,
  ShieldCheck,
  Cpu,
  ChevronDown,
  X,
  Server,
} from "lucide-react";
import { EASING } from "@/lib/motion";
import { playHapticClick } from "@/lib/sound";

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

const metricPillars = [
  {
    value: "06",
    kicker: "COSMIC BODIES",
    label: "Celestial Worlds & Moons",
    subtitle: "Interplanetary Colonization",
  },
  {
    value: "85+",
    kicker: "WORLDGEN BIOMES",
    label: "Terralith Living Biomes",
    subtitle: "Elevation Span Y=-64 to 320",
  },
  {
    value: "100%",
    kicker: "JURISDICTION",
    label: "Grief-Proof Sovereignty",
    subtitle: "Mathematical Chunk Claims",
  },
  {
    value: "20.0",
    kicker: "DEDICATED SILICON",
    label: "Dedicated Locked TPS",
    subtitle: "Dallas Core 3D V-Cache",
  },
];

export function Hero({ onOpenJoinModal, onOpenBlueMapModal }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const [isIslandExpanded, setIsIslandExpanded] = useState(false);
  const islandRef = useRef<HTMLDivElement>(null);

  const [serverData, setServerData] = useState<ServerData>({
    online: true,
    players: { online: 24, max: 50 },
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
          setServerData({
            online: data.online,
            players: {
              online: data.players?.online ?? 24,
              max: data.players?.max ?? 50,
            },
            latency: data.latency ?? 24,
            version: data.version ?? "1.21.1 NeoForge",
            tps: data.tps ?? 20.0,
            motdClean: data.motdClean ?? "Ventrix — Frontier",
          });
        }
      })
      .catch(() => {});
  }, []);

  // Close Dynamic Island expanded card on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (islandRef.current && !islandRef.current.contains(e.target as Node)) {
        setIsIslandExpanded(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsIslandExpanded(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const triggerCopy = () => {
    playHapticClick();
    navigator.clipboard.writeText("mc.ventrixagency.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen min-h-[100svh] w-full flex flex-col justify-end overflow-hidden bg-[#050608] pt-28 pb-8 sm:pb-12">
      {/* Background: 100vh Full-Bleed with slow blur-to-sharp entrance */}
      <motion.div
        initial={{ opacity: 0, scale: 1.08, filter: "blur(24px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.8, ease: EASING.apple }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        <Image
          src="/branding/frontier-hero-cinematic.jpg"
          alt="Ventrix Frontier Cinematic World"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Dark Gradient Overlays for contrast & atmospheric focus */}
      {/* Top shadow gradient for navbar readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050608]/90 via-[#050608]/30 to-transparent pointer-events-none z-[1]" />

      {/* Radial vignette spotlight */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#050608]/40 to-[#050608]/90 pointer-events-none z-[2]" />

      {/* Subtle geometric grid */}
      <div className="absolute inset-0 bg-subtle-grid opacity-25 pointer-events-none z-[3]" />

      {/* Atmospheric Corner Clouds (100% radius & soft blur) */}
      <div className="hero-cloud left" />
      <div className="hero-cloud right" />

      {/* Bottom Atmospheric Floor Haze */}
      <div className="hero-haze" />

      {/* Main Content Stage: Centered / Left-anchored Majestic Typography */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center my-auto">
        {/* Interactive Floating Dynamic Island (Bebored inspired) */}
        <motion.div
          initial={{ opacity: 0, y: -12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, ease: EASING.apple, delay: 0.05 }}
          className="relative mb-6 sm:mb-8 z-30"
          ref={islandRef}
        >
          <button
            type="button"
            onClick={() => setIsIslandExpanded(!isIslandExpanded)}
            aria-expanded={isIslandExpanded}
            className="island group relative"
          >
            {/* Emerald pulsing dot */}
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </span>

            {/* Dallas Core Node */}
            <span className="island-w flex items-center gap-1.5 text-xs sm:text-[13px] text-white font-medium">
              Dallas Core Node
            </span>

            <span className="text-zinc-600 select-none text-xs">•</span>

            {/* 20.0 TPS */}
            <span className="island-t text-xs font-mono text-emerald-400 font-semibold tracking-wide">
              {serverData.tps ? serverData.tps.toFixed(1) : "20.0"} TPS
            </span>

            <span className="text-zinc-600 select-none text-xs hidden sm:inline">•</span>

            {/* Pioneers Active */}
            <span className="island-t text-xs font-mono text-zinc-300 hidden sm:inline">
              {serverData.players.online > 0 ? serverData.players.online : 24} Pioneers Active
            </span>

            {/* Verdict Capsule Action */}
            <span className="island-verdict flex items-center gap-1 opacity-100 w-auto px-2 py-0.5 rounded-full bg-white/10 group-hover:bg-white/20 text-zinc-300 text-[10px] font-mono tracking-wider transition-colors ml-1">
              <span>{isIslandExpanded ? "COLLAPSE" : "TELEMETRY"}</span>
              <ChevronDown
                className={`w-3 h-3 text-zinc-400 transition-transform duration-300 ${
                  isIslandExpanded ? "rotate-180 text-white" : ""
                }`}
              />
            </span>
          </button>

          {/* Expanded Telemetry Verdict Card */}
          <AnimatePresence>
            {isIslandExpanded && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.35, ease: EASING.bebored }}
                className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-[92vw] max-w-lg z-50 rounded-2xl sm:rounded-3xl bg-[#090b10]/95 backdrop-blur-2xl border border-white/15 p-5 sm:p-6 shadow-[0_24px_80px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.08)] text-left"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-white tracking-tight flex items-center gap-2">
                        <span>Dallas Core Cluster</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          ONLINE // 100%
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-zinc-400 tracking-wider">
                        TIER-4 ENTERPRISE FACILITY
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsIslandExpanded(false)}
                    className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    aria-label="Close telemetry verdict"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Telemetry Metric Grid */}
                <div className="grid grid-cols-2 gap-2.5 mb-3.5">
                  {/* Latency */}
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                      <Activity className="w-3 h-3 text-sky-400" />
                      <span>Network Latency</span>
                    </div>
                    <div className="text-lg font-semibold text-white font-mono">
                      {serverData.latency || 24}ms
                    </div>
                    <div className="text-[10px] text-zinc-400">Sub-30ms US/EU Backbone</div>
                  </div>

                  {/* Locked TPS */}
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                      <Radio className="w-3 h-3 text-emerald-400" />
                      <span>Locked Tick Rate</span>
                    </div>
                    <div className="text-lg font-semibold text-emerald-400 font-mono">
                      {serverData.tps ? serverData.tps.toFixed(1) : "20.0"} TPS
                    </div>
                    <div className="text-[10px] text-zinc-400">100% Dedicated Stability</div>
                  </div>

                  {/* Uptime */}
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                      <ShieldCheck className="w-3 h-3 text-indigo-400" />
                      <span>Cluster Uptime</span>
                    </div>
                    <div className="text-lg font-semibold text-white font-mono">
                      99.98%
                    </div>
                    <div className="text-[10px] text-zinc-400">Continuous Tier-4 Power</div>
                  </div>

                  {/* Server Version */}
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                      <Cpu className="w-3 h-3 text-violet-400" />
                      <span>Server Version</span>
                    </div>
                    <div className="text-xs font-semibold text-white font-mono mt-1">
                      {serverData.version || "1.21.1 NeoForge"}
                    </div>
                    <div className="text-[10px] text-zinc-400">Ventrix: Frontier 3.0.2</div>
                  </div>
                </div>

                {/* Compute Architecture Banner */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] mb-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                    <Server className="w-3 h-3 text-zinc-400" />
                    <span>Dedicated Silicon Architecture</span>
                  </div>
                  <div className="text-xs text-zinc-300 font-mono leading-relaxed">
                    AMD Ryzen 9 9950X3D (5.7 GHz 3D V-Cache) • 64GB DDR5 ECC
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono">
                    Java 21 Enterprise Gen-ZGC (&lt;1ms Pause Time) • 10 Gbps Fabric
                  </div>
                </div>

                {/* Quick Modal Actions */}
                <div className="flex items-center justify-between gap-3 pt-1">
                  <button
                    onClick={triggerCopy}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono text-zinc-200 transition-colors cursor-pointer select-none"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Copied IP</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Copy Direct IP</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setIsIslandExpanded(false);
                      onOpenJoinModal();
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white text-black font-medium text-xs hover:bg-[#eaeaea] transition-colors cursor-pointer select-none"
                  >
                    <span>Connect Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Kicker Pill */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASING.apple, delay: 0.12 }}
          className="inline-flex items-center gap-2 sm:gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-xl mb-6 shadow-xl"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          </span>
          <span className="tracking-[0.22em] text-xs font-mono text-zinc-300 uppercase font-medium">
            OFFICIAL MULTIPLAYER REALM • VENTRIX CLUSTER • 20.0 TPS LOCKED
          </span>
        </motion.div>

        {/* Majestic Headline with double text-shadow */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASING.apple, delay: 0.2 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-serif font-normal tracking-[-0.03em] text-white leading-[1.0] mb-6 text-balance hero-headline-shadow"
          style={{
            textShadow: "0 2px 18px rgba(0, 0, 0, 0.7), 0 4px 60px rgba(0, 0, 0, 0.5)",
          }}
        >
          A Living Multiplayer Frontier.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASING.apple, delay: 0.28 }}
          className="text-base sm:text-lg md:text-xl text-zinc-300/90 max-w-3xl font-normal leading-relaxed mb-8 sm:mb-10 text-balance drop-shadow-md"
        >
          Establish sovereign civilizations, engineer automated continental rail corridors, and launch interplanetary expeditions across a living, grief-protected survival world — sustained on dedicated, uninterrupted Dallas Core silicon.
        </motion.p>

        {/* Liquid Sheen Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASING.apple, delay: 0.36 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-4"
        >
          {/* Primary Action Button: Solid White Pill with .btn-sheen sweep */}
          <button
            onClick={() => {
              playHapticClick();
              onOpenJoinModal();
            }}
            className="btn-sheen group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-black font-medium text-sm transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:bg-[#ededed] active:scale-[0.98] shadow-[0_4px_24px_rgba(255,255,255,0.25),0_2px_6px_rgba(0,0,0,0.4)] cursor-pointer select-none"
          >
            <span className="font-medium tracking-tight">Join the Frontier</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
          </button>

          {/* Secondary Action Button: Liquid Obsidian Capsule with instant copy feedback */}
          <button
            onClick={triggerCopy}
            className="btn-sheen group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/15 hover:border-white/30 text-zinc-200 hover:text-white font-mono text-xs sm:text-sm transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl cursor-pointer select-none"
            title="Click to copy mc.ventrixagency.com"
          >
            <span className="text-zinc-500 font-normal select-none">host:</span>
            <span className="text-white font-medium">mc.ventrixagency.com</span>
            {copied ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-sans font-medium">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Copied</span>
              </span>
            ) : (
              <Copy className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
            )}
          </button>

          {/* Tertiary Action Button: Glass Pill 3D Satellite Radar */}
          <button
            onClick={() => {
              playHapticClick();
              onOpenBlueMapModal();
            }}
            className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 hover:border-white/30 text-zinc-200 hover:text-white text-xs sm:text-sm transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl cursor-pointer select-none"
          >
            <Map className="w-4 h-4 text-sky-400 group-hover:text-sky-300 transition-colors" />
            <span className="font-medium tracking-tight">3D Satellite Radar</span>
          </button>
        </motion.div>
      </div>

      {/* Four Monumental Metric Pillars at bottom */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-auto pt-6 sm:pt-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {metricPillars.map((pillar, idx) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASING.apple, delay: 0.45 + idx * 0.08 }}
              className="group relative p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#090b10]/65 hover:bg-[#0c0e15]/85 border border-white/[0.08] hover:border-white/[0.22] backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.5)] hover:shadow-[0_16px_50px_rgba(0,0,0,0.7)]"
            >
              {/* Specular top inner highlight line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              {/* Ambient radial illumination on hover */}
              <div className="absolute inset-0 bg-radial from-white/[0.06] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-[10px] tracking-[0.22em] text-zinc-400 uppercase font-medium">
                  {pillar.kicker}
                </span>
                <span className="text-[10px] font-mono text-zinc-600 group-hover:text-zinc-400 transition-colors">
                  {"//"} 0{idx + 1}
                </span>
              </div>

              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-1.5 font-sans">
                  {pillar.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-zinc-200 tracking-tight mb-0.5">
                  {pillar.label}
                </div>
                <div className="text-[11px] font-mono text-zinc-400 tracking-wide">
                  {pillar.subtitle}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
