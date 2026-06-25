import { EMOTIONS } from "../data/emotions.js";
import { EMOTION_STRATEGIES, EMOTION_PAIR_STRATEGIES } from "../data/emotionMappings.js";
import { deriveMaterials } from "../data/materialMappings.js";
import { deriveEnvironmental, SITE_LABELS } from "../data/environmentMappings.js";
import { PRECEDENTS, PRECEDENT_PRIORITY_TAGS } from "../data/precedentMappings.js";
import { PRIORITY_LABELS } from "../data/priorities.js";
import { BUILDING_LABELS } from "../data/buildingTypes.js";
import { deriveDNA } from "../data/designDnaLogic.js";
import { detectContradictions } from "../data/contradictionLogic.js";
import { deriveProgram } from "../data/programData.js";

const EMOTION_LABELS = Object.fromEntries(EMOTIONS.map((e) => [e.id, e.label]));

// Deterministic PRNG (mulberry32) so the seeded shuffle is reproducible.
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleInPlace(arr, rng) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// --- Spatial strategies (with explainability) --------------------------------
// Each strategy carries `because` — the emotion(s) that produced it. Pair-bonus
// strategies (both emotions selected) lead, then per-emotion base strategies.
export function deriveSpatial(emotions = []) {
  const items = [];
  const seen = new Set();
  const push = (text, because) => {
    if (seen.has(text)) return;
    seen.add(text);
    items.push({ text, because });
  };

  const sorted = [...emotions].sort();
  for (let i = 0; i < sorted.length; i++) {
    for (let j = i + 1; j < sorted.length; j++) {
      const key = `${sorted[i]}+${sorted[j]}`;
      if (EMOTION_PAIR_STRATEGIES[key]) {
        const because = [EMOTION_LABELS[sorted[i]], EMOTION_LABELS[sorted[j]]];
        EMOTION_PAIR_STRATEGIES[key].forEach((s) => push(s, because));
      }
    }
  }
  for (const id of emotions) {
    if (EMOTION_STRATEGIES[id]) {
      EMOTION_STRATEGIES[id].forEach((s) => push(s, [EMOTION_LABELS[id]]));
    }
  }
  return items;
}

// --- Precedents (with explainability) ----------------------------------------
export function derivePrecedents(inputs, seed = 0) {
  const { emotions = [], priorities: p = {}, buildingType, site } = inputs;
  const high = (v) => v >= 70;
  const highPriorityTags = PRECEDENT_PRIORITY_TAGS.filter((k) => high(p[k]));

  const scored = PRECEDENTS.map((prec) => {
    let score = 0;
    const because = [];
    for (const tag of prec.tags) {
      if (emotions.includes(tag)) { score += 3; because.push(EMOTION_LABELS[tag]); }
      if (buildingType && tag === buildingType) { score += 2; because.push(BUILDING_LABELS[tag] ?? "Building type"); }
      if (highPriorityTags.includes(tag)) { score += 2; because.push("High " + PRIORITY_LABELS[tag]); }
      if (site && tag === site) { score += 1; because.push(SITE_LABELS[site]); }
    }
    return { ...prec, score, because: [...new Set(because)] };
  });

  const rng = mulberry32(seed + 1);
  const bands = new Map();
  for (const item of scored) {
    if (!bands.has(item.score)) bands.set(item.score, []);
    bands.get(item.score).push(item);
  }
  const scores = [...bands.keys()].sort((a, b) => b - a);
  const ordered = [];
  for (const s of scores) ordered.push(...shuffleInPlace(bands.get(s), rng));

  const top = ordered.filter((x) => x.score > 0);
  const base = top.length >= 4 ? top : ordered;
  return base.slice(0, 6);
}

// --- Top-level engine --------------------------------------------------------
export function generate(inputs, seed = 0) {
  const materials = deriveMaterials(inputs.priorities, inputs.site);
  return {
    dna:           deriveDNA(inputs),
    spatial:       deriveSpatial(inputs.emotions),
    materials,
    environmental: deriveEnvironmental(inputs.site),
    environmentBecause: inputs.site ? SITE_LABELS[inputs.site] : null,
    precedents:    derivePrecedents(inputs, seed),
    warnings:      detectContradictions(inputs, materials),
    program:       deriveProgram(inputs.buildingType, inputs.priorities, inputs.emotions),
  };
}
