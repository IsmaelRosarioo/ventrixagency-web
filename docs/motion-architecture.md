# Ventrix Motion Architecture & Physics Specification
**Fleet Wave 1 — Motion Architecture & Physics Directorate**  
**Design Reference Grounding**: [SignalView AI](https://signalview-ai-land.pages.dev) & [Boredom](https://bebored.co)

---

## 1. Executive Summary

This specification establishes the motion design tokens, mathematical easing curves, Framer Motion spring physics, and CSS keyframe animations for the Ventrix Agency flagship web portal (`ventrixagency.com`).

All motion is hardware-accelerated (restricted strictly to `transform`, `opacity`, and `filter`), GPU-composited, and designed to Apple Pro, Linear, and Bridgemind standards. Cartoonish bouncing, jarring layout shifts, and amateur transitions are strictly forbidden.

---

## 2. Mathematical Bezier Profiles & CSS Easing Tokens

| Token Name | Cubic Bezier Equation | Origin / Reference | Primary Application |
| :--- | :--- | :--- | :--- |
| `--ease-signalview` | `cubic-bezier(0.25, 1, 0.35, 1)` | SignalView | Capsule navigation entrance (`navDrop`), modal drops, smooth scroll-triggered pill expansions |
| `--ease-sheen` | `cubic-bezier(0.45, 0, 0.55, 1)` | SignalView | 14s continuous ambient liquid glass sheen drift (`sheenDrift`) |
| `--ease-bebored` | `cubic-bezier(0.2, 0.9, 0.25, 1)` | Bebored (`styles.css`) | Island verdict expansion, card state transitions, tab crossfades |
| `--spring-bebored` | `cubic-bezier(0.34, 1.26, 0.44, 1)` | Bebored (`styles.css`) | Dynamic island tap/hover physics, notched pill expansions |
| `--ease-apple` | `cubic-bezier(0.16, 1, 0.3, 1)` | Apple Pro | Primary button hover/active transitions, micro-haptics, specular highlights |
| `--ease-apple-subtle` | `cubic-bezier(0.25, 1, 0.5, 1)` | Apple Pro | Subtle glow fades, background color interpolation |
| `--ease-liquid` | `cubic-bezier(0.22, 1, 0.36, 1)` | Apple Pro / Bridgemind | Fluid section transitions, accordion expands |

---

## 3. Motion Keyframe Specifications

### 3.1 `sheenDrift`
- **Purpose**: Creates an ambient, drifting liquid glass reflection across glass pills and capsules without causing layout shifts.
- **Duration & Timing**: `14s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate`.
- **CSS Keyframes**:
```css
@keyframes sheenDrift {
  from {
    transform: translate3d(-6%, -4%, 0) rotate(-6deg);
  }
  to {
    transform: translate3d(6%, 4%, 0) rotate(8deg);
  }
}
```
- **Utility Class**: `.animate-sheen-drift`, `.capsule-sheen`

### 3.2 `sheenOnce`
- **Purpose**: High-precision Apple/Linear light sweep across solid white and dark glass CTA buttons on hover.
- **Duration & Timing**: Dual pseudo-elements (`::before` at 1.15s, `::after` at 0.9s, `ease`).
- **CSS Keyframes**:
```css
@keyframes sheenOnce {
  from {
    left: -35%;
  }
  to {
    left: 135%;
  }
}
```
- **Utility Class**: `.btn-sheen` (applies to `.header-cta`, `.btn-primary-apple`, etc.)

### 3.3 `navDrop`
- **Purpose**: Silky entrance drop for the floating capsule header on initial page load.
- **Duration & Timing**: `0.8s cubic-bezier(0.25, 1, 0.35, 1) 0.3s both`.
- **CSS Keyframes**:
```css
@keyframes navDrop {
  from {
    transform: translateX(-50%) translateY(-140%);
    opacity: 0;
  }
  to {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
}
```
- **Utility Class**: `.animate-nav-drop`, `.header-nav`

---

## 4. Morphing `.header-nav.capsule-mini` Mechanics

When the user scrolls past the hero threshold (e.g. `window.scrollY > 20px` or leaves the hero viewport), the full glass navigation capsule morphs into a compact dynamic pill.

### Behavior Spec:
1. **Full Capsule (Resting at top / hero)**:
   - Width: `min(1140px, 92%)`, Height: `58px`, Radius: `9999px`.
   - Backdrop filter: `blur(28px) saturate(1.8)`.
   - Pseudo-element `::before` runs `sheenDrift` indefinitely.
2. **Scroll Active (`.header-nav.scrolling`)**:
   - Temporarily drops blur to `blur(14px) saturate(1.4)` during active scroll velocity to prevent GPU frame drops, returning to full `blur(28px)` upon scroll idle.
3. **Mini Capsule (`.header-nav.capsule-mini`)**:
   - Width shrinks to `56px`, Height shrinks to `28px`.
   - Navigation links, brand typography, and CTA buttons transition to `opacity: 0; transform: scale(0.85) translateY(6px); pointer-events: none`.
   - A centered hairline indicator bar (`.capsule-indicator-bar`, 18px x 2px) fades and slides in (`opacity: 1; transform: translateY(0)`).
   - Clicking the mini capsule or scrolling back to top instantly expands back to full state using `cubic-bezier(0.25, 1, 0.35, 1)`.

---

## 5. Interactive 3D Canvas Dotted Globe Rotation & Drag Physics

Grounding: SignalView Exchange Data Globe (Three.js WebGL / Canvas).

### Physics Equations & Coefficients:
1. **Drag Sensitivity**:
   $$\Delta \text{RotY} = (\text{clientX} - \text{prevMX}) \times 0.005$$
   $$\Delta \text{RotX} = (\text{clientY} - \text{prevMY}) \times 0.005$$
2. **Autonomous Orbit Rotation (Idle)**:
   $$\text{targetRotY} += 0.0018 \quad \text{(per rAF frame when not dragging)}$$
3. **Inertial Spring Damping (Critically Damped Lerp)**:
   $$\text{globe.rotation.y} += (\text{targetRotY} - \text{globe.rotation.y}) \times 0.08$$
   $$\text{globe.rotation.x} += (\text{targetRotX} - \text{globe.rotation.x}) \times 0.08$$
4. **Orbit Chip Projection & Normal Facing Visibility**:
   - Facing Dot Product: $\text{facing} = \vec{v}_{\text{normal}} \cdot \vec{d}_{\text{cam}}$
   - Visibility Cutoff: $\text{vis} = \text{facing} > 0.08$
   - Depth-Scaled Transform:
     $$\text{scale} = 0.72 + 0.42 \times \max(0, \min(1, \text{facing}))$$
   - Z-Index Layering: $\text{zIndex} = \text{vis} \,?\, 100 + \text{round}(\text{facing} \times 50) : 1$

---

## 6. Floating Island Interactive Pulse (Bebored Grounding)

Grounding: Bebored hero and menu bar `.island` widget.

### Physics & Visual Spec:
1. **Breathing Beacon Pulse (`islandPulse`)**:
   - Periodic 4.5s ease-in-out breathing cycle modulating specular border opacity and soft drop shadow:
   ```css
   @keyframes islandPulse {
     0%, 100% {
       box-shadow: 0 14px 40px rgba(0, 0, 0, 0.5), 0 0 0 0 rgba(255, 255, 255, 0.12);
       border-color: rgba(255, 255, 255, 0.08);
     }
     50% {
       box-shadow: 0 18px 50px rgba(0, 0, 0, 0.65), 0 0 0 4px rgba(255, 255, 255, 0.05);
       border-color: rgba(255, 255, 255, 0.18);
     }
   }
   ```
2. **Tactile Interaction**:
   - Hover: `transform: translateY(-2px) scale(1.02); transition: transform 0.42s cubic-bezier(0.34, 1.26, 0.44, 1)`.
   - Active: `transform: translateY(0) scale(0.99)`.
3. **State Verdict Expansion**:
   - `.island-verdict` smoothly morphs from `width: 0; opacity: 0; padding: 0` to `width: auto; opacity: 1; padding: 4px 11px` with spring easing upon server event or user tap.

---

## 7. TypeScript Framer Motion Library Reference (`src/lib/motion.ts`)

Wave 2 engineers can import typed spring profiles and variants directly:

```tsx
import { 
  EASING, 
  SPRINGS, 
  GLOBE_PHYSICS, 
  sheenDriftVariants, 
  sheenOnceVariants, 
  navDropVariants, 
  capsuleMiniVariants,
  floatingIslandVariants 
} from "@/lib/motion";
```
