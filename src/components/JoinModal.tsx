"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, Server, ShieldCheck } from "lucide-react";

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function JoinModal({ isOpen, onClose }: JoinModalProps) {
  const [copiedIp, setCopiedIp] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("mc.ventrixagency.com");
    setCopiedIp(true);
    setTimeout(() => setCopiedIp(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          {/* Backdrop click dismiss */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-[#0b0d13] border border-white/[0.1] rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden z-10"
          >
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
                className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] active:scale-[0.95] text-zinc-400 hover:text-white transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
                aria-label="Close Modal"
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

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#07080c] border border-white/[0.08]">
                    <span className="font-mono text-xs sm:text-sm text-zinc-200">mc.ventrixagency.com</span>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] active:scale-[0.96] text-xs font-mono text-zinc-300 hover:text-white transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
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
              <span>Official Ventrix cluster with automatic whitelist authentication. No offline account compromise.</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
