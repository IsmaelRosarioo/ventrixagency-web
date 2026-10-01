"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  Copy,
  Check,
  ExternalLink,
  Flame,
  Layers,
  Cpu,
  Server,
  ShieldCheck,
  Terminal,
  Sparkles,
} from "lucide-react";
import { playHapticClick } from "@/lib/sound";

interface CurseForgeDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CurseForgeDownloadModal({
  isOpen,
  onClose,
}: CurseForgeDownloadModalProps) {
  const [activeTab, setActiveTab] = useState<"curseforge" | "prism">("curseforge");
  const [copiedIp, setCopiedIp] = useState(false);
  const [copiedSha, setCopiedSha] = useState(false);

  const SHA256 = "29aea703d3595008231f68f09d1e879dc6a2303fc9f469ec6c7cf1842f1dbac4";

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

  const handleCopyIp = () => {
    playHapticClick();
    navigator.clipboard.writeText("mc.ventrixagency.com");
    setCopiedIp(true);
    setTimeout(() => setCopiedIp(false), 2000);
  };

  const handleCopySha = () => {
    playHapticClick();
    navigator.clipboard.writeText(SHA256);
    setCopiedSha(true);
    setTimeout(() => setCopiedSha(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cf-modal-title"
        >
          {/* Backdrop dismiss */}
          <div className="absolute inset-0 cursor-pointer" onClick={onClose} aria-label="Dismiss modal" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#090b10] border border-white/[0.12] rounded-3xl p-6 sm:p-8 shadow-[0_32px_100px_rgba(0,0,0,0.9)] overflow-hidden z-10 max-h-[92vh] overflow-y-auto"
          >
            {/* Top Specular Line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between pb-5 border-b border-white/[0.08] mb-6">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)] shrink-0">
                  <Flame className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 id="cf-modal-title" className="text-lg font-semibold text-white tracking-tight">
                      CurseForge Modpack Distribution
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
                      v3.0.2 LIVE
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5">
                    VENTRIX: Frontier • NeoForge 21.1.249 • 511 Verified Mods
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] active:scale-[0.95] text-zinc-400 hover:text-white transition-all duration-200 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Method Switcher Tabs */}
            <div className="flex p-1 rounded-2xl bg-white/[0.03] border border-white/[0.08] mb-6 gap-1">
              <button
                type="button"
                onClick={() => {
                  playHapticClick();
                  setActiveTab("curseforge");
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-mono text-xs transition-all duration-200 select-none cursor-pointer ${
                  activeTab === "curseforge"
                    ? "bg-white text-black font-semibold shadow-md shadow-white/10"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Flame className="w-4 h-4 text-amber-500" />
                <span>CurseForge App (1-Click)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  playHapticClick();
                  setActiveTab("prism");
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-mono text-xs transition-all duration-200 select-none cursor-pointer ${
                  activeTab === "prism"
                    ? "bg-white text-black font-semibold shadow-md shadow-white/10"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Prism / Direct Zip (192 MB)</span>
              </button>
            </div>

            {/* TAB CONTENT: CURSEFORGE APP */}
            {activeTab === "curseforge" && (
              <div className="space-y-4 animate-fadeIn">
                {/* Primary CurseForge 1-Click Action */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/[0.08] via-transparent to-black/40 border border-amber-500/25 relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        RECOMMENDED ONE-CLICK INSTALLATION
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">
                        PROJECT #1692187
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                      Click below to immediately trigger the CurseForge App protocol. It automatically registers the instance, installs NeoForge 21.1.249, resolves 511 official mod files, and bundles our custom keybindings.
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href="curseforge://install?addonId=1692187"
                        onClick={playHapticClick}
                        className="flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-semibold text-xs sm:text-sm shadow-[0_0_24px_rgba(245,158,11,0.35)] active:scale-[0.98] transition-all cursor-pointer"
                      >
                        <Flame className="w-4 h-4 fill-black" />
                        <span>Install in CurseForge App</span>
                      </a>

                      <a
                        href="https://www.curseforge.com/minecraft/modpacks/1692187"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 py-3 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-xs font-mono text-zinc-200 transition-colors cursor-pointer"
                      >
                        <span>View Project Page</span>
                        <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Step-by-step checklist */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] space-y-2.5 text-xs text-zinc-300">
                  <div className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-1">
                    CURSEFORGE APP PROTOCOL // 3 STEPS
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5">1</span>
                    <span>Click <strong>Install in CurseForge App</strong> above. Your desktop app will open and begin downloading 511 files.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5">2</span>
                    <span>In CurseForge instance settings, configure memory allocation to <strong>8 GB – 10 GB</strong> (8192 MB – 10240 MB).</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5">3</span>
                    <span>Launch the instance. The official server (<strong>mc.ventrixagency.com</strong>) is pre-saved in your Multiplayer list.</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: PRISM / DIRECT ZIP */}
            {activeTab === "prism" && (
              <div className="space-y-4 animate-fadeIn">
                {/* Direct Zip Download Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-500/[0.08] via-transparent to-black/40 border border-cyan-500/25">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                      <Download className="w-3.5 h-3.5" />
                      OFFICIAL 3.0.2 CLIENT THIN ZIP
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400">
                      191.8 MB
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                    Download the moderation-compliant <strong>CurseForge thin client package</strong>. Contains the full 511-mod manifest, custom FTB quest chronicles, server connection profile, and keybind optimizations.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <a
                      href="/downloads/VENTRIX-Modpack-3.0.2-Frontier-cf.zip"
                      download="VENTRIX-Modpack-3.0.2-Frontier-cf.zip"
                      onClick={playHapticClick}
                      className="flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white hover:bg-zinc-200 text-black font-semibold text-xs sm:text-sm shadow-md active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-black" />
                      <span>Download Client Zip (192 MB)</span>
                    </a>

                    <a
                      href="https://prismlauncher.org/download/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 py-3 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-xs font-mono text-zinc-200 transition-colors cursor-pointer"
                    >
                      <span>Get Prism Launcher</span>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                    </a>
                  </div>

                  {/* SHA-256 Fingerprint */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/60 border border-white/[0.06] text-[11px] font-mono">
                    <span className="text-zinc-500 truncate mr-2">
                      SHA256: <span className="text-zinc-300">{SHA256.slice(0, 24)}...</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleCopySha}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 hover:text-white transition-colors cursor-pointer shrink-0"
                    >
                      {copiedSha ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 text-[10px]">Verified</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span className="text-[10px]">Copy Hash</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Step-by-step Prism Guide */}
                <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.06] space-y-2.5 text-xs text-zinc-300">
                  <div className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-1">
                    PRISM LAUNCHER IMPORT // 3 STEPS
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5">1</span>
                    <span>Open Prism Launcher &rarr; click <strong>Add Instance</strong> &rarr; select <strong>Import from zip</strong> on the left sidebar.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5">2</span>
                    <span>Browse and select the downloaded <code>VENTRIX-Modpack-3.0.2-Frontier-cf.zip</code>. Prism will auto-download all mods and configure NeoForge.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5">3</span>
                    <span>Edit Instance &rarr; Settings &rarr; Java: allocate <strong>8192 MB – 10240 MB</strong> RAM with Java 21, then launch!</span>
                  </div>
                </div>
              </div>
            )}

            {/* Direct Server Address Bar (Permanent at bottom) */}
            <div className="mt-6 pt-5 border-t border-white/[0.08]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#06080d] border border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <Server className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                      DIRECT SERVER HANDSHAKE
                    </div>
                    <div className="font-mono text-xs sm:text-sm text-white font-medium">
                      mc.ventrixagency.com
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyIp}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] active:scale-[0.96] text-xs font-mono text-zinc-200 hover:text-white transition-all cursor-pointer select-none"
                  >
                    {copiedIp ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Copied Address</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Security Footnote */}
              <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Dallas Core Cluster (Tier 4 Facility) • 20.0 TPS Dedicated • Java 21 Gen-ZGC</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
