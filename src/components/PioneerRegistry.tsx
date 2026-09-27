"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";

interface Pioneer {
  id: string;
  minecraftUsername: string;
  discordTag?: string;
  enlistedAt: string;
  badge?: string;
}

export function PioneerRegistry() {
  const [username, setUsername] = useState("");
  const [discordTag, setDiscordTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [pioneers, setPioneers] = useState<Pioneer[]>([]);
  const [totalPioneers, setTotalPioneers] = useState(3);

  const fetchPioneers = () => {
    fetch("/api/pioneer")
      .then((res) => res.json())
      .then((data) => {
        if (data.pioneers) {
          setPioneers(data.pioneers);
          setTotalPioneers(data.total);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchPioneers();
  }, []);

  const handleEnlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setStatusMsg(null);

    try {
      const res = await fetch("/api/pioneer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          minecraftUsername: username.trim(),
          discordTag: discordTag.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatusMsg({ type: "success", text: "Identity verified. Registered in the Pioneer Manifest." });
        setUsername("");
        setDiscordTag("");
        fetchPioneers();
      } else {
        setStatusMsg({ type: "error", text: data.error || "Failed to register." });
      }
    } catch {
      setStatusMsg({ type: "error", text: "Network connection error. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="pioneers" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="max-w-3xl mb-16 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-zinc-400 font-mono text-[11px] uppercase tracking-widest mb-4">
          <Users className="w-3 h-3 text-zinc-400" />
          PERSONNEL ROSTER
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-[-0.02em] font-normal leading-[1.12] mb-4">
          Frontier Pioneer Registry
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg font-normal leading-relaxed">
          Enlist your official Minecraft handle into the server registry to track achievements and participate in global world milestones.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Terminal Enlistment Form */}
        <div className="lg:col-span-5 bg-[#0c0d12]/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-300">
              Identity Verification Terminal
            </span>
            <span className="font-mono text-[11px] text-zinc-400">
              {totalPioneers} ENLISTED
            </span>
          </div>

          <form onSubmit={handleEnlist} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                Minecraft In-Game Name (IGN) *
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. CommanderRosario"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/[0.08] text-white text-xs sm:text-sm font-mono placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                Discord Tag (Optional)
              </label>
              <input
                type="text"
                value={discordTag}
                onChange={(e) => setDiscordTag(e.target.value)}
                placeholder="e.g. ventrix#0001"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/[0.08] text-white text-xs sm:text-sm font-mono placeholder:text-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !username.trim()}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-[#ededed] active:bg-[#e4e4e7] text-black font-medium text-xs sm:text-sm active:scale-[0.98] transition-all duration-200 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_2px_14px_rgba(255,255,255,0.18)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 select-none"
            >
              {loading ? (
                <span>Verifying Credentials...</span>
              ) : (
                <>
                  <span>Enlist in Roster</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <AnimatePresence>
              {statusMsg && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className={`p-3 rounded-xl text-xs font-mono flex items-center gap-2 border ${
                    statusMsg.type === "success"
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                      : "bg-red-500/10 border-red-500/20 text-red-400"
                  }`}
                >
                  {statusMsg.type === "success" ? (
                    <CheckCircle className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0" />
                  )}
                  <span>{statusMsg.text}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        {/* Right: Enlisted Pioneers Roster */}
        <div className="lg:col-span-7 bg-[#0c0d12]/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
            <span className="font-mono text-xs uppercase tracking-wider text-zinc-300">
              Active Manifest
            </span>
            <span className="font-mono text-[11px] text-zinc-400">
              STATUS: AUTHENTICATED
            </span>
          </div>

          <div className="space-y-2.5">
            {pioneers.map((pioneer) => (
              <div
                key={pioneer.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-white/[0.05]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center font-mono font-bold text-xs text-zinc-300">
                    {pioneer.minecraftUsername.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <span className="font-mono text-xs sm:text-sm font-semibold text-white">
                      {pioneer.minecraftUsername}
                    </span>
                    {pioneer.discordTag && (
                      <span className="block text-[11px] font-mono text-zinc-500">
                        {pioneer.discordTag}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06] text-zinc-400">
                    {pioneer.badge || "FOUNDING PIONEER"}
                  </span>
                  <span className="text-zinc-500 hidden sm:inline">{pioneer.enlistedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
