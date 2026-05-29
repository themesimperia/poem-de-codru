/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import ParallaxSection from "./components/ParallaxSection";
import HeritageStory from "./components/HeritageStory";
import WinesCatalog from "./components/WinesCatalog";
import TastingTray from "./components/TastingTray";
import HarvestStats from "./components/HarvestStats";
import Footer from "./components/Footer";

export default function App() {
  const [activeSection, setActiveSection] = useState("parallax");
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    try {
      const saved = localStorage.getItem("poem_de_codru_theme");
      return saved === "light" ? "light" : "dark";
    } catch {
      return "dark";
    }
  });

  const [trayQuantities, setTrayQuantities] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem("poem_de_codru_tray");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Persist theme choice when it changes
  useEffect(() => {
    localStorage.setItem("poem_de_codru_theme", theme);
  }, [theme]);

  // Persist wine quantities whenever they change
  useEffect(() => {
    localStorage.setItem("poem_de_codru_tray", JSON.stringify(trayQuantities));
  }, [trayQuantities]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleAddWineToTray = (wineId: string) => {
    setTrayQuantities((prev) => ({
      ...prev,
      [wineId]: (prev[wineId] || 0) + 1,
    }));
    // Redirect focus directly to the Tasting Tray so users see their product arrive
    handleNavigation("tray");
  };

  const handleUpdateQty = (wineId: string, delta: number) => {
    setTrayQuantities((prev) => {
      const current = prev[wineId] || 0;
      const nextVal = current + delta;
      const updated = { ...prev };
      if (nextVal <= 0) {
        delete updated[wineId];
      } else {
        updated[wineId] = nextVal;
      }
      return updated;
    });
  };

  const handleClearTray = () => {
    setTrayQuantities({});
  };

  const handleNavigation = (sectionId: string) => {
    setActiveSection(sectionId);
    
    let targetEl: HTMLElement | null = null;
    if (sectionId === "parallax") {
      targetEl = document.getElementById("parallax-canvas-viewport");
    } else if (sectionId === "story") {
      targetEl = document.getElementById("povestea-noastra");
    } else if (sectionId === "catalog") {
      targetEl = document.getElementById("colectia-crama");
    } else if (sectionId === "tray") {
      targetEl = document.getElementById("tava-degustare");
    } else if (sectionId === "stats") {
      targetEl = document.getElementById("harvest-stats-portal");
    }

    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Monitor real-time dynamic vertical scroll proximity to update navigation items
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ["parallax", "story", "catalog", "tray", "stats"];
      const elements = sectionIds.map((id) => {
        if (id === "parallax") return document.getElementById("parallax-canvas-viewport");
        if (id === "story") return document.getElementById("povestea-noastra");
        if (id === "catalog") return document.getElementById("colectia-crama");
        if (id === "tray") return document.getElementById("tava-degustare");
        if (id === "stats") return document.getElementById("harvest-stats-portal");
        return null;
      });

      let currentSection = "parallax";
      let minDistance = Infinity;

      elements.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Distance of the center/top of the block relative to top of viewport
        const dist = Math.abs(rect.top);
        if (dist < minDistance) {
          minDistance = dist;
          currentSection = sectionIds[index];
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="poem-de-codru-app-root" className={`min-h-screen bg-brand-bg selection:bg-brand-burgundy/30 selection:text-brand-cream relative text-brand-cream flex flex-col justify-between transition-colors duration-500 ${theme === 'light' ? 'light-theme' : 'dark-theme'}`}>
      {/* 1. Header Nav */}
      <Header activeSection={activeSection} onNavigate={handleNavigation} theme={theme} onToggleTheme={toggleTheme} />

      {/* 2. Main Content Canvas */}
      <main className="flex-grow">
        {/* Parallax Adobe XD Showcase Section */}
        <section id="parallax-section-container">
          <ParallaxSection theme={theme} />
        </section>

        {/* Historic Heritage Story Section */}
        <HeritageStory />

        {/* Authors Portfolio Catalog Section */}
        <WinesCatalog
          onAddWineToTray={handleAddWineToTray}
          trayQuantities={trayQuantities}
        />

        {/* Sommelier Tasting Tray / Personal Allocation System */}
        <TastingTray
          trayQuantities={trayQuantities}
          onUpdateQty={handleUpdateQty}
          onClearTray={handleClearTray}
        />

        {/* Interactive Grape Harvest Statistics Section */}
        <section id="stats-section-container">
          <HarvestStats />
        </section>
      </main>

      {/* 3. Global Floating Sticky Side Indicator (Luxury aesthetic touch) */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-4 z-40 items-center">
        <span className="text-[9px] font-mono tracking-widest text-brand-cream/30 uppercase vertical-text mb-2">Heritage</span>
        
        {/* Indicators representing each section */}
        {[
          { id: "parallax", label: "Showcase" },
          { id: "story", label: "Heritage Moștenire" },
          { id: "catalog", label: "Catalog Vinuri" },
          { id: "tray", label: "Tavă Degustare" },
          { id: "stats", label: "Portal Analitic" },
        ].map((sec) => (
          <button
            key={sec.id}
            onClick={() => handleNavigation(sec.id)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 relative group cursor-pointer ${
              activeSection === sec.id
                ? "bg-brand-burgundy scale-125 shadow-[0_0_8px_rgba(128,0,32,0.8)]"
                : "bg-brand-cream/20 hover:bg-brand-cream/50"
            }`}
            title={sec.label}
          >
            <span className="absolute right-6 top-1/2 -translate-y-1/2 py-1 px-2 rounded bg-[#0a0a0a]/95 border border-brand-burgundy/35 text-[9px] font-mono tracking-widest uppercase text-brand-cream opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {sec.label}
            </span>
          </button>
        ))}
      </div>

      {/* 4. Elegant Footer */}
      <Footer />
    </div>
  );
}
