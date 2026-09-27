# VENTRIX // SIGNALVIEW AI IMMERSIVE SHOWCASE SPECIFICATION
### Wave 3 Architecture Directorate Deliverable

---

## 1. Architectural Philosophy

The Ventrix Agency portal embodies the SignalView AI showcase paradigm:
- **Full-Bleed Immersive Atmospheres**: Seamless dark gradient vignettes, deep void `#050608` canvases, and radial atmospheric blooms replacing sterile solid block containers.
- **Floating Glass Showcase Panels**: Smooth `rounded-[30px]` or `rounded-[36px]` geometries elevated with profound ambient drop shadows (`box-shadow: 0 34px 90px rgba(0,0,0,0.5)`), delicate `border border-white/10` hairlines, and top-edge specular micro-sheens (`linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.28), transparent)`).
- **Organic Breathing Rhythm**: Generous whitespace (`py-28 md:py-36`), fluid section transitions, and micro-haptic pill interactions replacing static rectangular grids.
- **Typographic Precision**: Uppercase monospace kickers (`tracking-[0.22em] text-xs font-mono text-zinc-400`), crisp headline kerning (`tracking-[-0.035em]`), and calm, authoritative editorial prose.

---

## 2. Showcase Classes & Surface Tokens

```css
.feature-section.immersive-section {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.floating-showcase-panel {
  border-radius: 30px;
  box-shadow: 0 34px 90px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: radial-gradient(120% 120% at 50% 0%, rgba(255, 255, 255, 0.04) 0%, rgba(14, 16, 22, 0.72) 40%, rgba(7, 8, 12, 0.94) 100%);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  position: relative;
}
```

---

## 3. Modpack Pillars Hierarchy
- **Pillar 01 // Interplanetary Space Program**:
  - 8K Deep-Space Colonization Expedition Visual HUD
  - Dual Celestial Reconnaissance Suite: Interactive 3D Dotted Canvas Globe (`<OrbitalRadarCanvas />`) and SVG Orbital Trajectory Simulator (`<CosmosOrbitalMap />`)
  - Staged rocketry and life support technical dossiers
- **Pillar 02 // Continental Rail Corridors**:
  - Interactive Continental Transit Dispatch HUD (`<ContinentalRailways />`)
  - Real-time line switching, scheduled passenger trains, and automated freight manifests
- **Pillar 03 // Sovereign Claims & Civilizations**:
  - Sovereign Chunk Claims & Civilizations Matrix (`<CivilizationClaims />`)
  - Interactive territory grid, tier escalation, and permission whitelist telemetry
- **Pillar 04 // Living World & Biomes**:
  - 85+ Terralith Living Biomes Stratigraphy Scanner (`<LivingWorldExplorer />`)
  - Vertical altitude ruler (Y=-64 to 320), climate zones, and native biodiversity telemetry

---

## 4. Intent Gateway Onboarding Architecture
- **Track A // New Explorer 3-Minute Onboarding**:
  - Launcher Selection (Prism Launcher with Java 21 auto-detect vs CurseForge App)
  - Interactive RAM Allocation Slider (4 GB to 16 GB with real-time visual meter, target heap zones, and dynamic JVM flag generation)
  - Direct Node Connect (`mc.ventrixagency.com` with single-click copy and micro-haptic state feedback)
- **Track B // Returning Pioneer Operational Briefing**:
  - Dallas Core Cluster live telemetry (20.0 TPS locked, player census, AMD Ryzen 9 9950X3D dedicated silicon)
  - Firmware v3.0.2 Changelog Highlights (Glacio sector, Continental rail signaling, Quest Act IV)
  - 3D BlueMap Orbital Mesh launcher
