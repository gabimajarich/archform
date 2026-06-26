import { SITE_LABELS } from "./environmentMappings.js";

// Each material carries scores plus a `family` and `combustible` flag used for
// climate filtering and the timber-vs-bushfire cross-reference.
// Scores 0–100: sustainability = environmental impact; durability = lifespan/robustness;
// cost = affordability (higher = more affordable).
export const MATERIALS = {
  // --- Timber & engineered wood ---
  clt:              { name: "Cross-Laminated Timber",       sustainability: 90, durability: 75, cost: 45, family: "timber",   combustible: true },
  glulam:           { name: "Glulam Timber",                sustainability: 82, durability: 78, cost: 55, family: "timber",   combustible: true },
  lvl:              { name: "Laminated Veneer Lumber (LVL)",sustainability: 82, durability: 82, cost: 55, family: "timber",   combustible: true },
  reclaimedTimber:  { name: "Reclaimed Timber",             sustainability: 95, durability: 70, cost: 52, family: "timber",   combustible: true },
  timberWeatherboard:{ name: "Timber Weatherboard",         sustainability: 75, durability: 65, cost: 72, family: "timber",   combustible: true },
  bamboo:           { name: "Bamboo",                       sustainability: 92, durability: 65, cost: 70, family: "timber",   combustible: true },

  // --- Earth & natural ---
  rammedEarth:      { name: "Rammed Earth",                 sustainability: 88, durability: 80, cost: 55, family: "earth",    combustible: false },
  rEarthBlock:      { name: "Compressed Earth Block (CEB)", sustainability: 86, durability: 78, cost: 62, family: "earth",    combustible: false },
  mudBrick:         { name: "Adobe / Mud Brick",            sustainability: 92, durability: 65, cost: 80, family: "earth",    combustible: false },
  strawBale:        { name: "Straw Bale",                   sustainability: 93, durability: 55, cost: 78, family: "natural",  combustible: true },
  hempcrete:        { name: "Hempcrete",                    sustainability: 90, durability: 62, cost: 50, family: "earth",    combustible: false },
  cork:             { name: "Cork",                         sustainability: 85, durability: 60, cost: 55, family: "biogenic", combustible: true },
  limePlaster:      { name: "Lime Render & Plaster",        sustainability: 78, durability: 72, cost: 72, family: "masonry",  combustible: false },

  // --- Masonry & stone ---
  stone:            { name: "Natural Stone",                sustainability: 70, durability: 95, cost: 35, family: "stone",    combustible: false },
  recycledBrick:    { name: "Recycled Brick",               sustainability: 80, durability: 90, cost: 60, family: "masonry",  combustible: false },
  standardBrick:    { name: "Standard Brick",               sustainability: 55, durability: 90, cost: 75, family: "masonry",  combustible: false },
  terracotta:       { name: "Terracotta Tiles & Baguettes", sustainability: 72, durability: 90, cost: 60, family: "masonry",  combustible: false },

  // --- Concrete & composites ---
  polishedConc:     { name: "Polished Concrete",            sustainability: 45, durability: 93, cost: 70, family: "concrete", combustible: false },
  recycledConc:     { name: "Recycled Aggregate Concrete",  sustainability: 62, durability: 92, cost: 70, family: "concrete", combustible: false },
  precastConc:      { name: "Precast Concrete Panels",      sustainability: 52, durability: 93, cost: 65, family: "concrete", combustible: false },
  aac:              { name: "Autoclaved Aerated Concrete",  sustainability: 62, durability: 80, cost: 75, family: "concrete", combustible: false },
  gfrc:             { name: "Glass Fibre Reinforced Concrete (GFRC)", sustainability: 54, durability: 88, cost: 60, family: "concrete", combustible: false },

  // --- Metal ---
  steel:            { name: "Steel Framing",                sustainability: 50, durability: 95, cost: 65, family: "metal",    combustible: false },
  corten:           { name: "Weathering Steel (Corten)",    sustainability: 62, durability: 93, cost: 52, family: "metal",    combustible: false },

  // --- Panels & cladding ---
  prefabPanel:      { name: "Prefabricated Panels",         sustainability: 58, durability: 80, cost: 80, family: "panel",    combustible: false },
  fibreCement:      { name: "Fibre Cement Cladding",        sustainability: 55, durability: 88, cost: 78, family: "panel",    combustible: false },
  polycarbonate:    { name: "Polycarbonate Glazing",        sustainability: 42, durability: 65, cost: 75, family: "panel",    combustible: false },

  // --- Insulation & living systems ---
  woolInsulation:   { name: "Wool Insulation Batts",        sustainability: 88, durability: 68, cost: 62, family: "natural",  combustible: true },
  cellulose:        { name: "Recycled Cellulose Insulation",sustainability: 88, durability: 62, cost: 78, family: "natural",  combustible: true },
  greenRoof:        { name: "Green Roof Growing Medium",    sustainability: 90, durability: 78, cost: 50, family: "biogenic", combustible: false },

  // --- Advanced concrete & formwork ---
  geopolymerConc:   { name: "Geopolymer Concrete",          sustainability: 75, durability: 90, cost: 55, family: "concrete", combustible: false },
  icf:              { name: "Insulating Concrete Formwork", sustainability: 58, durability: 90, cost: 65, family: "concrete", combustible: false },

  // --- Structural panels ---
  sips:             { name: "Structural Insulated Panels (SIPs)", sustainability: 62, durability: 78, cost: 68, family: "panel", combustible: true },
  brickVeneer:      { name: "Brick Veneer (timber-framed)", sustainability: 60, durability: 85, cost: 72, family: "masonry",  combustible: false },
  recycledPlastic:  { name: "Recycled Plastic Lumber",      sustainability: 72, durability: 85, cost: 70, family: "panel",    combustible: false },

  // --- Premium metal cladding ---
  zinc:             { name: "Zinc Cladding",                sustainability: 58, durability: 95, cost: 42, family: "metal",    combustible: false },
  copper:           { name: "Copper Cladding & Roofing",    sustainability: 55, durability: 98, cost: 30, family: "metal",    combustible: false },

  // --- Additional stone ---
  sandstone:        { name: "Sandstone",                    sustainability: 72, durability: 88, cost: 48, family: "stone",    combustible: false },
  slate:            { name: "Slate Cladding & Roofing",     sustainability: 68, durability: 98, cost: 38, family: "stone",    combustible: false },

  // --- Emerging bio-materials ---
  mycelium:         { name: "Mycelium Composite",           sustainability: 96, durability: 45, cost: 40, family: "biogenic", combustible: true },
};

