"use client";

import React, { useState } from "react";
import { BookOpen, Award, CheckCircle2, Star, Shield, ArrowUpRight } from "lucide-react";

interface QuestAct {
  title: string;
  subtitle: string;
  chaptersCount: number;
  questCount: number;
  badge: string;
  highlights: string[];
}

const ACTS: QuestAct[] = [
  {
    title: "The Second Horizon",
    subtitle: "Frontier Chapters",
    chaptersCount: 5,
    questCount: 32,
    badge: "New in 3.0",
    highlights: ["The Menagerie (Naturalist & Critters)", "The Hunt (Mowzie's Bosses)", "Arcana (Malum & Hexerei)", "The Workshop (Create Connected & Railways)", "The Hearth (Decor & Thatch)"],
  },
  {
    title: "Acts I – V: The Awakening",
    subtitle: "Genesis Fundamentals",
    chaptersCount: 12,
    questCount: 145,
    badge: "Foundational",
    highlights: ["Custom Starter Kits", "Storage Drawers & Sophisticated Backpacks", "Thermal & Mekanism Entry", "Deep Slate Mining"],
  },
  {
    title: "Acts VI – XI: Kinetic Industry",
    subtitle: "Heavy Machinery",
    chaptersCount: 15,
    questCount: 180,
    badge: "Intermediate",
    highlights: ["Transcontinental Railway Lines", "Powah Nitro Thermo Generators", "Modern Industrialization Refineries", "AE2 Spatial Storage"],
  },
  {
    title: "Acts XII – XV: The Dark Horizon",
    subtitle: "The Chronicle Finale",
    chaptersCount: 12,
    questCount: 156,
    badge: "Endgame",
    highlights: ["Act XIV: The Thousand Hands", "Act XV: What Wanted the Dark", "The Star of Stars Milestone", "The Hollow Map Relic"],
  },
];

export function QuestChronicles() {
  const [activeActIndex, setActiveActIndex] = useState(0);
  const activeAct = ACTS[activeActIndex];

  return (
    <section id="chronicles" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            The Chronicles Questline
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            513 Handcrafted Quests. 44 Chapters.
          </h2>
        </div>
        <div className="text-sm font-mono text-slate-400 bg-white/[0.03] px-4 py-2 rounded-xl border border-white/[0.08]">
          In-game Quest Key: <span className="text-cyan-400 font-bold font-sans">[L]</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Act Navigation Cards */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {ACTS.map((act, index) => (
            <button
              key={act.title}
              onClick={() => setActiveActIndex(index)}
              className={`p-5 rounded-2xl text-left border transition-all cursor-pointer ${
                activeActIndex === index
                  ? "bg-blue-600/15 border-cyan-500/50 shadow-xl shadow-cyan-500/10"
                  : "bg-[#0b0e17]/50 border-white/[0.06] hover:bg-white/[0.03] text-slate-300"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-medium text-cyan-400">{act.subtitle}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.08] text-slate-300 border border-white/[0.06]">
                  {act.badge}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">{act.title}</h3>
              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span>{act.chaptersCount} Chapters</span>
                <span>•</span>
                <span>{act.questCount} Quests</span>
              </div>
            </button>
          ))}
        </div>

        {/* Act Details & Quest Highlights */}
        <div className="lg:col-span-7 bg-[#0b0e17]/80 backdrop-blur-xl border border-white/[0.1] rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.06] mb-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Act Chronicle Overview</span>
              <h3 className="text-2xl font-extrabold text-white mt-1">{activeAct.title}</h3>
            </div>
            <div className="text-right">
              <div className="text-xl font-extrabold text-cyan-300">{activeAct.questCount}</div>
              <div className="text-xs font-mono text-slate-400">Total Quests</div>
            </div>
          </div>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            Every quest in the Ventrix Chronicles is runtime-probed against the server, meaning zero dead ends, broken tags, or impossible recipe barriers. Rewards scale thoughtfully from starter brass kits all the way to cosmic void relics.
          </p>

          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4">
            Notable Questlines & Milestones in this Tier
          </h4>

          <div className="space-y-3 mb-8">
            {activeAct.highlights.map((h, i) => (
              <div
                key={h}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-black/40 border border-white/[0.04] text-sm text-slate-200"
              >
                <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>{h}</span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900/20 via-cyan-900/10 to-transparent border border-blue-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="text-xs text-slate-300">
                <span className="font-semibold text-white">FTB Quests Sync:</span> Quest completions automatically sync between multiplayer clients and the live cloud server.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
