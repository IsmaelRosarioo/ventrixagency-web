"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Flame, Download } from "lucide-react";

interface FooterProps {
  onOpenJoinModal: () => void;
  onOpenBlueMapModal: () => void;
  onOpenCurseForgeModal?: () => void;
}

export function Footer({
  onOpenJoinModal,
  onOpenBlueMapModal,
  onOpenCurseForgeModal,
}: FooterProps) {
  return (
    <footer className="relative bg-gradient-to-b from-[#0c0d14] via-[#07080c] to-[#040507] rounded-t-[48px] sm:rounded-t-[64px] md:rounded-t-[80px] border-t border-white/[0.08] pt-16 sm:pt-20 pb-8 px-4 sm:px-6 lg:px-8 text-zinc-400 overflow-hidden shadow-[0_-24px_80px_rgba(0,0,0,0.7)]">
      {/* Specular hairline top rim highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* Atmospheric upward ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-44 bg-radial from-white/[0.035] via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/[0.06]">
        {/* Brand Identity */}
        <div className="md:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/[0.1] bg-[#0c0d12] flex items-center justify-center">
                <Image
                  src="/branding/server-icon.png"
                  alt="Ventrix Emblem"
                  width={22}
                  height={22}
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-semibold tracking-tight text-white">
                VENTRIX AGENCY
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm mb-6">
              The official digital portal for Ventrix: Frontier 3.0.2. A dedicated, grief-protected Minecraft survival server featuring interplanetary expeditions, automated continental railways, sovereign land claims, living biomes, and 500+ guided quests.
            </p>
          </div>

          {/* Hardware Pill */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-zinc-300 w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Dallas Core Cluster • 20.0 TPS Locked • Java 21 Gen-ZGC</span>
          </div>
        </div>

        {/* Directory Links: Server Focus */}
        <div className="md:col-span-2">
          <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-200 mb-4">
            Server Systems
          </h4>
          <ul className="space-y-2 text-xs font-mono">
            <li>
              <a href="#horizons" className="hover:text-white transition-colors flex items-center gap-1.5">
                <span>World Horizons</span>
              </a>
            </li>
            <li>
              <a href="#corridors" className="hover:text-white transition-colors flex items-center gap-1.5">
                <span>Continental Rail</span>
              </a>
            </li>
            <li>
              <a href="#sovereignty" className="hover:text-white transition-colors flex items-center gap-1.5">
                <span>Sovereign Land Claims</span>
              </a>
            </li>
            <li>
              <a href="#biomes" className="hover:text-white transition-colors flex items-center gap-1.5">
                <span>Living Biomes</span>
              </a>
            </li>
            <li>
              <a href="#chronicles" className="hover:text-white transition-colors flex items-center gap-1.5">
                <span>500+ Guided Quests</span>
              </a>
            </li>
            <li>
              <button
                onClick={onOpenBlueMapModal}
                className="hover:text-white transition-colors text-left cursor-pointer flex items-center gap-1.5"
              >
                <span>3D Live Satellite Map</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Client Access */}
        <div className="md:col-span-2">
          <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-200 mb-4">
            Client Access
          </h4>
          <ul className="space-y-2 text-xs font-mono">
            {onOpenCurseForgeModal && (
              <li>
                <button
                  onClick={onOpenCurseForgeModal}
                  className="hover:text-amber-400 text-amber-300 font-semibold transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>CurseForge v3.0.2</span>
                </button>
              </li>
            )}
            <li>
              <a
                href="/api/download/modpack"
                download="VENTRIX-Modpack-3.0.2-Frontier-cf.zip"
                className="hover:text-cyan-300 text-zinc-300 transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3 h-3 text-cyan-400 shrink-0" />
                <span>Client Zip (192 MB)</span>
              </a>
            </li>
            <li>
              <button
                onClick={onOpenJoinModal}
                className="hover:text-white transition-colors text-left cursor-pointer"
              >
                Connection Guide
              </button>
            </li>
            <li>
              <button
                onClick={onOpenBlueMapModal}
                className="hover:text-white transition-colors text-left cursor-pointer"
              >
                3D World Map (Modal)
              </button>
            </li>
            <li>
              <a
                href="https://www.curseforge.com/minecraft/modpacks/ventrix-frontier"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>CurseForge (Frontier)</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </a>
            </li>
            <li>
              <a
                href="https://prismlauncher.org/download/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>Prism Launcher</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </a>
            </li>
          </ul>
        </div>

        {/* Infrastructure Specs */}
        <div className="md:col-span-3">
          <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-200 mb-4">
            Enterprise Infrastructure
          </h4>
          <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] text-[11px] font-mono space-y-1.5 text-zinc-400">
            <div><span className="text-zinc-600">CLUSTER:</span> Dallas Core (Tier 4 Facility)</div>
            <div><span className="text-zinc-600">PROCESSOR:</span> AMD Ryzen 9 9950X3D (5.7 GHz)</div>
            <div><span className="text-zinc-600">MEMORY:</span> 64 GB DDR5 6000MHz ECC</div>
            <div><span className="text-zinc-600">RUNTIME:</span> Java 21 Gen-ZGC (&lt;1ms)</div>
            <div><span className="text-zinc-600">UPLINK:</span> 10 Gbps Redundant Fiber</div>
            <div><span className="text-zinc-600">STABILITY:</span> 20.0 TPS Locked (100%)</div>
          </div>
        </div>
      </div>

      {/* Legal & Attribution */}
      <div className="relative z-10 max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-600">
        <div>
          © {new Date().getFullYear()} Ventrix Agency (ventrixagency.com).
        </div>
        <div>
          Not an official Minecraft product. Not affiliated with Mojang or Microsoft.
        </div>
      </div>

      {/* Monumental 13vw Masked Watermark 'VENTRIX' */}
      <div className="relative z-0 mt-8 sm:mt-12 w-full select-none pointer-events-none overflow-hidden flex justify-center">
        <span className="text-[13vw] font-bold tracking-[-0.04em] leading-none uppercase bg-gradient-to-b from-white/[0.12] via-white/[0.03] to-transparent bg-clip-text text-transparent font-sans whitespace-nowrap block text-center">
          VENTRIX
        </span>
      </div>
    </footer>
  );
}
