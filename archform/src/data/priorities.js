// Single source of truth for the 11 priorities — used by the slider screen and
// the engine (for weighted scoring + explainability labels).
export const PRIORITIES = [
  { key: "sustainability",       label: "Sustainability" },
  { key: "budget",               label: "Budget" },
  { key: "efficiency",           label: "Efficiency" },
  { key: "passiveDesign",        label: "Passive Design" },
  { key: "communityInteraction", label: "Community Interaction" },
  { key: "naturalMaterials",     label: "Natural Materials" },
  { key: "playfulness",          label: "Playfulness" },
  { key: "flexibility",          label: "Flexibility" },
  { key: "lowCarbon",            label: "Low Carbon Construction" },
  { key: "accessibility",        label: "Accessibility" },
  { key: "durability",           label: "Durability" },
];

export const PRIORITY_LABELS = Object.fromEntries(PRIORITIES.map((p) => [p.key, p.label]));

// Short labels for the radar chart axes (kept compact so they fit).
export const PRIORITY_SHORT = {
  sustainability: "Sustain.",
  budget: "Budget",
  efficiency: "Effic.",
  passiveDesign: "Passive",
  communityInteraction: "Community",
  naturalMaterials: "Natural",
  playfulness: "Play",
  flexibility: "Flexible",
  lowCarbon: "Low-C",
  accessibility: "Access",
  durability: "Durable",
};
