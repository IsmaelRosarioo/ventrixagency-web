"use client";

import React, { useState } from "react";
import { X, Copy, Check, Server, ShieldCheck } from "lucide-react";

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
    setTimeout(() => setCopiedIp(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#0b0d13] border border-white/[0.1] rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300">
              <Server className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Client Setup & Server Connection</h3>
              <p className="text-xs text-zinc-400 font-mono">Minecraft Java Edition • NeoForge 1.21.1</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Step Pipeline */}
        <div className="space-y-3.5 mb-6">
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] flex items-start gap-3.5">
            <span className="w-6 h-6 rounded bg-white/[0.06] text-zinc-300 font-mono text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
              1
            </span>
            <div className="flex-1">
              <h4 className="text-xs sm:text-sm font-semibold text-white mb-1">Select Launcher</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Launch with <strong>Prism Launcher</strong> or the <strong>CurseForge App</strong> for automated modpack updates and Java 21 support.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] flex items-start gap-3.5">
            <span className="w-6 h-6 rounded bg-white/[0.06] text-zinc-300 font-mono text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
              2
            </span>
            <div className="flex-1">
              <h4 className="text-xs sm:text-sm font-semibold text-white mb-1">Install VENTRIX: Frontier</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Select profile version <strong>3.0.2</strong> on <strong>NeoForge 21.1.249</strong>. Allocate a minimum of <strong>8 GB – 10 GB RAM</strong> in launcher settings.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/[0.06] flex items-start gap-3.5">
            <span className="w-6 h-6 rounded bg-white/[0.06] text-zinc-300 font-mono text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
              3
            </span>
            <div className="flex-1">
              <h4 className="text-xs sm:text-sm font-semibold text-white mb-1">Direct Connection</h4>
              <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                Navigate to <strong>Multiplayer</strong> &rarr; <strong>Direct Connection</strong> and enter the host address below:
              </p>

              {/* Server Host Address Box */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/80 border border-white/[0.1] font-mono text-xs sm:text-sm text-zinc-200">
                <span>mc.ventrixagency.com</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-zinc-200 text-black text-xs font-medium transition-all cursor-pointer"
                >
                  {copiedIp ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedIp ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>24/7 DALLAS CLUSTER</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
