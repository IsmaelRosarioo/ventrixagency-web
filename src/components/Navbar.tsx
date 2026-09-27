"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Copy, Check, Menu, X, Map, Compass, BookOpen, Terminal, Users } from "lucide-react";

interface NavbarProps {
  onOpenJoinModal: () => void;
  onOpenBlueMapModal: () => void;
}

export function Navbar({ onOpenJoinModal, onOpenBlueMapModal }: NavbarProps) {
  const [copied, setCopied] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [serverStats, setServerStats] = useState<{
    online: boolean;
    players: { online: number; max: number };
    tps: number;
    latency: number;
  }>({
    online: true,
    players: { online: 0, max: 20 },
    tps: 20.0,
    latency: 24,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("/api/server-status")
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.online === "boolean") {
          setServerStats(data);
        }
      })
      .catch(() => {});
  }, []);

  const handleCopyIp = () => {
    navigator.clipboard.writeText("mc.ventrixagency.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#050608]/90 backdrop-blur-xl border-b border-white/[0.07] py-3 shadow-2xl shadow-black/80"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Identity */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/[0.12] bg-[#0c0d12] flex items-center justify-center transition-all group-hover:border-white/30">
              <Image
                src="/branding/server-icon.png"
                alt="Ventrix Emblem"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-tight text-white">
                VENTRIX
              </span>
              <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase px-1.5 py-0.5 rounded border border-white/[0.08] bg-white/[0.03]">
                FRONTIER
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.025] border border-white/[0.07] rounded-full px-3 py-1 backdrop-blur-md">
            <a
              href="#pillars"
              className="text-xs font-normal text-zinc-400 hover:text-white px-3 py-1.5 rounded-full transition-colors"
            >
              Architecture
            </a>
            <a
              href="#chronicles"
              className="text-xs font-normal text-zinc-400 hover:text-white px-3 py-1.5 rounded-full transition-colors"
            >
              Chronicles
            </a>
            <button
              onClick={onOpenBlueMapModal}
              className="text-xs font-normal text-zinc-400 hover:text-white px-3 py-1.5 rounded-full transition-colors cursor-pointer"
            >
              Live Map
            </button>
            <a
              href="#guidelines"
              className="text-xs font-normal text-zinc-400 hover:text-white px-3 py-1.5 rounded-full transition-colors"
            >
              Directives
            </a>
            <a
              href="#pioneers"
              className="text-xs font-normal text-zinc-400 hover:text-white px-3 py-1.5 rounded-full transition-colors"
            >
              Registry
            </a>
          </nav>

          {/* Right Status Pill & CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Server Quick Status & Copy */}
            <button
              onClick={handleCopyIp}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] transition-all text-left cursor-pointer group"
              title="Click to copy mc.ventrixagency.com"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-mono text-zinc-300 group-hover:text-white transition-colors">
                mc.ventrixagency.com
              </span>
              <span className="text-[10px] font-mono text-zinc-500">
                {serverStats.tps.toFixed(1)} TPS
              </span>
              {copied ? (
                <Check className="w-3 h-3 text-emerald-400 shrink-0" />
              ) : (
                <Copy className="w-3 h-3 text-zinc-500 group-hover:text-zinc-300 transition-colors shrink-0" />
              )}
            </button>

            {/* Apple-style Primary Action */}
            <button
              onClick={onOpenJoinModal}
              className="px-4 py-1.5 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-medium transition-colors cursor-pointer"
            >
              Connect
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenJoinModal}
              className="px-3 py-1 rounded-full bg-white text-black text-xs font-medium cursor-pointer"
            >
              Connect
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg border border-white/[0.08] text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#050608]/98 backdrop-blur-2xl px-5 py-6 space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono text-zinc-300">mc.ventrixagency.com</span>
            </div>
            <button
              onClick={handleCopyIp}
              className="text-xs font-mono text-zinc-400 hover:text-white px-2 py-1 rounded bg-white/[0.04]"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <div className="flex flex-col space-y-2 text-sm font-normal text-zinc-300">
            <a
              href="#pillars"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white/[0.04] transition-colors"
            >
              Architecture
            </a>
            <a
              href="#chronicles"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white/[0.04] transition-colors"
            >
              Chronicles
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBlueMapModal();
              }}
              className="text-left py-2 px-3 rounded-lg hover:bg-white/[0.04] transition-colors cursor-pointer"
            >
              3D Live Map
            </button>
            <a
              href="#guidelines"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white/[0.04] transition-colors"
            >
              Server Directives
            </a>
            <a
              href="#pioneers"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-white/[0.04] transition-colors"
            >
              Pioneer Registry
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
