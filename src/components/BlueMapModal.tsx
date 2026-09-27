"use client";

import React from "react";
import { X, ExternalLink, Map, Compass } from "lucide-react";

interface BlueMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BlueMapModal({ isOpen, onClose }: BlueMapModalProps) {
  if (!isOpen) return null;

  const bluemapUrl = "http://dal2.foxomy.com:25670";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl h-[85vh] bg-[#0b0e17] border border-white/[0.12] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0e1322] border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Map className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Live 3D BlueMap Explorer
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  LIVE REAL-TIME
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">Rendered dynamically on Foxomy Dallas Cloud</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={bluemapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] text-xs font-semibold text-slate-200 transition-colors"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded Iframe */}
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
