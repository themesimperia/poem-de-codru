/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WINES } from "../data";
import { Trash2, Plus, Minus, ShoppingBag, Landmark, Mail, ClipboardCopy, Send, FileText, CheckCircle } from "lucide-react";

interface TastingTrayProps {
  trayQuantities: Record<string, number>;
  onUpdateQty: (wineId: string, delta: number) => void;
  onClearTray: () => void;
}

export default function TastingTray({ trayQuantities, onUpdateQty, onClearTray }: TastingTrayProps) {
  // Booking Form State
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [useWoodenBox, setUseWoodenBox] = useState(true);
  const [allocationType, setAllocationType] = useState<"crama" | "ship">("crama");

  // Receipt Modal State
  const [receiptData, setReceiptData] = useState<{
    code: string;
    items: Array<{ name: string; year: number; qty: number; total: number }>;
    woodenBoxPrice: number;
    shippingPrice: number;
    subtotal: number;
    grandTotal: number;
    userName: string;
    createdAt: string;
  } | null>(null);

  // Filter items in tray
  const trayItems = WINES.map((wine) => ({
    wine,
    qty: trayQuantities[wine.id] || 0
  })).filter((item) => item.qty > 0);

  // Pricing constants (expressed in Euro / USD equivalent)
  const ITEM_PRICE = 28; // flat 28 EUR per bottle for micro-edition authors wine
  const CORKAGE_FEE = 5; // dynamic estate handling fee
  const WOODEN_BOX_PRICE = 15;
  const SHIPPING_RATE = 10;

  // Calculators
  const subtotal = trayItems.reduce((acc, current) => acc + current.qty * ITEM_PRICE, 0);
  const woodenBoxCost = useWoodenBox && trayItems.length > 0 ? WOODEN_BOX_PRICE : 0;
  const shippingCost = allocationType === "ship" && trayItems.length > 0 ? SHIPPING_RATE * Math.ceil(trayItems.reduce((a,c)=>a+c.qty,0)/3) : 0;
  const corkageCost = trayItems.length > 0 ? CORKAGE_FEE : 0;
  const grandTotal = subtotal + woodenBoxCost + shippingCost + corkageCost;

  // Perform Simulated Allocation booking
  const handleSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (trayItems.length === 0 || !userName || !userEmail) return;

    // Generate vintage allocation code PdC-2026-XXXX
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randCode = "PdC-2026-";
    for (let i = 0; i < 4; i++) {
      randCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const itemsInvoice = trayItems.map((item) => ({
      name: item.wine.name,
      year: item.wine.year,
      qty: item.qty,
      total: item.qty * ITEM_PRICE
    }));

    setReceiptData({
      code: randCode,
      items: itemsInvoice,
      woodenBoxPrice: woodenBoxCost,
      shippingPrice: shippingCost,
      subtotal,
      grandTotal,
      userName,
      createdAt: new Date().toLocaleDateString("ro-RO", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    });
  };

  const handleCloseReceipt = () => {
    onClearTray();
    setReceiptData(null);
    setUserName("");
    setUserEmail("");
  };

  return (
    <section
      id="tava-degustare"
      className="w-full bg-[#0a0a0a] text-brand-cream py-24 px-4 md:px-8 border-t border-brand-burgundy/10 relative overflow-hidden"
    >
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-brand-burgundy/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Section Title group */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-brand-cream/80 uppercase">
            <ShoppingBag className="w-4 h-4 text-brand-burgundy" />
            <span>TAVA DE REZERVARE PRIVATĂ</span>
          </div>
          <h2 className="font-serif text-3xl md:text-5xl tracking-normal font-light">
            Repartizarea <span className="font-bold italic text-brand-burgundy font-serif">Cupajului Personal</span>
          </h2>
          <div className="h-0.5 w-16 bg-brand-burgundy mx-auto my-2" />
          <p className="text-xs text-brand-cream/50 max-w-xl mx-auto font-serif">
            Adăugați sticlele preferate în taviță, alegeți modelul de livrare la cramă sau curierat și simulați un deviz custom de colecție cu sticle numerotate individual.
          </p>
        </div>

        {/* Outer Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-6">
          
          {/* LEFT CHASSIS: Selected items list container */}
          <div className="lg:col-span-7 bg-[#121212]/30 rounded-3xl border border-brand-cream/10 p-6 md:p-8 backdrop-blur-md space-y-6">
            <div className="flex justify-between items-center border-b border-brand-cream/10 pb-4">
              <h3 className="font-serif text-lg font-bold text-brand-cream flex items-center gap-2">
                Sticlele din Tava Voastră
              </h3>
              {trayItems.length > 0 && (
                <button
                  onClick={onClearTray}
                  className="text-xs font-mono text-brand-burgundy hover:text-brand-cream transition-colors uppercase font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Golește Tava
                </button>
              )}
            </div>

            {trayItems.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-brand-burgundy/10 border border-brand-burgundy/20 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-6 h-6 text-brand-burgundy" />
                </div>
                <h4 className="font-serif text-base text-brand-cream font-bold">O tăviță pregătită pentru explorări</h4>
                <p className="text-xs text-brand-cream/40 max-w-sm mx-auto font-serif leading-relaxed">
                  Momentan nu aveți butelii rezervate. Dați scroll la "Portofoliul de Autor" de mai sus și adăugați soiurile preferate!
                </p>
              </div>
            ) : (
              <div className="divide-y divide-brand-cream/10 space-y-4">
                {trayItems.map(({ wine, qty }) => (
                  <div key={wine.id} className="flex gap-4 items-center justify-between pt-4 first:pt-0">
                    
                    {/* Tiny Bottle Preview Icon and specifications */}
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-16 bg-brand-bg rounded-xl border border-brand-cream/10 flex items-center justify-center py-2 shrink-0">
                        <div className="h-full scale-[0.35] origin-center -translate-y-1">
                          {/* Simplified flat representation of standard SVG height */}
                          <div 
                            className="w-16 h-40 rounded-t-lg shadow-lg relative border-2 border-brand-burgundy"
                            style={{ backgroundColor: wine.accentColor }}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-serif text-sm font-semibold text-brand-cream">
                          {wine.name} ({wine.year})
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5 text-[10px] font-mono tracking-wider text-brand-cream/40 uppercase">
                          <span>{wine.subtitle}</span>
                          <span>•</span>
                          <span className="text-[#8A6623]">{wine.alcohol}</span>
                        </div>
                      </div>
                    </div>

                    {/* Operational controls */}
                    <div className="flex items-center gap-4">
                      {/* Price per piece */}
                      <span className="text-xs font-mono font-bold text-brand-cream/80 text-right">
                        {qty} x {ITEM_PRICE} €
                      </span>

                      {/* Incrementor boxes styled like Figma inputs */}
                      <div className="flex items-center bg-brand-bg border border-brand-cream/10 rounded-xl p-1">
                        <button
                          onClick={() => onUpdateQty(wine.id, -1)}
                          className="w-7 h-7 rounded-lg hover:bg-brand-burgundy hover:text-brand-cream text-brand-cream/60 transition-colors flex items-center justify-center text-xs cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-mono font-bold text-brand-cream">
                          {qty}
                        </span>
                        <button
                          onClick={() => onUpdateQty(wine.id, 1)}
                          className="w-7 h-7 rounded-lg hover:bg-brand-burgundy hover:text-brand-cream text-brand-cream/60 transition-colors flex items-center justify-center text-xs cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT CHASSIS: Estimation Invoice and Allocation Request form */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* The deviz simulator card */}
            <div className="bg-[#121212]/30 rounded-3xl border-l-2 border-l-brand-burgundy border-y border-r border-brand-cream/10 p-6 md:p-8 backdrop-blur-md space-y-6">
              <h3 className="font-serif text-lg font-bold text-brand-cream">
                Deviz Simulator de Rezervare
              </h3>

              <div className="space-y-3 text-xs font-serif text-brand-cream/80 border-b border-brand-cream/10 pb-4">
                <div className="flex justify-between">
                  <span>Subtotal Butelii Artistice</span>
                  <span className="font-mono font-bold text-brand-cream">{subtotal} €</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="block">Casă de Lemn de Autor</span>
                    <span className="text-[9.5px] text-brand-cream/40 block">Ideală pentru colecționari unici - {WOODEN_BOX_PRICE} €</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={useWoodenBox}
                    onChange={(e) => setUseWoodenBox(e.target.checked)}
                    className="accent-brand-burgundy h-4 w-4 bg-[#121212]"
                    disabled={trayItems.length === 0}
                  />
                </div>

                <div className="flex justify-between items-start pt-1">
                  <div>
                    <span className="block">Mod de Repartizare</span>
                    <span className="text-[9.5px] text-brand-cream/40 block leading-none mt-1">Selectați faza de îmbuteliere și transport</span>
                  </div>
                  <div className="flex bg-brand-bg p-0.5 rounded-lg border border-brand-cream/10 text-[9.5px] font-mono font-bold">
                    <button
                      type="button"
                      onClick={() => setAllocationType("crama")}
                      className={`px-2.5 py-1 rounded-md transition-colors ${allocationType === "crama" ? "bg-brand-burgundy text-brand-cream" : "text-brand-cream/50"}`}
                      disabled={trayItems.length === 0}
                    >
                      Cramă
                    </button>
                    <button
                      type="button"
                      onClick={() => setAllocationType("ship")}
                      className={`px-2.5 py-1 rounded-md transition-colors ${allocationType === "ship" ? "bg-brand-burgundy text-brand-cream" : "text-brand-cream/50"}`}
                      disabled={trayItems.length === 0}
                    >
                      Expediție
                    </button>
                  </div>
                </div>

                {allocationType === "ship" && (
                  <div className="flex justify-between text-xs text-brand-cream/70 font-mono">
                    <span>Curier Special Conservat</span>
                    <span>+{shippingCost} €</span>
                  </div>
                )}

                <div className="flex justify-between text-xs text-brand-cream/70 font-mono">
                  <span>Taxă Depozit de Stat Moldovenesc</span>
                  <span>{corkageCost} €</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-1">
                <span className="font-serif text-sm font-semibold tracking-wide text-brand-cream">TOTAL ESTIMATIV</span>
                <span className="font-mono text-2xl font-black text-brand-burgundy">{grandTotal} €</span>
              </div>

              {/* Guest Allocation details form */}
              <form onSubmit={handleSubmission} className="space-y-4 pt-4 border-t border-brand-cream/10">
                <span className="text-[9.5px] font-mono tracking-widest text-[#8A6623] block uppercase font-bold">CREDENTIALE DESTINATAR</span>
                
                <div className="space-y-3">
                  <div className="relative">
                    <Landmark className="absolute left-3 top-3.5 w-4 h-4 text-brand-cream/30" />
                    <input
                      type="text"
                      placeholder="Nume Complet de Răzeș"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      disabled={trayItems.length === 0}
                      className="w-full bg-brand-bg/80 border border-brand-cream/10 rounded-xl py-3 pl-10 pr-4 text-xs text-brand-cream placeholder-brand-cream/30 focus:outline-none focus:border-brand-burgundy/60 transition-colors"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-4 h-4 text-brand-cream/30" />
                    <input
                      type="email"
                      placeholder="Adresă Email Proprietar"
                      required
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      disabled={trayItems.length === 0}
                      className="w-full bg-brand-bg/80 border border-brand-cream/10 rounded-xl py-3 pl-10 pr-4 text-xs text-brand-cream placeholder-brand-cream/30 focus:outline-none focus:border-brand-burgundy/60 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={trayItems.length === 0 || !userName || !userEmail}
                  className="w-full py-3.5 rounded-xl text-xs font-mono font-black tracking-widest uppercase bg-brand-burgundy text-brand-cream flex items-center justify-center gap-2 transition-all hover:bg-opacity-80 hover:scale-[1.01] shadow-2xl shadow-brand-burgundy/30 cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                >
                  <Send className="w-4 h-4" />
                  <span>Cere Repartizor Alocare</span>
                </button>
              </form>

            </div>

          </div>

        </div>

      </div>

      {/* RENDER DYNAMIC INVOICE RECEIPT MODAL AT SUCCESS (Editorial Design with Wax-Seal) */}
      <AnimatePresence>
        {receiptData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -30 }}
              className="bg-[#fcfbf9] text-[#121212] rounded-3xl w-full max-w-xl p-6 md:p-8 space-y-6 shadow-[0_30px_60px_rgba(0,0,0,0.85)] border-t-[8px] border-brand-burgundy relative font-serif"
            >
              {/* Wax Seal Graphic Backdrop */}
              <div className="absolute right-6 top-6 w-16 h-16 rounded-full bg-brand-burgundy flex items-center justify-center text-brand-cream font-bold opacity-85 shadow-lg border-2 border-dashed border-[#AA7C11] animate-spin-slow">
                <span className="font-serif text-lg font-black tracking-tight leading-none">P</span>
              </div>

              {/* Title Section */}
              <div className="border-b border-gray-200 pb-4 space-y-1">
                <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#8A6623] uppercase">
                  <CheckCircle className="w-3.5 h-3.5 text-brand-burgundy fill-transparent" />
                  <span>REZERVAT DE SUCCES • ALLOCATION OK</span>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-gray-900">
                  Poem de Codru Repartizare
                </h3>
                <span className="text-[11px] font-mono text-gray-500 block">
                  Identificator Tranzacție: <strong className="text-[#800020]">{receiptData.code}</strong>
                </span>
              </div>

              {/* Summary specifications */}
              <div className="grid grid-cols-2 gap-4 text-xs p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div>
                  <span className="text-[9px] font-mono text-gray-400 uppercase block">ALOCATOR DESTINATAR</span>
                  <span className="font-bold text-gray-900">{receiptData.userName}</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-gray-400 uppercase block">DATĂ GENERARE DEVIZ</span>
                  <span className="font-bold text-gray-900">{receiptData.createdAt}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[9px] font-mono text-gray-400 uppercase block">LOCAȚIE PRELUARE</span>
                  <span className="text-gray-800 font-semibold leading-relaxed">
                    {allocationType === "crama" 
                      ? "Crama Poem de Codru - Codrii Tigheciului, Republica Moldova" 
                      : "Expediție rapidă asigurată în cutie dublă climatizată"}
                  </span>
                </div>
              </div>

              {/* Itemized layout */}
              <div className="space-y-2 border-b border-gray-200 pb-4">
                <span className="text-[9px] font-mono text-gray-400 uppercase block">BUTELII INDIVIDUALE IN MEMORIAM</span>
                {receiptData.items.map((it, i) => (
                  <div key={i} className="flex justify-between items-center text-xs text-gray-800">
                    <span>{it.qty} x {it.name} ({it.year})</span>
                    <span className="font-mono font-bold text-gray-900">{it.total} €</span>
                  </div>
                ))}
              </div>

              {/* Extra charges */}
              <div className="space-y-2.5 text-xs text-gray-600 border-b border-gray-200 pb-4">
                {receiptData.woodenBoxPrice > 0 && (
                  <div className="flex justify-between">
                    <span>Cutie lemn nobil</span>
                    <span className="font-mono">{receiptData.woodenBoxPrice} €</span>
                  </div>
                )}
                {receiptData.shippingPrice > 0 && (
                  <div className="flex justify-between">
                    <span>Curier special de expediție</span>
                    <span className="font-mono">{receiptData.shippingPrice} €</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Taxe stat și depozitare criză</span>
                  <span className="font-mono">{CORKAGE_FEE} €</span>
                </div>
              </div>

              {/* Grand Total representation */}
              <div className="flex justify-between items-baseline pt-1">
                <span className="text-sm font-semibold text-gray-900 uppercase font-serif">TOTAL CONSTITUIT</span>
                <span className="font-mono text-2xl font-black text-brand-burgundy">{receiptData.grandTotal} €</span>
              </div>

              {/* Vintage message signed */}
              <div className="p-3 border-l-2 border-brand-burgundy bg-gray-50 text-[11px] text-gray-500 italic font-serif leading-relaxed rounded-r-lg">
                *Sticlele dumneavoastră din seria de autor au fost scoase din raftul de maturare și depuse în regim climatic ideal. Vă vom contacta pe e-mail în maxim 2 ore pentru detaliile de protocol. Vă mulțumim.
              </div>

              {/* Actions */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleCloseReceipt}
                  className="w-full py-3 rounded-xl bg-brand-burgundy text-white hover:bg-opacity-90 font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-transform cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Am Înțeles, Închide Alocatorul</span>
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
