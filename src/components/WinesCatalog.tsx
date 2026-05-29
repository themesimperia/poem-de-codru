/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WINES } from "../data";
import { WineProduct } from "../types";
import WineBottle from "./WineBottle";
import { Sparkles, Trophy, AlignLeft, Info, PlusCircle, Star, CheckCircle, Flame, Wine, Compass } from "lucide-react";

interface WinesCatalogProps {
  onAddWineToTray: (wineId: string) => void;
  trayQuantities: Record<string, number>;
}

// Extra high-fidelity curated pairing data to feed the overlay panels
const ADDITIONAL_SOMMELIER_SPECS: Record<
  string,
  {
    temp: string;
    pairings: string[];
    tannins: number; // 1-5 scale
    oakIntensity: number; // 1-5 scale
    sommelierScore: number;
    medals: string[];
  }
> = {
  cabernet: {
    temp: "16° - 18°C",
    pairings: ["Friptură de cerb", "Brânzeturi maturate tari", "Mâncăruri cu sos de cireșe negre"],
    tannins: 5,
    oakIntensity: 4,
    sommelierScore: 97,
    medals: ["Marea Medalie de Aur - Selection Mondiales Canada", "Best Boutique Red - Vinuri Moldova 2025"]
  },
  merlot: {
    temp: "15° - 17°C",
    pairings: ["Rață la cuptor", "Pastă de trufe", "Brânză Gouda afumată"],
    tannins: 35,
    oakIntensity: 3,
    sommelierScore: 94,
    medals: ["Medalie de Aur - Mundus Vini", "Punctaj de Excelență - Sommelier Choice Awards"]
  },
  "pinot-noir": {
    temp: "14° - 16°C",
    pairings: ["Somon la grătar cu ierburi", "Sufleu de ciuperci sălbatice", "Ulei de măsline de autor"],
    tannins: 2,
    oakIntensity: 2,
    sommelierScore: 95,
    medals: ["95 Puncte - Robert Parker Decanter", "Cel mai bun Pinot Noir Regional - Codrii 2024"]
  },
  bianca: {
    temp: "8° - 10°C",
    pairings: ["Scoici gătite în unt și usturoi", "Platou cu pește alb", "Sufleu proaspăt de lime"],
    tannins: 0,
    oakIntensity: 0,
    sommelierScore: 93,
    medals: ["Medalie de Aur - Concours Mondial de Bruxelles", "Top White Blend - Moldova Wine Day"]
  },
  rose: {
    temp: "10° - 12°C",
    pairings: ["Creveți marinati", "Tarte cu zmeură acrișoară", "Platouri asiatice aromate"],
    tannins: 1,
    oakIntensity: 0,
    sommelierScore: 94,
    medals: ["Medalie de Aur - Rose Master 2024", "Favorite-choice - Premium Sommelier Club"]
  }
};

