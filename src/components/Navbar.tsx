"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Menu, X } from "lucide-react";
import {
  capsuleMiniVariants,
  capsuleContentVariants,
  capsuleBarVariants,
} from "@/lib/motion";

export interface NavbarProps {
  onOpenJoinModal: () => void;
  onOpenBlueMapModal: () => void;
}

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  pillarTab?: "space" | "rail" | "civilization" | "world";
}

export function Navbar({ onOpenJoinModal, onOpenBlueMapModal }: NavbarProps) {
  const [copied, setCopied] = useState(false);
  const [isMini, setIsMini] = useState(false);
  const [isManuallyExpanded, setIsManuallyExpanded] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [activePillarTab, setActivePillarTab] = useState<
    "space" | "rail" | "civilization" | "world"
  >("space");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const isManuallyExpandedRef = useRef(false);
  const isMiniRef = useRef(false);
  const expandScrollYRef = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    { id: "expeditions", label: "Expeditions", href: "#pillars", pillarTab: "space" },
    { id: "corridors", label: "Corridors", href: "#pillars", pillarTab: "rail" },
    { id: "sovereignty", label: "Sovereignty", href: "#pillars", pillarTab: "civilization" },
    { id: "stratigraphy", label: "Stratigraphy", href: "#pillars", pillarTab: "world" },
    { id: "bluemap", label: "3D Map", onClick: onOpenBlueMapModal },
    { id: "directives", label: "Directives", href: "#guidelines" },
  ];

  // Sync ref values with state for reactive scroll listeners
  useEffect(() => {
    isManuallyExpandedRef.current = isManuallyExpanded;
  }, [isManuallyExpanded]);

  useEffect(() => {
    isMiniRef.current = isMini;
  }, [isMini]);

  // Scroll Morphing: scrollY > 60 collapses into capsule-mini, scrollY < 40 expands back
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Velocity blur drop (.header-nav.scrolling)
      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);

      // Section highlight reset when near hero top
      if (currentScrollY < 200) {
        setActiveSection("");
      }

      // Compact mini morph thresholding
      if (currentScrollY > 60) {
        if (isManuallyExpandedRef.current) {
          // If manually expanded, allow scrolling down past 100px delta to re-collapse
          if (Math.abs(currentScrollY - expandScrollYRef.current) > 100) {
            isManuallyExpandedRef.current = false;
            setIsManuallyExpanded(false);
            if (!isMiniRef.current) {
              setIsMini(true);
            }
          }
        } else {
          if (!isMiniRef.current) {
            setIsMini(true);
          }
        }
        setMobileMenuOpen(false);
      } else if (currentScrollY < 40) {
        isManuallyExpandedRef.current = false;
        setIsManuallyExpanded(false);
        if (isMiniRef.current) {
          setIsMini(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // Section observer for active indicator tracking
  useEffect(() => {
    const sectionIds = ["pillars", "guidelines"];
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

  // Active pillar sync listener
  useEffect(() => {
    const handlePillarSync = (e: Event) => {
      const custom = e as CustomEvent<"space" | "rail" | "civilization" | "world">;
      if (custom.detail) {
        setActivePillarTab(custom.detail);
      }
    };
    window.addEventListener("ventrix:set-pillar-tab", handlePillarSync);
    return () => window.removeEventListener("ventrix:set-pillar-tab", handlePillarSync);
  }, []);

  // Live telemetry fetch
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

  const handleCapsuleClick = (e: React.MouseEvent) => {
    if (isMini) {
      e.stopPropagation();
      setIsMini(false);
      setIsManuallyExpanded(true);
      isManuallyExpandedRef.current = true;
      expandScrollYRef.current = window.scrollY;
    }
  };

  return (
    <>
      <motion.header
        variants={capsuleMiniVariants}
        initial="expanded"
        animate={isMini ? "collapsed" : "expanded"}
        onClick={handleCapsuleClick}
        className={`header-nav capsule-sheen rounded-full ${
          isMini ? "capsule-mini cursor-pointer" : ""
        } ${isScrolling ? "scrolling" : ""}`}
        role={isMini ? "button" : "banner"}
        aria-label={isMini ? "Expand navigation header" : "Ventrix Frontier Navigation"}
        tabIndex={isMini ? 0 : undefined}
        onKeyDown={(e) => {
          if (isMini && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            setIsMini(false);
            setIsManuallyExpanded(true);
            isManuallyExpandedRef.current = true;
            expandScrollYRef.current = window.scrollY;
          }
        }}
      >
        {/* Brand Mark: SVG Shield Emblem + VENTRIX // FRONTIER Badge */}
        <motion.div
          variants={capsuleContentVariants}
          className="brand-group flex items-center gap-3 relative z-10 shrink-0"
        >
          <a
            href="#"
            className="flex items-center gap-2.5 group select-none cursor-pointer"
            aria-label="Ventrix Frontier Home"
          >
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/[0.12] bg-[#0c0d12]/80 flex items-center justify-center transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:border-white/30 group-hover:scale-105 shadow-inner">
              <svg
                className="w-4 h-4 text-white transition-transform duration-300 group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L4 5.5V11.5C4 16.5 7.5 21 12 22C16.5 21 20 16.5 20 11.5V5.5L12 2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 7V17"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
                <path
                  d="M9 10.5L12 7.5L15 10.5"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold tracking-tight text-white group-hover:text-zinc-200 transition-colors font-sans">
                VENTRIX
              </span>
              <span className="text-zinc-600 text-xs font-mono select-none">{"//"}</span>
              <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase px-1.5 py-0.5 rounded border border-white/[0.08] bg-white/[0.03]">
                FRONTIER
              </span>
            </div>
          </a>
        </motion.div>

        {/* Desktop Navigation Links with Gliding Indicator */}
        <motion.nav
          variants={capsuleContentVariants}
          className="nav-links hidden md:flex items-center gap-0.5 bg-white/[0.03] border border-white/[0.08] rounded-full p-1 backdrop-blur-md relative z-10 shrink-0"
          onMouseLeave={() => setHoveredNav(null)}
          aria-label="Expeditions & Navigation"
        >
          {navItems.map((item) => {
            const isHighlighted = hoveredNav
              ? hoveredNav === item.id
              : activeSection === "guidelines"
              ? item.id === "directives"
              : activeSection === "pillars"
              ? item.pillarTab === activePillarTab
              : false;

            return (
              <div key={item.id} className="relative">
                {isHighlighted && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 rounded-full bg-white/[0.09] border border-white/[0.08] shadow-sm pointer-events-none"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {item.href ? (
                  <a
                    href={item.href}
                    onClick={() => {
                      if (item.pillarTab) {
                        setActivePillarTab(item.pillarTab);
                        window.dispatchEvent(
                          new CustomEvent("ventrix:set-pillar-tab", { detail: item.pillarTab })
                        );
                      }
                    }}
                    onMouseEnter={() => setHoveredNav(item.id)}
                    className={`relative z-10 block text-xs px-3 py-1.5 rounded-full transition-colors duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] select-none cursor-pointer ${
                      isHighlighted
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
                    className="relative z-10 block text-xs px-3 py-1.5 rounded-full text-zinc-400 hover:text-white transition-colors duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] cursor-pointer select-none"
                  >
                    {item.label}
                  </button>
                )}
              </div>
            );
          })}
        </motion.nav>

        {/* Right CTA Group: Live Telemetry Chip + Liquid Action CTA */}
        <motion.div
          variants={capsuleContentVariants}
          className="header-cta flex items-center gap-2 relative z-10 shrink-0"
        >
          {/* Live Telemetry Chip: Pulsing Emerald Beacon + 20.0 TPS Locked • Dallas Core */}
          <button
            onClick={handleCopyIp}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.18] hover:bg-white/[0.06] transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer select-none group"
            title="Click to copy server IP (mc.ventrixagency.com)"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-mono text-zinc-200 group-hover:text-white transition-colors">
              {serverStats.tps.toFixed(1)} TPS Locked
            </span>
            <span className="text-zinc-600 text-[10px] select-none">•</span>
            <span className="text-[11px] font-mono text-zinc-400 group-hover:text-zinc-300 transition-colors">
              Dallas Core
            </span>
            {copied ? (
              <Check className="w-3 h-3 text-emerald-400 shrink-0 ml-0.5" />
            ) : (
              <Copy className="w-3 h-3 text-zinc-500 group-hover:text-zinc-300 transition-colors shrink-0 ml-0.5 opacity-0 group-hover:opacity-100" />
            )}
          </button>

          {/* Liquid Action CTA with .btn-sheen sweep on hover */}
          <button
            onClick={onOpenJoinModal}
            className="btn-sheen relative px-4 py-1.5 rounded-full bg-white hover:bg-zinc-100 active:bg-zinc-200 text-black text-xs font-medium tracking-tight shadow-[0_2px_14px_rgba(255,255,255,0.18)] transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98] cursor-pointer select-none flex items-center gap-1.5 shrink-0"
          >
            <span className="hidden sm:inline">Initialize Access</span>
            <span className="sm:hidden">Connect</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="flex md:hidden p-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-zinc-400 hover:text-white hover:border-white/[0.18] transition-colors cursor-pointer active:scale-[0.95]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </motion.div>

        {/* Compact Indicator Bar for .capsule-mini state */}
        <motion.div
          variants={capsuleBarVariants}
          className="capsule-indicator-bar"
          aria-hidden="true"
        />
      </motion.header>

      {/* Floating Mobile Glass Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && !isMini && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[92px] left-1/2 -translate-x-1/2 w-[min(1140px,92%)] z-[999] rounded-2xl border border-white/[0.08] bg-[#0a0c10]/95 backdrop-blur-[28px] p-4 shadow-2xl md:hidden overflow-hidden"
          >
            {/* Mobile Telemetry & Copy */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs font-mono text-zinc-200">
                  {serverStats.tps.toFixed(1)} TPS Locked • Dallas Core
                </span>
              </div>
              <button
                onClick={handleCopyIp}
                className="text-xs font-mono text-zinc-300 hover:text-white px-2.5 py-1 rounded bg-white/[0.06] active:scale-[0.95] transition-all flex items-center gap-1.5"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-zinc-400" />
                    <span>Copy IP</span>
                  </>
                )}
              </button>
            </div>

            {/* Mobile Navigation List */}
            <div className="flex flex-col space-y-1 text-sm font-normal text-zinc-300">
              {navItems.map((item) =>
                item.href ? (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (item.pillarTab) {
                        setActivePillarTab(item.pillarTab);
                        window.dispatchEvent(
                          new CustomEvent("ventrix:set-pillar-tab", { detail: item.pillarTab })
                        );
                      }
                    }}
                    className="py-2.5 px-3.5 rounded-xl hover:bg-white/[0.04] transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      item.onClick?.();
                    }}
                    className="text-left py-2.5 px-3.5 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
