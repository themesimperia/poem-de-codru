/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Quote, ShieldAlert, Stamp, Leaf, Trees } from "lucide-react";
import { BRAND_HISTORY } from "../data";

// Detailed historical events for the interactive timeline
const HISTORICAL_MILESTONES = [
  {
    year: 1485,
    title: "Mențiunea Hrisovului Domnesc",
    subtitle: "Rădăcini Medievale",
    desc: "Codrii Tigheciului sunt menționați ca teritoriu de hotar și rezistență militară a Moldovei lui Ștefan cel Mare. Solul și dealurile adăposteau primii butași sălbatici de viță-de-vie îngrijiți de răzeși.",
    icon: Stamp
  },
  {
    year: 2003,
    title: "Înființarea Câmpului de Autor",
    subtitle: "Visul unui Viticultor",
    desc: "Familia Arpintin reînvie tradiția antică a zonei. Sunt plantați primii butași selectați manual din soiuri nobile: Cabernet, Merlot și străvechiul răsunător moldovenesc.",
    icon: Trees
  },
  {
    year: 2018,
    title: "Tranziția Biodinamică",
    subtitle: "Respect Pur pentru Sol",
    desc: "Se elimină complet pesticidele sintetice, implementând un sistem lunar bazat pe fazele lunii și compost organic din plante de pădure. Vița capătă rezistență și o identitate minerală pregnantă.",
    icon: Leaf
  },
  {
    year: 2026,
    title: "Păstrătorii Poemului de Codru",
    subtitle: "Maturitate de Colecție",
    desc: "Lansarea primelor micro-serii de sticle numerotate manual, menite să poarte în lume freamătul, legendele medievale și rafinamentul Codrilor Tigheciului.",
    icon: Calendar
  }
];

const GALLERY_ITEMS = [
  {
    id: "cellar",
    title: "Pivniță Baric",
    subtitle: "Maturare în Stejar",
    desc: "Pivnița subpământeană de maturare la baric, Codrii Tigheciului.",
    extra: "Stejar francez de minim 18 luni.",
    src: "/src/assets/images/winery_heritage_cellar_1779621630425.png"
  },
  {
    id: "barrel",
    title: "Butoaie de Autor",
    subtitle: "Tradiție Monogramată",
    desc: "Butoaiele noastre speciale poartă monograma oficială a cramei Poem de Codru gravată în lemn.",
    extra: "Maturare în butoi de stejar.",
    src: "/src/assets/images/butoi.jpg"
  },
  {
    id: "vineyard",
    title: "Podgoria Noastră",
    subtitle: "Inima Codrilor Tigheciului",
    desc: "Plantația de viță-de-vie situată pe dealurile înalte și aerisite ale Codrilor.",
    extra: "Sol cernoziom argilo-calcaros.",
    src: "/src/assets/images/via.jpg"
  },
  {
    id: "bottle",
    title: "Sticla Poem de Codru",
    subtitle: "Prezentare Elegantă",
    desc: "Sticlele noastre speciale, o expresie a eleganței și a freamătului Codrilor.",
    extra: "Ediție limitată, sticle numerotate.",
    src: "/src/assets/images/sticla.jpg"
  },
  {
    id: "label",
    title: "Eticheta Artistică",
    subtitle: "Poezie Vizuală",
    desc: "Fiecare sticlă poartă o etichetă creată ca o filă de manuscris vechi moldovenesc.",
    extra: "Concept artistic Poem de Codru.",
    src: "/src/assets/images/eticheta.png"
  }
];

