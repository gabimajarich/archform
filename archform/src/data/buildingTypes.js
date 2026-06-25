// Building types — single source of truth for the project screen, the engine,
// and the program/adjacency diagram.
export const BUILDING_TYPES = [
  { id: "school",      label: "School" },
  { id: "housing",     label: "Housing" },
  { id: "museum",      label: "Museum" },
  { id: "library",     label: "Library" },
  { id: "community",   label: "Community Centre" },
  { id: "hospitality", label: "Hospitality" },
  { id: "commercial",  label: "Commercial" },
  { id: "public",      label: "Public Space" },
  { id: "workplace",   label: "Workplace" },
  { id: "other",       label: "Other" },
];

export const BUILDING_LABELS = Object.fromEntries(BUILDING_TYPES.map((b) => [b.id, b.label]));

// Resolve a display label, honouring the free-text "Other" value.
export function buildingLabel(id, otherText) {
  if (id === "other") return otherText?.trim() || "Other";
  return BUILDING_LABELS[id] ?? "Project";
}
