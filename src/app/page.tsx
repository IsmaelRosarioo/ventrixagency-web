"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { IntentGateway } from "@/components/IntentGateway";
import { ModpackPillars } from "@/components/ModpackPillars";
import { QuestChronicles } from "@/components/QuestChronicles";
import { ServerGuidelines } from "@/components/ServerGuidelines";
import { PioneerRegistry } from "@/components/PioneerRegistry";
import { Footer } from "@/components/Footer";
import { JoinModal } from "@/components/JoinModal";
import { BlueMapModal } from "@/components/BlueMapModal";

interface SectionTransitionProps {
  glowColor?: "emerald" | "indigo" | "amber" | "violet" | "white";
}

function SectionTransition({ glowColor = "white" }: SectionTransitionProps) {
  const glowColors = {
    emerald: "bg-emerald-500/15",
    indigo: "bg-indigo-500/15",
    amber: "bg-amber-500/15",
    violet: "bg-violet-500/15",
    white: "bg-white/10",
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto py-6 sm:py-8 px-4 flex items-center justify-center pointer-events-none select-none overflow-hidden">
      {/* Subtle Ambient Bloom */}
      <div
        className={`absolute w-72 sm:w-96 h-6 ${glowColors[glowColor]} blur-2xl rounded-full opacity-60 animate-pulse-gentle`}
      />
      {/* Soft Luminous Gradient Light Bar */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent relative z-10" />
    </div>
  );
}

export default function Home() {
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [blueMapModalOpen, setBlueMapModalOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#050608] overflow-x-hidden">
      {/* Navigation */}
      <Navbar
        onOpenJoinModal={() => setJoinModalOpen(true)}
        onOpenBlueMapModal={() => setBlueMapModalOpen(true)}
      />

      {/* Hero Section */}
      <Hero
        onOpenJoinModal={() => setJoinModalOpen(true)}
        onOpenBlueMapModal={() => setBlueMapModalOpen(true)}
      />

      {/* Luminous Transition: Aurora Alpine Twilight */}
      <SectionTransition glowColor="emerald" />

      {/* Dual-Track Intent Gateway (New Explorer & Returning Pioneer) */}
      <IntentGateway
        onOpenJoinModal={() => setJoinModalOpen(true)}
        onOpenBlueMapModal={() => setBlueMapModalOpen(true)}
      />

      {/* Luminous Transition: Cosmic Expedition */}
      <SectionTransition glowColor="indigo" />

      {/* The Four Architectural Pillars */}
      <ModpackPillars />

      {/* Luminous Transition: Warm Hearth Chronicles */}
      <SectionTransition glowColor="amber" />

      {/* Quest Chronicles (513 Quests) */}
      <QuestChronicles />

      {/* Luminous Transition: Silver Directive Starlight */}
      <SectionTransition glowColor="white" />

      {/* Server Directives & Survival Commands */}
      <ServerGuidelines />

      {/* Luminous Transition: Celestial Pioneer Nexus */}
      <SectionTransition glowColor="violet" />

      {/* Community Pioneer Registry */}
      <PioneerRegistry />

      {/* Luminous Transition: Starlight Horizon */}
      <SectionTransition glowColor="white" />

      {/* Flagship Footer */}
      <Footer
        onOpenJoinModal={() => setJoinModalOpen(true)}
        onOpenBlueMapModal={() => setBlueMapModalOpen(true)}
      />

      {/* Interactive Modals */}
      <JoinModal
        isOpen={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
      />

      <BlueMapModal
        isOpen={blueMapModalOpen}
        onClose={() => setBlueMapModalOpen(false)}
      />
    </main>
  );
}
