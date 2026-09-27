/**
 * Ventrix Motion Architecture & Physics Engine
 * Wave 1 — Derived from SignalView and Bebored Reference Mechanics
 * Standards: Apple Pro, SignalView (signalview-ai-land), Bebored (bebored.co)
 */

import { Transition, Variants } from "framer-motion";

// ============================================================================
// 1. Easing Curves & Mathematical Bezier Profiles
// ============================================================================

export const EASING = {
  /** SignalView liquid nav drop & smooth morph curve: cubic-bezier(0.25, 1, 0.35, 1) */
  signalview: [0.25, 1, 0.35, 1] as const,

  /** SignalView 14s glass sheen drift curve: cubic-bezier(0.45, 0, 0.55, 1) */
  sheen: [0.45, 0, 0.55, 1] as const,

  /** Bebored core UI ease: cubic-bezier(0.2, 0.9, 0.25, 1) */
  bebored: [0.2, 0.9, 0.25, 1] as const,

  /** Bebored floating island & drawer spring bezier: cubic-bezier(0.34, 1.26, 0.44, 1) */
  beboredSpring: [0.34, 1.26, 0.44, 1] as const,

  /** Apple Pro silky curve: cubic-bezier(0.16, 1, 0.3, 1) */
  apple: [0.16, 1, 0.3, 1] as const,

  /** Apple subtle transition curve: cubic-bezier(0.25, 1, 0.5, 1) */
  appleSubtle: [0.25, 1, 0.5, 1] as const,

  /** Liquid fluid curve: cubic-bezier(0.22, 1, 0.36, 1) */
  liquid: [0.22, 1, 0.36, 1] as const,
};

// ============================================================================
// 2. Framer Motion Spring Parameters
// ============================================================================

export const SPRINGS = {
  /**
   * Navigation entrance drop spring
   * Matches 0.8s entrance with cubic-bezier(0.25, 1, 0.35, 1)
   */
  navDrop: {
    type: "spring" as const,
    stiffness: 260,
    damping: 28,
    mass: 1,
  },

  /**
   * Header capsule mini scroll morph spring
   * High response stiffness (350), critically damped (30) to eliminate overshoot
   */
  capsuleMini: {
    type: "spring" as const,
    stiffness: 350,
    damping: 30,
    mass: 0.8,
  },

  /**
   * Bebored floating island hover & layout expansion spring
   * Dynamic haptic spring (stiffness: 420, damping: 25, mass: 0.6)
   */
  island: {
    type: "spring" as const,
    stiffness: 420,
    damping: 25,
    mass: 0.6,
  },

  /**
   * Interactive island tap / press feedback
   */
  islandTap: {
    type: "spring" as const,
    stiffness: 600,
    damping: 30,
    mass: 0.5,
  },

  /**
   * 3D Globe inertia & rotation tracking spring
   * Emulates SignalView lerp factor: rotation += (target - rotation) * 0.08
   */
  globeInertia: {
    type: "spring" as const,
    stiffness: 180,
    damping: 24,
    mass: 0.9,
  },

  /**
   * Apple solid pill button tactile response
   */
  tactilePill: {
    type: "spring" as const,
    stiffness: 500,
    damping: 32,
    mass: 0.5,
  },
};

// ============================================================================
// 3. SignalView Interactive 3D Dotted Globe Physics Constants
// ============================================================================

export const GLOBE_PHYSICS = {
  /** Mouse drag rotation sensitivity: delta * 0.005 */
  dragSensitivityX: 0.005,
  dragSensitivityY: 0.005,

  /** Autonomous orbit rotation speed per animation frame */
  autoRotateSpeed: 0.0018,

  /** Inertial damping interpolation factor (lerp rate per frame) */
  dampingFactor: 0.08,

  /** Camera perspective settings */
  cameraFov: 32,
  cameraZ: 3.8,

  /** Dot count and sphere radius for sunflower spherical distribution */
  dotCount: 16000,
  sphereRadius: 1.0,

  /** Facing normal dot-product cutoff for orbit chip visibility */
  facingCutoff: 0.08,

  /** Orbit chip scale calculation: scale = base + factor * clamp(facing, 0, 1) */
  chipScaleBase: 0.72,
  chipScaleFactor: 0.42,
};

// ============================================================================
// 4. Framer Motion Transitions & Variants
// ============================================================================

/**
 * 14s continuous sheen drift across glass capsules
 */
export const sheenDriftTransition: Transition = {
  duration: 14,
  ease: EASING.sheen,
  repeat: Infinity,
  repeatType: "reverse",
};

export const sheenDriftVariants: Variants = {
  initial: {
    x: "-6%",
    y: "-4%",
    rotate: -6,
  },
  animate: {
    x: "6%",
    y: "4%",
    rotate: 8,
    transition: sheenDriftTransition,
  },
};

/**
 * Single hover light sweep across CTA buttons (sheenOnce)
 */
export const sheenOnceVariants: Variants = {
  initial: {
    left: "-35%",
  },
  hover: {
    left: "135%",
    transition: {
      duration: 0.9,
      ease: [0.25, 1, 0.35, 1],
    },
  },
};

/**
 * Navigation entrance drop (navDrop)
 */
export const navDropVariants: Variants = {
  hidden: {
    y: "-140%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: EASING.signalview,
    },
  },
};

/**
 * Morphing Capsule Mini Navbar variants
 */
export const capsuleMiniVariants: Variants = {
  expanded: {
    width: "min(1140px, 92%)",
    height: 60,
    x: "-50%",
    borderRadius: 9999,
    paddingLeft: 24,
    paddingRight: 24,
    transition: SPRINGS.capsuleMini,
  },
  collapsed: {
    width: 56,
    height: 28,
    x: "-50%",
    borderRadius: 9999,
    paddingLeft: 0,
    paddingRight: 0,
    transition: SPRINGS.capsuleMini,
  },
};

export const capsuleContentVariants: Variants = {
  expanded: {
    opacity: 1,
    scale: 1,
    y: 0,
    pointerEvents: "auto",
    transition: { duration: 0.24, ease: EASING.apple },
  },
  collapsed: {
    opacity: 0,
    scale: 0.85,
    y: 6,
    pointerEvents: "none",
    transition: { duration: 0.2, ease: EASING.apple },
  },
};

export const capsuleBarVariants: Variants = {
  expanded: {
    opacity: 0,
    y: -4,
    transition: { duration: 0.2 },
  },
  collapsed: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: 0.1 },
  },
};

/**
 * Floating Island interactive pulse & states (from Bebored)
 */
export const floatingIslandVariants: Variants = {
  idle: {
    y: 0,
    scale: 1,
    boxShadow: "0 14px 40px rgba(0, 0, 0, 0.45)",
    transition: SPRINGS.island,
  },
  hover: {
    y: -2,
    scale: 1.02,
    boxShadow: "0 18px 52px rgba(0, 0, 0, 0.6)",
    transition: SPRINGS.island,
  },
  tap: {
    y: 0,
    scale: 0.99,
    transition: SPRINGS.islandTap,
  },
};

export const islandVerdictVariants: Variants = {
  hidden: {
    opacity: 0,
    width: 0,
    paddingLeft: 0,
    paddingRight: 0,
    transition: { duration: 0.3, ease: EASING.bebored },
  },
  visible: {
    opacity: 1,
    width: "auto",
    paddingLeft: 11,
    paddingRight: 11,
    transition: SPRINGS.island,
  },
};
