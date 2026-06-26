import { EMOTIONS } from "../data/emotions.js";
import { deriveMaterials } from "../data/materialMappings.js";
import { deriveEnvironmental, SITE_LABELS } from "../data/environmentMappings.js";
import { PRECEDENTS, PRECEDENT_PRIORITY_TAGS } from "../data/precedentMappings.js";
import { PRIORITY_LABELS } from "../data/priorities.js";
import { BUILDING_LABELS } from "../data/buildingTypes.js";
import { deriveDNA } from "../data/designDnaLogic.js";
import { detectContradictions } from "../data/contradictionLogic.js";
import { deriveProgram } from "../data/programData.js";
import { STRATEGIES, priorityStrength } from "../data/strategies.js";

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

// --- Spatial strategies: score 104 strategies against user inputs -------------
// Scoring per STRATEGY_SELECTION.md:
//   +3  per selected emotion in triggers.emotions
//   +0..2 (graded) per priority band condition satisfied
//   +2  if buildingType in triggers.buildingTypes
//   +1  if site in triggers.sites
export function deriveSpatial(emotions = [], priorities = {}, buildingType = null, site = null) {
  const scored = STRATEGIES.map((s) => {
    let score = 0;
    const because = [];

    for (const eid of emotions) {
      if (s.triggers.emotions.includes(eid)) {
        score += 3;
        because.push(EMOTION_LABELS[eid] ?? eid);
      }
    }

    if (s.triggers.priorities) {
      for (const [key, band] of Object.entries(s.triggers.priorities)) {
        const v = priorities[key] ?? 50;
        const strength = priorityStrength(v, band);
        if (strength > 0) {
          score += 2 * strength;
          because.push(`${band.charAt(0).toUpperCase() + band.slice(1)} ${PRIORITY_LABELS[key] ?? key}`);
        }
      }
    }

    if (buildingType && s.triggers.buildingTypes?.includes(buildingType)) {
      score += 2;
      because.push(BUILDING_LABELS[buildingType] ?? buildingType);
    }

    if (site && s.triggers.sites?.includes(site)) {
      score += 1;
      because.push(SITE_LABELS[site] ?? site);
    }

    return { ...s, score, because: [...new Set(because)] };
  });

  const threshold = 3;
  let kept = scored.filter((s) => s.score >= threshold).sort((a, b) => b.score - a.score);

  if (kept.length < 4) {
    const extra = scored
      .filter((s) => s.score < threshold)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4 - kept.length);
    kept = [...kept, ...extra];
  }

  return kept.slice(0, 12);
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
    spatial:       deriveSpatial(inputs.emotions, inputs.priorities, inputs.buildingType, inputs.site),
    materials,
    environmental: deriveEnvironmental(inputs.site),
    environmentBecause: inputs.site ? SITE_LABELS[inputs.site] : null,
    precedents:    derivePrecedents(inputs, seed),
    warnings:      detectContradictions(inputs, materials),
    program:       deriveProgram(inputs.buildingType, inputs.priorities, inputs.emotions),
  };
}
