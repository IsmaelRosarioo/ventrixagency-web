"use client";

import React from "react";
import { ShieldCheck, Terminal, HeartHandshake, Home, Send, Repeat, Activity, Sparkles } from "lucide-react";

const COMMANDS = [
  {
    cmd: "/home, /sethome",
    desc: "Set up to 3 survival homes with a 3-second teleport warmup.",
    icon: Home,
    tag: "Teleport",
  },
  {
    cmd: "/tpa, /tpaccept",
    desc: "Safely request and accept player-to-player teleports with safety cancel.",
    icon: HeartHandshake,
    tag: "Social",
  },
  {
    cmd: "/mail send <user> <msg>",
    desc: "Leave messages for offline pioneers; notifies recipient on next login.",
    icon: Send,
    tag: "Mailbox",
  },
  {
    cmd: "/trade <player>",
    desc: "Atomic, cross-world item swapping directly between main hands. Zero scamming.",
    icon: Repeat,
    tag: "Economy",
  },
  {
    cmd: "/playtime",
    desc: "View your total cumulative hours tracked directly by the server engine.",
    icon: Activity,
    tag: "Stats",
  },
  {
    cmd: "/ping",
    desc: "Check your authoritative network round-trip ping in milliseconds.",
    icon: Sparkles,
    tag: "Network",
  },
  {
    cmd: "/sweep",
    desc: "Player-activated ground clutter cleanup (preserves pets, villagers & named mobs).",
    icon: Terminal,
    tag: "Utility",
  },
];

export function ServerGuidelines() {
  return (
    <section id="guidelines" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: The 4 Core Directives */}
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            Frontier Directives
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            The Rules of the Wild
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
            Ventrix is a lowkey, cooperative server focused on immersion, technical creativity, and shared adventure. Our rules preserve performance and peace of mind for every explorer.
          </p>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#0b0e17]/70 border border-white/[0.06]">
              <div className="flex items-center gap-3 mb-1">
                <span className="w-6 h-6 rounded-full bg-cyan-500/15 text-cyan-400 text-xs font-bold font-mono flex items-center justify-center">1</span>
                <h4 className="text-sm font-bold text-white">Respect Claimed Territories</h4>
              </div>
              <p className="text-xs text-slate-400 pl-9">
                Use FTB Chunks (keybind <span className="font-mono text-cyan-300 font-semibold">[M]</span>) to claim bases and wilderness factories. Do not grief or tamper with claimed borders.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0b0e17]/70 border border-white/[0.06]">
              <div className="flex items-center gap-3 mb-1">
                <span className="w-6 h-6 rounded-full bg-cyan-500/15 text-cyan-400 text-xs font-bold font-mono flex items-center justify-center">2</span>
                <h4 className="text-sm font-bold text-white">Contained Automation</h4>
              </div>
              <p className="text-xs text-slate-400 pl-9">
                Confine large Create kinetic lines, mob farms, and refineries within claimed chunks. Use shutoff levers when buffers are full.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0b0e17]/70 border border-white/[0.06]">
              <div className="flex items-center gap-3 mb-1">
                <span className="w-6 h-6 rounded-full bg-cyan-500/15 text-cyan-400 text-xs font-bold font-mono flex items-center justify-center">3</span>
                <h4 className="text-sm font-bold text-white">No Intentional Lag Loops</h4>
              </div>
              <p className="text-xs text-slate-400 pl-9">
                Always avoid unconstrained entity spawning and endless item spillage into the world. Use drawers and overflow voids.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0b0e17]/70 border border-white/[0.06]">
              <div className="flex items-center gap-3 mb-1">
                <span className="w-6 h-6 rounded-full bg-cyan-500/15 text-cyan-400 text-xs font-bold font-mono flex items-center justify-center">4</span>
                <h4 className="text-sm font-bold text-white">Community First</h4>
              </div>
              <p className="text-xs text-slate-400 pl-9">
                Ventrix is built on mutual respect. Assist new explorers, honor trades, and enjoy the cooperative journey.
              </p>
            </div>
          </div>
        </div>

        {/* Right: In-Game Survival Commands Directory */}
        <div className="lg:col-span-7 bg-[#0b0e17]/80 backdrop-blur-xl border border-white/[0.1] rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.06] mb-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Player Capabilities</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">Survival Command Suite</h3>
            </div>
            <span className="text-xs font-mono text-slate-400 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06]">
              Zero Op Permissions Needed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {COMMANDS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.cmd}
                  className="p-4 rounded-2xl bg-black/40 border border-white/[0.05] hover:border-cyan-500/30 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs font-bold text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
                        {item.cmd}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">{item.tag}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
            <span>Server-side safety: 30-second login invulnerability shield + AFK protection active.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
