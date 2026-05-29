/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WINES, BRAND_HISTORY, BRAND_PILLARS } from "../data";
import WineBottle from "./WineBottle";
import { HelpCircle, ChevronLeft, ChevronRight, Compass, Flame, Droplets, Sun, Sparkles, Award } from "lucide-react";

export default function ParallaxSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollValue, setScrollValue] = useState(0); // Simulated parallax position: -100 to 100
  const [showVideoBg, setShowVideoBg] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeWine = WINES[selectedIndex];

  // Mouse tilt tracking for interactive 3D effect
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Normalize mouse coordinates around center (-1 to 1)
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Set up wheel listener for the main view to smoothly adjust scrollValue
  const handleWheel = (e: React.WheelEvent) => {
    // Prevent default block if we want local container scroll
    const delta = e.deltaY * 0.15;
    setScrollValue((prev) => Math.max(-120, Math.min(120, prev + delta)));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % WINES.length);
    setScrollValue(0);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + WINES.length) % WINES.length);
    setScrollValue(0);
  };

  // Parallax ratios
  const skyY = scrollValue * 0.15;
  const hillY = scrollValue * 0.4;
  const vineyardY = scrollValue * 0.65;
  const textY = scrollValue * -0.5; // opposing movement
  const leavesY = scrollValue * 1.4; // fast foreground movement

  return (
    <div
      id="parallax-canvas-viewport"
      ref={containerRef}
      onWheel={handleWheel}
      className={`relative w-full min-h-[92vh] overflow-hidden bg-gradient-to-b ${activeWine.bgColor} transition-all duration-1000 flex flex-col justify-between pt-24 pb-12 px-4 md:px-8`}
    >
      {/* Immersive Video Background Layer */}
      {showVideoBg && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-20 z-0 transition-opacity duration-1000"
          style={{ mixBlendMode: "screen" }}
        >
          <source src="/assets/images/Vineyard_background_immersive_site_202605250925.mp4" type="video/mp4" />
        </video>
      )}

      {/* ========================================================= */}
      {/* VISUAL PARALLAX BACKGROUND LAYERS (Simulated Adobe XD)    */}
      {/* ========================================================= */}
      
      {/* Layer 1: Ambient Stars space (Slowest) */}
      <div
        id="parallax-layer-stars"
        style={{ transform: `translateY(${skyY}px)` }}
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen transition-transform duration-300 ease-out"
      >
        {/* Soft floating particles / stars */}
        <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-brand-cream rounded-full animate-pulse" />
        <div className="absolute top-1/3 left-3/4 w-1.5 h-1.5 bg-brand-burgundy rounded-full animate-ping duration-1000" />
        <div className="absolute top-2/3 left-1/3 w-1 h-1 bg-white rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-2/3 w-0.5 h-0.5 bg-neutral-300 rounded-full" />
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-brand-burgundy/5 blur-3xl" />
        <div className="absolute top-1/2 right-12 w-60 h-60 rounded-full bg-brand-burgundy/10 blur-3xl" />
      </div>

      {/* Layer 2: Big Ambient Radial Moon glowing behind (Medium slow) */}
      <div
        id="parallax-layer-ambient-moon"
        style={{
          transform: `translate(${mousePos.x * -10}px, ${(scrollValue * 0.25) + (mousePos.y * -10)}px)`,
        }}
        className="absolute top-12 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] md:w-[600px] md:h-[600px] rounded-full bg-radial from-brand-burgundy/10 via-[#4A0E0E]/5 to-transparent pointer-events-none blur-xl transition-all duration-300 ease-out"
      />

      {/* Layer 3: Misty rolling hills of Codru silhouette (Medium) */}
      <div
        id="parallax-layer-hills"
        style={{
          transform: `translateY(${hillY}px) scale(1.05)`,
        }}
        className="absolute bottom-12 left-0 w-full h-80 pointer-events-none opacity-30 mix-blend-overlay transition-transform duration-300 ease-out"
      >
        <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-full fill-current text-brand-burgundy/10">
          <path d="M0,192 C180,110 320,240 540,160 C760,80 920,210 1140,140 C1360,70 1380,180 1440,150 L1440,320 L0,320 Z" />
        </svg>
        <svg viewBox="0 0 1440 320" className="absolute -bottom-8 w-full h-full fill-current text-brand-bg/85">
          <path d="M0,224 C240,160 480,260 720,180 C960,100 1200,240 1440,160 L1440,320 L0,320 Z" />
        </svg>
      </div>

      {/* Layer 4: Giant Backdrop Typography Text (Large horizontal offset) */}
      <div
        id="parallax-layer-giant-text"
        style={{
          transform: `translate(${(mousePos.x * -35)}px, ${textY + (mousePos.y * -20)}px)`,
        }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.h2
            key={activeWine.id}
            initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
            animate={{ opacity: 0.15, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.15, filter: "blur(15px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-serif font-black text-[12vw] tracking-[0.15em] text-center text-brand-burgundy capitalize pointer-events-none leading-none select-none italic"
          >
            {activeWine.name.split(" ")[0]}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Layer 5: Vanishing Vineyard Grid Vines Lines (Medium fast) */}
      <div
        id="parallax-layer-vineyard-lines"
        style={{
          transform: `translateY(${vineyardY}px)`,
        }}
        className="absolute bottom-[-100px] left-0 w-full h-96 opacity-20 pointer-events-none transition-transform duration-300 ease-out"
      >
        <svg viewBox="0 0 1440 400" className="w-full h-full stroke-current text-brand-burgundy/15 fill-none">
          {/* Perspective vineyard row wires converging to the center */}
          <line x1="720" y1="50" x2="-200" y2="400" strokeWidth="2" />
          <line x1="720" y1="50" x2="100" y2="400" strokeWidth="1.5" />
          <line x1="720" y1="50" x2="400" y2="400" strokeWidth="1" />
          <line x1="720" y1="50" x2="600" y2="400" strokeWidth="0.8" />
          <line x1="720" y1="50" x2="840" y2="400" strokeWidth="0.8" />
          <line x1="720" y1="50" x2="1040" y2="400" strokeWidth="1" />
          <line x1="720" y1="50" x2="1340" y2="400" strokeWidth="1.5" />
          <line x1="720" y1="50" x2="1640" y2="400" strokeWidth="2" />

          {/* Horizontal support wires looping */}
          <path d="M-200,200 Q720,130 1640,200" strokeWidth="1.5" />
          <path d="M-200,290 Q720,200 1640,290" strokeWidth="2.5" />
          <path d="M-200,370 Q720,260 1640,370" strokeWidth="4.5" />
        </svg>
      </div>

      {/* ========================================================= */}
      {/* MAIN CONTAINER LAYOUT (Content & Interactive Bottle)      */}
      {/* ========================================================= */}
      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* Left Side: Editorial Typography description panel */}
        <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 text-center lg:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeWine.id}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-burgundy/10 border border-brand-burgundy/30 text-[10px] tracking-[0.25em] font-mono text-brand-cream uppercase w-fit mx-auto lg:mx-0 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-brand-burgundy animate-spin" />
                <span>Ediție de Autor</span>
              </div>

              <div className="space-y-2">
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-brand-cream leading-none">
                  Château <span className="italic font-normal">Obscur</span><br />
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-cream via-brand-burgundy to-brand-cream font-serif italic text-3xl sm:text-4xl lg:text-5xl">
                    {activeWine.name}
                  </span>
                </h2>
                <div className="flex items-center justify-center lg:justify-start gap-3 mt-1 text-brand-cream/80 font-mono text-xs tracking-widest uppercase">
                  <span>{activeWine.subtitle}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-burgundy" />
                  <span>Anul {activeWine.year}</span>
                </div>
              </div>

              <p className="text-brand-cream/80 font-light text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-serif">
                "{activeWine.description}"
              </p>

              {/* Quick stats grid for matching wine */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-4 pt-4 text-left max-w-md mx-auto lg:mx-0">
                <div className="p-4 bg-brand-bg/40 backdrop-blur-md border border-brand-cream/10 rounded-xl hover:border-brand-burgundy/50 transition-colors duration-300">
                  <span className="text-[10px] font-mono tracking-wider text-brand-cream/50 block uppercase">Alcoolemie</span>
                  <span className="text-sm font-semibold text-brand-cream font-serif">{activeWine.alcohol}</span>
                </div>
                <div className="p-4 bg-brand-bg/40 backdrop-blur-md border border-brand-cream/10 rounded-xl hover:border-brand-burgundy/50 transition-colors duration-300">
                  <span className="text-[10px] font-mono tracking-wider text-brand-cream/50 block uppercase">Zahăr Recoltă</span>
                  <span className="text-sm font-semibold text-brand-cream font-serif">{activeWine.brix}° Brix</span>
                </div>
                <div className="p-4 bg-brand-bg/40 backdrop-blur-md border border-brand-cream/10 rounded-xl hover:border-brand-burgundy/50 transition-colors duration-300">
                  <span className="text-[10px] font-mono tracking-wider text-brand-cream/50 block uppercase">Echilibru Acid</span>
                  <span className="text-sm font-semibold text-brand-cream font-serif">{activeWine.ph} pH</span>
                </div>
                <div className="p-4 bg-brand-bg/40 backdrop-blur-md border border-brand-cream/10 rounded-xl hover:border-brand-burgundy/50 transition-colors duration-300">
                  <span className="text-[10px] font-mono tracking-wider text-brand-cream/50 block uppercase">Sol Terroir</span>
                  <span className="text-sm font-semibold text-brand-burgundy font-serif truncate block" title={activeWine.bestTerroir}>
                    {activeWine.bestTerroir.split(" - ")[0]}
                  </span>
                </div>
              </div>

              {/* Tasting sommelier palette in luxury Editorial border-l block */}
              <div className="bg-brand-bg/60 backdrop-blur-md border-l-2 border-brand-burgundy p-6 rounded-r-xl relative max-w-xl mx-auto lg:mx-0 text-left">
                <div className="flex items-center gap-2 mb-3 text-brand-cream">
                  <Award className="w-4 h-4 text-brand-burgundy animate-pulse" />
                  <span className="text-xs font-mono tracking-widest uppercase font-bold text-brand-cream/90">Buchet și Note de Somelier</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4 justify-start">
                  {activeWine.tastingNotes.aroma.map((note) => (
                    <span
                      key={note}
                      className="px-2.5 py-1 rounded bg-brand-burgundy/10 hover:bg-brand-burgundy/20 border border-brand-burgundy/25 text-brand-cream text-xs font-serif italic transition-all duration-300 cursor-default"
                    >
                      {note}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 text-xs text-brand-cream/70 font-light border-t border-brand-cream/10 pt-3">
                  <div className="flex justify-between">
                    <span>Corpolență Vin:</span>
                    <span className="font-semibold text-brand-cream">{activeWine.tastingNotes.body} Body</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Aciditate Posttast:</span>
                    <span className="font-semibold text-brand-cream">{activeWine.tastingNotes.acidity} Acidity</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Post-Gust (Finish):</span>
                    <span className="font-serif italic text-brand-burgundy font-semibold">{activeWine.tastingNotes.finish}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center: Hero Bottle Parallax Presenter */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center relative py-6 order-1 lg:order-2 h-[500px] sm:h-[600px] lg:h-[700px]">
          {/* Outer glowing halo */}
          <div
            style={{
              boxShadow: `0 0 100px 30px ${activeWine.accentColor}25`,
            }}
            className="absolute rounded-full w-48 h-96 pointer-events-none z-0 mix-blend-color-dodge transition-all duration-1000"
          />

          {/* Interactive Simulated Parallax Sliders Left & Right */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-2 sm:px-6 w-full z-30 pointer-events-none">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-brand-burgundy/30 bg-brand-bg/90 hover:bg-brand-burgundy flex items-center justify-center text-brand-cream hover:scale-110 pointer-events-auto transition-all duration-300 shadow-2xl group cursor-pointer hover:border-brand-burgundy/80"
              title="Vinul Precedent"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform text-brand-cream" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-brand-burgundy/30 bg-brand-bg/90 hover:bg-brand-burgundy flex items-center justify-center text-brand-cream hover:scale-110 pointer-events-auto transition-all duration-300 shadow-2xl group cursor-pointer hover:border-brand-burgundy/80"
              title="Vinul Următor"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform text-brand-cream" />
            </button>
          </div>

          {/* The interactive floating bottle using framer motion */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeWine.id}
              initial={{ opacity: 0, y: 150, rotate: -8, scale: 0.8 }}
              animate={{
                opacity: 1,
                y: scrollValue * 0.9, // direct vertical scroll parallax
                rotate: (mousePos.x * 6) + (scrollValue * 0.04), // subtle tilt response
                scale: 1,
              }}
              exit={{ opacity: 0, y: -150, rotate: 8, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 70,
                damping: 14,
                mass: 1.2,
              }}
              style={{
                y: scrollValue * 0.9,
              }}
              className="cursor-grab active:cursor-grabbing z-20"
            >
              <WineBottle
                id={activeWine.id}
                name={activeWine.name}
                subtitle={activeWine.subtitle}
                type={activeWine.type}
                year={activeWine.year}
                alcohol={activeWine.alcohol}
                accentColor={activeWine.accentColor}
                labelColor={activeWine.labelColor}
                isLarge={true}
              />
            </motion.div>
          </AnimatePresence>

          {/* Pedestal platform with reflection underneath */}
          <div className="absolute bottom-10 w-44 h-8 bg-black/60 rounded-full blur-md z-0 transform scale-y-50 shadow-[0_50px_100px_40px_rgba(0,0,0,0.9)]" />
        </div>

        {/* Right Side: Microclimate / Geographic parameters list (Adobe XD styling) */}
        <div className="lg:col-span-3 space-y-6 order-3 flex flex-col justify-center">
          <div className="sticky top-6">
            <h3 className="font-serif text-lg tracking-wider text-brand-cream mb-4 text-center lg:text-left border-b border-brand-burgundy/20 pb-2 uppercase">
              Detalii Producător
            </h3>

            <div className="space-y-4">
              {BRAND_PILLARS.map((p) => {
                const isHighlighted = activeWine.bestTerroir.toLowerCase().includes(p.id) || p.id === "clima";
                return (
                  <div
                    key={p.id}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      isHighlighted
                        ? "border-brand-burgundy/40 bg-brand-burgundy/10 shadow-[0_4px_16px_rgba(128,0,32,0.15)]"
                        : "border-brand-cream/10 bg-brand-bg/20"
                    }`}
                  >
                    <h4 className="text-xs tracking-wider uppercase font-semibold text-brand-cream mb-1.5 flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${isHighlighted ? "bg-brand-burgundy animate-ping" : "bg-brand-cream/30"}`} />
                      {p.title}
                    </h4>
                    <p className="text-[11px] text-brand-cream/60 font-light leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Simulated Parallax interactive slider to let users play with depth */}
            <div className="mt-8 p-4 bg-brand-bg/90 rounded-2xl border border-brand-burgundy/15 shadow-xl space-y-4">
              <div className="flex justify-between items-center text-[10px] font-mono tracking-wider text-brand-cream/60">
                <span className="flex items-center gap-1.5 uppercase font-bold">
                  <Compass className="w-3.5 h-3.5 text-brand-burgundy animate-spin" />
                  Control Adâncime Parallax
                </span>
                <span className="text-brand-burgundy font-black">{Math.round(scrollValue)}px</span>
              </div>
              <input
                type="range"
                min="-120"
                max="120"
                value={scrollValue}
                onChange={(e) => setScrollValue(Number(e.target.value))}
                className="w-full h-1 bg-brand-burgundy/20 rounded-lg appearance-none cursor-pointer accent-brand-burgundy"
              />
              <p className="text-[9px] font-sans font-light text-brand-cream/40 italic text-center leading-snug">
                Trageți sliderul sau rulați rotița mouse-ului pentru a simula efectul Parallax de mișcare 3D de sub Adobe XD.
              </p>

              <div className="border-t border-brand-cream/10 pt-3 flex justify-between items-center">
                <span className="text-[10px] font-mono tracking-wider text-brand-cream/60 uppercase">Fundal Video Live</span>
                <button
                  onClick={() => setShowVideoBg(!showVideoBg)}
                  className={`px-3 py-1 rounded-full text-[9px] font-mono tracking-wider uppercase font-bold transition-all cursor-pointer ${
                    showVideoBg
                      ? "bg-brand-burgundy text-brand-cream border border-brand-burgundy"
                      : "bg-brand-bg text-brand-cream/40 border border-brand-cream/10 hover:text-brand-cream hover:bg-brand-burgundy/10"
                  }`}
                >
                  {showVideoBg ? "ACTIVAT" : "DEZACTIVAT"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SELECTION DOTS & BOTTLES LIST (Page Carousel Control)      */}
      {/* ========================================================= */}
      <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center gap-4 mt-8 z-10">
        <div className="flex items-center gap-3">
          {WINES.map((wine, i) => (
            <button
              key={wine.id}
              onClick={() => {
                setSelectedIndex(i);
                setScrollValue(0);
              }}
              className={`px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                selectedIndex === i
                  ? "bg-brand-burgundy text-brand-cream font-bold border border-brand-burgundy"
                  : "bg-brand-bg/60 text-brand-cream/40 border border-brand-cream/10 hover:text-brand-cream"
              }`}
            >
              {wine.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Foreground fast drifting Leaves (Parallax layered in front of bottle) */}
      <div
        id="parallax-foreground-leaf-1"
        style={{
          transform: `translateY(${leavesY}px) rotate(${scrollValue * 0.08}deg)`,
        }}
        className="absolute top-10 left-[-40px] w-48 h-48 opacity-25 filter blur-[1px] pointer-events-none mix-blend-screen transition-transform duration-300 ease-out z-30"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-amber-500/80 fill-current">
          {/* A classic detailed grape leaf shape */}
          <path d="M50,10 C55,25 35,35 45,55 C40,65 30,60 20,70 C10,50 35,40 30,30 C45,30 35,15 50,10 Z M50,10 C45,25 65,35 55,55 C60,65 70,60 80,70 C90,50 65,40 70,30 C55,30 65,15 50,10 Z" />
        </svg>
      </div>

      <div
        id="parallax-foreground-leaf-2"
        style={{
          transform: `translateY(${-leavesY * 1.2}px) rotate(${-scrollValue * 0.1}deg)`,
        }}
        className="absolute bottom-[-20px] right-[-60px] w-60 h-60 opacity-20 filter blur-[2px] pointer-events-none mix-blend-screen transition-transform duration-300 ease-out z-30"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-amber-600/60 fill-current">
          <path d="M50,10 C55,25 35,35 45,55 C40,65 30,60 20,70 C10,50 35,40 30,30 C45,30 35,15 50,10 Z M50,10 C45,25 65,35 55,55 C60,65 70,60 80,70 C90,50 65,40 70,30 C55,30 65,15 50,10 Z" />
        </svg>
      </div>
    </div>
  );
}
