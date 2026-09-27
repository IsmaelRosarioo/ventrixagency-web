"use client";

import React, { useState, useEffect } from "react";
import { UserPlus, CheckCircle, AlertCircle, Shield, Sparkles, Users } from "lucide-react";
import confetti from "canvas-confetti";

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
        setStatusMsg({ type: "success", text: data.message });
        setUsername("");
        setDiscordTag("");
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.8 },
          colors: ["#3b82f6", "#06b6d4", "#10b981", "#8b5cf6"],
        });
        fetchPioneers();
      } else {
        setStatusMsg({ type: "error", text: data.error || "Failed to enlist." });
      }
    } catch {
      setStatusMsg({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="pioneers" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.06]">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Users className="w-3.5 h-3.5" />
          Frontier Pioneer Registry
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Enlist in the Chronicle Roster
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Register your Minecraft in-game name to claim your Pioneer status and reserve your spot in upcoming world events.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Enlistment Form Card */}
        <div className="lg:col-span-6 bg-[#0b0e17]/80 backdrop-blur-xl border border-white/[0.1] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-cyan-400">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Pioneer Enlistment</h3>
              <p className="text-xs text-slate-400">Takes less than 10 seconds. Free forever.</p>
            </div>
          </div>

          <form onSubmit={handleEnlist} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                Minecraft In-Game Name (IGN) <span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                required
                maxLength={16}
                placeholder="e.g. Primalkin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/[0.08] focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/80 text-sm text-white font-mono placeholder:text-slate-600 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5">
                Discord Tag <span className="text-slate-500">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. primalkin#0000 or username"
                value={discordTag}
                onChange={(e) => setDiscordTag(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/[0.08] focus:border-cyan-500/80 focus:ring-1 focus:ring-cyan-500/80 text-sm text-white font-mono placeholder:text-slate-600 outline-none transition-all"
              />
            </div>

            {statusMsg && (
              <div
                className={`p-3.5 rounded-xl border flex items-center gap-2.5 text-xs font-medium ${
                  statusMsg.type === "success"
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                    : "bg-rose-500/10 border-rose-500/30 text-rose-300"
                }`}
              >
                {statusMsg.type === "success" ? (
                  <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                )}
                <span>{statusMsg.text}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 hover:from-blue-500 hover:via-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Registering...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Enlist in Pioneer Roster</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/[0.06] text-[11px] text-slate-500 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-slate-400" />
            <span>Pioneer registration stores zero passwords. Only public Minecraft usernames are tracked.</span>
          </div>
        </div>

        {/* Live Pioneer Feed Card */}
        <div className="lg:col-span-6 bg-[#0b0e17]/80 backdrop-blur-xl border border-white/[0.1] rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.06] mb-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Live Enlistments</span>
              <h3 className="text-lg font-bold text-white mt-0.5">Recently Registered Explorers</h3>
            </div>
            <span className="text-xs font-mono text-cyan-300 font-bold bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-500/30">
              {totalPioneers} Enlisted
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
            {pioneers.map((pioneer) => (
              <div
                key={pioneer.id}
                className="p-3.5 rounded-xl bg-black/40 border border-white/[0.05] flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-mono text-xs font-bold shrink-0">
                    {pioneer.minecraftUsername.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="truncate">
                    <div className="text-sm font-bold text-white truncate font-mono">
                      {pioneer.minecraftUsername}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {pioneer.badge || "Pioneer"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-white/[0.06] text-center">
            <span className="text-xs font-mono text-slate-400">
              Direct connection address: <span className="text-cyan-300 font-semibold">mc.ventrixagency.com</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
