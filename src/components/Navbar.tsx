"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Copy, Check, Server, Compass, Map, BookOpen, ShieldCheck, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenJoinModal: () => void;
  onOpenBlueMapModal: () => void;
}

export function Navbar({ onOpenJoinModal, onOpenBlueMapModal }: NavbarProps) {
  const [copied, setCopied] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [onlineCount, setOnlineCount] = useState<number | null>(null);

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
        if (data.online) {
          setOnlineCount(data.players.online);
        }
      })
      .catch(() => {});
  }, []);

  const handleCopyIp = () => {
    navigator.clipboard.writeText("mc.ventrixagency.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#07090e]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-blue-600 via-cyan-400 to-indigo-600 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0a0d14] rounded-[10px] flex items-center justify-center">
                <Image
                  src="/branding/server-icon.png"
                  alt="Ventrix Emblem"
                  width={28}
                  height={28}
                  className="rounded-lg object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                VENTRIX <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-blue-500/10 text-cyan-400 border border-blue-500/20">FRONTIER</span>
              </span>
              <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">1.21.1 NeoForge Cloud</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-4 py-1.5 backdrop-blur-md">
            <a
              href="#pillars"
              className="text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/[0.06] transition-colors flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              The Pillars
            </a>
            <a
              href="#chronicles"
              className="text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/[0.06] transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              Chronicles
            </a>
            <button
              onClick={onOpenBlueMapModal}
              className="text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/[0.06] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Map className="w-3.5 h-3.5 text-emerald-400" />
              3D Live Map
            </button>
            <a
              href="#pioneers"
              className="text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/[0.06] transition-colors"
            >
              Pioneers
            </a>
            <a
              href="#guidelines"
              className="text-xs font-medium text-slate-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-white/[0.06] transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              Rules
            </a>
          </nav>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* 1-Click Copy IP pill */}
            <button
              onClick={handleCopyIp}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111726]/90 border border-white/[0.08] hover:border-cyan-500/40 text-xs font-mono text-slate-300 hover:text-white transition-all shadow-inner cursor-pointer"
              title="Click to copy server IP"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>mc.ventrixagency.com</span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
              )}
            </button>

            {/* Join CTA button */}
            <button
              onClick={onOpenJoinModal}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Server className="w-3.5 h-3.5" />
              How to Join
            </button>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/[0.05] border border-white/[0.1] text-slate-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0d15] border-b border-white/[0.1] px-5 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            <a
              href="#pillars"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-200 py-1"
            >
              The Four Pillars
            </a>
            <a
              href="#chronicles"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-200 py-1"
            >
              The Chronicles
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBlueMapModal();
              }}
              className="text-sm font-medium text-slate-200 py-1 text-left flex items-center gap-2"
            >
              <Map className="w-4 h-4 text-emerald-400" />
              Live 3D BlueMap
            </button>
            <a
              href="#pioneers"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-200 py-1"
            >
              Pioneer Roster
            </a>
            <a
              href="#guidelines"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-200 py-1"
            >
              Guidelines & Rules
            </a>
          </nav>

          <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-3">
            <button
              onClick={handleCopyIp}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#141b2d] border border-cyan-500/30 text-xs font-mono text-cyan-300"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied to Clipboard!" : "Copy: mc.ventrixagency.com"}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJoinModal();
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20"
            >
              Join Server Guide
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
