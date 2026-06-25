import { EMOTIONS } from "./emotions.js";
import { PRIORITY_LABELS } from "./priorities.js";

const EMOTION_LABELS = Object.fromEntries(EMOTIONS.map((e) => [e.id, e.label]));

export const DNA_TITLES = {
  ecological:    { title: "Ecological Minimalist",                subtitle: "Low-impact, restrained, materially honest." },
  community:     { title: "Community-Driven Designer",           subtitle: "Space organised around encounter and belonging." },
  landscape:     { title: "Landscape-Integrated Design Approach", subtitle: "Building and site read as one continuous ground." },
  play:          { title: "Play-Centred Spatial Design",         subtitle: "Movement, discovery and freedom drive the plan." },
  biophilic:     { title: "Biophilic Learning Environment",      subtitle: "Nature, light and calm shaping how people learn." },
  material:      { title: "Material-Conscious Design Approach",   subtitle: "Tactile, durable, expressively built." },
  contemplative: { title: "Contemplative Spatial Design",        subtitle: "Light, silence and sequence as the primary material." },
  balanced:      { title: "Integrated Contextual Designer",      subtitle: "A measured response balancing people, place and program." },
};

const LEARNING_TYPES = ["school", "library"];

// Each signal accumulates a continuous, weighted score from the emotions present
// (1.0 each) and the relevant priorities (value/100 × weight). This replaces the
// old binary >=70 thresholds, so a slider at 64 still contributes proportionally.
const SIGNALS = {
  ecological: {
    emotions: ["connection", "groundedness"],
    priorities: [["sustainability", 2], ["lowCarbon", 2], ["naturalMaterials", 1.5]],
  },
  community: {
    emotions: ["community", "belonging", "connection"],
    priorities: [["communityInteraction", 2.5]],
  },
  landscape: {
    emotions: ["connection", "groundedness", "calm", "reflection"],
    priorities: [["passiveDesign", 2]],
  },
  play: {
    emotions: ["play", "freedom", "curiosity", "creativity"],
    priorities: [["playfulness", 2.5], ["flexibility", 1]],
  },
  biophilic: {
    emotions: ["connection", "calm", "curiosity"],
    priorities: [["passiveDesign", 1], ["naturalMaterials", 1]],
    learningBonus: 2,
  },
  material: {
    emotions: ["groundedness", "creativity"],
    priorities: [["naturalMaterials", 2], ["durability", 2], ["sustainability", 1]],
  },
  contemplative: {
    emotions: ["calm", "reflection", "ceremony", "wonder"],
    priorities: [],
  },
};

const BALANCED_THRESHOLD = 1.6; // below this, no signal is decisive → balanced
const MATCH_K = 3.5;            // half-saturation constant for the confidence curve

// Absolute confidence: grows with the weight of evidence, never trivially 100%.
const matchPct = (score) => Math.round((100 * Math.max(score, 0)) / (Math.max(score, 0) + MATCH_K));

function scoreSignal(key, cfg, emotions, p, buildingType) {
  let score = 0;
  const drivers = [];
  for (const id of cfg.emotions) {
    if (emotions.includes(id)) {
      score += 1;
      drivers.push({ label: EMOTION_LABELS[id], weight: 1 });
    }
  }
  for (const [pk, w] of cfg.priorities) {
    const v = p[pk] ?? 50;
    // Centre on the neutral 50 baseline: 50 → 0, 100 → +w, 0 → −w. A slider left
    // at the default shouldn't push any identity.
    score += ((v - 50) / 50) * w;
    if (v >= 60) drivers.push({ label: (v >= 70 ? "High " : "") + PRIORITY_LABELS[pk], weight: ((v - 50) / 50) * w });
  }
  if (cfg.learningBonus && LEARNING_TYPES.includes(buildingType)) {
    score += cfg.learningBonus;
    drivers.push({ label: "Learning program", weight: cfg.learningBonus });
  }
  // strongest drivers first, keep it readable
  drivers.sort((a, b) => b.weight - a.weight);
  return { key, score, drivers: drivers.map((d) => d.label) };
}

// Returns:
//   { title, subtitle, match, primaryKey, drivers, secondary:[{title, match, key}], all:[...] }
export function deriveDNA(inputs) {
  const { emotions = [], priorities: p = {}, buildingType } = inputs;

  const scored = Object.entries(SIGNALS)
    .map(([key, cfg]) => scoreSignal(key, cfg, emotions, p, buildingType))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  scored.forEach((s) => { s.match = matchPct(s.score); });

  const top = scored[0];
  const decisive = top && top.score >= BALANCED_THRESHOLD;

  const all = scored.map((s) => ({
    key: s.key, title: DNA_TITLES[s.key].title, match: s.match, drivers: s.drivers,
  }));

  if (!decisive) {
    // No single identity dominates — present as balanced. The less any one signal
    // leads, the stronger the "integrated" read; weak leanings still surface.
    return {
      ...DNA_TITLES.balanced,
      primaryKey: "balanced",
      match: top ? Math.max(100 - top.match, 50) : 100,
      drivers: ["Balanced priorities", "Mixed intentions"],
      secondary: all.filter((s) => s.match >= 12).slice(0, 2),
      all,
    };
  }

  const secondary = all
    .slice(1)
    .filter((s) => s.match >= 12)
    .slice(0, 2);

  return {
    ...DNA_TITLES[top.key],
    primaryKey: top.key,
    match: top.match,
    drivers: top.drivers,
    secondary,
    all,
  };
}
