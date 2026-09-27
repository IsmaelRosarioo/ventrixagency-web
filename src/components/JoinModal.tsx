"use client";

import React, { useState } from "react";
import { X, Copy, Check, Server, Download, ShieldCheck, ExternalLink } from "lucide-react";
import confetti from "canvas-confetti";

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function JoinModal({ isOpen, onClose }: JoinModalProps) {
  const [copiedIp, setCopiedIp] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText("mc.ventrixagency.com");
    setCopiedIp(true);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 },
      colors: ["#3b82f6", "#06b6d4"],
    });
    setTimeout(() => setCopiedIp(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0b0e17] border border-white/[0.12] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-cyan-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">How to Join Ventrix</h3>
              <p className="text-xs text-slate-400 font-mono">Minecraft Java Edition • 1.21.1 NeoForge</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Step Guide */}
        <div className="space-y-4 mb-6">
          {/* Step 1 */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-4">
            <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-cyan-400 font-bold font-mono text-sm flex items-center justify-center shrink-0 mt-0.5">
              1
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-white mb-1">Open Prism Launcher or CurseForge App</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                We recommend <strong>Prism Launcher</strong> or the <strong>CurseForge App</strong> for fast, clean memory management with Java 21.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-4">
            <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-cyan-400 font-bold font-mono text-sm flex items-center justify-center shrink-0 mt-0.5">
              2
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-white mb-1">Install VENTRIX: Frontier</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-2">
                Ensure your profile is running <strong>Minecraft 1.21.1</strong> on <strong>NeoForge (21.1.249)</strong> with at least <strong>8 GB – 10 GB of RAM</strong> allocated.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-4">
            <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-cyan-400 font-bold font-mono text-sm flex items-center justify-center shrink-0 mt-0.5">
              3
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-white mb-1">Add Server & Connect</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                In Minecraft Multiplayer, click <strong>Add Server</strong> and paste the official cloud domain below.
              </p>

              {/* IP Box */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/60 border border-cyan-500/30 font-mono text-xs sm:text-sm text-cyan-300">
                <span>mc.ventrixagency.com</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 text-xs font-semibold transition-all cursor-pointer"
                >
                  {copiedIp ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedIp ? "Copied!" : "Copy Address"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>24/7 Foxomy Dallas Cloud (20.0 TPS)</span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-white text-slate-950 font-bold hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Got it, Let&apos;s Play
          </button>
        </div>
      </div>
    </div>
  );
}
