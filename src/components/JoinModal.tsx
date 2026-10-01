"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Copy,
  Check,
  Server,
  ShieldCheck,
  Flame,
  Download,
  ExternalLink,
  Cpu,
} from "lucide-react";
import { playHapticClick } from "@/lib/sound";

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function JoinModal({ isOpen, onClose }: JoinModalProps) {
  const [copiedIp, setCopiedIp] = useState(false);

  // Escape key listener & body scroll lock
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  const handleCopy = () => {
    playHapticClick();
    navigator.clipboard.writeText("mc.ventrixagency.com");
    setCopiedIp(true);
    setTimeout(() => setCopiedIp(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="join-modal-title"
        >
          {/* Backdrop click dismiss */}
          <div className="absolute inset-0 cursor-pointer" onClick={onClose} aria-label="Dismiss modal" />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-[#090b10] border border-white/[0.12] rounded-3xl p-6 sm:p-8 shadow-[0_32px_100px_rgba(0,0,0,0.9)] overflow-hidden z-10 max-h-[92vh] overflow-y-auto"
          >
            {/* Top Specular Line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

            {/* Top Header */}
            <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300">
                  <Server className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 id="join-modal-title" className="text-base font-semibold text-white">Client Setup & Server Connection</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
                      v3.0.2 LIVE
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 font-mono">Minecraft 1.21.1 • NeoForge 21.1.249 • 511 Mods</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] active:scale-[0.95] text-zinc-400 hover:text-white transition-all duration-200 cursor-pointer"
                aria-label="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 3 Step Pipeline */}
            <div className="space-y-4 mb-6">
              {/* Step 1: Install Modpack via CurseForge or Prism */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/[0.08] flex items-start gap-3.5">
                <span className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-xs sm:text-sm font-semibold text-white">Download Modpack</h4>
                    <span className="text-[10px] font-mono text-amber-400 font-medium">CURSEFORGE CERTIFIED</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                    Install <strong>VENTRIX: Frontier 3.0.2</strong> automatically with CurseForge, or download the thin client zip for Prism Launcher:
                  </p>

                  <div className="flex flex-wrap gap-2.5">
                    <a
                      href="curseforge://install?addonId=1692187"
                      onClick={playHapticClick}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-[0.97]"
                    >
                      <Flame className="w-3.5 h-3.5 fill-black" />
                      <span>CurseForge 1-Click</span>
                    </a>

                    <a
                      href="/api/download/modpack"
                      download="VENTRIX-Modpack-3.0.2-Frontier-cf.zip"
                      onClick={playHapticClick}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] text-xs font-mono text-white transition-all cursor-pointer active:scale-[0.97]"
                    >
                      <Download className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Download Zip (192 MB)</span>
                    </a>

                    <a
                      href="https://www.curseforge.com/minecraft/modpacks/ventrix-frontier"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <span>CurseForge Web</span>
                      <ExternalLink className="w-3 h-3 text-zinc-500" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Step 2: RAM & Java 21 Calibration */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/[0.08] flex items-start gap-3.5">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-xs sm:text-sm font-semibold text-white">Allocate Memory (8–10 GB)</h4>
                    <span className="text-[10px] font-mono text-emerald-400 font-medium">JAVA 21 GEN-ZGC</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    In your launcher profile settings, allocate between <strong>8 GB and 10 GB RAM</strong> (8192 MB – 10240 MB) and verify Java 21 is selected to avoid garbage collection pauses.
                  </p>
                </div>
              </div>

              {/* Step 3: Direct Connection Handshake */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/[0.08] flex items-start gap-3.5">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-xs sm:text-sm font-semibold text-white">Direct Handshake</h4>
                    <span className="text-[10px] font-mono text-cyan-400 font-medium">20.0 TPS LOCKED</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed mb-3">
                    Launch Minecraft &rarr; select <strong>Multiplayer</strong> &rarr; enter or copy the official Dallas Core host below:
                  </p>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#06080d] border border-white/[0.08]">
                    <span className="font-mono text-xs sm:text-sm text-white font-medium">mc.ventrixagency.com</span>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] active:scale-[0.96] text-xs font-mono text-zinc-200 hover:text-white transition-all cursor-pointer"
                    >
                      {copiedIp ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Security Note */}
            <div className="p-3.5 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20 flex items-center gap-3 text-xs text-zinc-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Dallas Core Enterprise Cluster with automatic whitelist authentication. No offline account compromise.</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
