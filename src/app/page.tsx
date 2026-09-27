"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ModpackPillars } from "@/components/ModpackPillars";
import { QuestChronicles } from "@/components/QuestChronicles";
import { ServerGuidelines } from "@/components/ServerGuidelines";
import { PioneerRegistry } from "@/components/PioneerRegistry";
import { Footer } from "@/components/Footer";
import { JoinModal } from "@/components/JoinModal";
import { BlueMapModal } from "@/components/BlueMapModal";

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

      {/* The Four Architectural Pillars */}
      <ModpackPillars />

      {/* Quest Chronicles (513 Quests) */}
      <QuestChronicles />

      {/* Server Directives & Survival Commands */}
      <ServerGuidelines />

      {/* Community Pioneer Registry */}
      <PioneerRegistry />

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
