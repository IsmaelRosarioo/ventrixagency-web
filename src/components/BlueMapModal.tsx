"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Map } from "lucide-react";

interface BlueMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BlueMapModal({ isOpen, onClose }: BlueMapModalProps) {
  const bluemapUrl = "/map";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl">
          {/* Backdrop dismiss */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-6xl h-[85vh] bg-[#0b0d13] border border-white/[0.1] rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
          >
            {/* Top Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#080a0f] border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300">
                  <Map className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-white">Live 3D World Map</h3>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      REAL-TIME
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 font-mono">Ventrix High-Resolution Satellite Telemetry</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={bluemapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] active:scale-[0.96] text-xs font-mono text-zinc-300 hover:text-white transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
                >
                  <span>Pop Out</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] active:scale-[0.95] text-zinc-400 hover:text-white transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
                  aria-label="Close Map"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Embedded Map Frame */}
            <div className="flex-1 w-full h-full relative bg-black">
              <iframe
                src={bluemapUrl}
                title="Ventrix Live BlueMap"
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
