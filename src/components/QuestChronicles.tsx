"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, CheckCircle } from "lucide-react";

interface QuestAct {
  id: string;
  actLabel: string;
  title: string;
  subtitle: string;
  chaptersCount: number;
  questCount: number;
  badge: string;
  highlights: string[];
  progressionNote: string;
}

const appleEase = [0.16, 1, 0.3, 1] as const;

const ACTS: QuestAct[] = [
  {
    id: "act-1",
    actLabel: "Act I",
    title: "Act I: The Wilderness Frontier",
    subtitle: "Outpost Survival & Metallurgy",
    chaptersCount: 12,
    questCount: 145,
    badge: "145 Quests",
    highlights: [
      "Custom Class Starter Kits & Backpack Storage Calibration",
      "Deepslate Thermal Mining & Early Ore Metallurgy",
      "Primitive Rotary Mechanical Automation & Windmills",
      "Frontier Outpost Fortification & Sovereign Claiming",
    ],
    progressionNote: "Establishes baseline resource autonomy, defensive homesteading, and foundational metallurgy.",
  },
  {
    id: "act-2",
    actLabel: "Act II",
    title: "Act II: The Industrial Machine",
    subtitle: "Kinetic Factories & Continental Rail",
    chaptersCount: 15,
    questCount: 180,
    badge: "180 Quests",
    highlights: [
      "Max-Tier Steam Engines & Pressurized Boiler Tuning",
      "Transcontinental Automated Train Corridors & Signaling",
      "Sequenced Brass Precision Assembly & Mechanical Crafting",
      "High-Yield Continuous Mineral Purification Loops",
    ],
    progressionNote: "Transitions manual harvesting into continuous rotational kinetic automation across continental rail lines.",
  },
  {
    id: "act-3",
    actLabel: "Act III",
    title: "Act III: Power & Logistics",
    subtitle: "Digital Automation & High-Voltage Grid",
    chaptersCount: 10,
    questCount: 110,
    badge: "110 Quests",
    highlights: [
      "Crystalline ME Digital Storage Networks (Applied Energistics 2)",
      "Distributed Auto-crafting CPU Matrices & Molecular Assemblers",
      "High-Density Powah Nitro Generators & Universal Flux Ducts",
      "Interdimensional Quantum Network Singularity Bridges",
    ],
    progressionNote: "Unlocks sub-millisecond digital inventory querying and hands-free autonomous manufacturing.",
  },
  {
    id: "act-4",
    actLabel: "Act IV",
    title: "Act IV: The Cosmic Voyage",
    subtitle: "Deep Space & Interplanetary Colonization",
    chaptersCount: 7,
    questCount: 78,
    badge: "78 Quests",
    highlights: [
      "Tier 1–4 Aerospace Liquid Fuel Rocket Staging",
      "Pressurized Lunar & Martian Industrial Outposts",
      "Glacio Cryo-Sector Colonization & Permafrost Drills",
      "Endgame Chronicle Relics & The Cosmic Star of Stars",
    ],
    progressionNote: "Expands civilization beyond the atmosphere to conquer extraterrestrial worlds and harvest cosmic relics.",
  },
];

export function QuestChronicles() {
  const [activeActIndex, setActiveActIndex] = useState(0);
  const activeAct = ACTS[activeActIndex];

  return (
    <section id="chronicles" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400 font-mono text-[11px] uppercase tracking-widest mb-4">
            <BookOpen className="w-3 h-3 text-emerald-400" />
            PROGRESSION BLUEPRINT // 513 QUESTS
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-[-0.02em] font-normal leading-[1.12] mb-3">
            Clear Progression. Zero Aimless Grind.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Whether you are establishing your first survival outpost or preparing a deep-space expedition to Glacio, our comprehensive quest chronicles guide your journey with milestone rewards.
          </p>
        </div>

        {/* In-Game Key Hint */}
        <div className="text-xs font-mono text-zinc-300 bg-[#0c0d12] px-4 py-2.5 rounded-xl border border-white/[0.08] flex items-center gap-2.5 shrink-0 self-start md:self-auto shadow-sm">
          <span className="text-zinc-400">Press</span>
          <span className="px-2 py-0.5 rounded-md bg-white text-black font-mono font-bold text-xs shadow-sm">
            [L]
          </span>
          <span className="text-zinc-400">in-game to open Quest Chronicles</span>
        </div>
      </div>

      {/* Interactive Progression Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Navigation list */}
        <div className="lg:col-span-5 flex flex-col gap-2.5">
          {ACTS.map((act, index) => {
            const isSelected = activeActIndex === index;
            return (
              <button
                key={act.id}
                onClick={() => setActiveActIndex(index)}
                className={`p-5 rounded-2xl text-left border cursor-pointer select-none transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.985] ${
                  isSelected
                    ? "bg-[#0f1118] border-white/[0.22] text-white shadow-xl shadow-black/40"
                    : "bg-[#0c0d12] border-white/[0.07] hover:bg-white/[0.03] text-zinc-400 hover:text-zinc-200 hover:border-white/[0.14]"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">{act.subtitle}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    isSelected ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border-white/[0.08] bg-white/[0.03] text-zinc-400"
                  }`}>
                    {act.badge}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{act.title}</h3>
                <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                  <span>{act.chaptersCount} Chapters</span>
                  <span className="text-zinc-600">•</span>
                  <span>{act.questCount} Guided Objectives</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Act Detail Panel */}
        <div className="lg:col-span-7 bg-[#0c0d12]/90 border border-white/10 rounded-3xl p-6 sm:p-8 min-h-[420px] flex flex-col justify-between shadow-[0_34px_90px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeAct.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22, ease: appleEase }}
            >
              <div className="flex items-center justify-between pb-5 border-b border-white/[0.06] mb-6">
                <div>
                  <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest">
                    ACT DIRECTIVE // {activeAct.actLabel}
                  </span>
                  <h3 className="text-2xl font-semibold text-white tracking-tight mt-1">
                    {activeAct.title}
                  </h3>
                </div>
                <div className="font-mono text-xs text-zinc-300 bg-white/[0.04] px-3.5 py-1.5 rounded-lg border border-white/[0.08]">
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
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-black/50 border border-white/[0.06]"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span className="text-xs sm:text-sm text-zinc-200">{highlight}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>FTB QUEST SYSTEM V21.1</span>
            <span>AUTO-SYNCED TO SERVER</span>
          </div>
        </div>
      </div>
    </section>
  );
}
