/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Landmark, Sparkles, BookOpen, Wine, ShoppingBag, MapPin } from "lucide-react";

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const navItems = [
    { id: "parallax", label: "Showcase", icon: Sparkles },
    { id: "story", label: "Moștenire", icon: BookOpen },
    { id: "catalog", label: "Portofoliu", icon: Wine },
    { id: "tray", label: "Tăviță", icon: ShoppingBag },
    { id: "stats", label: "Statistici Sol", icon: Landmark },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-brand-bg/90 backdrop-blur-xl border-b border-brand-burgundy/15 px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Crest */}
        <button
          onClick={() => onNavigate("parallax")}
          className="flex items-center gap-3 group text-left focus:outline-none cursor-pointer"
        >
          {/* Logo Crest Icon Box */}
          <div className="relative w-10 h-10 rounded-full border border-brand-burgundy/30 flex items-center justify-center bg-gradient-to-br from-brand-burgundy/20 to-brand-bg group-hover:border-brand-burgundy/70 transition-all duration-300">
            <span className="font-serif font-black text-brand-cream text-lg group-hover:scale-110 transition-transform">P</span>
            <div className="absolute -top-1 -right-1 text-brand-burgundy text-[10px] font-bold animate-pulse">★</div>
          </div>
          
          <div>
            <h1 className="font-serif text-lg tracking-[0.2em] font-medium text-brand-cream uppercase group-hover:text-brand-burgundy transition-colors duration-300">
              Poem de Codru
            </h1>
            <p className="text-[9px] font-mono tracking-[0.15em] text-brand-cream/60 uppercase">
              Vin din Inima Codrilor
            </p>
          </div>
        </button>

        {/* Center navigation */}
        <nav className="flex items-center gap-2 md:gap-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-brand-burgundy/15 text-brand-cream border border-brand-burgundy/40 shadow-[0_0_12px_rgba(128,0,32,0.25)]"
                    : "text-brand-cream/50 hover:text-brand-cream border border-transparent hover:border-brand-burgundy/15 hover:bg-brand-burgundy/5"
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-brand-burgundy" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Brand Details */}
        <div className="hidden lg:flex items-center gap-3 text-right">
          <div className="text-[10px] font-mono text-brand-cream/40">
            <div className="text-brand-cream/70 tracking-wider">CODRI, MOLDOVA</div>
            <div className="scale-90 origin-right text-brand-burgundy font-bold">★ FONDAT ÎN 2003 ★</div>
          </div>
        </div>
      </div>
    </header>
  );
}
