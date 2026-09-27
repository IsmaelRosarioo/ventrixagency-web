"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenJoinModal: () => void;
  onOpenBlueMapModal: () => void;
}

interface NavItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
}

export function Navbar({ onOpenJoinModal, onOpenBlueMapModal }: NavbarProps) {
  const [copied, setCopied] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
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

  const navItems: NavItem[] = [
    { id: "pillars", label: "Expeditions", href: "#pillars" },
    { id: "chronicles", label: "Progression", href: "#chronicles" },
    { id: "bluemap", label: "3D Map", onClick: onOpenBlueMapModal },
    { id: "guidelines", label: "Directives", href: "#guidelines" },
    { id: "pioneers", label: "Pioneers", href: "#pioneers" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (window.scrollY < 250) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ["pillars", "chronicles", "guidelines", "pioneers"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0.1,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,border-color,padding,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled
          ? "bg-[#050608]/85 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl shadow-black/80"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Identity */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/[0.12] bg-[#0c0d12] flex items-center justify-center transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:border-white/30 group-hover:scale-105">
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

          {/* Desktop Navigation with Gliding Indicator */}
          <nav
            className="hidden md:flex items-center gap-0.5 bg-white/[0.03] border border-white/[0.08] rounded-full p-1 backdrop-blur-md relative"
            onMouseLeave={() => setHoveredNav(null)}
          >
            {navItems.map((item) => {
              const isHighlighted = hoveredNav
                ? hoveredNav === item.id
                : activeSection === item.id;

              return (
                <div key={item.id} className="relative">
                  {isHighlighted && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 rounded-full bg-white/[0.09] border border-white/[0.08] shadow-sm"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  {item.href ? (
                    <a
                      href={item.href}
                      onMouseEnter={() => setHoveredNav(item.id)}
                      className={`relative z-10 block text-xs px-3.5 py-1.5 rounded-full transition-colors duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] select-none ${
                        activeSection === item.id
                          ? "text-white font-medium"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <button
                      onClick={item.onClick}
                      onMouseEnter={() => setHoveredNav(item.id)}
                      className="relative z-10 block text-xs px-3.5 py-1.5 rounded-full text-zinc-400 hover:text-white transition-colors duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] cursor-pointer select-none"
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Status Pill & CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Server Quick Status & Copy */}
            <button
              onClick={handleCopyIp}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] hover:bg-white/[0.06] transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] text-left cursor-pointer group select-none"
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
              className="px-4 py-1.5 rounded-full bg-white hover:bg-[#ededed] active:bg-[#e4e4e7] text-black text-xs font-medium transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] shadow-sm hover:shadow-[0_2px_14px_rgba(255,255,255,0.18)] cursor-pointer select-none"
            >
              Connect
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenJoinModal}
              className="px-3 py-1 rounded-full bg-white text-black text-xs font-medium cursor-pointer active:scale-[0.98] transition-transform duration-150"
            >
              Connect
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg border border-white/[0.08] text-zinc-400 hover:text-white transition-colors cursor-pointer active:scale-[0.95]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer with Smooth Entrance */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-b border-white/[0.08] bg-[#050608]/98 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-5 py-6 space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-mono text-zinc-300">mc.ventrixagency.com</span>
                </div>
                <button
                  onClick={handleCopyIp}
                  className="text-xs font-mono text-zinc-400 hover:text-white px-2 py-1 rounded bg-white/[0.04] active:scale-[0.95] transition-all"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              <div className="flex flex-col space-y-2 text-sm font-normal text-zinc-300">
                <a
                  href="#pillars"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-3 rounded-lg transition-colors ${
                    activeSection === "pillars"
                      ? "bg-white/[0.08] text-white font-medium"
                      : "hover:bg-white/[0.04]"
                  }`}
                >
                  Architecture
                </a>
                <a
                  href="#chronicles"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-3 rounded-lg transition-colors ${
                    activeSection === "chronicles"
                      ? "bg-white/[0.08] text-white font-medium"
                      : "hover:bg-white/[0.04]"
                  }`}
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
                  className={`py-2 px-3 rounded-lg transition-colors ${
                    activeSection === "guidelines"
                      ? "bg-white/[0.08] text-white font-medium"
                      : "hover:bg-white/[0.04]"
                  }`}
                >
                  Server Directives
                </a>
                <a
                  href="#pioneers"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-3 rounded-lg transition-colors ${
                    activeSection === "pioneers"
                      ? "bg-white/[0.08] text-white font-medium"
                      : "hover:bg-white/[0.04]"
                  }`}
                >
                  Pioneer Registry
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
