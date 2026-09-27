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
    <footer className="bg-[#050608] border-t border-white/[0.06] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-zinc-400">
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
              The flagship digital gateway for Ventrix: Frontier. A deeply integrated Minecraft survival chronicle hosted on Foxomy enterprise cloud hardware.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>mc.ventrixagency.com:25686 • 20.0 TPS LOCKED</span>
          </div>
        </div>

        {/* Directory Links */}
        <div className="md:col-span-2">
          <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-200 mb-4">
            Architecture
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#pillars" className="hover:text-white transition-colors">
                The Four Pillars
              </a>
            </li>
            <li>
              <a href="#chronicles" className="hover:text-white transition-colors">
                Chronicles (513 Quests)
              </a>
            </li>
            <li>
              <button
                onClick={onOpenBlueMapModal}
                className="hover:text-white transition-colors text-left cursor-pointer"
              >
                3D World Map
              </button>
            </li>
            <li>
              <a href="#guidelines" className="hover:text-white transition-colors">
                Server Directives
              </a>
            </li>
            <li>
              <a href="#pioneers" className="hover:text-white transition-colors">
                Pioneer Registry
              </a>
            </li>
          </ul>
        </div>

        {/* Client Access */}
        <div className="md:col-span-2">
          <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-200 mb-4">
            Client Links
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={onOpenJoinModal}
                className="hover:text-white transition-colors text-left cursor-pointer"
              >
                Connection Guide
              </button>
            </li>
            <li>
              <a
                href="https://curseforge.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <span>CurseForge</span>
                <ArrowUpRight className="w-3 h-3 text-zinc-500" />
              </a>
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
          </ul>
        </div>

        {/* Infrastructure Specs */}
        <div className="md:col-span-3">
          <h4 className="text-[11px] font-mono uppercase tracking-widest text-zinc-200 mb-4">
            Cloud Specification
          </h4>
          <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] text-[11px] font-mono space-y-1.5 text-zinc-400">
            <div><span className="text-zinc-600">HOST:</span> Foxomy Dallas (Tier 4)</div>
            <div><span className="text-zinc-600">CPU:</span> AMD Ryzen 9 9950X3D</div>
            <div><span className="text-zinc-600">JVM:</span> Eclipse Temurin 21 (Gen-ZGC)</div>
            <div><span className="text-zinc-600">PROTOCOL:</span> NeoForge 21.1.249</div>
            <div><span className="text-zinc-600">UPTIME:</span> 99.98% Monitored</div>
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