export default function HeritageStory() {
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(1); // Default to 2003
  const [selectedGalleryId, setSelectedGalleryId] = useState("cellar");
  
  const activeMilestone = HISTORICAL_MILESTONES[activeMilestoneIndex];
  const activeGallery = GALLERY_ITEMS.find(item => item.id === selectedGalleryId) || GALLERY_ITEMS[0];

  return (
    <section
      id="povestea-noastra"
      className="w-full bg-[#0a0a0a] text-brand-cream py-24 px-4 md:px-8 border-t border-brand-burgundy/10 relative overflow-hidden"
    >
      {/* Decorative vertical coordinates overlay styled like Figma margins */}
      <div className="absolute left-6 top-12 hidden xl:flex flex-col items-center gap-2 pointer-events-none opacity-20">
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase vertical-text">
          {BRAND_HISTORY.coordinates}
        </span>
        <div className="w-px h-16 bg-brand-cream/50 mt-1" />
      </div>

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Title Group */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-brand-burgundy/10 border border-brand-burgundy/20 text-[10px] tracking-[0.25em] font-mono text-brand-cream uppercase font-bold">
            <Quote className="w-3.5 h-3.5 text-brand-burgundy animate-pulse" />
            <span>GENEZA & MOȘTENIREA</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl tracking-tight font-light text-brand-cream">
            Freamătul frunzelor păstrat în <span className="font-bold italic text-brand-burgundy font-serif">sunetul picăturilor de vin</span>
          </h2>
          <div className="h-0.5 w-16 bg-brand-burgundy mx-auto my-2" />
          <p className="text-sm font-light text-brand-cream/60 max-w-2xl mx-auto font-serif italic text-base">
            "În Codrii Tigheciului, unde pământul întâlnește legendele lui Ștefan cel Mare, făurim vinul ce aduce emoțiile rar întâlnite în codrii seculari."
          </p>
        </div>

        {/* 2-Column Main Presentation Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Stunning luxury container enclosing the generated image */}
          <div className="lg:col-span-6 space-y-6 relative group">
            {/* Elegant outer frames (Figma classic style) */}
            <div className="absolute -inset-2 rounded-2xl border border-brand-burgundy/20 pointer-events-none group-hover:border-brand-burgundy/45 transition-colors duration-500" />
            
            <div className="overflow-hidden rounded-xl border border-brand-cream/20 shadow-[0_20px_50px_rgba(0,0,0,0.9)] max-h-[460px] aspect-[16/10] relative bg-black">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeGallery.id}
                  src={activeGallery.src}
                  alt={activeGallery.title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-[20%] contrast-[110%] hover:scale-105 hover:grayscale-0 transition-all duration-1000 ease-out"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85 z-10 pointer-events-none" />
              
              {/* Overlay label badge printed on beautiful parchment */}
              <div className="absolute bottom-6 left-6 z-20 bg-[#fbfbf8] text-[#121212] p-4 rounded border-l-4 border-brand-burgundy shadow-2xl max-w-xs transition-transform duration-500 group-hover:translate-x-1.5 label-card-textured">
                <span className="text-[9px] font-mono tracking-widest text-[#8A6623] block uppercase font-bold">
                  {activeGallery.subtitle.toUpperCase()}
                </span>
                <p className="font-serif text-xs font-bold text-gray-800 mt-1">
                  {activeGallery.desc}
                </p>
                <div className="w-12 h-px bg-gray-300 my-1.5" />
                <span className="text-[10px] italic font-serif text-[#800020]">
                  {activeGallery.extra}
                </span>
              </div>
            </div>

            {/* Gallery Image Selector Controls (luxury overlay style) */}
            <div className="flex justify-center gap-1.5 p-1 bg-[#121212]/80 border border-brand-cream/10 rounded-2xl max-w-md mx-auto relative z-25">
              {GALLERY_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedGalleryId(item.id)}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-[10px] font-mono tracking-wider uppercase transition-all duration-300 cursor-pointer text-center ${
                    selectedGalleryId === item.id
                      ? "bg-brand-burgundy text-brand-cream shadow-md"
                      : "text-brand-cream/50 hover:text-brand-cream hover:bg-brand-burgundy/10"
                  }`}
                >
                  {item.title.split(" ")[0]}
                </button>
              ))}
            </div>

            {/* Glowing brand seal behind */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full border border-brand-burgundy/10 bg-brand-burgundy/5 blur-xl pointer-events-none z-0" />
          </div>

          {/* Right Column: Editorial Typographic Column with Timeline */}
          <div className="lg:col-span-6 space-y-8 flex flex-col justify-center">
            
            {/* The Drop Cap Editorial Text */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-brand-cream flex items-center gap-2">
                Oameni ai Pământului din {BRAND_HISTORY.foundedYear}
              </h3>
              
              <div className="relative">
                {/* Visual quote icon ornament */}
                <Quote className="absolute -top-6 -left-6 w-12 h-12 text-brand-burgundy/10 pointer-events-none transform -scale-x-100" />
                
                <p className="text-brand-cream/95 text-base leading-relaxed font-serif indent-4 font-light">
                  <span className="float-left text-5xl font-black font-serif text-brand-burgundy mr-2.5 mt-1 leading-none">C</span>
                  {BRAND_HISTORY.text} Fiecare picătură este un omagiu adus celor ce au sfințit acest pământ de-a lungul veacurilor, transformat astăzi în cupaje bogate cu un echilibru absolut.
                </p>
              </div>

              {/* Autograph seal of the founder */}
              <div className="flex items-center gap-4 pt-4">
                <div className="w-10 h-10 rounded-full bg-brand-burgundy/10 border border-brand-burgundy/20 flex items-center justify-center">
                  <span className="text-brand-burgundy font-serif text-xs font-bold leading-none">DOC</span>
                </div>
                <div>
                  <div className="text-[13px] font-bold text-brand-cream font-serif italic">
                    {BRAND_HISTORY.founder}
                  </div>
                  <div className="text-[9.5px] font-mono text-brand-cream/40 uppercase tracking-widest">
                    Viticultor și Fondator de Onoare
                  </div>
                </div>
              </div>
            </div>

            {/* Micro Chronology Milestone Panel */}
            <div className="space-y-4 pt-6 border-t border-brand-cream/10">
              <span className="text-[10px] font-mono tracking-widest text-brand-cream/40 block uppercase font-bold">
                CEREALĂ CHRONOLOGICĂ INTERACTIVĂ
              </span>

              {/* Horizontal pills for milestones */}
              <div className="flex flex-wrap gap-2">
                {HISTORICAL_MILESTONES.map((m, idx) => (
                  <button
                    key={m.year}
                    onClick={() => setActiveMilestoneIndex(idx)}
                    className={`px-3 py-2 rounded-xl text-xs font-mono transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                      activeMilestoneIndex === idx
                        ? "bg-brand-burgundy text-brand-cream border border-brand-burgundy font-bold shadow-lg"
                        : "bg-brand-bg border border-brand-cream/10 text-brand-cream/50 hover:text-brand-cream hover:border-brand-burgundy/20"
                    }`}
                  >
                    <span>{m.year}</span>
                    {activeMilestoneIndex === idx && (
                      <span className="text-[9px] px-1 bg-brand-cream text-brand-burgundy font-serif font-black rounded">
                        ★
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Dynamic Milestone details container */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMilestone.year}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="p-5 rounded-2xl bg-brand-bg/60 border border-brand-burgundy/15 space-y-2.5 backdrop-blur-md relative overflow-hidden"
                >
                  {/* Decorative faint icon back */}
                  {React.createElement(activeMilestone.icon, {
                    className: "absolute -right-4 -bottom-4 w-24 h-24 text-brand-burgundy/5 pointer-events-none"
                  })}

                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-brand-burgundy text-sm">
                      {activeMilestone.subtitle}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-cream/45" />
                    <span className="text-[10px] font-mono text-brand-cream/50 uppercase">
                      Punct Reper {activeMilestone.year}
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-brand-cream">
                    {activeMilestone.title}
                  </h4>

                  <p className="text-xs text-brand-cream/65 leading-relaxed font-serif">
                    {activeMilestone.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
