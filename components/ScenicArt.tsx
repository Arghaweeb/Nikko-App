"use client";

import React from "react";
import type { ArtSpec } from "@/types";

/**
 * ScenicArt — lightweight generative landscape art so the prototype ships with
 * zero binary assets. Each variant is a layered silhouette over a two-hue sky.
 * In production these slots take real photography (next/image) with the same
 * aspect ratios.
 */
export function ScenicArt({ art, className = "" }: { art: ArtSpec; className?: string }) {
  const [h1, h2] = art.hues;
  const sky = `hsl(${h1} 45% 72%)`;
  const skyLow = `hsl(${h1} 50% 86%)`;
  const far = `hsl(${h2} 30% 58%)`;
  const mid = `hsl(${h2} 32% 42%)`;
  const near = `hsl(${h2} 34% 26%)`;
  const accent = `hsl(${(h1 + 30) % 360} 70% 88%)`;
  const gid = `g${h1}-${h2}-${art.variant}`;

  return (
    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" className={className} role="img" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={sky} />
          <stop offset="100%" stopColor={skyLow} />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill={`url(#${gid})`} />
      <circle cx="312" cy="58" r="26" fill={accent} opacity="0.9" />
      {/* far ridge */}
      <path d="M0 130 L70 84 L130 122 L200 70 L268 118 L330 88 L400 124 V240 H0 Z" fill={far} opacity="0.75" />
      {/* mid ridge */}
      <path d="M0 162 L60 124 L140 158 L228 112 L312 156 L400 130 V240 H0 Z" fill={mid} opacity="0.85" />
      <Foreground variant={art.variant} near={near} accent={accent} />
    </svg>
  );
}

