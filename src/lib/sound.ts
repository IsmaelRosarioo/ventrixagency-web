/**
 * Ventrix Web Audio API Synthesizer Engine
 * Wave 1 — Motion Architecture & Audio Directorate
 *
 * 2026 Luxury Sound Design Specifications:
 * - 100% SSR-Safe: Checks `typeof window !== 'undefined'` before accessing browser APIs.
 * - Pure Web Audio API: Zero external mp3/wav assets; pure synthesized acoustics.
 * - Muted by default: Never auto-plays without explicit user consent.
 * - Ethereal Ambient Drone: 55Hz sub-bass fundamental with warm harmonic detuning,
 *   resonant lowpass filtering (Q ~ 2.0), and slow organic LFO modulation (0.07Hz)
 *   mimicking the serene atmospheric hum of an orbital station or alpine observatory.
 * - Tactile Audio Click: 12ms soft acoustic pulse with exponential decay for micro-interactions.
 * - Mobile & Autoplay Resilient: Resumes suspended AudioContext on user gesture, supports
 *   WebKit audio context, and handles tab visibility gracefully.
 */

// ============================================================================
// Types & State Management
// ============================================================================

export type MuteChangeListener = (muted: boolean) => void;

interface DroneGraph {
  oscFundamental: OscillatorNode;
  oscDetune: OscillatorNode;
  oscHarmonic: OscillatorNode;
  filter: BiquadFilterNode;
  lfo: OscillatorNode;
  lfoGain: GainNode;
  droneGain: GainNode;
  stopTimeout?: ReturnType<typeof setTimeout>;
}

let audioCtx: AudioContext | null = null;
let isMutedState = true; // Muted by default so it NEVER auto-plays
let activeDrone: DroneGraph | null = null;
const listeners = new Set<MuteChangeListener>();
let visibilityHandlerAttached = false;

// ============================================================================
// Internal Helpers
// ============================================================================

function notifyListeners() {
  listeners.forEach((listener) => {
    try {
      listener(isMutedState);
    } catch (err) {
      console.error("[Ventrix Audio] Listener error:", err);
    }
  });
}

function getAudioContextConstructor(): typeof AudioContext | null {
  if (typeof window === "undefined") return null;
  return (
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext ||
    null
  );
}

function setupVisibilityHandler() {
  if (visibilityHandlerAttached || typeof document === "undefined") return;
  visibilityHandlerAttached = true;

  document.addEventListener("visibilitychange", () => {
    if (!audioCtx) return;
    if (document.hidden) {
      // Fade out drone while page is not visible to conserve battery & eliminate background noise
      if (activeDrone && !isMutedState) {
        try {
          const now = audioCtx.currentTime;
          activeDrone.droneGain.gain.cancelScheduledValues(now);
          activeDrone.droneGain.gain.setValueAtTime(
            activeDrone.droneGain.gain.value,
            now
          );
          activeDrone.droneGain.gain.linearRampToValueAtTime(0.0001, now + 0.4);
        } catch {
          // Ignore scheduling errors during unload
        }
      }
    } else {
      // Restore drone if tab is active and unmuted
      if (activeDrone && !isMutedState) {
        try {
          if (audioCtx.state === "suspended") {
            audioCtx.resume();
          }
          const now = audioCtx.currentTime;
          activeDrone.droneGain.gain.cancelScheduledValues(now);
          activeDrone.droneGain.gain.setValueAtTime(0.0001, now);
          activeDrone.droneGain.gain.linearRampToValueAtTime(0.14, now + 2.0);
        } catch {
          // Ignore scheduling errors
        }
      }
    }
  });
}

// ============================================================================
// Core Audio Engine API
// ============================================================================

/**
 * Initializes and unlocks the Web Audio API context on user gesture.
 * Safe for SSR (returns null on the server).
 */
