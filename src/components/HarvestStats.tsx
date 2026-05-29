/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HARVEST_HISTORY, ESTATE_MICROCLIMATES, STAGES_EXPLANATION } from "../data";
import { LineChart, BarChart as BarChartIcon, Thermometer, CloudRain, Wind, Activity, Zap, Compass, RefreshCw } from "lucide-react";

// Robust animated number counter component supporting scroll-into-view and state changes
interface AnimatedNumberProps {
  value: number;
  decimals?: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

export function AnimatedNumber({
  value,
  decimals = 0,
  suffix = "",
  className = "",
  duration = 800
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const elementRef = useRef<HTMLSpanElement>(null);
  const currentValRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);
  const hasAnimatedOnScrollRef = useRef(false);

  useEffect(() => {
    const runAnimation = (fromVal: number, toVal: number) => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      const startTime = performance.now();

      const update = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4); // Quartic ease-out
        const current = fromVal + (toVal - fromVal) * ease;

        setDisplayValue(current);
        currentValRef.current = current;

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(update);
        } else {
          setDisplayValue(toVal);
          currentValRef.current = toVal;
        }
      };

      animationFrameRef.current = requestAnimationFrame(update);
    };

    if (elementRef.current && !hasAnimatedOnScrollRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimatedOnScrollRef.current) {
            hasAnimatedOnScrollRef.current = true;
            runAnimation(0, value);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(elementRef.current);
      return () => {
        observer.disconnect();
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      };
    } else {
      runAnimation(currentValRef.current, value);
    }
  }, [value, duration]);

  return (
    <span ref={elementRef} className={className}>
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}

// Interactive Animated SVG Bar representing a vintage season's yield
interface AnimatedBarProps {
  key?: any;
  year: number;
  yieldTonnes: number;
  maxYield: number;
  x: number;
  chartH: number;
  barW: number;
  isSelected: boolean;
  onSelect: () => void;
  accentColorGrad: string;
  onMouseEnter: (e: React.MouseEvent<SVGGElement>) => void;
  onMouseLeave: () => void;
}

function AnimatedBar({
  year,
  yieldTonnes,
  maxYield,
  x,
  chartH,
  barW,
  isSelected,
  onSelect,
  accentColorGrad,
  onMouseEnter,
  onMouseLeave
}: AnimatedBarProps) {
  const [animatedYield, setAnimatedYield] = useState(0);
  const elementRef = useRef<SVGGElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let isIntersecting = false;

    const startBarAnimation = (toVal: number) => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      const duration = 1200;
      const startTime = performance.now();
      const currentFrom = animatedYield;

      const update = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4); // Quartic ease-out
        const current = currentFrom + (toVal - currentFrom) * ease;

        setAnimatedYield(current);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(update);
        } else {
          setAnimatedYield(toVal);
        }
      };

      animationRef.current = requestAnimationFrame(update);
    };

    if (elementRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isIntersecting) {
            isIntersecting = true;
            startBarAnimation(yieldTonnes);
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(elementRef.current);
    }

    if (isIntersecting) {
      startBarAnimation(yieldTonnes);
    }

    return () => {
      if (observer) observer.disconnect();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [yieldTonnes]);

  const barH = (animatedYield / maxYield) * (chartH - 20);
  const y = chartH - barH;

  return (
    <g
      ref={elementRef}
      className="cursor-pointer group"
      onClick={onSelect}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Interactive glow effect on hover/selection */}
      <circle
        cx={x + barW / 2}
        cy={y}
        r="30"
        fill={isSelected ? "rgba(128,0,32,0.05)" : "transparent"}
        className="transition-all duration-300 pointer-events-none blur-md"
      />

      {/* Bar cylinder */}
      <rect
        x={x}
        y={y}
        width={barW}
        height={Math.max(barH, 0)}
        rx="4"
        fill={isSelected ? accentColorGrad : "rgba(128, 0, 32, 0.15)"}
        stroke={isSelected ? "#800020" : "rgba(224, 224, 224, 0.15)"}
        strokeWidth={isSelected ? "2" : "1"}
        className="transition-all duration-300 ease-out"
      />

      {/* Tiny top wine bulb node icon represent quality */}
      <circle
        cx={x + barW / 2}
        cy={y}
        r="3.5"
        fill={isSelected ? "#800020" : "rgba(128, 0, 32, 0.35)"}
        stroke="#0a0a0a"
        strokeWidth="1"
      />

      {/* Yield value above the bar */}
      <text
        x={x + barW / 2}
        y={y - 10}
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="10"
        fontWeight={isSelected ? "bold" : "light"}
        fill={isSelected ? "#800020" : "#888888"}
        className="transition-all duration-300"
      >
        {animatedYield.toFixed(0)} t
      </text>

      {/* Label under chart */}
      <text
        x={x + barW / 2}
        y={chartH + 18}
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="11"
        fontWeight={isSelected ? "bold" : "normal"}
        className="fill-current"
        fill={isSelected ? "#800020" : "#666666"}
      >
        {year}
      </text>
    </g>
  );
}