// Per-climate suitability. `favour` floats appropriate materials up; `avoid`
// filters unsuitable ones out (when enough alternatives remain). `note` explains.
export const MATERIAL_CLIMATE = {
  coastal: {
    favour: ["stone", "recycledConc", "polishedConc", "recycledBrick", "precastConc", "gfrc", "terracotta", "recycledPlastic", "copper", "sandstone"],
    avoid:  ["steel", "bamboo", "corten", "reclaimedTimber", "timberWeatherboard", "zinc"],
    note:   "salt-spray & corrosion resistance",
  },
  urbanDense: {
    favour: ["recycledConc", "recycledBrick", "steel", "prefabPanel", "precastConc", "gfrc", "aac", "greenRoof", "geopolymerConc", "brickVeneer"],
    avoid:  [],
    note:   "acoustic mass, fire separation & urban greening",
  },
  suburban: {
    favour: ["standardBrick", "clt", "glulam", "recycledBrick", "fibreCement", "aac", "timberWeatherboard", "woolInsulation", "brickVeneer", "sips"],
    avoid:  [],
    note:   "domestic scale & buildability",
  },
  bushland: {
    favour: ["rammedEarth", "recycledConc", "stone", "standardBrick", "mudBrick", "aac", "gfrc", "precastConc", "terracotta", "geopolymerConc", "icf", "sandstone"],
    avoid:  ["clt", "glulam", "bamboo", "cork", "strawBale", "woolInsulation", "cellulose", "reclaimedTimber", "lvl", "timberWeatherboard", "sips", "mycelium"],
    note:   "non-combustible, bushfire-rated materials",
  },
  arid: {
    favour: ["rammedEarth", "rEarthBlock", "standardBrick", "stone", "mudBrick", "aac", "terracotta", "polishedConc", "icf", "sandstone"],
    avoid:  ["bamboo", "cork", "strawBale", "timberWeatherboard", "mycelium"],
    note:   "high thermal mass for day–night temperature swings",
  },
  tropical: {
    favour: ["bamboo", "glulam", "clt", "prefabPanel", "lvl", "reclaimedTimber", "polycarbonate", "greenRoof", "fibreCement", "recycledPlastic"],
    avoid:  ["rammedEarth", "mudBrick", "strawBale", "rEarthBlock", "icf", "mycelium"],
    note:   "lightweight, breathable & moisture-tolerant",
  },
  temperate: {
    favour: ["clt", "recycledBrick", "glulam", "hempcrete", "woolInsulation", "cellulose", "strawBale", "aac", "lvl", "sips", "zinc", "slate"],
    avoid:  [],
    note:   "year-round comfort, insulation & passive solar",
  },
  mountainous: {
    favour: ["glulam", "clt", "stone", "recycledConc", "lvl", "aac", "woolInsulation", "cellulose", "precastConc", "icf", "sips", "zinc", "copper", "slate"],
    avoid:  ["bamboo", "mudBrick", "polycarbonate", "mycelium"],
    note:   "snow loading, high insulation & airtight envelope",
  },
  waterfront: {
    favour: ["stone", "recycledConc", "polishedConc", "precastConc", "gfrc", "terracotta", "geopolymerConc", "recycledPlastic", "copper", "sandstone"],
    avoid:  ["steel", "bamboo", "clt", "mudBrick", "strawBale", "reclaimedTimber", "timberWeatherboard", "zinc"],
    note:   "moisture, flood & corrosion resistance",
  },
  rural: {
    favour: ["rammedEarth", "recycledBrick", "glulam", "stone", "mudBrick", "strawBale", "reclaimedTimber", "lvl", "limePlaster", "sandstone", "slate"],
    avoid:  [],
    note:   "local, site-won, low-maintenance materials",
  },
};

