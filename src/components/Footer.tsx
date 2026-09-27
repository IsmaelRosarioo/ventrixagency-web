"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface FooterProps {
  onOpenJoinModal: () => void;
  onOpenBlueMapModal: () => void;
}

export function Footer({ onOpenJoinModal, onOpenBlueMapModal }: FooterProps) {
  return (
    <footer className="bg-[#050608] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-zinc-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/[0.06]">
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
              <a href="#pillars" className="hover:text-white transition-colors flex items-center gap-1.5">
                <span>Cosmic Expeditions</span>
              </a>
            </li>
            <li>
              <a href="#pillars" className="hover:text-white transition-colors flex items-center gap-1.5">
                <span>Continental Rail</span>
              </a>
            </li>
            <li>
              <a href="#guidelines" className="hover:text-white transition-colors flex items-center gap-1.5">
                <span>Sovereign Land Claims</span>
              </a>
            </li>
            <li>
              <a href="#pillars" className="hover:text-white transition-colors flex items-center gap-1.5">
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
                href="https://prismlauncher.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>Prism Launcher</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </a>
            </li>
            <li>
              <a
                href="https://curseforge.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>CurseForge App</span>
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
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-600">
        <div>
          © {new Date().getFullYear()} Ventrix Agency (ventrixagency.com).
        </div>
        <div>
          Not an official Minecraft product. Not affiliated with Mojang or Microsoft.
        </div>
      </div>
    </footer>
  );
}