export default function WinesCatalog({ onAddWineToTray, trayQuantities }: WinesCatalogProps) {
  const [activeTab, setActiveTab] = useState<"all" | "red" | "white" | "rose">("all");
  const [selectedWineId, setSelectedWineId] = useState<string | null>(null);

  // Filter products based on selected catalog tab
  const filteredWines = WINES.filter((w) => {
    if (activeTab === "all") return true;
    return w.type === activeTab;
  });

  const activeDetails = selectedWineId ? ADDITIONAL_SOMMELIER_SPECS[selectedWineId] : null;
  const activeWine = selectedWineId ? WINES.find((w) => w.id === selectedWineId) : null;

  return (
    <section
      id="colectia-crama"
      className="w-full bg-[#080808] text-brand-cream py-24 px-4 md:px-8 border-t border-brand-burgundy/10 relative overflow-hidden"
    >
      {/* Visual background details */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[80vw] h-[400px] bg-brand-burgundy/5 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Heading Group */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-brand-cream/80 uppercase">
            <Wine className="w-3.5 h-3.5 text-brand-burgundy animate-bounce" />
            <span>EXPOZITIA MONOMARCĂ CODRU</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl tracking-normal font-light">
            Portofoliul nostru de <span className="font-bold italic text-brand-burgundy font-serif">Autor</span>
          </h2>
          <p className="text-xs text-brand-cream/50 max-w-xl mx-auto font-serif">
            Fiecare sticlă reprezintă o transcriere unică a microclimatului din pădurile Codrilor Tigheciului. Alegeți un vin pentru a-i debloca fișa de somelier și a-l adăuga în tava proprie de degustare.
          </p>
        </div>

        {/* Tab Selection Row (Figma Style Double-lined Tabs) */}
        <div className="flex justify-center items-center gap-2 max-w-md mx-auto p-1 bg-[#121212]/85 border border-brand-cream/10 rounded-2xl">
          {[
            { id: "all", label: "Toate" },
            { id: "red", label: "Vin Roșu" },
            { id: "white", label: "Vin Alb" },
            { id: "rose", label: "Rosé Sec" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setSelectedWineId(null); // Reset detail panel on tab switch
              }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-serif transition-all duration-300 cursor-pointer text-center font-semibold ${
                activeTab === tab.id
                  ? "bg-brand-burgundy text-brand-cream shadow-md"
                  : "text-brand-cream/40 hover:text-brand-cream hover:bg-brand-burgundy/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* The Product Grid Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6">
          {filteredWines.map((wine) => {
            const addedCount = trayQuantities[wine.id] || 0;
            const extraSpecs = ADDITIONAL_SOMMELIER_SPECS[wine.id];

            return (
              <motion.div
                LayoutId={`wine-card-${wine.id}`}
                key={wine.id}
                className={`group rounded-3xl border p-6 flex flex-col justify-between relative overflow-hidden bg-gradient-to-t from-[#121212]/40 to-[#0c0c0c]/80 backdrop-blur-md transition-all duration-300 ${
                  selectedWineId === wine.id
                    ? "border-brand-burgundy shadow-[0_20px_40px_rgba(128,0,32,0.15)] ring-1 ring-brand-burgundy/40"
                    : "border-brand-cream/10 hover:border-brand-burgundy/40 hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
                }`}
              >
                {/* Micro badge of Sommelier premium rating */}
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-1.5 items-end">
                  <div className="px-2 py-1 bg-brand-burgundy/15 border border-brand-burgundy/30 text-[9.5px] font-mono font-bold text-brand-cream rounded-lg flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 text-brand-burgundy fill-current animate-pulse" />
                    <span>Rating: {extraSpecs.sommelierScore} pct</span>
                  </div>
                  {addedCount > 0 && (
                    <div className="px-2 py-1 bg-brand-cream text-[#121212] text-[8.5px] font-mono font-black rounded-lg flex items-center gap-1 shadow-md">
                      <CheckCircle className="w-2.5 h-2.5 text-brand-burgundy fill-current" />
                      <span>{addedCount} ÎN TAVĂ</span>
                    </div>
                  )}
                </div>

                {/* Elegant Wine product bottle presentation area */}
                <div className="h-64 flex items-center justify-center relative mb-4">
                  {/* Glowing aura indicating selected or hovered color */}
                  <div
                    style={{
                      boxShadow: `0 0 60px 10px ${wine.accentColor}18`
                    }}
                    className="absolute rounded-full w-24 h-48 pointer-events-none group-hover:scale-125 transition-transform duration-700"
                  />
                  
                  {/* Floating Bottle Component */}
                  <div className="hover:scale-105 duration-500 ease-out transition-transform">
                    <WineBottle
                      id={wine.id}
                      name={wine.name}
                      subtitle={wine.subtitle}
                      type={wine.type}
                      year={wine.year}
                      alcohol={wine.alcohol}
                      accentColor={wine.accentColor}
                      labelColor={wine.labelColor}
                      isLarge={false}
                    />
                  </div>
                </div>

                {/* Bottle Identity Description */}
                <div className="space-y-3">
                  <div className="text-center">
                    <h3 className="font-serif text-xl font-bold tracking-tight text-brand-cream group-hover:text-brand-burgundy transition-colors">
                      {wine.name}
                    </h3>
                    <div className="flex items-center justify-center gap-2 text-[10px] font-mono tracking-wider text-brand-cream/40 uppercase mt-0.5">
                      <span>{wine.subtitle}</span>
                      <span>•</span>
                      <span>Vol. {wine.alcohol}</span>
                    </div>
                  </div>

                  <p className="text-xs text-brand-cream/60 font-serif leading-relaxed text-center italic line-clamp-2">
                    "{wine.description}"
                  </p>

                  {/* Sommelier fast specs labels */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-brand-cream/5 text-[10.5px] font-serif">
                    <div className="bg-brand-bg p-2 rounded-xl text-center border border-brand-cream/5">
                      <span className="text-[9px] text-brand-cream/40 block">TEMP. RECOMANDATĂ</span>
                      <span className="text-brand-cream font-bold">{extraSpecs.temp}</span>
                    </div>
                    <div className="bg-brand-bg p-2 rounded-xl text-center border border-brand-cream/5">
                      <span className="text-[9px] text-brand-cream/40 block">SOL EXCLUSIV</span>
                      <span className="text-brand-burgundy font-bold truncate block">{wine.bestTerroir.split(" - ")[0]}</span>
                    </div>
                  </div>

                  {/* Operational control buttons */}
                  <div className="grid grid-cols-5 gap-2 pt-1">
                    <button
                      onClick={() => setSelectedWineId(selectedWineId === wine.id ? null : wine.id)}
                      className={`col-span-2 py-2 px-1 rounded-xl text-[10px] tracking-wide uppercase font-mono font-bold border transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                        selectedWineId === wine.id
                          ? "bg-brand-burgundy text-brand-cream border-brand-burgundy"
                          : "bg-brand-bg text-brand-cream/60 border-brand-cream/10 hover:border-brand-burgundy/40"
                      }`}
                      title="Vizualizează Fișa Completă"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Fișă Sol</span>
                    </button>
                    
                    <button
                      onClick={() => onAddWineToTray(wine.id)}
                      className="col-span-3 py-2 px-3 rounded-xl text-[10px] tracking-widest uppercase font-mono font-black bg-brand-burgundy text-brand-cream flex items-center justify-center gap-1.5 transition-all hover:bg-opacity-80 hover:scale-[1.02] shadow-xl hover:shadow-brand-burgundy/25 cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Adaugă în Tavă</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Detail Overlay Sommelier Drawer Section */}
        <AnimatePresence>
          {selectedWineId && activeWine && activeDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="bg-[#121212]/30 rounded-3xl border-l-4 border-brand-burgundy border-y border-r border-brand-cream/10 p-6 md:p-8 backdrop-blur-xl relative overflow-hidden"
            >
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setSelectedWineId(null)}
                  className="w-8 h-8 rounded-full bg-brand-bg border border-brand-cream/10 text-brand-cream hover:bg-brand-burgundy transition-colors text-xs flex items-center justify-center font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Grid content inside sommelier drawer */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* 1. Left visual side */}
                <div className="md:col-span-4 flex flex-col items-center">
                  <div className="w-24 h-48 relative">
                    <WineBottle
                      id={activeWine.id}
                      name={activeWine.name}
                      subtitle={activeWine.subtitle}
                      type={activeWine.type}
                      year={activeWine.year}
                      alcohol={activeWine.alcohol}
                      accentColor={activeWine.accentColor}
                      labelColor={activeWine.labelColor}
                      isLarge={false}
                    />
                  </div>
                  <div className="text-center mt-3">
                    <h4 className="font-serif text-lg font-bold text-brand-cream">{activeWine.name}</h4>
                    <span className="text-[10px] font-mono text-brand-cream/40 uppercase tracking-widest block">{activeWine.subtitle} • {activeWine.year}</span>
                  </div>
                </div>

                {/* 2. Sommelier technical specs */}
                <div className="md:col-span-8 space-y-6">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-[#8A6623] block uppercase font-bold">MEDALII DE AUR & CERTIFICĂRE</span>
                    <div className="flex flex-col gap-1.5 mt-1">
                      {activeDetails.medals.map((medal, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-serif font-semibold text-brand-cream/90">
                          <Trophy className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37] animate-pulse" />
                          <span>{medal}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tasting Wheel / Sliders representation */}
                  <div className="space-y-3 pt-3 border-t border-brand-cream/5">
                    <span className="text-[9px] font-mono tracking-widest text-brand-cream/40 block uppercase">CONCENTRAȚII VITICOLE PRINCIPALE</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Tannins */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-xs text-brand-cream/70 font-mono">
                          <span>Nivel Tanin (Gură):</span>
                          <span className="text-brand-burgundy font-bold">{activeDetails.tannins ? `${activeDetails.tannins} / 5` : "0 (Exclusiv Alb)"}</span>
                        </div>
                        <div className="h-1 w-full bg-brand-burgundy/15 rounded-lg overflow-hidden">
                          <div 
                            className="bg-brand-burgundy h-full transition-all duration-700" 
                            style={{ width: `${(activeDetails.tannins / 5) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Oak Intensity */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-xs text-brand-cream/70 font-mono">
                          <span>Intensitate Baric (Lemn):</span>
                          <span className="text-brand-burgundy font-bold">{activeDetails.oakIntensity ? `${activeDetails.oakIntensity} / 5` : "Uscat în Alcoolemie"}</span>
                        </div>
                        <div className="h-1 w-full bg-brand-burgundy/15 rounded-lg overflow-hidden">
                          <div 
                            className="bg-brand-burgundy h-full transition-all duration-700" 
                            style={{ width: `${(activeDetails.oakIntensity / 5) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Acids */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-xs text-brand-cream/70 font-mono">
                          <span>Echilibru Acid (pH):</span>
                          <span className="text-brand-burgundy font-bold">{activeWine.ph} pH</span>
                        </div>
                        <div className="h-1 w-full bg-brand-burgundy/15 rounded-lg overflow-hidden">
                          <div 
                            className="bg-brand-burgundy h-full transition-all duration-700" 
                            style={{ width: `${(1 - (activeWine.ph - 3.0) / 1.0) * 100}%` }} // inverted scale for pH acidity display
                          />
                        </div>
                      </div>

                      {/* Sugars */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center text-xs text-brand-cream/70 font-mono">
                          <span>Dulceață Natură la Cules:</span>
                          <span className="text-brand-burgundy font-bold">{activeWine.brix}° Brix</span>
                        </div>
                        <div className="h-1 w-full bg-brand-burgundy/15 rounded-lg overflow-hidden">
                          <div 
                            className="bg-brand-burgundy h-full transition-all duration-700" 
                            style={{ width: `${(activeWine.brix / 26) * 100}%` }}
                          />
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Gastronomic Pairing Advice */}
                  <div className="pt-3 border-t border-brand-cream/5 space-y-2">
                    <span className="text-[9.5px] font-mono tracking-widest text-[#8A6623] block uppercase font-bold">RECOMANDARE ASOCIERE GASTRONOMICĂ</span>
                    <div className="flex flex-wrap gap-2">
                      {activeDetails.pairings.map((pair, idx) => (
                        <span key={idx} className="px-3 py-1 bg-brand-bg rounded-xl border border-brand-cream/5 text-xs text-brand-cream/80 font-serif italic">
                          🍷 {pair}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quick Action directly inside focus drawer */}
                  <div className="pt-3 border-t border-brand-cream/5 flex items-center justify-between gap-4">
                    <div className="text-xs text-brand-cream/50 font-serif leading-none">
                      Maturat biodinamic în sticle numerotate, ediție rară.
                    </div>
                    <button
                      onClick={() => onAddWineToTray(activeWine.id)}
                      className="py-2.5 px-5 rounded-xl text-xs font-mono font-black uppercase bg-brand-burgundy text-brand-cream flex items-center gap-1.5 transition-all hover:bg-opacity-8 shadow-xl"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>Adaugă un element în Degustare</span>
                    </button>
                  </div>

                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