// Returns an array of material objects (4–6), highest relevance first. Each item
// carries `because` (the inputs that drove it) for explainability, and the
// climate `note` when it was favoured by the site.
export function deriveMaterials(p, site) {
  const high = (v) => v >= 70;
  const climate = MATERIAL_CLIMATE[site];
  const reasons = {}; // key -> Set of driver labels
  const addReason = (k, label) => { (reasons[k] ||= new Set()).add(label); };
  const picks = new Set();

  if (high(p.sustainability) || high(p.naturalMaterials)) {
    ["clt", "rammedEarth", "recycledBrick", "stone", "bamboo", "reclaimedTimber", "strawBale", "mudBrick", "woolInsulation", "hempcrete", "cork", "greenRoof"].forEach((k) => {
      picks.add(k); addReason(k, high(p.naturalMaterials) ? "Natural materials" : "High sustainability");
    });
  }
  if (high(p.lowCarbon)) {
    ["clt", "hempcrete", "rEarthBlock", "cork", "glulam", "strawBale", "reclaimedTimber", "lvl", "mudBrick", "woolInsulation", "greenRoof", "geopolymerConc", "mycelium"].forEach((k) => {
      picks.add(k); addReason(k, "Low carbon");
    });
  }
  if (high(p.budget)) {
    ["standardBrick", "recycledConc", "steel", "prefabPanel", "aac", "fibreCement", "timberWeatherboard", "brickVeneer", "sips"].forEach((k) => {
      picks.add(k); addReason(k, "Budget");
    });
  }
  if (high(p.durability)) {
    ["stone", "recycledBrick", "steel", "polishedConc", "precastConc", "terracotta", "corten", "gfrc", "copper", "slate", "sandstone", "geopolymerConc"].forEach((k) => {
      picks.add(k); addReason(k, "High durability");
    });
  }
  if (picks.size === 0) {
    ["glulam", "recycledBrick", "rammedEarth", "standardBrick", "aac"].forEach((k) => {
      picks.add(k); addReason(k, "Balanced default");
    });
  }

  // Climate: add favoured options so the palette is always site-appropriate.
  if (climate) {
    climate.favour.forEach((k) => { picks.add(k); addReason(k, `Suited to ${SITE_LABELS[site]}`); });
  }

  // Climate: filter out clearly unsuitable materials, keeping at least 4.
  let keys = [...picks];
  if (climate?.avoid.length) {
    const filtered = keys.filter((k) => !climate.avoid.includes(k));
    if (filtered.length >= 4) keys = filtered;
  }

  // Relevance weight: priority fit + a climate boost for favoured materials.
  const w = (m, key) => {
    let s = 0;
    if (high(p.sustainability) || high(p.naturalMaterials)) s += m.sustainability;
    if (high(p.durability)) s += m.durability;
    if (high(p.budget))     s += m.cost;
    if (high(p.lowCarbon))  s += m.sustainability;
    if (climate?.favour.includes(key)) s += 35;
    return s;
  };

  const list = keys
    .map((k) => ({
      key: k,
      ...MATERIALS[k],
      because: [...(reasons[k] || [])],
      climateNote: climate?.favour.includes(k) ? climate.note : null,
    }))
    .sort((a, b) => w(b, b.key) - w(a, a.key))
    .slice(0, 6);

  return list;
}
