"use client";

import React from "react";
import { X, ExternalLink, Map } from "lucide-react";

interface BlueMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BlueMapModal({ isOpen, onClose }: BlueMapModalProps) {
  if (!isOpen) return null;

  const bluemapUrl = "/map";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl h-[85vh] bg-[#0b0d13] border border-white/[0.1] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs font-mono text-zinc-300 hover:text-white transition-colors"
            >
              <span>Pop Out</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors cursor-pointer"
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
      </div>
    </div>
  );
}
