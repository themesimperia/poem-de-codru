/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WineProduct, HarvestRecord, MicroclimateVariable } from "./types";

export const BRAND_NAME = "Poem de Codru";
export const BRAND_TAGLINE = "Vin din inima Codrilor";
export const BRAND_HISTORY = {
  text: "Codrii Tigheciului, menționați din secolul al XV-lea, au fost zonă de refugiu și hotar al Moldovei medievale, legați de legendele lui Ștefan cel Mare. Pe aceste dealuri înalte unde pădurea întâlnește cerul, lucrăm vița din 2003 cu respect pentru pământ, tradiție și povestea locului.",
  founder: "Arpintin Ion",
  foundedYear: 2003,
  location: "Codrii Tigheciului, Republica Moldova",
  coordinates: "46°51'0\" N, 28°18'0\" E"
};

export const BRAND_PILLARS = [
  { id: "alt", title: "Altitudine 250-300 m", desc: "Dealuri înalte ce oferă o aerisire perfectă și expunere solară ideală." },
  { id: "clima", title: "Microclimat Unic", desc: "Influențat de pădurile de codru ce temperează arșița verii și păstrează răcoarea." },
  { id: "sol", title: "Soluri Fertile", desc: "Soluri calcaroase de cernoziom cu un drenaj natural excepțional." },
  { id: "prod", title: "Producție Limitată", desc: "Calitate fără compromis, sticle numerotate individual din ediții de autor." },
  { id: "pers", title: "Vinuri cu Personalitate", desc: "Vinificate tradițional, cu tehnici biodinamice și o atenție deosebită." }
];

export const WINES: WineProduct[] = [
  {
    id: "cabernet",
    name: "Cabernet Sauvignon",
    subtitle: "Vin Roșu Sec",
    type: "red",
    year: 2022,
    alcohol: "14.2% vol.",
    description: "Puternic și complex, cu o structură robustă și un post-gust persistent. Învechit timp de 18 luni în baricuri de stejar francez.",
    tastingNotes: {
      aroma: ["coacăze negre", "condimente", "stejar", "tabac"],
      body: "Full",
      acidity: "Medium",
      finish: "Complex și robust cu accente de ciocolată amăruie și taninuri catifelate"
    },
    brix: 24.5,
    ph: 3.52,
    accentColor: "rgba(110, 18, 30, 1)", // rich cabernet burgundy
    bgColor: "from-slate-950 via-[#26050b] to-black",
    labelColor: "#3d060c",
    bestTerroir: "Poiana Dealului Înalt - Expunere Sudică"
  },
  {
    id: "merlot",
    name: "Merlot",
    subtitle: "Vin Roșu Sec",
    type: "red",
    year: 2022,
    alcohol: "13.8% vol.",
    description: "Catifelat și extrem de echilibrat, oferind arome luxuriante de fructe coapte și rotunjime excepțională a corpului.",
    tastingNotes: {
      aroma: ["fructe coapte", "vanilie fină", "prune uscate", "cireșe negre"],
      body: "Medium",
      acidity: "Medium",
      finish: "Catifelat, lung cu o notă dulceagă, caldă de mirodenii orientale"
    },
    brix: 23.8,
    ph: 3.61,
    accentColor: "rgba(141, 19, 36, 1)", // warm velvety crimson
    bgColor: "from-slate-950 via-[#3b080f] to-black",
    labelColor: "#4a060e",
    bestTerroir: "Panta Codrilor - Sol Lutos Calcaros"
  },
  {
    id: "pinot-noir",
    name: "Pinot Noir",
    subtitle: "Vin Roșu Sec",
    type: "red",
    year: 2022,
    alcohol: "13.5% vol.",
    description: "Elegant, delicat și de o rafinată noblețe rustică. Un clasic interpretat perfect sub cerul Codrilor Tigheciului.",
    tastingNotes: {
      aroma: ["cireșe roșii", "fructe de pădure", "violetă", "pământ reavăn"],
      body: "Light",
      acidity: "High",
      finish: "Subtil, mătăsos, revigorant cu o prospețime minerală superbă"
    },
    brix: 22.5,
    ph: 3.44,
    accentColor: "rgba(189, 40, 56, 1)", // bright pinot ruby
    bgColor: "from-slate-950 via-[#440812] to-black",
    labelColor: "#590a16",
    bestTerroir: "Platoul Umbrit - Altitudine 290m"
  },
  {
    id: "bianca",
    name: "Bianca",
    subtitle: "Vin Alb Sec",
    type: "white",
    year: 2023,
    alcohol: "12.8% vol.",
    description: "Un cupaj alb excepțional, proaspăt și floral. Note vibrante și o energie minerală incredibilă, ideal pentru clipe revigorante.",
    tastingNotes: {
      aroma: ["flori albe", "citrice coapte", "mere verzi", "infuzie de iasomie"],
      body: "Medium",
      acidity: "High",
      finish: "Proaspăt, intens crocant, cu influențe sărate de calcar și citrice"
    },
    brix: 21.2,
    ph: 3.18,
    accentColor: "rgba(224, 185, 96, 1)", // gold green champagne
    bgColor: "from-slate-950 via-[#182a17] to-black",
    labelColor: "#1d331c",
    bestTerroir: "Valea Răcoroasă - Depresiune cu sol umed"
  },
  {
    id: "rose",
    name: "Rosé",
    subtitle: "Vin Roz Sec",
    type: "rose",
    year: 2022,
    alcohol: "13.0% vol.",
    description: "Delicat și crocant ca o dimineață răcoroasă de primăvară. Note captivante de fructe roșii proaspete și o limpezime de cristal.",
    tastingNotes: {
      aroma: ["frăguțe", "zmeură proaspătă", "coacăze roșii", "trandafir"],
      body: "Light",
      acidity: "High",
      finish: "Extrem de proaspăt, savuros și zemos cu o aciditate de zmeură crocantă"
    },
    brix: 21.8,
    ph: 3.25,
    accentColor: "rgba(235, 122, 143, 1)", // coral pink rose
    bgColor: "from-slate-950 via-[#421d28] to-black",
    labelColor: "#572130",
    bestTerroir: "Panta de Est - Expunere Matinală"
  }
];