export async function initAudio(): Promise<AudioContext | null> {
  if (typeof window === "undefined") return null;

  try {
    if (!audioCtx) {
      const AudioContextClass = getAudioContextConstructor();
      if (!AudioContextClass) {
        console.warn("[Ventrix Audio] Web Audio API is not supported in this environment.");
        return null;
      }
      audioCtx = new AudioContextClass();
      setupVisibilityHandler();
    }

    if (audioCtx.state === "suspended") {
      await audioCtx.resume();
    }

    return audioCtx;
  } catch (err) {
    console.warn("[Ventrix Audio] Failed to initialize AudioContext:", err);
    return null;
  }
}

/**
 * Returns whether the audio engine is currently muted.
 * Muted by default.
 */
export function isMuted(): boolean {
  if (typeof window === "undefined") return true;
  return isMutedState;
}

/**
 * Explicitly sets the mute state.
 * Returns the updated mute state synchronously.
 */
export function setMuted(muted: boolean): boolean {
  if (typeof window === "undefined") return true;

  if (isMutedState === muted) return isMutedState;
  isMutedState = muted;

  if (!isMutedState) {
    // Unlock or initialize audio context synchronously within the user gesture stack
    if (!audioCtx) {
      const AudioContextClass = getAudioContextConstructor();
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
        setupVisibilityHandler();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }

    void startAmbientDrone();
    playHapticClick();
  } else {
    stopAmbientDrone();
  }

  notifyListeners();
  return isMutedState;
}

/**
 * Toggles the mute state and triggers the corresponding audio behavior.
 * Returns the new muted state (false = sound enabled, true = sound muted).
 */
export function toggleMute(): boolean {
  return setMuted(!isMutedState);
}

/**
 * Subscribes to mute state changes.
 * Returns an unsubscribe cleanup function.
 */
export function subscribeMuteChange(listener: MuteChangeListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Synthesizes a subtle tactile audio click (a 12ms soft acoustic pulse).
 * Used for button interactions, switches, and slider ticks.
 * No-ops if muted or running on the server.
 */
export function playHapticClick(): void {
  if (typeof window === "undefined" || isMutedState || !audioCtx) return;

  try {
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // Fast acoustic oscillator with rapid pitch-drop sweep
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    // Soft bandpass filter to shape the click into a tactile, mechanical tick
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1050, now);
    filter.Q.setValueAtTime(1.4, now);

    // Rapid pitch drop over 12ms (950Hz -> 140Hz)
    osc.type = "sine";
    osc.frequency.setValueAtTime(950, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.012);

    // 12ms acoustic pulse envelope: 1ms linear attack, 11ms exponential decay
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.001);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.015);

    // Disconnect when finished to prevent memory leaks
    osc.onended = () => {
      try {
        osc.disconnect();
        filter.disconnect();
        gain.disconnect();
      } catch {
        // Ignore disconnect errors
      }
    };
  } catch (err) {
    console.debug("[Ventrix Audio] Haptic click failed:", err);
  }
}

/**
 * Synthesizes a warm, ethereal 55Hz sub-bass ambient drone with gentle resonant filtering.
 * Mimics the serene atmospheric hum of an orbital space station or alpine observatory.
 * Respects mute state and cross-fades gently.
 */
