/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { BRAND_HISTORY } from "../data";
import { Mail, Phone, MapPin, Globe, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-bg border-t border-brand-burgundy/15 text-brand-cream/60 py-16 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* About brand */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-brand-burgundy/30 flex items-center justify-center bg-brand-burgundy/10">
              <span className="font-serif text-brand-cream text-xs font-black">P</span>
            </div>
            <h3 className="font-serif text-brand-cream tracking-[0.2em] text-sm uppercase">
              Poem de Codru
            </h3>
          </div>
          <p className="text-xs font-light text-brand-cream/60 leading-relaxed max-w-sm font-serif italic">
            "{BRAND_HISTORY.text}"
          </p>
          <div className="text-[11px] text-brand-burgundy font-serif font-bold">
            — {BRAND_HISTORY.founder}, Fondator din {BRAND_HISTORY.foundedYear}
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs font-mono tracking-widest text-brand-cream uppercase font-bold">
            Certificare de Origine
          </h4>
          <ul className="space-y-2 text-xs font-light">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-burgundy" />
              <span className="font-serif text-brand-cream/70">D.O.C. Codru (Denumire de Origine Controlată)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-burgundy" />
              <span className="font-serif text-brand-cream/70">Cules manual în zori</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-burgundy" />
              <span className="font-serif text-brand-cream/70">Fără conservanți artificiali de sinteză</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-burgundy" />
              <span className="font-serif text-brand-cream/70">Tehnici de îmbuteliere biodinamice</span>
            </li>
          </ul>
        </div>

        {/* Contact info column */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs font-mono tracking-widest text-brand-cream uppercase font-bold">
            Crama și Terroir-ul
          </h4>
          <div className="space-y-2.5 text-xs font-light font-serif">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-brand-burgundy" />
              <span className="text-brand-cream/80">{BRAND_HISTORY.location}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-brand-burgundy" />
              <span className="text-brand-cream/60 font-mono text-[11px]">{BRAND_HISTORY.coordinates} • Alt. 250-300 m</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-brand-burgundy" />
              <span className="text-brand-cream/80">contact@poemdecodru.md</span>
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-brand-burgundy/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light relative z-10">
        <div>
          © {new Date().getFullYear()} Poem de Codru. Toate drepturile rezervate. 
        </div>
        
        <div className="flex items-center gap-4 text-[10px] font-mono tracking-wider text-brand-cream/40">
          <span>750 ML</span>
          <span>•</span>
          <span>PRODUS ÎN REPUBLICA MOLDOVA</span>
          <span>•</span>
          <span className="text-brand-burgundy font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-brand-burgundy animate-pulse" />
            EDIȚIE LIMITATĂ
          </span>
        </div>
      </div>
    </footer>
  );
}
