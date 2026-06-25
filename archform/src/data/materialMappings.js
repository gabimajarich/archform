import { SITE_LABELS } from "./environmentMappings.js";

// Each material carries scores plus a `family` and `combustible` flag used for
// climate filtering and the timber-vs-bushfire cross-reference.
export const MATERIALS = {
  clt:            { name: "Cross-Laminated Timber", sustainability: 90, durability: 75, cost: 45, family: "timber",   combustible: true },
  rammedEarth:    { name: "Rammed Earth",           sustainability: 88, durability: 80, cost: 55, family: "earth",    combustible: false },
  recycledBrick:  { name: "Recycled Brick",         sustainability: 80, durability: 90, cost: 60, family: "masonry",  combustible: false },
  stone:          { name: "Natural Stone",          sustainability: 70, durability: 95, cost: 35, family: "stone",    combustible: false },
  bamboo:         { name: "Bamboo",                 sustainability: 92, durability: 65, cost: 70, family: "timber",   combustible: true },
  hempcrete:      { name: "Hempcrete",              sustainability: 90, durability: 60, cost: 50, family: "earth",    combustible: false },
  cork:           { name: "Cork",                   sustainability: 85, durability: 60, cost: 55, family: "biogenic", combustible: true },
  standardBrick:  { name: "Standard Brick",         sustainability: 55, durability: 90, cost: 75, family: "masonry",  combustible: false },
  recycledConc:   { name: "Recycled Concrete",      sustainability: 60, durability: 92, cost: 70, family: "concrete", combustible: false },
  steel:          { name: "Steel Framing",          sustainability: 50, durability: 95, cost: 65, family: "metal",    combustible: false },
  prefabPanel:    { name: "Prefabricated Panels",   sustainability: 58, durability: 80, cost: 80, family: "panel",    combustible: false },
  glulam:         { name: "Glulam Timber",          sustainability: 82, durability: 78, cost: 55, family: "timber",   combustible: true },
  rEarthBlock:    { name: "Compressed Earth Block",  sustainability: 86, durability: 78, cost: 62, family: "earth",    combustible: false },
  polishedConc:   { name: "Polished Concrete",      sustainability: 45, durability: 93, cost: 70, family: "concrete", combustible: false },
};

// Per-climate suitability. `favour` floats appropriate materials up; `avoid`
// filters unsuitable ones out (when enough alternatives remain). `note` explains.
export const MATERIAL_CLIMATE = {
  coastal:    { favour: ["stone", "recycledConc", "polishedConc", "recycledBrick"], avoid: ["steel", "bamboo"],        note: "salt-spray & corrosion resistance" },
  urbanDense: { favour: ["recycledConc", "recycledBrick", "steel", "prefabPanel"],  avoid: [],                          note: "acoustic mass & fire separation" },
  suburban:   { favour: ["standardBrick", "clt", "glulam", "recycledBrick"],         avoid: [],                          note: "domestic scale & buildability" },
  bushland:   { favour: ["rammedEarth", "recycledConc", "stone", "standardBrick"],   avoid: ["clt", "glulam", "bamboo", "cork"], note: "non-combustible, bushfire-rated" },
  arid:       { favour: ["rammedEarth", "rEarthBlock", "standardBrick", "stone"],    avoid: ["bamboo", "cork"],          note: "high thermal mass for day–night swings" },
  tropical:   { favour: ["bamboo", "glulam", "clt", "prefabPanel"],                  avoid: ["rammedEarth"],             note: "lightweight, breathable, moisture-tolerant" },
  temperate:  { favour: ["clt", "recycledBrick", "glulam", "hempcrete"],             avoid: [],                          note: "year-round comfort & insulation" },
  mountainous:{ favour: ["glulam", "clt", "stone", "recycledConc"],                  avoid: ["bamboo"],                  note: "snow loading & high insulation" },
  waterfront: { favour: ["stone", "recycledConc", "polishedConc"],                   avoid: ["steel", "bamboo", "clt"],  note: "moisture & corrosion resistance" },
  rural:      { favour: ["rammedEarth", "recycledBrick", "glulam", "stone"],         avoid: [],                          note: "local, site-won, low-maintenance" },
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
    ["clt", "rammedEarth", "recycledBrick", "stone", "bamboo"].forEach((k) => {
      picks.add(k); addReason(k, high(p.naturalMaterials) ? "Natural materials" : "High sustainability");
    });
  }
  if (high(p.lowCarbon)) {
    ["clt", "hempcrete", "rEarthBlock", "cork", "glulam"].forEach((k) => { picks.add(k); addReason(k, "Low carbon"); });
  }
  if (high(p.budget)) {
    ["standardBrick", "recycledConc", "steel", "prefabPanel"].forEach((k) => { picks.add(k); addReason(k, "Budget"); });
  }
  if (high(p.durability)) {
    ["stone", "recycledBrick", "steel", "polishedConc"].forEach((k) => { picks.add(k); addReason(k, "High durability"); });
  }
  if (picks.size === 0) {
    ["glulam", "recycledBrick", "rammedEarth", "standardBrick"].forEach((k) => { picks.add(k); addReason(k, "Balanced default"); });
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
