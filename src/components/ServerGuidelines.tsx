"use client";

import React, { useState } from "react";
import { Terminal, Shield, Cpu, Activity, Check, Copy } from "lucide-react";

const COMMANDS = [
  {
    cmd: "/home [name]",
    alias: "/sethome",
    desc: "Set and teleport to up to 3 personal survival bases with a 3s safety warmup.",
    category: "Navigation",
  },
  {
    cmd: "/tpa <player>",
    alias: "/tpaccept",
    desc: "Send and confirm direct peer-to-peer teleport requests with safety checks.",
    category: "Social",
  },
  {
    cmd: "/trade <player>",
    alias: "/trade accept",
    desc: "Direct, atomic hand-to-hand item exchange window. Eliminates drop scamming.",
    category: "Economy",
  },
  {
    cmd: "/ping",
    alias: "/tps",
    desc: "Query your authoritative network round-trip ping and real-time server tick health.",
    category: "Diagnostics",
  },
  {
    cmd: "/mail send <player> <msg>",
    alias: "/mail read",
    desc: "Transmit asynchronous mail to offline players. Notifies on their next login.",
    category: "Communication",
  },
  {
    cmd: "/sweep",
    alias: "/clearlag",
    desc: "Player-triggered ground clutter cleanup. Preserves named pets, armor stands & NPCs.",
    category: "Utility",
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
    <section id="guidelines" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="max-w-3xl mb-16 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400 font-mono text-[11px] uppercase tracking-widest mb-4">
          <Terminal className="w-3 h-3 text-zinc-400" />
          SYSTEM DIRECTIVES & SPECS
        </div>
        <h2 className="text-3xl sm:text-5xl font-semibold text-white tracking-[-0.03em] mb-4">
          Dedicated Hardware. Transparent Rules.
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg font-normal leading-relaxed">
          Ventrix runs on bare-metal enterprise hardware tuned specifically for heavy modpack tick simulation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Hardware Spec Sheet */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-[#0b0d13] border border-white/[0.08]">
            <div className="flex items-center gap-2.5 pb-4 border-b border-white/[0.06] mb-5">
              <Cpu className="w-4 h-4 text-zinc-400" />
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-200">
                Core Cloud Infrastructure
              </span>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.04]">
                <span className="text-zinc-400">HOST FACILITY</span>
                <span className="text-zinc-200 font-medium">Ventrix Dallas Core (Tier 4 Enterprise)</span>
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
                <span className="text-emerald-400 font-medium">Eclipse Temurin 21 + Gen-ZGC</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">NETWORK CAPACITY</span>
                <span className="text-zinc-200 font-medium">10 Gbps Redundant + BGP Anycast</span>
              </div>
            </div>
          </div>

          {/* Core Directives */}
          <div className="p-6 rounded-2xl bg-[#0b0d13] border border-white/[0.08] space-y-3">
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-200 block mb-2">
              Frontier Survival Directives:
            </span>
            <div className="text-xs text-zinc-400 leading-relaxed space-y-2">
              <p>
                <strong className="text-zinc-200">1. Claim All Territory:</strong> Use FTB Chunks (keybind <span className="text-white font-mono">[M]</span>) to protect your base and industrial zones.
              </p>
              <p>
                <strong className="text-zinc-200">2. Respect Tick Simulation:</strong> Structure automation loops with shut-off switches to preserve universal 20.0 TPS.
              </p>
              <p>
                <strong className="text-zinc-200">3. Fair Play Protocol:</strong> Zero pay-to-win, zero item spawning. All items must be engineered through survival gameplay.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Interactive Command Shell */}
        <div className="lg:col-span-7 bg-[#0b0d13] border border-white/[0.08] rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-zinc-400" />
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-200">
                Command Terminal Directory
              </span>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">CLICK TO COPY COMMAND</span>
          </div>

          <div className="space-y-3">
            {COMMANDS.map((c) => (
              <div
                key={c.cmd}
                onClick={() => copyCommand(c.cmd)}
                className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] hover:border-white/[0.18] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-zinc-100 group-hover:text-white transition-colors">
                      {c.cmd}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">{c.alias}</span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">{c.desc}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-400">
                    {c.category}
                  </span>
                  <div className="w-6 h-6 rounded flex items-center justify-center bg-white/[0.03] text-zinc-500 group-hover:text-zinc-200">
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
