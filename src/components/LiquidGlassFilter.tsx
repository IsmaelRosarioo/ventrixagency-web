"use client";

import React, { useEffect } from "react";

/**
 * LiquidGlassFilter
 * 
 * True Liquid Glass SVG Filter Engine inspired by SignalView AI and Apple Vision Pro.
 * Generates dynamic SVG chromatic difference displacement maps that scale with target elements,
 * producing authentic physical optical refraction and edge lens distortion on floating capsules.
 */
export function LiquidGlassFilter() {
  useEffect(() => {
    const glassHeader = document.getElementById("mainHeaderNav");
    const glassFe = document.getElementById("liquidFeImage") as SVGElement | null;
    if (!glassHeader || !glassFe) return;

    let lastGlassKey = "";

    function updateLiquidGlass(force = false) {
      if (!glassHeader || !glassFe) return;
      const r = glassHeader.getBoundingClientRect();
      const w = Math.max(1, Math.round(r.width));
      const h = Math.max(1, Math.round(r.height));
      const isMini = glassHeader.classList.contains("capsule-mini");
      const rad = isMini ? 14 : 999;
      const key = `${w}x${h}x${rad}`;
      if (!force && key === lastGlassKey) return;
      lastGlassKey = key;

      const edge = Math.min(w, h) * 0.035;
      const svg = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">`
        + `<defs>`
        + `<linearGradient id="lg-red" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="red"/></linearGradient>`
        + `<linearGradient id="lg-blue" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="blue"/></linearGradient>`
        + `</defs>`
        + `<rect x="0" y="0" width="${w}" height="${h}" fill="black"/>`
        + `<rect x="0" y="0" width="${w}" height="${h}" rx="${rad}" fill="url(#lg-red)"/>`
        + `<rect x="0" y="0" width="${w}" height="${h}" rx="${rad}" fill="url(#lg-blue)" style="mix-blend-mode:difference"/>`
        + `<rect x="${edge}" y="${edge}" width="${w - edge * 2}" height="${h - edge * 2}" rx="${rad}" fill="hsl(0 0% 50% / 0.93)" style="filter:blur(11px)"/>`
        + `</svg>`;

      glassFe.setAttribute("href", "data:image/svg+xml," + encodeURIComponent(svg));
    }

    updateLiquidGlass(true);

    const handleResize = () => updateLiquidGlass(false);
    window.addEventListener("resize", handleResize, { passive: true });
    glassHeader.addEventListener("transitionend", () => updateLiquidGlass(false));

    let observer: MutationObserver | null = null;
    if ("MutationObserver" in window) {
      observer = new MutationObserver(() => updateLiquidGlass(false));
      observer.observe(glassHeader, {
        attributes: true,
        attributeFilter: ["class", "style"],
      });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <svg
      className="liquid-glass-svg pointer-events-none fixed -top-[9999px] -left-[9999px] w-0 h-0 opacity-0 overflow-hidden"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <filter
          id="liquidGlassFilter"
          colorInterpolationFilters="sRGB"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
        >
          <feImage
            id="liquidFeImage"
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            result="map"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="map"
            scale="-120"
            xChannelSelector="R"
            yChannelSelector="G"
            result="dispRed"
          />
          <feColorMatrix
            in="dispRed"
            type="matrix"
            values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="red"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="map"
            scale="-110"
            xChannelSelector="R"
            yChannelSelector="G"
            result="dispGreen"
          />
          <feColorMatrix
            in="dispGreen"
            type="matrix"
            values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
            result="green"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="map"
            scale="-100"
            xChannelSelector="R"
            yChannelSelector="G"
            result="dispBlue"
          />
          <feColorMatrix
            in="dispBlue"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
            result="blue"
          />
          <feBlend in="red" in2="green" mode="screen" result="rg" />
          <feBlend in="rg" in2="blue" mode="screen" result="output" />
          <feGaussianBlur stdDeviation="0.7" />
        </filter>
      </defs>
    </svg>
  );
}
