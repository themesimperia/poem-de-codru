/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";

interface WineBottleProps {
  id: string;
  name: string;
  subtitle: string;
  type: "red" | "white" | "rose";
  year: number;
  alcohol: string;
  accentColor: string;
  labelColor: string;
  isLarge?: boolean;
}

export default function WineBottle({
  id,
  name,
  subtitle,
  type,
  year,
  alcohol,
  accentColor,
  labelColor,
  isLarge = false,
}: WineBottleProps) {
  // Determine color matching for the liquid inside the bottle
  let liquidColor = "rgba(42, 6, 12, 0.95)"; // Cabernet deep red
  if (type === "white") {
    liquidColor = "rgba(224, 185, 96, 0.35)"; // gold tint for white wine
  } else if (type === "rose") {
    liquidColor = "rgba(235, 122, 143, 0.6)"; // delicate rose coral
  } else if (id === "pinot-noir") {
    liquidColor = "rgba(100, 10, 22, 0.95)"; // Pinot lighter ruby
  } else if (id === "merlot") {
    liquidColor = "rgba(80, 8, 16, 0.96)"; // Merlot velvety red
  }

  // Bottle glass outer highlight depending on type
  const glassReflect = type === "white" 
    ? "rgba(255, 255, 255, 0.45)" 
    : "rgba(255, 255, 255, 0.25)";

  return (
    <div
      id={`wine-bottle-container-${id}`}
      style={{
        position: "relative",
        width: isLarge ? "240px" : "130px",
        height: isLarge ? "680px" : "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      className="select-none filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)]"
    >
      <svg
        viewBox="0 0 160 520"
        width="100%"
        height="100%"
        style={{ overflow: "visible" }}
      >
        <defs>
          {/* Glass Gradient */}
          <radialGradient id={`bottleBodyGrad-${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={liquidColor} />
            <stop offset="85%" stopColor={type === "white" ? "rgba(40, 60, 35, 0.9)" : "rgba(12, 12, 12, 0.98)"} />
            <stop offset="100%" stopColor="#050505" />
          </radialGradient>

          {/* Capsule/Foil Gold Gradient */}
          <linearGradient id={`goldFoil-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8A6623" />
            <stop offset="25%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#F9E8A2" />
            <stop offset="75%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8A6623" />
          </linearGradient>

          {/* Red/Ruby Foil Foil Gradient */}
          <linearGradient id={`accentFoil-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2D050B" />
            <stop offset="30%" stopColor={accentColor} />
            <stop offset="50%" stopColor="#FFA0AB" />
            <stop offset="70%" stopColor={accentColor} />
            <stop offset="100%" stopColor="#1E0307" />
          </linearGradient>

          {/* Softbox reflection gradient */}
          <linearGradient id={`softboxGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.45)" />
            <stop offset="15%" stopColor="rgba(255, 255, 255, 0.0)" />
            <stop offset="90%" stopColor="rgba(255, 255, 255, 0.0)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.15)" />
          </linearGradient>

          <filter id="glassBlur">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>

        {/* 1. BOTTLE SHAPE (Filled with liquid) */}
        {/* We draw the standard wine bottle silhouette from bottom up:
            - Bottom curved base (x=20 to 140, y=500)
            - Straight sides up to shoulder (y=210)
            - Curving shoulders up to neck base (y=140)
            - Straight neck up to lip base (y=40)
            - Collar/Lip (y=25 to 40)
        */}
        <path
          d="M 22 490 
             Q 22 505 37 505 
             L 123 505 
             Q 138 505 138 490 
             L 138 220 
             Q 138 150 94 135 
             L 94 40 
             Q 96 38 96 35
             L 96 28
             Q 80 25 64 28
             L 64 35
             Q 66 38 66 40
             L 66 135
             Q 22 150 22 220
             Z"
          fill={`url(#bottleBodyGrad-${id})`}
          stroke={type === "white" ? "rgba(180, 210, 170, 0.4)" : "#161616"}
          strokeWidth="1.5"
        />

        {/* 2. LIQUID SURFACE SHADOW (Near the neck curve) */}
        <ellipse cx="80" cy="140" rx="14" ry="4" fill="rgba(0,0,0,0.5)" />

        {/* 3. SHINY GLASS HIGHLIGHTS (Linear Vertical Reflections) */}
        {/* Left vertical soft reflex is a soft box light mapping */}
        <path
          d="M 26 230
             L 26 480
             Q 26 498 38 498
             L 42 498
             Q 32 498 32 480
             L 32 230
             Q 32 175 70 148
             L 68 142
             Q 26 170 26 230
             Z"
          fill="rgba(255, 255, 255, 0.12)"
        />

        <path
          d="M 134 230
             L 134 480
             Q 134 498 122 498
             L 118 498
             Q 128 498 128 480
             L 128 230
             Q 128 175 90 148
             L 92 142
             Q 134 170 134 230
             Z"
          fill="rgba(255, 255, 255, 0.06)"
        />

        {/* Thin vertical bright strip on glass */}
        <rect
          x="36"
          y="230"
          width="4"
          height="240"
          rx="2"
          fill="rgba(255, 255, 255, 0.18)"
          filter="url(#glassBlur)"
        />

        {/* 4. PREMIUM PARCHMENT LABEL */}
        {/* A classic label wrapped around the bottle cylinder (y=245 to y=435) */}
        <g id={`bottle-label-${id}`} className="transition-all duration-500">
          {/* Label backing with curved overlay */}
          <path
            d="M 24 245
               Q 80 249 136 245
               L 136 425
               Q 80 429 24 425
               Z"
            fill="#FAF6F0" // gorgeous vintage bone-white textured parchment
            stroke="#1d1d1d"
            strokeWidth="0.5"
            className="filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
          />

          {/* Golden inner trim */}
          <path
            d="M 28 251
               Q 80 255 132 251
               L 132 419
               Q 80 423 28 419
               Z"
            fill="none"
            stroke="#AA7C11" // elegant thin gold foil border
            strokeWidth="1"
            opacity="0.85"
          />

          {/* Label Graphic Branding */}
          {/* Elegant gold graphic header */}
          <g transform="translate(80, 260)" textAnchor="middle">
            {/* The brand crest icon (Letter 'P' blended with mountains and a grape vine) */}
            <circle cx="0" cy="18" r="14" fill="#5F0813" opacity="0.08" />
            
            {/* Elegant letter P */}
            <text
              y="25"
              fontFamily="Playfair Display, Georgia, serif"
              fontSize="24"
              fontWeight="900"
              fill="#8A6623"
            >
              P
            </text>

            {/* Micro crest details: minimal star above, tree line below */}
            <path d="M -8,28 L 8,28" stroke="#D4AF37" strokeWidth="0.5" />
            
            {/* Core Brand Title */}
            <text
              y="40"
              fontFamily="Cinzel, Playfair Display, Georgia, serif"
              fontSize="10"
              fontWeight="700"
              letterSpacing="1.2"
              fill="#1F2937"
            >
              POEM DE CODRU
            </text>

            <text
              y="46"
              fontFamily="Inter, sans-serif"
              fontSize="3.8"
              letterSpacing="2"
              fill="#8A6623"
              fontWeight="600"
            >
              VIN DIN INIMA CODRILOR
            </text>

            {/* Separator star */}
            <text
              y="53"
              fontFamily="serif"
              fontSize="7"
              fill="#D4AF37"
            >
              ★
            </text>

            {/* Beautiful Moldovan Vineyard sketch pattern */}
            <path
              d="M -40,73 C -20,68 -20,78 0,73 C 20,68 20,78 40,73 L 40,84 L -40,84 Z"
              fill="#EFE7DC"
              opacity="0.9"
            />
            {/* Little sketch hatchings representing vine fields */}
            <path
              d="M -30,73 L -33,83 M -20,73 L -23,83 M -10,72 L -12,82 M 0,73 L -2,83 M 10,72 L 8,82 M 20,73 L 18,83 M 30,72 L 28,82"
              stroke="#D3C7B5"
              strokeWidth="0.5"
            />

            {/* Specific wine type dynamic print */}
            <text
              y="97"
              fontFamily="Playfair Display, Georgia, Georgia, serif"
              fontSize="11"
              fontWeight="bold"
              letterSpacing="1"
              fill="#1F2937"
            >
              {name.toUpperCase()}
            </text>

            <text
              y="106"
              fontFamily="Inter, sans-serif"
              fontSize="5.5"
              letterSpacing="0.8"
              fill="#6B7280"
              fontWeight="medium"
            >
              {subtitle.toUpperCase()}
            </text>

            <text
              y="120"
              fontFamily="Cinzel, Georgia, serif"
              fontSize="11"
              fontWeight="bold"
              fill="#7F1D1D"
              letterSpacing="0.5"
            >
              {year}
            </text>

            {/* Founder autograph seal printed in reddish gold */}
            <text
              y="134"
              fontFamily="Pinyon Script, Great Vibes, cursive, serif"
              fontSize="12"
              fill="#AA7C11"
              opacity="0.85"
              letterSpacing="0"
            >
              Arpintin Ion
            </text>

            {/* Bottom details */}
            <line x1="-35" y1="141" x2="35" y2="141" stroke="#AA7C11" strokeWidth="0.5" opacity="0.6" />
            
            <text
              y="147"
              fontFamily="Inter, sans-serif"
              fontSize="4"
              letterSpacing="0.4"
              fill="#4B5563"
            >
              750 ml  •  {alcohol}  •  D.O.C. CODRU
            </text>
          </g>
        </g>

        {/* 5. METALLIC NECK FOIL (Capsule) */}
        {/* Extends from collar lip down the neck (y=26 to 132) */}
        <path
          d="M 64 26
             L 96 26
             L 94 132
             Q 80 135 66 132
             Z"
          fill={type === "white" ? `url(#goldFoil-${id})` : `url(#accentFoil-${id})`}
          stroke="rgba(0,0,0,0.8)"
          strokeWidth="0.5"
        />

        {/* Neck capsule ridges / embossing lines */}
        <line x1="64.5" y1="36" x2="95.5" y2="36" stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
        <line x1="65" y1="46" x2="95" y2="46" stroke="rgba(255,255,255,0.15)" strokeWidth="0.7" />
        <line x1="65" y1="48" x2="95" y2="48" stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
        <line x1="65.5" y1="58" x2="94.5" y2="58" stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
        <line x1="66" y1="68" x2="94" y2="68" stroke="rgba(255,255,255,0.1)" strokeWidth="0.7" />

        {/* Gold medallion or seal on the neck foil */}
        <g transform="translate(80, 104)">
          <circle cx="0" cy="0" r="7.5" fill={`url(#goldFoil-${id})`} stroke="rgba(0, 0, 0, 0.4)" strokeWidth="0.5" />
          {/* Noble gold crest star */}
          <polygon
            points="0,-5 1.5,-1.5 5,-1.5 2,1 3,4.5 0,2 -3,4.5 -2,1 -5,-1.5 -1.5,-1.5"
            fill="#3F1206"
          />
        </g>

        {/* Glass gloss/highlight on capsule collar */}
        <ellipse cx="80" cy="26" rx="16" ry="3.5" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
      </svg>

      {/* Glossy overlay effect covering the glass using absolute divs */}
      <div
        style={{
          position: "absolute",
          top: "8%",
          left: "25%",
          width: "50%",
          height: "82%",
          pointerEvents: "none",
          background: "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 60%)",
          borderRadius: "40px",
        }}
      />
    </div>
  );
}
