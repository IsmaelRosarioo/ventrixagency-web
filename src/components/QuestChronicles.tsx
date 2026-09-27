"use client";

import React, { useState } from "react";
import { BookOpen, CheckCircle } from "lucide-react";

interface QuestAct {
  id: string;
  title: string;
  subtitle: string;
  chaptersCount: number;
  questCount: number;
  badge: string;
  highlights: string[];
  progressionNote: string;
}

const ACTS: QuestAct[] = [
  {
    id: "genesis",
    title: "Phase I: The Awakening",
    subtitle: "Genesis & Basic Survival",
    chaptersCount: 12,
    questCount: 145,
    badge: "Tier 1",
    highlights: [
      "Custom Class Starter Kits",
      "Sophisticated Storage & Backpack Management",
      "Deep Slate Thermal Mining & Ore Extraction",
      "Primitive Rotary Power & Grinding",
    ],
    progressionNote: "Establishes baseline resource autonomy and shelter fortification.",
  },
  {
    id: "kinetic",
    title: "Phase II: Kinetic Industry",
    subtitle: "Mechanization & Rail Networks",
    chaptersCount: 15,
    questCount: 180,
    badge: "Tier 2",
    highlights: [
      "Level 9 Steam Engine & Boiler Tuning",
      "Transcontinental Automated Train Corridors",
      "Sequenced Brass Electronic Assembly Lines",
      "High-Yield Mineral Purification Loops",
    ],
    progressionNote: "Transitions manual harvesting into continuous, automated assembly.",
  },
  {
    id: "quantum",
    title: "Phase III: Quantum Logistics",
    subtitle: "Digitalization & Modern Power",
    chaptersCount: 10,
    questCount: 110,
    badge: "Tier 3",
    highlights: [
      "Crystalline ME Digital Storage Arrays",
      "Multi-core Auto-crafting CPU Clusters",
      "Powah Nitro Thermo Generators",
      "Interdimensional Quantum Network Singularity",
    ],
    progressionNote: "Unlocks sub-millisecond inventory querying and hands-free crafting.",
  },
  {
    id: "cosmos",
    title: "Phase IV: The Cosmic Void",
    subtitle: "Interplanetary Colonization",
    chaptersCount: 7,
    questCount: 78,
    badge: "Tier 4",
    highlights: [
      "Tier 1 – 4 Liquid Fuel Aerospace Rockets",
      "Pressurized Lunar & Martian Industrial Outposts",
      "Deep Space Glacio Megafauna Exploration",
      "Endgame Chronicle Relics & Star of Stars",
    ],
    progressionNote: "Conquers extreme off-world environments and seals final server achievements.",
  },
];

export function QuestChronicles() {
  const [activeActIndex, setActiveActIndex] = useState(0);
  const activeAct = ACTS[activeActIndex];

  return (
    <section id="chronicles" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400 font-mono text-[11px] uppercase tracking-widest mb-4">
            <BookOpen className="w-3 h-3 text-zinc-400" />
            PROGRESSION DIRECTIVE
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold text-white tracking-[-0.03em]">
            513 Handcrafted Quests. 44 Chapters.
          </h2>
        </div>
        <div className="text-xs font-mono text-zinc-400 bg-white/[0.025] px-3.5 py-2 rounded-xl border border-white/[0.08] flex items-center gap-2">
          <span>IN-GAME TERMINAL KEY:</span>
          <span className="px-1.5 py-0.5 rounded bg-white text-black font-sans font-bold text-[11px]">[L]</span>
        </div>
      </div>

      {/* Interactive Progression Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Navigation list */}
        <div className="lg:col-span-5 flex flex-col gap-2.5">
          {ACTS.map((act, index) => (
            <button
              key={act.id}
              onClick={() => setActiveActIndex(index)}
              className={`p-5 rounded-xl text-left border transition-all cursor-pointer ${
                activeActIndex === index
                  ? "bg-[#10131a] border-white/[0.2] text-white shadow-lg"
                  : "bg-[#090b10] border-white/[0.06] hover:bg-white/[0.02] text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-mono text-zinc-400 uppercase">{act.subtitle}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-white/[0.08] bg-white/[0.03] text-zinc-400">
                  {act.badge}
                </span>
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{act.title}</h3>
              <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                <span>{act.chaptersCount} Chapters</span>
                <span className="text-zinc-600">•</span>
                <span>{act.questCount} Quests</span>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Act Detail Panel */}
        <div className="lg:col-span-7 bg-[#0b0d13] border border-white/[0.08] rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between pb-5 border-b border-white/[0.06] mb-6">
            <div>
              <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest">
                CHAPTER DIRECTIVE // {activeAct.badge}
              </span>
              <h3 className="text-2xl font-semibold text-white tracking-tight mt-1">
                {activeAct.title}
              </h3>
            </div>
            <div className="font-mono text-xs text-zinc-400 bg-white/[0.03] px-3 py-1.5 rounded-lg border border-white/[0.08]">
              {activeAct.questCount} Objectives
            </div>
          </div>

          <p className="text-zinc-300 text-sm leading-relaxed mb-6 font-mono">
            {"//"} {activeAct.progressionNote}
          </p>

          <div className="space-y-3 mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-2">
              Key Chapter Milestones:
            </span>
            {activeAct.highlights.map((highlight) => (
              <div
                key={highlight}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-black/40 border border-white/[0.05]"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span className="text-xs sm:text-sm text-zinc-200">{highlight}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>FTB QUEST SYSTEM V21.1</span>
            <span>AUTO-SYNCED TO SERVER</span>
          </div>
        </div>
      </div>
    </section>
  );
}
