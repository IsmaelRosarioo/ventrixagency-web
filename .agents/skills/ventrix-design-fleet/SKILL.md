---
name: ventrix-design-fleet
description: Multi-agent design fleet and architectural framework for continuously designing, polishing, auditing, and evolving the Ventrix Agency flagship web portal to Apple, Bridgemind, and Linear standards.
---

# Ventrix Agency Flagship Design Fleet

An elite, multi-tiered autonomous agent ladder designed to continuously elevate, polish, and maintain `ventrixagency.com` to the world-class design standard of Apple Pro product launches, bridgemind.ai, and Linear.

---

## 1. Fleet Ladder Architecture

The fleet is structured as a hierarchical execution ladder with strict separation of concerns:

```
                  ┌───────────────────────────────────────────────┐
                  │            MAIN AGENT (ORCHESTRATOR)          │
                  │   Directs overall vision, reviews diffs,     │
                  │   coordinates deployment, and audits builds   │
                  └───────────────────────┬───────────────────────┘
                                          │
            ┌─────────────────────────────┼─────────────────────────────┐
            │                             │                             │
┌───────────▼──────────┐      ┌───────────▼──────────┐      ┌───────────▼──────────┐
│   MOTION & INTERACTION│      │EDITORIAL & INFO ARCH │      │    DESIGN SYSTEMS    │
│       ARCHITECT      │      │      ARCHITECT       │      │       ENGINEER       │
│ Framer Motion, easing│      │ Intentional copy, UX │      │ CSS tokens, spacing  │
│ curves, scroll reveals│     │ routing (new vs vets)│      │ layout math, build   │
└───────────┬──────────┘      └───────────┬──────────┘      └───────────┬──────────┘
            │                             │                             │
            └─────────────────────────────┼─────────────────────────────┘
                                          │
                        ┌─────────────────┴─────────────────┐
                        │                                   │
            ┌───────────▼──────────┐            ┌───────────▼──────────┐
            │  TACTILE COMPONENT   │            │     QA AESTHETIC     │
            │       ENGINEER       │            │       AUDITOR        │
            │ Buttons, sliders, HUD│            │ Zero-vibecoding audit│
            │ tabs, micro-haptics  │            │ provider stealth & UI│
            └──────────────────────┘            └──────────────────────┘
```

---

## 2. Agent Roles & Responsibilities

### Tier 1: Main Orchestrator
- **Responsibility**: Directs the sprint, decomposes tasks, dispatches subagents, reviews unified code diffs, runs production builds, and pushes live to Vercel and GitHub.

### Tier 2: The Three Pillar Agents
1. **`motion_interaction_architect`**:
   - Manages Framer Motion animations, subtle scroll-driven fade-ins, and silky easing curves (`cubic-bezier(0.16, 1, 0.3, 1)`).
   - Animates only `transform` and `opacity` to maintain 60 FPS hardware acceleration.
   - Forbids cartoonish bouncy animations and jarring movements.
2. **`editorial_information_architect`**:
   - Structures intentional copy tailored for both **New Visitors** (discovery, quickstart, client installation) and **Returning Players** (live TPS, 3D coordinates, patch changelogs).
   - Enforces typographic tracking (`tracking-[-0.035em]` on headlines, `leading-relaxed` on body text).
   - Strict provider stealth: ensures all infrastructure is branded as Ventrix Cloud Core or Dallas Core.
3. **`design_systems_engineer`**:
   - Governs the spatial rhythm: section padding (`py-32` to `py-36`), grid gaps (`gap-4` to `gap-8`), and 1px hairline borders (`rgba(255, 255, 255, 0.08)`).
   - Manages CSS variables in `globals.css` and ensures zero layout shifts (CLS).

### Tier 3: The Two Execution Specialists
4. **`tactile_component_engineer`**:
   - Crafts high-precision interactive widgets: Apple-grade solid white pill buttons, dark glass action triggers, interactive tab switchers, and live telemetry HUDs.
   - Enforces instant inline micro-feedback (e.g. green checkmarks on copy) with zero confetti.
5. **`qa_aesthetic_auditor`**:
   - Scans against amateur tropes ("vibecoding"): zero rainbow gradient text, zero messy neon glows, zero confetti.
   - Validates responsive mobile parity across viewports (375px to 1440px).
   - Runs `npm run build` and `npm run lint` to guarantee 0 errors.

---

## 3. Design System Standards

- **Color Tokens**:
  - Background: `#050608` (Deep Void Black)
  - Card Surface: `#0c0d12` (Obsidian Glass)
  - Hairline Border: `rgba(255, 255, 255, 0.07)` to `rgba(255, 255, 255, 0.12)`
  - Primary Text: `#FFFFFF` (Solid Crisp White)
  - Secondary Text: `#A1A1AA` to `#71717A` (Muted Zinc)
- **Typography**:
  - Fonts: Vercel Geist Sans and Geist Mono.
  - Headlines: Tight negative kerning (`tracking-[-0.035em]`), medium-to-semibold weights.
  - Metadata: Uppercase monospace micro-labels (`text-[11px] font-mono tracking-widest text-zinc-400`).
- **Content Philosophy (Server Life over Mod Mechanics)**:
  - Showcase what players actually **do and experience** on the official multiplayer server:
    * Interplanetary Space Program (Moon, Mars, Venus, Mercury, Glacio expeditions)
    * Continental Rail & Transit Networks (high-speed transit, automated freight, station timetables)
    * Sovereign Land Claims & Civilizations (grief-free SMP, town founding, player trading)
    * Living World & Biomes (85+ Terralith biomes, vertical Y=-64 to 320 elevation, custom wildlife)
    * 500+ Guided Quests (structured progression across 4 Acts, zero aimless grind)
    * Live 3D Satellite BlueMap & Dallas Core 20.0 locked TPS
  - Strictly forbid hyper-niche mod-internal simulations (spinning gear cogs, ME drive storage bits, acoustic waveforms). Focus on the multiplayer server grandeur.
- **Provider Stealth**:
  - Absolutely zero references to external hosting providers (Foxomy, etc.).
  - Always use: `Ventrix Cloud Core`, `Dallas Core Cluster (Tier 4 Facility)`, `US-Central`.

---

## 4. Standard Operational Runbook

When continuing or refining this website:
1. **Analyze Requirements**: Identify whether the update affects Motion, Editorial Content, Design Systems, Tactile Components, or QA.
2. **Invoke Specialized Subagent(s)**: Deploy via `invoke_subagent` using the ladder hierarchy.
3. **Validate Stealth**: Grep for forbidden provider strings (`git grep -i "foxomy"`).
4. **Verify Build**: Run `npm run build` in `/Users/ish/Documents/projects/ventrixagency-web`.
5. **Production Deploy**: Push to GitHub and deploy to Vercel production (`vercel --prod`).
