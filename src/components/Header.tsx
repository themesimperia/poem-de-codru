/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Landmark, Sparkles, BookOpen, Wine, ShoppingBag, MapPin, Sun, Moon } from "lucide-react";

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export default function Header({ activeSection, onNavigate, theme, onToggleTheme }: HeaderProps) {
  const navItems = [
    { id: "parallax", label: "Showcase", icon: Sparkles },
    { id: "story", label: "Moștenire", icon: BookOpen },
    { id: "catalog", label: "Portofoliu", icon: Wine },
    { id: "tray", label: "Tăviță", icon: ShoppingBag },
    { id: "stats", label: "Statistici Sol", icon: Landmark },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-brand-bg/90 backdrop-blur-xl border-b border-brand-burgundy/15 px-3 py-3 sm:px-6 sm:py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 relative min-h-[40px]">
        {/* Logo / Crest */}
        <button
          onClick={() => onNavigate("parallax")}
          className="flex items-center gap-2 sm:gap-3 group text-left focus:outline-none cursor-pointer shrink-0 z-10"
        >
          {/* Logo Crest Icon Box */}
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-brand-burgundy/30 flex items-center justify-center bg-gradient-to-br from-brand-burgundy/20 to-brand-bg group-hover:border-brand-burgundy/70 transition-all duration-300 shrink-0">
            <span className="font-serif font-black text-brand-cream text-base sm:text-lg group-hover:scale-110 transition-transform">P</span>
            <div className="absolute -top-1 -right-1 text-brand-burgundy text-[8px] sm:text-[10px] font-bold animate-pulse">★</div>
          </div>
          
          <div className="hidden xs:block">
            <h1 className="font-serif text-xs sm:text-lg tracking-[0.15em] sm:tracking-[0.2em] font-medium text-brand-cream uppercase group-hover:text-brand-burgundy transition-colors duration-300">
              Poem de Codru
            </h1>
            <p className="text-[7.5px] sm:text-[9px] font-mono tracking-[0.1em] sm:tracking-[0.15em] text-brand-cream/60 uppercase">
              Vin din Inima Codrilor
            </p>
          </div>
        </button>

        {/* Center navigation (Mathematically centered via absolute positioning) */}
        <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 sm:gap-2 z-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer ${
                  isActive
                    ? "bg-brand-burgundy/20 text-brand-cream border border-brand-burgundy/40 shadow-[0_0_12px_rgba(128,0,32,0.3)] scale-105"
                    : "text-brand-cream/50 hover:text-brand-cream border border-transparent hover:border-brand-burgundy/15 hover:bg-brand-burgundy/5"
                }`}
                title={item.label}
              >
                <Icon className="w-5 h-5 sm:w-4 sm:h-4 text-brand-burgundy shrink-0" />
                <span className="hidden md:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Brand Details & Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 text-right z-10 shrink-0">
          {/* Circular Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-brand-burgundy/30 flex items-center justify-center bg-gradient-to-br from-brand-burgundy/10 to-brand-bg hover:border-brand-burgundy/70 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg shrink-0"
            title={theme === "light" ? "Mod Noapte" : "Mod Lumină"}
          >
            {theme === "light" ? (
              <Moon className="w-4.5 h-4.5 sm:w-4 sm:h-4 text-brand-burgundy" />
            ) : (
              <Sun className="w-4.5 h-4.5 sm:w-4 sm:h-4 text-brand-burgundy" />
            )}
          </button>

          <div className="hidden lg:block text-[10px] font-mono text-brand-cream/40">
            <div className="text-brand-cream/70 tracking-wider">CODRI, MOLDOVA</div>
            <div className="scale-90 origin-right text-brand-burgundy font-bold">★ FONDAT ÎN 2003 ★</div>
          </div>
        </div>
      </div>
    </header>
  );
}