function Foreground({ variant, near, accent }: { variant: ArtSpec["variant"]; near: string; accent: string }) {
  switch (variant) {
    case "falls":
      return (
        <g>
          <path d="M0 240 V150 L90 132 H150 V240 Z" fill={near} />
          <path d="M250 240 V140 L400 122 V240 Z" fill={near} />
          <rect x="172" y="118" width="56" height="96" fill="white" opacity="0.85" rx="4" />
          <rect x="186" y="118" width="10" height="96" fill={accent} opacity="0.6" />
          <ellipse cx="200" cy="222" rx="80" ry="14" fill="white" opacity="0.5" />
          <path d="M0 240 H400 V222 Q300 208 200 222 Q100 236 0 222 Z" fill={near} opacity="0.9" />
        </g>
      );
    case "lake":
      return (
        <g>
          <rect x="0" y="170" width="400" height="70" fill={near} opacity="0.25" />
          <rect x="0" y="170" width="400" height="3" fill="white" opacity="0.5" />
          <ellipse cx="120" cy="190" rx="60" ry="4" fill="white" opacity="0.35" />
          <ellipse cx="290" cy="208" rx="80" ry="5" fill="white" opacity="0.25" />
          <path d="M40 196 q14 -12 28 0 l-6 6 h-16 Z" fill={near} />
          <path d="M0 240 H400 V230 Q200 218 0 230 Z" fill={near} />
        </g>
      );
    case "shrine":
      return (
        <g>
          <path d="M0 240 V196 Q200 178 400 196 V240 Z" fill={near} />
          {/* torii */}
          <rect x="150" y="120" width="10" height="84" fill={near} />
          <rect x="240" y="120" width="10" height="84" fill={near} />
          <rect x="132" y="108" width="136" height="12" rx="4" fill={near} />
          <rect x="142" y="132" width="116" height="8" fill={near} />
          {/* pagoda hint */}
          <path d="M318 168 h44 l-8 -12 h-28 Z M322 152 h36 l-7 -11 h-22 Z M327 138 h26 l-6 -10 h-14 Z" fill={near} />
          <rect x="334" y="168" width="12" height="32" fill={near} />
        </g>
      );
    case "forest":
      return (
        <g>
          {[30, 75, 120, 250, 300, 350].map((x, i) => (
            <g key={x}>
              <rect x={x - 3} y={120 + (i % 3) * 10} width="6" height={110 - (i % 3) * 10} fill={near} />
              <path d={`M${x} ${78 + (i % 3) * 10} l22 56 h-44 Z`} fill={near} opacity="0.92" />
              <path d={`M${x} ${102 + (i % 3) * 10} l28 62 h-56 Z`} fill={near} />
            </g>
          ))}
          <path d="M0 240 H400 V224 Q200 210 0 224 Z" fill={near} />
        </g>
      );
    case "town":
      return (
        <g>
          <path d="M30 200 v-44 l34 -18 34 18 v44 Z" fill={near} />
          <path d="M120 200 v-36 l28 -16 28 16 v36 Z" fill={near} opacity="0.9" />
          <path d="M200 200 v-50 l40 -20 40 20 v50 Z" fill={near} />
          <path d="M300 200 v-34 l26 -14 26 14 v34 Z" fill={near} opacity="0.9" />
          <rect x="56" y="172" width="14" height="22" fill={accent} opacity="0.8" />
          <rect x="228" y="166" width="16" height="26" fill={accent} opacity="0.8" />
          <path d="M0 240 H400 V200 H0 Z" fill={near} opacity="0.95" />
          {/* noren lantern */}
          <circle cx="190" cy="186" r="7" fill={accent} />
        </g>
      );
    case "onsen":
      return (
        <g>
          <ellipse cx="200" cy="206" rx="120" ry="22" fill={near} opacity="0.3" />
          <ellipse cx="200" cy="206" rx="120" ry="22" fill="none" stroke={near} strokeWidth="4" />
          {/* steam */}
          <path d="M170 178 q8 -14 0 -28 q-8 -14 0 -26" stroke="white" strokeWidth="6" fill="none" opacity="0.7" strokeLinecap="round" />
          <path d="M200 182 q9 -16 0 -30 q-9 -16 0 -30" stroke="white" strokeWidth="6" fill="none" opacity="0.8" strokeLinecap="round" />
          <path d="M230 178 q8 -14 0 -28 q-8 -14 0 -26" stroke="white" strokeWidth="6" fill="none" opacity="0.7" strokeLinecap="round" />
          <path d="M0 240 H400 V226 Q200 214 0 226 Z" fill={near} />
        </g>
      );
    case "bridge":
      return (
        <g>
          <path d="M60 196 Q200 150 340 196" stroke={near} strokeWidth="12" fill="none" />
          <path d="M60 196 Q200 162 340 196" stroke={accent} strokeWidth="3" fill="none" opacity="0.7" />
          {[100, 150, 200, 250, 300].map((x) => (
            <rect key={x} x={x - 2} y={166 + Math.abs(200 - x) * 0.12} width="4" height={30 - Math.abs(200 - x) * 0.1} fill={near} />
          ))}
          <rect x="0" y="200" width="400" height="40" fill={near} opacity="0.25" />
          <path d="M0 240 H400 V228 Q200 218 0 228 Z" fill={near} />
        </g>
      );
    case "marsh":
    default:
      return (
        <g>
          <rect x="0" y="186" width="400" height="54" fill={near} opacity="0.25" />
          {[40, 90, 140, 260, 310, 360].map((x, i) => (
            <g key={x}>
              <rect x={x} y={150 + (i % 2) * 8} width="3" height={40 - (i % 2) * 8} fill={near} />
              <ellipse cx={x + 1.5} cy={146 + (i % 2) * 8} rx="5" ry="12" fill={near} />
            </g>
          ))}
          {/* boardwalk */}
          <path d="M170 240 L196 184 H214 L240 240 Z" fill={near} opacity="0.85" />
          <path d="M180 222 h44 M188 206 h30 M194 194 h20" stroke={accent} strokeWidth="3" opacity="0.6" />
          {/* bird */}
          <path d="M300 96 q8 -8 16 0 q8 -8 16 0" stroke={near} strokeWidth="3" fill="none" />
        </g>
      );
  }
}
