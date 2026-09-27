"use client";

import React, { useState } from "react";
import { Terminal, Cpu, Check, Copy, ShieldCheck, Zap, Scale } from "lucide-react";

interface CommandItem {
  cmd: string;
  alias: string;
  desc: string;
  category: "Navigation" | "Social" | "Sovereignty" | "Economy" | "Diagnostics";
}

const COMMANDS: CommandItem[] = [
  {
    cmd: "/home [name]",
    alias: "/sethome",
    desc: "Set and teleport to up to 3 personal survival bases with a 3s safety warmup.",
    category: "Navigation",
  },
  {
    cmd: "/tpa <player>",
    alias: "/tpaccept",
    desc: "Send and confirm direct peer-to-peer teleport requests with safety verification.",
    category: "Social",
  },
  {
    cmd: "/claim",
    alias: "or press [M]",
    desc: "Open territory claiming map to secure land with 100% sovereign grief protection.",
    category: "Sovereignty",
  },
  {
    cmd: "/trade <player>",
    alias: "/trade accept",
    desc: "Direct, atomic hand-to-hand item exchange window. Eliminates drop scamming.",
    category: "Economy",
  },
  {
    cmd: "/spawn",
    alias: "/hub",
    desc: "Instant return to the protected central planetary transit hub and market terminal.",
    category: "Navigation",
  },
  {
    cmd: "/ping",
    alias: "/tps",
    desc: "Query your authoritative network round-trip ping and real-time 20.0 TPS health.",
    category: "Diagnostics",
  },
];

export function ServerGuidelines() {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd.split(" ")[0]);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 1800);
  };

  return (
    <section id="guidelines" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="max-w-3xl mb-16 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400 font-mono text-[11px] uppercase tracking-widest mb-4">
          <Terminal className="w-3 h-3 text-emerald-400" />
          INFRASTRUCTURE DIRECTIVES & TELEMETRY
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-[-0.02em] font-normal leading-[1.12] mb-4">
          Bare-Metal Enterprise Hardware. Locked 20.0 TPS.
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg font-normal leading-relaxed">
          Ventrix runs on dedicated bare-metal enterprise hardware tuned specifically for heavy simulation loads, uncompromised tick rates, and sovereign player protection.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Hardware Spec Sheet & Directives */}
        <div className="lg:col-span-5 space-y-5">
          {/* Hardware Specs Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0d12]/90 border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <div className="flex items-center gap-2.5 pb-4 border-b border-white/[0.06] mb-5">
              <Cpu className="w-4 h-4 text-zinc-400" />
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-200">
                Dallas Core Cloud Infrastructure
              </span>
            </div>

            <div className="space-y-3.5 text-xs font-mono">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
                <span className="text-zinc-400">HOST FACILITY</span>
                <span className="text-zinc-200 font-medium text-right">Dallas Core (Tier 4 Enterprise Facility, Texas, USA)</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
                <span className="text-zinc-400">PROCESSOR</span>
                <span className="text-zinc-200 font-medium">AMD Ryzen 9 9950X3D (5.7 GHz)</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
                <span className="text-zinc-400">RAM CONFIG</span>
                <span className="text-zinc-200 font-medium">64 GB DDR5 6000MHz ECC</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
                <span className="text-zinc-400">GARBAGE COLLECTOR</span>
                <span className="text-emerald-400 font-medium">Eclipse Temurin Java 21 Gen-ZGC (&lt;1ms pauses)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">NETWORK BACKBONE</span>
                <span className="text-zinc-200 font-medium">10 Gbps Redundant Fiber</span>
              </div>
            </div>
          </div>

          {/* Directives Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0d12]/90 border border-white/10 space-y-4 shadow-[0_24px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-200 block">
              Frontier Operational Directives:
            </span>
            <div className="text-xs text-zinc-400 leading-relaxed space-y-3">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <p>
                  <strong className="text-zinc-200 font-medium">Respect Sovereign Claims:</strong> Claim all territory with FTB Chunks (<span className="text-white font-mono">[M]</span> or <span className="text-white font-mono">/claim</span>). Griefing and unauthorized invasions are strictly prevented by the server core.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <Zap className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <p>
                  <strong className="text-zinc-200 font-medium">Cooperative Industrial Ethos:</strong> Structure automated kinetic factories and power grids with shut-off switches to preserve universal 20.0 TPS for every pioneer.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <Scale className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <p>
                  <strong className="text-zinc-200 font-medium">Zero Pay-to-Win:</strong> Absolute parity across all explorers. No purchasable ranks, no paid advantage kits, and zero item spawning. Every achievement is earned through survival mastery.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive Command Directory */}
        <div className="lg:col-span-7 bg-[#0c0d12]/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-zinc-400" />
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-200">
                Command Terminal Directory
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">CLICK TO COPY</span>
          </div>

          <div className="space-y-3">
            {COMMANDS.map((c) => (
              <div
                key={c.cmd}
                onClick={() => copyCommand(c.cmd)}
                className="p-4 rounded-xl bg-black/50 border border-white/[0.06] hover:border-white/[0.18] hover:bg-white/[0.02] active:scale-[0.98] transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group select-none"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-zinc-100 group-hover:text-white transition-colors">
                      {c.cmd}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">{c.alias}</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{c.desc}</p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-zinc-400">
                    {c.category}
                  </span>
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-white/[0.03] border border-white/[0.06] text-zinc-400 group-hover:text-white group-hover:border-white/[0.15] transition-all">
                    {copiedCmd === c.cmd ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
