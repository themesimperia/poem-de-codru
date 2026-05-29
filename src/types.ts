/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TastingNotes {
  aroma: string[];
  body: "Light" | "Medium" | "Full";
  acidity: "Low" | "Medium" | "High";
  finish: string;
}

export interface WineProduct {
  id: string;
  name: string;
  subtitle: string;
  type: "red" | "white" | "rose";
  year: number;
  alcohol: string;
  description: string;
  tastingNotes: TastingNotes;
  brix: number; // sugar content at harvest
  ph: number; // acidity pH
  accentColor: string; // Tailwind accent or hex color for theme highlights
  bgColor: string; // background gradient accent
  labelColor: string; // color of the premium card back
  bestTerroir: string;
}

export interface HarvestRecord {
  year: number;
  yieldTonnes: number; // tonnes harvested
  brixAvg: number;
  acidityPhAvg: number;
  qualityScore: number; // 1-100 index
  rainfallMm: number;
  tempAvgC: number;
  harvestDurationDays: number;
}

export interface MicroclimateVariable {
  estate: string;
  altitudeRange: string;
  soilType: string;
  sunExposure: string;
  baseTemp: number;
  baseRainfall: number;
  baseSoilMoisture: number;
}
