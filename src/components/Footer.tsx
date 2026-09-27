"use client";

import React from "react";
import Image from "next/image";
import { Server, Compass, ShieldCheck, Heart, ArrowUpRight } from "lucide-react";

interface FooterProps {
  onOpenJoinModal: () => void;
  onOpenBlueMapModal: () => void;
}

export function Footer({ onOpenJoinModal, onOpenBlueMapModal }: FooterProps) {
  return (
    <footer className="bg-[#05070c] border-t border-white/[0.08] pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/[0.06]">
        {/* Brand Column */}
        <div className="md:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-blue-600 via-cyan-400 to-indigo-600">
                <div className="w-full h-full bg-[#0a0d14] rounded-[9px] flex items-center justify-center">
                  <Image
                    src="/branding/server-icon.png"
                    alt="Ventrix Logo"
                    width={24}
                    height={24}
                    className="rounded-md object-contain"
                  />
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">VENTRIX AGENCY</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
              The flagship digital portal for Ventrix: Frontier. A quest-led, deeply integrated Minecraft survival chronicle operating 24/7 on Foxomy Dallas high-performance cloud hardware.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            <span>mc.ventrixagency.com:25686 • 20.0 TPS Active</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 mb-4 font-semibold">
            Exploration
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href="#pillars" className="hover:text-cyan-400 transition-colors">
                The Four Pillars
              </a>
            </li>
            <li>
              <a href="#chronicles" className="hover:text-cyan-400 transition-colors">
                The Chronicles (513 Quests)
              </a>
            </li>
            <li>
              <button onClick={onOpenBlueMapModal} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                Live 3D BlueMap
              </button>
            </li>
            <li>
              <a href="#pioneers" className="hover:text-cyan-400 transition-colors">
                Pioneer Roster
              </a>
            </li>
            <li>
              <a href="#guidelines" className="hover:text-cyan-400 transition-colors">
                Server Guidelines
              </a>
            </li>
          </ul>
        </div>

        {/* Connection & Client */}
        <div className="md:col-span-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 mb-4 font-semibold">
            Modpack & Connect
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button onClick={onOpenJoinModal} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">
                How to Join
              </button>
            </li>
            <li>
              <a
                href="https://curseforge.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors flex items-center gap-1"
              >
                <span>CurseForge App</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </li>
            <li>
              <a
                href="https://prismlauncher.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors flex items-center gap-1"
              >
                <span>Prism Launcher</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </li>
          </ul>
        </div>

        {/* Infrastructure Specs */}
        <div className="md:col-span-3">
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 mb-4 font-semibold">
            Cloud Infrastructure
          </h4>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-mono space-y-1.5 text-slate-400">
            <div><span className="text-slate-500">Provider:</span> Foxomy Cloud Dallas</div>
            <div><span className="text-slate-500">CPU:</span> AMD Ryzen 9 9950X3D</div>
            <div><span className="text-slate-500">Memory:</span> 20 GB Generational ZGC</div>
            <div><span className="text-slate-500">NeoForge:</span> 21.1.249 (MC 1.21.1)</div>
            <div><span className="text-slate-500">Backups:</span> 7-Day Rolling Snapshots</div>
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <div>
          © {new Date().getFullYear()} Ventrix Agency (ventrixagency.com). All rights reserved.
        </div>
        <div className="flex items-center gap-1">
          <span>Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.</span>
        </div>
      </div>
    </footer>
  );
}