export async function startAmbientDrone(): Promise<void> {
  if (typeof window === "undefined" || isMutedState) return;

  const ctx = await initAudio();
  if (!ctx) return;

  // If a drone is already active, cancel any scheduled stop and ensure gain is up
  if (activeDrone) {
    if (activeDrone.stopTimeout) {
      clearTimeout(activeDrone.stopTimeout);
      activeDrone.stopTimeout = undefined;
    }
    const now = ctx.currentTime;
    activeDrone.droneGain.gain.cancelScheduledValues(now);
    activeDrone.droneGain.gain.setValueAtTime(
      activeDrone.droneGain.gain.value,
      now
    );
    activeDrone.droneGain.gain.linearRampToValueAtTime(0.14, now + 2.0);
    return;
  }

  const now = ctx.currentTime;

  // 1. Fundamental sub-bass generator (55.0Hz - A1, warm grounding foundation)
  const oscFundamental = ctx.createOscillator();
  oscFundamental.type = "sine";
  oscFundamental.frequency.setValueAtTime(55.0, now);

  const gainFundamental = ctx.createGain();
  gainFundamental.gain.setValueAtTime(0.65, now);
  oscFundamental.connect(gainFundamental);

  // 2. Detuned harmonic companion (55.35Hz - creates slow, ethereal 0.35Hz acoustic beating)
  const oscDetune = ctx.createOscillator();
  oscDetune.type = "sine";
  oscDetune.frequency.setValueAtTime(55.35, now);

  const gainDetune = ctx.createGain();
  gainDetune.gain.setValueAtTime(0.35, now);
  oscDetune.connect(gainDetune);

  // 3. First harmonic overtone (110.0Hz - provides presence and body for smaller speakers)
  const oscHarmonic = ctx.createOscillator();
  oscHarmonic.type = "sine";
  oscHarmonic.frequency.setValueAtTime(110.0, now);

  const gainHarmonic = ctx.createGain();
  gainHarmonic.gain.setValueAtTime(0.2, now);
  oscHarmonic.connect(gainHarmonic);

  // 4. Resonant Lowpass Filter (Q = 2.2, cutoff centered at 160Hz)
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(160, now);
  filter.Q.setValueAtTime(2.2, now);

  // 5. Ultra-slow LFO (0.07Hz ~ 14.3s breathing cycle, matching the 14s sheenDrift motion cycle)
  const lfo = ctx.createOscillator();
  lfo.type = "sine";
  lfo.frequency.setValueAtTime(0.07, now);

  const lfoGain = ctx.createGain();
  lfoGain.gain.setValueAtTime(35, now); // Sweeps filter between ~125Hz and ~195Hz
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);

  // 6. Master Drone Gain (Smooth 2.5s bloom to avoid any sudden pop)
  const droneGain = ctx.createGain();
  droneGain.gain.setValueAtTime(0.0001, now);
  droneGain.gain.linearRampToValueAtTime(0.14, now + 2.5);

  // Connect synthesizer graph
  gainFundamental.connect(filter);
  gainDetune.connect(filter);
  gainHarmonic.connect(filter);

  filter.connect(droneGain);
  droneGain.connect(ctx.destination);

  // Start oscillators
  oscFundamental.start(now);
  oscDetune.start(now);
  oscHarmonic.start(now);
  lfo.start(now);

  activeDrone = {
    oscFundamental,
    oscDetune,
    oscHarmonic,
    filter,
    lfo,
    lfoGain,
    droneGain,
  };
}

/**
 * Smoothly stops and tears down the ambient drone synthesizer.
 * Cross-fades down over 1.2s to eliminate clicks or sudden cuts.
 */
export function stopAmbientDrone(): void {
  if (typeof window === "undefined" || !activeDrone || !audioCtx) return;

  const currentDrone = activeDrone;
  activeDrone = null;

  try {
    const now = audioCtx.currentTime;
    currentDrone.droneGain.gain.cancelScheduledValues(now);
    currentDrone.droneGain.gain.setValueAtTime(
      currentDrone.droneGain.gain.value,
      now
    );
    currentDrone.droneGain.gain.linearRampToValueAtTime(0.0001, now + 1.2);

    currentDrone.stopTimeout = setTimeout(() => {
      try {
        const stopTime = audioCtx ? audioCtx.currentTime : 0;
        currentDrone.oscFundamental.stop(stopTime);
        currentDrone.oscDetune.stop(stopTime);
        currentDrone.oscHarmonic.stop(stopTime);
        currentDrone.lfo.stop(stopTime);

        currentDrone.oscFundamental.disconnect();
        currentDrone.oscDetune.disconnect();
        currentDrone.oscHarmonic.disconnect();
        currentDrone.filter.disconnect();
        currentDrone.lfo.disconnect();
        currentDrone.lfoGain.disconnect();
        currentDrone.droneGain.disconnect();
      } catch {
        // Ignore disconnect errors during teardown
      }
    }, 1300);
  } catch (err) {
    console.debug("[Ventrix Audio] Stop ambient drone failed:", err);
  }
}