export const HARVEST_HISTORY: HarvestRecord[] = [
  { year: 2018, yieldTonnes: 124, brixAvg: 23.2, acidityPhAvg: 3.42, qualityScore: 91, rainfallMm: 480, tempAvgC: 21.4, harvestDurationDays: 18 },
  { year: 2019, yieldTonnes: 138, brixAvg: 24.1, acidityPhAvg: 3.51, qualityScore: 94, rainfallMm: 410, tempAvgC: 22.8, harvestDurationDays: 16 },
  { year: 2020, yieldTonnes: 98, brixAvg: 24.8, acidityPhAvg: 3.58, qualityScore: 96, rainfallMm: 320, tempAvgC: 23.5, harvestDurationDays: 14 },
  { year: 2021, yieldTonnes: 145, brixAvg: 22.4, acidityPhAvg: 3.32, qualityScore: 89, rainfallMm: 580, tempAvgC: 20.1, harvestDurationDays: 22 },
  { year: 2022, yieldTonnes: 120, brixAvg: 23.9, acidityPhAvg: 3.48, qualityScore: 95, rainfallMm: 390, tempAvgC: 22.4, harvestDurationDays: 17 },
  { year: 2023, yieldTonnes: 132, brixAvg: 23.1, acidityPhAvg: 3.41, qualityScore: 93, rainfallMm: 450, tempAvgC: 21.8, harvestDurationDays: 19 },
  { year: 2024, yieldTonnes: 112, brixAvg: 24.5, acidityPhAvg: 3.55, qualityScore: 97, rainfallMm: 350, tempAvgC: 23.1, harvestDurationDays: 15 },
  { year: 2025, yieldTonnes: 128, brixAvg: 23.6, acidityPhAvg: 3.45, qualityScore: 94, rainfallMm: 420, tempAvgC: 22.0, harvestDurationDays: 18 }
];

export const ESTATE_MICROCLIMATES: MicroclimateVariable[] = [
  { estate: "Poiana Dealului Înalt", altitudeRange: "280-300m", soilType: "Calcaros Cernoziom", sunExposure: "Sudică (S)", baseTemp: 22.5, baseRainfall: 380, baseSoilMoisture: 42 },
  { estate: "Panta Codrilor", altitudeRange: "250-270m", soilType: "Argilă Calcaroasă", sunExposure: "Sud-Vestică (SW)", baseTemp: 22.0, baseRainfall: 400, baseSoilMoisture: 48 },
  { estate: "Platoul Umbrit", altitudeRange: "290-300m", soilType: "Lutos-nisipos", sunExposure: "Nordică (N)", baseTemp: 20.8, baseRainfall: 440, baseSoilMoisture: 55 },
  { estate: "Valea Răcoroasă", altitudeRange: "220-240m", soilType: "Soliuvial fertil", sunExposure: "Nord-Estică (NE)", baseTemp: 20.2, baseRainfall: 460, baseSoilMoisture: 60 }
];

export const STAGES_EXPLANATION = [
  { stage: "Budburst", timing: "Aprilie", brix: "—", ph: "—", desc: "Mugurii încep să se umfle și să deschidă frunzele verzi sub primele raze calde." },
  { stage: "Flowering", timing: "Iunie", brix: "—", ph: "—", desc: "Florile mici apar ca o spumă parfumată. Determinant pentru mărimea recoltei." },
  { stage: "Fruit Set", timing: "Iulie", brix: "1-2", ph: "2.1", desc: "Florile fecundate se transformă în mici bobițe verzi de struguri, extrem de acizi." },
  { stage: "Veraison", timing: "August", brix: "12-16", ph: "2.8", desc: "Strugurii își schimbă culoarea (din verde în roșu/auriu), se înmoaie și acumulează zahăr rapid." },
  { stage: "Harvest", timing: "Septembrie", brix: "22-25", ph: "3.4-3.6", desc: "Maturitatea optimă. Strugurii sunt culeși manual la răsărit pentru a conserva aromele." }
];
