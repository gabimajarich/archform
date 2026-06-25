export const ENVIRONMENT_STRATEGIES = {
  coastal: [
    "Cross ventilation to capture sea breezes",
    "Corrosion-resistant materials and fixings",
    "Deep overhangs for sun and salt-spray shading",
    "Elevated floor systems above flood/storm surge",
  ],
  urbanDense: [
    "Acoustic buffering from street noise",
    "Vertical landscaping / green façades",
    "Internal courtyards for light and air",
    "Light wells to bring daylight deep into plan",
  ],
  suburban: [
    "Generous setbacks and landscape buffers",
    "North-facing living spaces for passive solar (S. hemisphere)",
    "Permeable paving and on-site stormwater retention",
    "Street-facing passive surveillance",
  ],
  bushland: [
    "Bushfire-resistant detailing and BAL-rated materials",
    "Passive cooling and cross ventilation",
    "Rainwater collection and storage",
    "Sensitive landscape integration and defensible space",
  ],
  arid: [
    "High thermal mass to buffer day–night swings",
    "Small, shaded openings to limit heat gain",
    "Courtyards and evaporative cooling",
    "Light-coloured, reflective roof surfaces",
  ],
  tropical: [
    "Maximised cross ventilation and raised floors",
    "Deep verandahs and large overhangs",
    "Lightweight, breathable construction",
    "Moisture- and mould-resistant materials",
  ],
  temperate: [
    "Balanced passive solar with good glazing ratios",
    "Insulation and thermal mass for year-round comfort",
    "Operable windows for shoulder-season ventilation",
    "External shading tuned to seasonal sun angles",
  ],
  mountainous: [
    "Compact form to minimise heat loss",
    "Steep roofs for snow shedding",
    "High insulation and airtight envelope",
    "South-facing glazing for solar gain (N. hemisphere) / orient to slope & sun",
  ],
  waterfront: [
    "Elevated or pile foundations above flood level",
    "Moisture- and corrosion-resistant materials",
    "Framed views and decks engaging the water edge",
    "Resilient landscape and shoreline protection",
  ],
  rural: [
    "Off-grid-ready services (rainwater, solar, septic)",
    "Local and site-won materials",
    "Orientation for prevailing wind and long views",
    "Robust, low-maintenance detailing",
  ],
};

export const SITES = [
  { id: "coastal",     label: "Coastal" },
  { id: "urbanDense",  label: "Urban Dense" },
  { id: "suburban",    label: "Suburban" },
  { id: "bushland",    label: "Bushland" },
  { id: "arid",        label: "Arid" },
  { id: "tropical",    label: "Tropical" },
  { id: "temperate",   label: "Temperate" },
  { id: "mountainous", label: "Mountainous" },
  { id: "waterfront",  label: "Waterfront" },
  { id: "rural",       label: "Rural" },
];

export const SITE_LABELS = Object.fromEntries(SITES.map((s) => [s.id, s.label]));

export function deriveEnvironmental(site) {
  return ENVIRONMENT_STRATEGIES[site] ?? [];
}
