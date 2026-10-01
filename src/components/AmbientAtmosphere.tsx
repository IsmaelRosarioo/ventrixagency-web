"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";
import { isMuted, toggleMute, subscribeMuteChange, playHapticClick } from "@/lib/sound";

export function AmbientAtmosphere() {
  const [muted, setMuted] = useState(() => isMuted());
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeMuteChange((newMuted) => {
      setMuted(newMuted);
    });
    return unsubscribe;
  }, []);

  const handleToggle = () => {
    setHasInteracted(true);
    playHapticClick();
    toggleMute();
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none">
      <button
        onClick={handleToggle}
        aria-label={muted ? "Enable Calm Ambient Atmosphere Synth" : "Mute Ambient Atmosphere"}
        className={`group flex items-center gap-2.5 px-3.5 py-2 rounded-full border backdrop-blur-2xl transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.96] shadow-xl ${
          muted
            ? "bg-[#090b10]/80 border-white/[0.08] hover:border-white/[0.2] hover:bg-[#0c0e15]/90 text-zinc-400 hover:text-zinc-200"
            : "bg-[#0c0e15]/95 border-emerald-500/30 text-emerald-300 shadow-[0_0_24px_rgba(16,185,129,0.15)]"
        }`}
      >
        {muted ? (
          <>
            <VolumeX className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
            <span className="text-[11px] font-mono tracking-wider">SOUND: MUTED</span>
          </>
        ) : (
          <>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            </span>
            <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse-gentle" />
            <span className="text-[11px] font-mono tracking-wider font-medium text-emerald-300">
              ATMOSPHERE: 55Hz
            </span>
          </>
        )}

        {!hasInteracted && muted && (
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-zinc-400 pl-1 border-l border-white/[0.08]">
            <Sparkles className="w-2.5 h-2.5 text-zinc-400" />
            <span>Calm Synth</span>
          </span>
        )}
      </button>
    </div>
  );
}