export default function HarvestStats() {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedEstateIndex, setSelectedEstateIndex] = useState(0);
  
  // Interactive Maturity Slider value (0 = August Green, 100 = Late Harvest)
  const [maturityVal, setMaturityVal] = useState(75); // 75 is sweet spot Optimal Harvest

  // Microclimate tuning parameters (simulation adjustments)
  const [testTempOffset, setTestTempOffset] = useState(0); // in °C (-3 to +3)
  const [testRainOffset, setTestRainOffset] = useState(0); // in % (-50 to +50)

  const [hoveredBar, setHoveredBar] = useState<any | null>(null);
  const [hoveredX, setHoveredX] = useState<number>(0);
  const [hoveredY, setHoveredY] = useState<number>(0);

  // Find record for active year
  const activeRecord = HARVEST_HISTORY.find((r) => r.year === selectedYear) || HARVEST_HISTORY[HARVEST_HISTORY.length - 1];
  const activeEstate = ESTATE_MICROCLIMATES[selectedEstateIndex];

  // Maturation Curve Formulas based on slider (0 - 100)
  // At 0: brix is low (11), ph is highly acidic (ph=2.0)
  // At 100: brix is overripe (28), acid drops low (ph=4.0)
  const calculatedBrix = (11 + (maturityVal * 0.17)).toFixed(1);
  const calculatedPh = (2.0 + (maturityVal * 0.02)).toFixed(2);
  
  // Sweet spot range: Brix is 22 - 25, pH is 3.3 - 3.6
  const isSweetSpotBrix = Number(calculatedBrix) >= 21.8 && Number(calculatedBrix) <= 25.2;
  const isSweetSpotPh = Number(calculatedPh) >= 3.25 && Number(calculatedPh) <= 3.65;
  const isHarvestSweetSpot = isSweetSpotBrix && isSweetSpotPh;

  // Microclimate forecast simulation outputs
  const simulatedTemp = (activeEstate.baseTemp + testTempOffset).toFixed(1);
  const simulatedRain = Math.max(100, Math.round(activeEstate.baseRainfall * (1 + testRainOffset / 100)));
  
  // Quality Score Calculation based on offset
  // Ideal temperature is around baseTemp + 0.5. Too hot or too dry drops it.
  const idealTempFactor = 10 - Math.abs(testTempOffset - 0.5) * 2.5;
  const idealRainFactor = 10 - Math.abs(testRainOffset + 10) * 0.15;
  const projectedQuality = Math.min(100, Math.max(60, Math.round(85 + idealTempFactor + idealRainFactor)));
  const projectedBrix = (20.5 + (Number(simulatedTemp) * 0.15) - (simulatedRain * 0.002)).toFixed(1);
  const projectedAlcohol = (Number(projectedBrix) * 0.58).toFixed(1);

  // SVG Chart Dimensions
  const chartW = 540;
  const chartH = 160;

  // Max value of yield for scaling
  const maxYield = Math.max(...HARVEST_HISTORY.map((r) => r.yieldTonnes));

  return (
    <div
      id="harvest-stats-portal"
      className="w-full bg-[#080808] text-brand-cream py-16 px-4 md:px-8 border-t border-brand-burgundy/15 relative overflow-hidden"
    >
      {/* Background elegant grape leaves SVG outline */}
      <div className="absolute top-1/2 right-[-100px] w-96 h-96 opacity-10 pointer-events-none text-brand-burgundy transform -translate-y-1/2">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
          <path d="M50,10 C55,25 35,35 45,55 C40,65 30,60 20,70 C10,50 35,40 30,30 C45,30 35,15 50,10 Z M50,10 C45,25 65,35 55,55 C60,65 70,60 80,70 C90,50 65,40 70,30 C55,30 65,15 50,10 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Title */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.3em] text-brand-cream/80 uppercase">
            <Activity className="w-3.5 h-3.5 text-brand-burgundy uppercase" />
            <span>Portalul Analitic de Maturare</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl tracking-tight font-light text-brand-cream">
            Statistici de Recoltă și <span className="font-bold italic text-brand-burgundy font-serif">Microclimat</span>
          </h2>
          <p className="text-sm font-light text-brand-cream/60 max-w-2xl mx-auto font-serif">
            Vizualizări în timp real ale parametrilor de viticultură biodinamică din Codrii Tigheciului. Urmăriți evoluția zahărului din struguri, simulați microclimate și analizați anii de recoltă istorici.
          </p>
        </div>

        {/* Outer Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* ========================================================= */}
          {/* CARD 1: EXQUISITE HISTORIC VINTAGE SELECTOR (LGE GRID)    */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 bg-[#121212]/30 rounded-3xl border-l-2 border-l-brand-burgundy border-y border-r border-brand-cream/10 p-6 md:p-8 space-y-8 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-brand-cream flex items-center gap-2">
                  <BarChartIcon className="w-5 h-5 text-brand-burgundy" />
                  Istoricul Anual al Recoltei
                </h3>
                <p className="text-xs text-brand-cream/50 font-light mt-0.5">
                  Producția totală de struguri culeși manual exprimată în tone (2018–2025).
                </p>
              </div>

              {/* Dynamic Vintage Pill Tabs */}
              <div className="flex flex-wrap gap-1 bg-brand-bg p-1 rounded-xl border border-brand-burgundy/15">
                {HARVEST_HISTORY.map((r) => (
                  <button
                    key={r.year}
                    onClick={() => setSelectedYear(r.year)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-300 font-bold ${
                      selectedYear === r.year
                        ? "bg-brand-burgundy text-brand-cream shadow-md"
                        : "text-brand-cream/50 hover:text-brand-cream"
                    }`}
                  >
                    {r.year}
                  </button>
                ))}
              </div>
            </div>

            {/* Premium Handcrafted SVG Yield Bar Chart */}
            <div className="relative w-full overflow-x-auto min-h-[180px] pt-4">
              <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-full stroke-current" style={{ overflow: "visible" }}>
                {/* Horizontal Grid lines */}
                <line x1="0" y1="0" x2={chartW} y2="0" stroke="rgba(128,0,32,0.04)" strokeWidth="1" />
                <line x1="0" y1="40" x2={chartW} y2="40" stroke="rgba(128,0,32,0.04)" strokeWidth="1" />
                <line x1="0" y1="80" x2={chartW} y2="80" stroke="rgba(128,0,32,0.04)" strokeWidth="1" />
                <line x1="0" y1="120" x2={chartW} y2="120" stroke="rgba(128,0,32,0.04)" strokeWidth="1" />
                <line x1="0" y1={chartH} x2={chartW} y2={chartH} stroke="rgba(128,0,32,0.2)" strokeWidth="1" />

                {/* Bars */}
                {HARVEST_HISTORY.map((r, idx) => {
                  const barSpacing = chartW / HARVEST_HISTORY.length;
                  const barW = 28;
                  const barH = (r.yieldTonnes / maxYield) * (chartH - 20);
                  const x = idx * barSpacing + (barSpacing - barW) / 2;
                  const y = chartH - barH;
                  const isSelected = selectedYear === r.year;

                  return (
                    <AnimatedBar
                      key={r.year}
                      year={r.year}
                      yieldTonnes={r.yieldTonnes}
                      maxYield={maxYield}
                      x={x}
                      chartH={chartH}
                      barW={barW}
                      isSelected={isSelected}
                      onSelect={() => setSelectedYear(r.year)}
                      accentColorGrad="url(#burgundyBarGrad)"
                      onMouseEnter={(e) => {
                        setHoveredBar(r);
                        setHoveredX(x + barW / 2);
                        setHoveredY(y - 12);
                      }}
                      onMouseLeave={() => {
                        setHoveredBar(null);
                      }}
                    />
                  );
                })}

                {/* SVG Definitions for Gradients */}
                <defs>
                  <linearGradient id="burgundyBarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A82441" />
                    <stop offset="60%" stopColor="#800020" />
                    <stop offset="100%" stopColor="#4A0010" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Dynamic Responsive Chart Tooltip Overlay */}
              <AnimatePresence>
                {hoveredBar && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute pointer-events-none z-30 p-3 rounded-2xl bg-[#0d0d0d]/95 border border-brand-burgundy/40 text-[11px] font-sans text-brand-cream/90 shadow-2xl"
                    style={{
                      left: `${(hoveredX / chartW) * 100}%`,
                      top: `${(hoveredY / chartH) * 100}%`,
                      transform: "translate(-50%, -100%)",
                      marginTop: "-16px"
                    }}
                  >
                    {/* Micro pointer arrow at the bottom of the tooltip box */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2.5 h-2.5 rotate-45 bg-[#0d0d0d] border-b border-r border-brand-burgundy/40" />
                    
                    <span className="font-serif font-bold text-brand-burgundy block text-xs border-b border-brand-cream/10 pb-1 mb-1.5 text-center">
                      Recoltă An-{hoveredBar.year}
                    </span>
                    <div className="space-y-1 font-mono text-[9px] tracking-wide">
                      <div className="flex justify-between gap-4">
                        <span className="text-brand-cream/45">PRODUCȚIE:</span>
                        <span className="font-bold text-brand-cream">{hoveredBar.yieldTonnes} t</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-brand-cream/45">SCOR CALITATE:</span>
                        <span className="font-bold text-brand-burgundy">{hoveredBar.qualityScore}/100</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-brand-cream/45">TEMP. MEDIE:</span>
                        <span className="font-bold text-brand-cream">{hoveredBar.tempAvgC}°C</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-brand-cream/45">PRECIPIȚATII:</span>
                        <span className="font-bold text-brand-cream">{hoveredBar.rainfallMm} mm</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* High-Fidelity Vintage Summary Deck */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-brand-cream/10">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-wider text-brand-cream/40 uppercase block">Notă Calitate</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-serif font-black text-brand-burgundy">
                    <AnimatedNumber value={activeRecord.qualityScore} />
                  </span>
                  <span className="text-xs text-brand-cream/40">/100</span>
                </div>
                <span className="text-[10px] text-brand-cream/70 italic font-mono font-bold">
                  {activeRecord.qualityScore >= 95 ? "★ Excelentă ★" : "Foarte Bună"}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-wider text-brand-cream/40 uppercase block">Precipitații Veg</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-serif text-brand-cream">
                    <AnimatedNumber value={activeRecord.rainfallMm} />
                  </span>
                  <span className="text-xs text-brand-cream/40">mm</span>
                </div>
                <span className="text-[10px] text-brand-cream/70 font-mono flex items-center gap-1">
                  <CloudRain className="w-3 h-3 text-brand-burgundy" />
                  Media: 430mm
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-wider text-brand-cream/40 uppercase block">Temperatură Med</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-serif text-brand-cream">
                    <AnimatedNumber value={activeRecord.tempAvgC} decimals={1} suffix="°C" />
                  </span>
                </div>
                <span className="text-[10px] text-brand-cream/70 font-mono flex items-center gap-1">
                  <Thermometer className="w-3 h-3 text-brand-burgundy" />
                  Condiții Optime
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-wider text-brand-cream/40 uppercase block">Durată Cules</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-serif text-brand-cream">
                    <AnimatedNumber value={activeRecord.harvestDurationDays} />
                  </span>
                  <span className="text-xs text-brand-cream/40">zile</span>
                </div>
                <span className="text-[10px] text-brand-cream/50 font-mono">Cules manual</span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* CARD 2: INTERACTIVE BRIX vs ACID SWEETSPOT TARGET CHART  */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 bg-[#121212]/30 rounded-3xl border-l-2 border-l-brand-burgundy border-y border-r border-brand-cream/10 p-6 md:p-8 flex flex-col justify-between backdrop-blur-md">
            <div className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-brand-cream flex items-center gap-2">
                <Zap className="w-5 h-5 text-brand-burgundy animate-pulse" />
                Maturarea Strugurilor
              </h3>
              <p className="text-xs text-brand-cream/50 font-light font-serif">
                Trageți slider-ul de timp pentru a urmări acumularea hidrometrică a zahărului (Brix) și echilibrarea acidității (pH).
              </p>
            </div>

            {/* Simulated Maturation Gauge Visualizer */}
            <div className="relative border border-brand-burgundy/15 rounded-2xl bg-brand-bg/90 p-5 my-6 flex flex-col items-center justify-center space-y-6">
              
              {/* Sweet spot coordinate Target Region */}
              <div className="relative w-full h-32 border-l border-b border-brand-cream/10 flex items-end justify-center">
                {/* Axes labels */}
                <div className="absolute left-1 top-0 text-[8px] font-mono text-brand-cream/40 vertical-text truncate">Aciditate (pH)</div>
                <div className="absolute right-0 bottom-2 text-[8px] font-mono text-brand-cream/40 uppercase">Zahăr (Brix)</div>

                {/* Burgundy Target Region box representing optimal harvest zone */}
                <div
                  className="absolute p-1 border border-dotted border-brand-burgundy/25 bg-brand-burgundy/10 rounded-md flex items-center justify-center text-center animate-pulse cursor-help group/target"
                  style={{
                    bottom: "55%",
                    left: "58%",
                    width: "30%",
                    height: "35%",
                  }}
                >
                  <span className="text-[7.5px] text-brand-cream font-bold tracking-wider uppercase">OPTIMĂ</span>

                  {/* Target Zone Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 rounded-2xl bg-[#0e0e0e]/95 border border-brand-burgundy/30 text-[10px] text-brand-cream/80 text-left normal-case tracking-normal leading-relaxed shadow-xl opacity-0 group-hover/target:opacity-100 transition-opacity duration-300 pointer-events-none z-50 font-sans">
                    <span className="font-bold text-brand-burgundy font-serif block mb-0.5">Fereastră Optimă</span>
                    <strong>Zahăr:</strong> 22 - 25° Brix<br />
                    <strong>Aciditate:</strong> 3.3 - 3.6 pH<br />
                    Concentrația chimică ideală pentru păstrarea structurii gustative.
                  </div>
                </div>

                {/* Simulated Floating Grape Dot moving along curve */}
                <motion.div
                  animate={{
                    left: `${15 + (maturityVal * 0.7)}%`,
                    bottom: `${5 + (maturityVal * 0.85)}%`,
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 15 }}
                  className="absolute w-7 h-7 -translate-x-3.5 translate-y-3.5 cursor-help group/grapedot"
                  style={{ left: "75%", bottom: "60%" }}
                >
                  {/* Glowing core representing grape node maturation */}
                  <span className="absolute inset-0 bg-brand-burgundy rounded-full animate-ping opacity-45" />
                  <div className="relative w-full h-full bg-gradient-to-br from-brand-cream via-brand-burgundy to-brand-bg rounded-full border-2 border-brand-burgundy flex items-center justify-center shadow-lg">
                    <span className="text-[14px]">🍇</span>
                  </div>

                  {/* Grape Dot Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 p-3 rounded-2xl bg-[#0e0e0e]/95 border border-brand-burgundy/30 text-[10px] text-brand-cream/80 text-center normal-case tracking-normal leading-relaxed shadow-xl opacity-0 group-hover/grapedot:opacity-100 transition-opacity duration-300 pointer-events-none z-50 font-sans">
                    <span className="font-bold text-brand-burgundy font-serif block mb-0.5">Analiză Boabe</span>
                    Stadiul actual de acumulare celulară pe butaș.
                  </div>
                </motion.div>
              </div>

              {/* Real-time stats display */}
              <div className="grid grid-cols-2 gap-4 w-full text-center">
                <div className="p-3 bg-brand-bg/60 border border-brand-cream/10 rounded-lg">
                  <span className="text-[9px] font-mono text-brand-cream/40 uppercase block">Acumulare Zahăr</span>
                  <span className={`text-lg font-serif font-bold transition-colors ${isHarvestSweetSpot ? "text-brand-cream" : "text-brand-cream/70"}`}>
                    <AnimatedNumber value={Number(calculatedBrix)} decimals={1} suffix="° Brix" />
                  </span>
                </div>
                <div className="p-3 bg-brand-bg/60 border border-brand-cream/10 rounded-lg">
                  <span className="text-[9px] font-mono text-brand-cream/40 uppercase block">Nivel pH Sursă</span>
                  <span className={`text-lg font-serif font-bold transition-colors ${isHarvestSweetSpot ? "text-brand-cream" : "text-brand-cream/70"}`}>
                    <AnimatedNumber value={Number(calculatedPh)} decimals={2} suffix=" pH" />
                  </span>
                </div>
              </div>

              {/* Status Alert Banner */}
              <AnimatePresence mode="wait">
                {isHarvestSweetSpot ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full py-2.5 px-3 rounded-lg bg-brand-burgundy/15 border border-brand-burgundy/40 text-brand-cream text-xs text-center flex items-center justify-center gap-1.5"
                  >
                    <span>🎯</span>
                    <span className="font-semibold tracking-wider font-sans uppercase text-[10px]">Echilibru Perfect Detectat! Culesul poate începe!</span>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full py-2.5 px-3 rounded-lg bg-brand-bg/40 border border-brand-cream/5 text-brand-cream/40 text-xs text-center"
                  >
                    {maturityVal < 60 ? "⚠️ Prea devreme (aciditate prea ridicată)" : "⚠️ Prea târziu (zahăr supraconcentrat)"}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Timing Slider Control */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs text-brand-cream/60 font-serif">
                <span>August (Verde)</span>
                
                {/* Responsive details tooltip on Label hover */}
                <div className="relative group/time-tooltip inline-block">
                  <span className="text-brand-burgundy font-mono font-bold border-b border-dotted border-brand-burgundy/50 cursor-help">
                    Zile de Coacere
                  </span>
                  
                  {/* Slider Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-3 rounded-2xl bg-[#0e0e0e]/95 border border-brand-burgundy/30 text-[10px] text-brand-cream/80 normal-case tracking-normal text-left shadow-2xl opacity-0 group-hover/time-tooltip:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                    <span className="font-bold text-brand-burgundy font-serif block mb-1">Maturarea Strugurilor</span>
                    Zilele de căldură activează sinteza glucozei în detrimentul acizilor tartrici și malici din pulpa fructului.
                  </div>
                </div>

                <span>Septembrie (Copt)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={maturityVal}
                onChange={(e) => setMaturityVal(Number(e.target.value))}
                className="w-full h-1 bg-brand-burgundy/20 rounded-lg appearance-none cursor-pointer accent-brand-burgundy"
              />
              <p className="text-[10px] text-brand-cream/50 text-center font-light font-serif leading-snug">
                {maturityVal < 30 ? "Faza Veraison: Bobițele își schimbă culoarea la roșu." : maturityVal < 70 ? "Faza de Coacere: Glucoza se acumulează intens." : maturityVal < 85 ? "Maturitate Fiziologică de Aur: Echilibru perfect ideal pentru îmbuteliere premium." : "Supracoacere: Ideală pentru vinuri de desert fortificate."}
              </p>
            </div>
          </div>

          {/* ========================================================= */}
          {/* CARD 3: INTERACTIVE TERROIR MICROCLIMATE FORECASTER      */}
          {/* ========================================================= */}
          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-8 bg-[#121212]/10 rounded-3xl border border-brand-burgundy/15 p-6 md:p-8 backdrop-blur-md">
            
            {/* Left side column: select estate */}
            <div className="md:col-span-4 space-y-4">
              <div>
                <span className="text-[10px] font-mono tracking-wider text-brand-burgundy uppercase block font-bold">Simulator Terroir</span>
                <h3 className="font-serif text-xl font-bold text-brand-cream flex items-center gap-2">
                  <Compass className="w-5 h-5 text-brand-burgundy animate-spin" />
                  Prognoză Calitate Sol
                </h3>
                <p className="text-xs text-brand-cream/50 font-light mt-0.5 font-serif">
                  Alegeți una din solele noastre pentru a simula factorii climatici.
                </p>
              </div>

              {/* Estates Selectors */}
              <div className="flex flex-col gap-2">
                {ESTATE_MICROCLIMATES.map((m, idx) => (
                  <button
                    key={m.estate}
                    onClick={() => {
                      setSelectedEstateIndex(idx);
                      setTestTempOffset(0);
                      setTestRainOffset(0);
                    }}
                    className={`w-full p-4 rounded-xl text-left border transition-all duration-300 flex justify-between items-center cursor-pointer ${
                      selectedEstateIndex === idx
                        ? "bg-brand-burgundy/15 border-brand-burgundy/40 text-brand-cream shadow-md"
                        : "bg-brand-bg/60 border-brand-cream/10 text-brand-cream/40 hover:border-brand-burgundy/10 hover:text-brand-cream"
                    }`}
                  >
                    <div>
                      <span className="text-xs font-serif font-bold uppercase block">{m.estate}</span>
                      <span className="text-[10px] font-mono text-brand-cream/40">Alt: {m.altitudeRange} • Sol: {m.soilType}</span>
                    </div>
                    {selectedEstateIndex === idx && <span className="text-brand-burgundy text-sm">✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Middle part: sliders */}
            <div className="md:col-span-4 space-y-6 flex flex-col justify-center">
              <h4 className="text-xs font-mono text-brand-cream/40 uppercase tracking-widest border-b border-brand-burgundy/15 pb-2">
                Tuner Parametri Climatici
              </h4>

              {/* Temp tuned */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  {/* Subtle hover tooltip triggering on offset header */}
                  <div className="relative group/temp-tooltip">
                    <span className="text-brand-cream/70 font-serif border-b border-dotted border-brand-burgundy/40 cursor-help">
                      Deviație Termică:
                    </span>
                    
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-3 rounded-2xl bg-[#0e0e0e]/95 border border-brand-burgundy/30 text-[10px] text-brand-cream/80 normal-case tracking-normal text-left shadow-2xl opacity-0 group-hover/temp-tooltip:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                      <span className="font-bold text-brand-burgundy font-serif block mb-1">Efectul Căldurii</span>
                      Devierile de temperatură peste baseline sporesc evaporarea apei din bobițe și cresc rapid brixul, iar condițiile prea reci blochează acumularea zahărului.
                    </div>
                  </div>

                  <span className={`font-mono font-bold ${testTempOffset >= 1 ? "text-brand-burgundy" : testTempOffset <= -1 ? "text-brand-cream" : "text-brand-cream/90"}`}>
                    {testTempOffset > 0 ? `+${testTempOffset}` : testTempOffset}°C
                  </span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.5"
                  value={testTempOffset}
                  onChange={(e) => setTestTempOffset(Number(e.target.value))}
                  className="w-full h-1 bg-brand-burgundy/20 rounded-lg appearance-none cursor-pointer accent-brand-burgundy"
                />
                <div className="flex justify-between text-[9px] text-brand-cream/40">
                  <span>-3°C (Răcoros)</span>
                  <span>Normal</span>
                  <span>+3°C (Arșiță)</span>
                </div>
              </div>

              {/* Rainfall tuned */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  {/* Subtle hover tooltip triggering on rainfall header */}
                  <div className="relative group/rain-tooltip">
                    <span className="text-brand-cream/70 font-serif border-b border-dotted border-brand-burgundy/40 cursor-help">
                      Precipitații Sezon:
                    </span>
                    
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-3 rounded-2xl bg-[#0e0e0e]/95 border border-brand-burgundy/30 text-[10px] text-brand-cream/80 normal-case tracking-normal text-left shadow-2xl opacity-0 group-hover/rain-tooltip:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                      <span className="font-bold text-brand-burgundy font-serif block mb-1">Volum Hidric</span>
                      Seceta exercită stres hidric asupra rădăcinii sporind stocarea de polifenoli, pe când ploile abundente diluează aromele și cresc sensibilitatea la dăunători.
                    </div>
                  </div>

                  <span className={`font-mono font-bold ${testRainOffset >= 20 ? "text-brand-cream" : testRainOffset <= -20 ? "text-brand-burgundy" : "text-brand-cream/90"}`}>
                    {testRainOffset > 0 ? `+${testRainOffset}` : testRainOffset}%
                  </span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  step="5"
                  value={testRainOffset}
                  onChange={(e) => setTestRainOffset(Number(e.target.value))}
                  className="w-full h-1 bg-brand-burgundy/20 rounded-lg appearance-none cursor-pointer accent-brand-burgundy"
                />
                <div className="flex justify-between text-[9px] text-brand-cream/40">
                  <span>-50% (Secetă)</span>
                  <span>Normal</span>
                  <span>+50% (Ploios)</span>
                </div>
              </div>

              {/* Reset simulation button */}
              <button
                onClick={() => {
                  setTestTempOffset(0);
                  setTestRainOffset(0);
                }}
                className="w-full py-2.5 rounded-xl bg-brand-bg/80 border border-brand-burgundy/20 text-brand-cream text-xs font-mono flex items-center justify-center gap-2 hover:bg-brand-burgundy/10 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-brand-burgundy animate-spin-slow" />
                Resetează Simulatorul
              </button>
            </div>

            {/* Right part: simulated projection outputs with animation transitions */}
            <div className="md:col-span-4 bg-brand-bg/90 p-6 rounded-2xl border border-brand-burgundy/15 space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-brand-cream/40 uppercase block">Prognoză Calitate</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-serif font-black text-brand-burgundy">
                    <AnimatedNumber value={projectedQuality} />
                  </span>
                  <span className="text-xs text-brand-cream/40">/ 100 Pct</span>
                </div>
                <span className="text-[10px] text-brand-cream/50 block mt-1 font-serif leading-none">
                  Rating estimat struguri pentru cupajare premium.
                </span>
              </div>

              {/* Result attributes */}
              <div className="space-y-2 border-t border-brand-cream/10 pt-4 text-xs font-light font-serif">
                <div className="flex justify-between items-center">
                  <span className="text-brand-cream/60">Temp Simulat:</span>
                  <span className="font-bold text-brand-cream text-right">
                    <AnimatedNumber value={Number(simulatedTemp)} decimals={1} suffix="°C" />
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-brand-cream/60">Precipitații Simulat:</span>
                  <span className="font-bold text-brand-cream text-right">
                    <AnimatedNumber value={simulatedRain} suffix=" mm" />
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-brand-cream/60 font-medium">Prognoză Densitate Zahăr:</span>
                  <span className="font-bold text-brand-burgundy font-mono text-right">
                    <AnimatedNumber value={Number(projectedBrix)} decimals={1} suffix="° Brix" />
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-brand-cream/60 font-medium">Alcool Estimativ:</span>
                  <span className="font-bold text-brand-burgundy font-mono text-right">
                    <AnimatedNumber value={Number(projectedAlcohol)} decimals={1} suffix="% vol." />
                  </span>
                </div>
              </div>

              {/* Recommendation banner depending on quality */}
              <div className="p-2.5 rounded-lg border-l-2 border-brand-burgundy bg-brand-burgundy/5 text-brand-cream text-[10px] text-left font-serif leading-relaxed">
                {projectedQuality >= 95 
                  ? "★ Profil excepțional! Ideal pentru vinuri monovietale de colecție."
                  : projectedQuality >= 88 
                  ? "Structură fină, excelent pentru echilibrul cupajului cupajelor."
                  : "Umiditatea extremă impune recoltarea alertă pentru evitarea mucegaiului."
                }
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
