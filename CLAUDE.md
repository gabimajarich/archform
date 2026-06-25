# ARCHFORM — Build Guide for Claude Code

> This file is the single source of truth for building ARCHFORM. Read it top to
> bottom before writing code. Build in the milestone order at the end. Do not add
> backends, databases, auth, or external AI/API calls — everything is local logic.

---

## 1. What we're building

ARCHFORM is an **interactive architectural design assistant**. It helps architects
and architecture students translate abstract conceptual intentions — feelings,
experiences, values — into concrete spatial design decisions.

The user moves through three short input screens (emotions → priorities → project
& site), then ARCHFORM runs a **local rule engine** over those inputs and renders a
multi-section design response: a design identity ("DNA"), spatial strategies,
material recommendations, environmental strategies, architectural precedents, and a
contradiction detector that flags tensions between stated intentions and priorities.

**This is not a chatbot.** There is no conversation, no prompt box, no streaming
text. It is a deterministic, logic-driven design workflow tool. Given the same
inputs it returns the same results (except the optional "Regenerate" shuffle).

**User experience goal:** "I have abstract design ideas, and this tool shows me
what those ideas physically mean in architecture." It should feel premium,
editorial, calm, and genuinely useful — like software an architecture studio would
actually pay for.

---

## 2. Tech stack & hard constraints

| Concern | Decision |
|---|---|
| Build tool | **Vite** (`react` template, JavaScript — not TypeScript unless trivial) |
| Framework | **React 18** (function components + hooks only) |
| Styling | **Tailwind CSS** (utility-first; extend theme with the tokens in §5) |
| Motion | **CSS transitions/animations only** — no Framer Motion, no animation libs |
| Icons | Inline SVG line icons, 1.5px stroke, `currentColor`. No icon font, no emoji in UI |
| State | React state only (`useState` / `useReducer` / one Context). No Redux, no Zustand |
| Data | Local JS modules in `/src/data` (see §8). No JSON fetch, no backend |
| Routing | No router needed — a single `step` state variable drives the 4 views |
| Hosting | **Vercel** (static SPA). `vite build` → `dist/`. Zero server functions |
| Persistence | None required. Optional: keep state in memory only |

**Forbidden:** API calls, fetch to external services, AI/LLM calls, databases,
login/auth, localStorage as a requirement, heavy UI kits (MUI, Chakra, Ant),
bright/saturated colors, generic dashboard chrome.

---

## 3. Commands

```bash
npm create vite@latest archform -- --template react
cd archform
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm run dev          # local dev
npm run build        # production build -> dist/
npm run preview      # preview the production build
```

**Vercel deploy:** framework preset = Vite, build command `npm run build`, output
dir `dist`. No env vars. Pushing to the connected Git repo auto-deploys; or
`vercel --prod` from the CLI.

---

## 4. Project structure

```
archform/
├─ index.html
├─ tailwind.config.js
├─ postcss.config.js
├─ vite.config.js
└─ src/
   ├─ main.jsx
   ├─ App.jsx                  # owns global state + step routing
   ├─ index.css                # tailwind directives + base type
   ├─ context/
   │  └─ DesignContext.jsx     # selections + dispatch (optional but recommended)
   ├─ pages/
   │  ├─ EmotionSelection.jsx  # Screen 1
   │  ├─ PrioritySelection.jsx # Screen 2
   │  ├─ ProjectContext.jsx    # Screen 3
   │  └─ ResultsPage.jsx       # Screen 4
   ├─ components/
   │  ├─ ProgressBar.jsx
   │  ├─ EmotionCard.jsx
   │  ├─ SliderControl.jsx
   │  ├─ BuildingTypeCard.jsx
   │  ├─ SiteSelector.jsx
   │  ├─ ResultCard.jsx
   │  ├─ PrecedentCard.jsx
   │  ├─ WarningCard.jsx
   │  ├─ LoadingState.jsx
   │  └─ illustrations/        # one tiny SVG component per emotion (§6)
   ├─ engine/
   │  └─ generate.js           # pure function: inputs -> results object (§7)
   └─ data/
      ├─ emotions.js
      ├─ emotionMappings.js
      ├─ materialMappings.js
      ├─ precedentMappings.js
      ├─ environmentMappings.js
      ├─ contradictionLogic.js
      └─ designDnaLogic.js
```

Keep the **engine pure**: `generate(inputs)` takes the selections and returns a
plain results object. Pages render that object. This makes the logic testable and
the "Regenerate" feature trivial (re-run with a new shuffle seed).

---

## 5. Design system

The aesthetic reference points are Milanote, Are.na, Notion, Pinterest, and minimal
architecture portfolios. White paper, sand/earth accents, thin type, generous
whitespace, soft hover lifts. **Avoid** anything that reads as a generic SaaS app or
a student coding assignment.

### Tailwind theme extension (`tailwind.config.js`)

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper:    "#FBFAF7",   // app background (warm white)
        surface:  "#FFFFFF",   // cards
        sand:      "#E9E2D4",   // primary accent / borders
        clay:      "#C9BBA4",   // deeper accent
        stone:    "#8B8275",   // muted text / icon lines
        ink:      "#2B2A27",   // primary text (near-black, warm)
        umber:    "#6B5E4C",   // headings / emphasis
        moss:     "#6E7A5E",   // subtle positive accent
        warn:     "#A8703E",   // warning accent (earthy amber, not red)
        warnbg:   "#F5ECE0",   // warning card background
      },
      fontFamily: {
        sans:    ["Inter", "system-ui", "sans-serif"],
        display: ["'Fraunces'", "Georgia", "serif"], // editorial headings (optional)
      },
      letterSpacing: { tightish: "-0.02em", wide2: "0.12em" },
      boxShadow: {
        card:  "0 1px 2px rgba(43,42,39,0.04), 0 8px 24px rgba(43,42,39,0.05)",
        lift:  "0 4px 12px rgba(43,42,39,0.08), 0 18px 40px rgba(43,42,39,0.08)",
      },
      transitionTimingFunction: { soft: "cubic-bezier(0.22, 1, 0.36, 1)" },
    },
  },
  plugins: [],
};
```

### Type & rhythm rules

- Headings thin and large: `font-display` (or `font-sans font-light`), tracking
  `tightish`. Screen titles ~`text-4xl/5xl`, weight 300–400.
- Body `text-ink/80`, `text-sm`–`text-base`, `leading-relaxed`.
- Eyebrow labels (e.g. "STEP 1", section kickers): `text-xs uppercase tracking-wide2
  text-stone`.
- Whitespace is the brand. Default page padding `px-6 md:px-10 lg:px-16`, max content
  width `max-w-6xl mx-auto`, vertical sections `py-10 md:py-16`.
- Cards: `bg-surface rounded-2xl border border-sand shadow-card` → on hover
  `shadow-lift -translate-y-0.5`, all via `transition duration-300 ease-soft`.
- Selected state: `ring-1 ring-umber border-umber bg-paper` (never a bright fill).
- Icons: inline SVG, `stroke-stone`, 1.5 stroke, no fills.

### Motion (CSS only)

- Page transitions: fade + 8px upward slide. Implement with a keyframe
  `archform-enter` (opacity 0→1, translateY 8px→0, 400ms `ease-soft`) applied to the
  active page's root via a `key={step}` so it re-mounts and re-animates.
- Card hover: transform + shadow transition (300ms).
- Emotion card flip: 3D flip (`transform-style: preserve-3d`, `rotateY(180deg)`),
  600ms `ease-soft`. See §6.
- Results sections: stagger in with incremental `animation-delay` (e.g. 80ms × index).
- Respect `@media (prefers-reduced-motion: reduce)` → disable transforms, keep
  opacity fades only.

---

## 6. Emotion card flip + illustration system

Each emotion is a card. **Front:** the emotion word only, centered, thin type, lots
of padding. **Back (revealed on select):** a small monochrome line illustration in an
architectural-sketch style + the word small at the bottom. Selecting flips the card
and marks it selected; deselecting flips it back.

### Flip mechanics (CSS only)

```css
.flip { perspective: 1000px; }
.flip-inner {
  position: relative; width: 100%; height: 100%;
  transition: transform 600ms cubic-bezier(0.22,1,0.36,1);
  transform-style: preserve-3d;
}
.flip.is-selected .flip-inner { transform: rotateY(180deg); }
.flip-face { position: absolute; inset: 0; backface-visibility: hidden;
  display: flex; align-items: center; justify-content: center; }
.flip-back { transform: rotateY(180deg); }
```

### Selection rules

- Min 3, max 5 selections required to advance.
- Clicking a 6th selected card does nothing (or briefly pulses the counter).
- Show a live counter: e.g. "3 of 5 selected" and enable "Continue" only at ≥3.

### Illustration style

Minimal **black line illustrations**, sketch-like, almost architectural-diagram.
No color fills, 1.5px stroke, `currentColor` = `ink`/`stone`. One small React SVG
component per emotion in `components/illustrations/`. Keep each ~80–96px square.

| Emotion | Illustration concept |
|---|---|
| Freedom | Figure in open landscape, arms wide, low horizon line |
| Curiosity | Figure peering through an opening / window aperture |
| Play | Child climbing a simple frame/structure |
| Community | Ring of seated figures (circle) |
| Wonder | Figure looking up into a tall open volume |
| Reflection | Seated figure beside a still water line |
| Calm | Single tree + flat water line, lots of empty space |
| Exploration | Figure on a winding path between forms |
| Connection | Hand touching tree roots |
| Ceremony | Threshold/portal with a central figure approaching |
| Groundedness | Bare feet on an earth/ground line |
| Flexibility | Movable partition / sliding panels suggested by arrows |
| Safety | Figure under a sheltering roof/canopy |
| Creativity | Hand sketching a form / scattered marks |
| Belonging | Two figures close under one roofline |

(If time-boxed, ship the 10 illustrations the brief names explicitly first; the rest
can fall back to a simple shared placeholder mark, but aim to complete all 15.)

The 15 emotions live in `data/emotions.js` as `{ id, label }`. Map `id` →
illustration component in the illustrations index.

---

## 7. App flow, state model & results engine

### Flow

`STEP 1 → STEP 2 → STEP 3 → RESULTS`, shown by a `ProgressBar` at the top. A single
`step` state (0–3) drives which page renders. `Continue` advances, `Back` returns.
Each step validates before advancing (see per-screen gating in §9).

### Global state shape

```js
const initialState = {
  step: 0,                 // 0..3
  emotions: [],            // array of emotion ids, length 3..5
  priorities: {            // 0..100 each
    sustainability: 50, budget: 50, efficiency: 50, passiveDesign: 50,
    communityInteraction: 50, naturalMaterials: 50, playfulness: 50,
    flexibility: 50, lowCarbon: 50, accessibility: 50, durability: 50,
  },
  buildingType: null,      // id from list, or "other"
  buildingTypeOther: "",   // free text when buildingType === "other"
  site: null,              // single climate id
  results: null,           // set after generate(); null until computed
  shuffleSeed: 0,          // bumped by "Regenerate Design Path"
};
```

Hold this in `App.jsx` (or `DesignContext`). Reducer actions: `SELECT_EMOTION`
(toggle, enforce max 5), `SET_PRIORITY`, `SET_BUILDING_TYPE`, `SET_BUILDING_OTHER`,
`SET_SITE`, `GOTO_STEP`, `GENERATE`, `REGENERATE`, `RESET`.

### The engine — `engine/generate.js`

A **pure function**: `generate(inputs, seed) -> results`. No side effects, no
randomness except a seeded shuffle for secondary items. Pipeline:

```js
export function generate(inputs, seed = 0) {
  return {
    dna:           deriveDNA(inputs),                 // §8.6  -> { title, subtitle }
    spatial:       deriveSpatial(inputs.emotions),    // §8.2  -> string[] of strategies
    materials:     deriveMaterials(inputs.priorities),// §8.3  -> Material[]
    environmental: deriveEnvironmental(inputs.site),  // §8.4  -> string[]
    precedents:    derivePrecedents(inputs, seed),    // §8.5  -> Precedent[]
    warnings:      detectContradictions(inputs),      // §8.7  -> Warning[]
  };
}
```

`ResultsPage` calls `generate` once on mount (after the loading state) and stores the
result. "Regenerate Design Path" bumps `shuffleSeed` and re-runs only the secondary
ordering (precedents order, and any "pick N of M" lists) so the primary DNA/strategy
stays stable while secondary suggestions reshuffle.

### Results page sequence

1. On entering RESULTS, show `LoadingState` with the text
   **"Translating concept into architecture…"** for **2–3 seconds** (use a timeout;
   animate a thin progress line or pulsing mark — no spinner clichés).
2. Then reveal six sections in order, staggered:
   1. Your Design DNA
   2. Spatial Strategies
   3. Material Recommendations
   4. Environmental Strategies
   5. Precedent Projects (horizontal scroll)
   6. Contradiction Detector (only render if `warnings.length > 0`; otherwise show a
      quiet "No conflicts detected — your intentions and priorities are aligned." note)
3. Footer actions: **Regenerate Design Path**, **Start over**.

---

## 8. Data mappings (complete)

These are spelled out in full. Put each block in its named file under `/src/data`.
Helper thresholds used throughout: a priority is **high** if `>= 70`, **low** if
`<= 30`, otherwise **mid**.

### 8.1 `data/emotions.js` — the 15 emotions

```js
export const EMOTIONS = [
  { id: "freedom",      label: "Freedom" },
  { id: "curiosity",    label: "Curiosity" },
  { id: "play",         label: "Play" },
  { id: "community",    label: "Community" },
  { id: "wonder",       label: "Wonder" },
  { id: "reflection",   label: "Reflection" },
  { id: "calm",         label: "Calm" },
  { id: "exploration",  label: "Exploration" },
  { id: "connection",   label: "Connection" },
  { id: "ceremony",     label: "Ceremony" },
  { id: "groundedness", label: "Groundedness" },
  { id: "flexibility",  label: "Flexibility" },
  { id: "safety",       label: "Safety" },
  { id: "creativity",   label: "Creativity" },
  { id: "belonging",    label: "Belonging" },
];
```

### 8.2 `data/emotionMappings.js` — emotions → spatial strategies

The engine combines two layers:

1. **Per-emotion base strategies** — each selected emotion contributes its strategies.
2. **Pair bonuses** — specific combinations unlock richer, higher-priority strategies.

`deriveSpatial(emotions)` collects all base strategies for selected emotions, then
adds any pair-bonus strategies whose *both* emotions are selected, de-duplicates,
and returns the list (pair-bonus items first so they read as headline moves).

```js
export const EMOTION_STRATEGIES = {
  freedom: [
    "Open-plan, column-light spaces",
    "Remove rigid corridors in favour of flowing circulation",
    "Generous ceiling heights and uninterrupted sightlines",
  ],
  curiosity: [
    "Hidden threshold spaces and partial reveals",
    "Framed views that hint at what lies beyond",
    "Layered transparency between rooms",
  ],
  play: [
    "Non-linear, looping circulation",
    "Level changes, nooks and climbable thresholds",
    "Outdoor spillover zones for active use",
  ],
  community: [
    "Central communal gathering zone as the social heart",
    "Shared circulation that encourages encounter",
    "Large flexible multi-use spaces",
  ],
  wonder: [
    "A tall double-height volume as a spatial event",
    "Dramatic top-light washing a key space",
    "Compression-then-release sequence on approach",
  ],
  reflection: [
    "Quiet retreat spaces set apart from circulation",
    "Framed views to water, sky or landscape",
    "Soft, indirect natural light",
  ],
  calm: [
    "Restrained material and colour palette",
    "Acoustic separation from active zones",
    "Slow, deliberate circulation with pause points",
  ],
  exploration: [
    "Winding, episodic circulation route",
    "Multiple points of entry and discovery zones between spaces",
    "Sequence of distinct spatial 'moments'",
  ],
  connection: [
    "Strong visual and physical links to landscape",
    "Indoor–outdoor thresholds that dissolve the boundary",
    "Shared edges between programs rather than hard walls",
  ],
  ceremony: [
    "A clear processional axis and arrival threshold",
    "Hierarchy of spaces building to a focal room",
    "Marked transitions of light and scale",
  ],
  groundedness: [
    "Heavy, earth-connected base and low datum",
    "Tactile natural floor materials",
    "Sheltering, grounded roof form",
  ],
  flexibility: [
    "Movable partitions and reconfigurable rooms",
    "Loose-fit, multi-use floor plates",
    "Servant cores freeing open served space",
  ],
  safety: [
    "Clear wayfinding and legible plan",
    "Sheltering enclosure and defined edges",
    "Passive surveillance across shared spaces",
  ],
  creativity: [
    "Raw, adaptable 'maker' spaces",
    "Generous wall and surface area for making/display",
    "Indeterminate spaces that invite appropriation",
  ],
  belonging: [
    "Human-scaled, intimate sub-spaces within the whole",
    "Identifiable 'home base' zones for groups",
    "Soft thresholds between private and shared",
  ],
};

// Pairs use a sorted "a+b" key. Look up both orders or sort before lookup.
export const EMOTION_PAIR_STRATEGIES = {
  "curiosity+exploration": [
    "Fragmented circulation pathways",
    "Hidden threshold spaces",
    "Multiple points of entry",
    "Layered movement systems",
    "Discovery zones between spaces",
  ],
  "community+connection": [
    "Central communal gathering zones",
    "Shared circulation paths",
    "Visual transparency between spaces",
    "Large multi-use shared spaces",
  ],
  "freedom+play": [
    "Remove rigid corridors",
    "Flexible open-plan spaces",
    "Outdoor learning / activity spillover zones",
    "Non-linear circulation",
  ],
  "calm+reflection": [
    "Contemplative courtyard or water garden",
    "Sequenced quiet rooms with controlled daylight",
    "Buffer zones isolating retreat from activity",
  ],
  "wonder+ceremony": [
    "Processional approach culminating in a luminous volume",
    "Compression-and-release threshold sequence",
    "Single dramatic top-lit focal space",
  ],
  "groundedness+connection": [
    "Building set into the landscape / earth-sheltered edges",
    "Continuous ground plane from outside to in",
    "Local, site-won materials expressed honestly",
  ],
  "play+creativity": [
    "Indeterminate, appropriable activity zones",
    "Robust surfaces designed to be marked and made on",
    "Loose furniture and movable play elements",
  ],
  "safety+belonging": [
    "Legible 'home base' clusters with passive surveillance",
    "Human-scaled enclosure around shared hearts",
    "Soft, defensible thresholds between groups",
  ],
};
```

### 8.3 `data/materialMappings.js` — priorities → materials

Each material carries `sustainability`, `durability`, `cost` scores (0–100, where
**cost is "cost score"**: higher = more affordable / lower cost burden). The card
displays all three. `deriveMaterials(priorities)` selects a palette by rules below,
de-duplicates, and returns 4–6 materials, highest relevance first.

```js
export const MATERIALS = {
  clt:            { name: "Cross-Laminated Timber", sustainability: 90, durability: 75, cost: 45 },
  rammedEarth:    { name: "Rammed Earth",           sustainability: 88, durability: 80, cost: 55 },
  recycledBrick:  { name: "Recycled Brick",         sustainability: 80, durability: 90, cost: 60 },
  stone:          { name: "Natural Stone",          sustainability: 70, durability: 95, cost: 35 },
  bamboo:         { name: "Bamboo",                 sustainability: 92, durability: 65, cost: 70 },
  hempcrete:      { name: "Hempcrete",              sustainability: 90, durability: 60, cost: 50 },
  cork:           { name: "Cork",                   sustainability: 85, durability: 60, cost: 55 },
  standardBrick:  { name: "Standard Brick",         sustainability: 55, durability: 90, cost: 75 },
  recycledConc:   { name: "Recycled Concrete",      sustainability: 60, durability: 92, cost: 70 },
  steel:          { name: "Steel Framing",          sustainability: 50, durability: 95, cost: 65 },
  prefabPanel:    { name: "Prefabricated Panels",   sustainability: 58, durability: 80, cost: 80 },
  glulam:         { name: "Glulam Timber",          sustainability: 82, durability: 78, cost: 55 },
  rEarthBlock:    { name: "Compressed Earth Block", sustainability: 86, durability: 78, cost: 62 },
  polishedConc:   { name: "Polished Concrete",      sustainability: 45, durability: 93, cost: 70 },
};

// Returns an array of material objects. Rules are evaluated in order; collect
// matches, de-dupe by key, cap at 6, sort by a relevance weight tied to which
// priorities are high.
export function deriveMaterials(p) {
  const high = (v) => v >= 70;
  const low  = (v) => v <= 30;
  const picks = new Set();

  // Sustainability + natural materials → biogenic, low-carbon palette
  if (high(p.sustainability) || high(p.naturalMaterials)) {
    ["clt","rammedEarth","recycledBrick","stone","bamboo"].forEach(k => picks.add(k));
  }
  // Low carbon specifically → biogenic + earth, drop high-embodied-carbon
  if (high(p.lowCarbon)) {
    ["clt","hempcrete","rEarthBlock","cork","glulam"].forEach(k => picks.add(k));
  }
  // Budget-sensitive (budget priority high == cost matters a lot) → affordable, common
  if (high(p.budget)) {
    ["standardBrick","recycledConc","steel","prefabPanel"].forEach(k => picks.add(k));
  }
  // Durability-led → long-life, hard-wearing
  if (high(p.durability)) {
    ["stone","recycledBrick","steel","polishedConc"].forEach(k => picks.add(k));
  }
  // Fallback / mid-everything → balanced, broadly sensible palette
  if (picks.size === 0) {
    ["glulam","recycledBrick","rammedEarth","standardBrick"].forEach(k => picks.add(k));
  }

  let list = [...picks].map(k => ({ key: k, ...MATERIALS[k] }));

  // Relevance sort: weight by the active priorities so the palette reflects intent.
  const w = (m) => {
    let s = 0;
    if (high(p.sustainability) || high(p.naturalMaterials)) s += m.sustainability;
    if (high(p.durability)) s += m.durability;
    if (high(p.budget))     s += m.cost;          // cost score = affordability
    if (high(p.lowCarbon))  s += m.sustainability;
    return s;
  };
  list.sort((a, b) => w(b) - w(a));
  return list.slice(0, 6);
}
```

### 8.4 `data/environmentMappings.js` — site/climate → environmental strategies

Single-select site. `deriveEnvironmental(site)` returns that climate's strategy list.

```js
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
  { id: "coastal",    label: "Coastal" },
  { id: "urbanDense", label: "Urban Dense" },
  { id: "suburban",   label: "Suburban" },
  { id: "bushland",   label: "Bushland" },
  { id: "arid",       label: "Arid" },
  { id: "tropical",   label: "Tropical" },
  { id: "temperate",  label: "Temperate" },
  { id: "mountainous",label: "Mountainous" },
  { id: "waterfront", label: "Waterfront" },
  { id: "rural",      label: "Rural" },
];
```

### 8.5 `data/precedentMappings.js` — design signature → precedent projects

Each precedent has `name`, `architect`, a `reason` template, and `tags` used for
matching. `derivePrecedents(inputs, seed)` scores every precedent against the user's
emotions, priorities, and building type, sorts by score, then applies a seeded
shuffle *within equal-score bands* so Regenerate reshuffles ties without breaking
relevance. Return the top 4–6.

```js
export const PRECEDENTS = [
  {
    id: "fuji", name: "Fuji Kindergarten", architect: "Tezuka Architects",
    reason: "An oval roof-as-playground dissolves the line between circulation and play — a benchmark for play-centred learning.",
    tags: ["play","freedom","exploration","school","community"],
  },
  {
    id: "greenSchoolBali", name: "Green School Bali", architect: "IBUKU (Elora Hardy) / PT Bambu",
    reason: "All-bamboo, open-air campus that fuses building and jungle — a touchstone for connection to nature and low-carbon material.",
    tags: ["connection","groundedness","school","sustainability","naturalMaterials","tropical"],
  },
  {
    id: "thermeVals", name: "Therme Vals", architect: "Peter Zumthor",
    reason: "Stacked local quartzite and choreographed light make a calm, sensory, minimal-sustainable bathing landscape.",
    tags: ["calm","reflection","wonder","ceremony","stone","minimal","hospitality"],
  },
  {
    id: "bruderKlaus", name: "Bruder Klaus Field Chapel", architect: "Peter Zumthor",
    reason: "A rammed-concrete monolith in a field, lit from a single oculus — landscape-integrated, ceremonial, elemental.",
    tags: ["ceremony","wonder","reflection","groundedness","rural","minimal"],
  },
  {
    id: "teshima", name: "Teshima Art Museum", architect: "Ryue Nishizawa + Rei Naito",
    reason: "A single seamless concrete shell open to sky and breeze — wonder and calm reduced to one continuous gesture.",
    tags: ["wonder","calm","reflection","museum","minimal","connection"],
  },
  {
    id: "sendai", name: "Sendai Mediatheque", architect: "Toyo Ito",
    reason: "Tube-columns and open floor plates create radically flexible, transparent civic space.",
    tags: ["flexibility","freedom","community","library","workplace","curiosity"],
  },
  {
    id: "maggies", name: "Maggie's Centres (various)", architect: "Various (e.g. dRMM, Foster, Heatherwick)",
    reason: "Domestic-scaled, garden-linked care spaces designed around belonging, safety and calm.",
    tags: ["belonging","safety","calm","community","connection","naturalMaterials"],
  },
  {
    id: "louisiana", name: "Louisiana Museum of Modern Art", architect: "Bo & Wohlert",
    reason: "Glazed galleries thread through a coastal landscape — exploration and connection via a meandering route.",
    tags: ["exploration","connection","curiosity","museum","coastal","calm"],
  },
  {
    id: "salk", name: "Salk Institute", architect: "Louis Kahn",
    reason: "A monumental travertine court framing sky and sea — ceremony, reflection and timeless material.",
    tags: ["ceremony","reflection","wonder","workplace","stone","durability"],
  },
  {
    id: "kanagawa", name: "Kanagawa Institute of Technology (KAIT)", architect: "Junya Ishigami",
    reason: "A forest of slender columns makes one open, indeterminate room — freedom, curiosity and flexible occupation.",
    tags: ["freedom","curiosity","flexibility","creativity","workplace","school"],
  },
  {
    id: "thoncho", name: "Thorncrown Chapel", architect: "E. Fay Jones",
    reason: "A lightweight timber lattice immersed in woodland — wonder and connection with a near-zero footprint.",
    tags: ["wonder","connection","reflection","ceremony","bushland","naturalMaterials"],
  },
  {
    id: "quintaMonroy", name: "Quinta Monroy / Villa Verde (incremental housing)", architect: "ELEMENTAL (Alejandro Aravena)",
    reason: "Half-a-good-house framework that residents complete — flexibility, budget realism and belonging at scale.",
    tags: ["flexibility","belonging","community","housing","budget","durability"],
  },
];

// Scoring sketch:
//  +3 for each tag matching a selected emotion id
//  +2 if a tag matches the buildingType id
//  +2 if a tag matches a "high" priority key (sustainability, naturalMaterials,
//      flexibility, budget, durability, lowCarbon)
//  +1 if a tag matches the site id
// Sort desc by score; seeded-shuffle ties; return top 4–6 (min 4 even if low scores).
```

### 8.6 `data/designDnaLogic.js` — inputs → design identity

`deriveDNA(inputs)` returns `{ title, subtitle }`. Compute a small set of weighted
signals from emotions + priorities + building type, pick the highest, and resolve to
a named identity. Provide a sensible default so there is always a title.

```js
// Signals (each accumulates a score from emotions present + relevant high priorities)
//   ecological     <- sustainability, lowCarbon, naturalMaterials high; connection, groundedness
//   community      <- community, belonging, connection; communityInteraction high
//   landscape      <- connection, groundedness, calm, reflection; passiveDesign high
//   play           <- play, freedom, curiosity, creativity; playfulness high
//   biophilic+learn<- (school/library/childcare building) + connection/calm/curiosity
//   material       <- naturalMaterials, durability high; groundedness; sustainability
//   contemplative  <- calm, reflection, ceremony, wonder

export const DNA_TITLES = {
  ecological:    { title: "Ecological Minimalist",            subtitle: "Low-impact, restrained, materially honest." },
  community:     { title: "Community-Driven Designer",        subtitle: "Space organised around encounter and belonging." },
  landscape:     { title: "Landscape-Integrated Design Approach", subtitle: "Building and site read as one continuous ground." },
  play:          { title: "Play-Centred Spatial Design",      subtitle: "Movement, discovery and freedom drive the plan." },
  biophilic:     { title: "Biophilic Learning Environment",   subtitle: "Nature, light and calm shaping how people learn." },
  material:      { title: "Material-Conscious Design Approach",subtitle: "Tactile, durable, expressively built." },
  contemplative: { title: "Contemplative Spatial Design",     subtitle: "Light, silence and sequence as the primary material." },
  balanced:      { title: "Integrated Contextual Designer",   subtitle: "A measured response balancing people, place and program." },
};
// deriveDNA tallies signal scores, takes the max; ties broken by priority weight;
// falls back to "balanced" when no signal clears a small threshold.
```

### 8.7 `data/contradictionLogic.js` — the contradiction detector

`detectContradictions(inputs)` returns an array of `{ id, title, body, alternatives? }`.
Render each as a `WarningCard`. Evaluate **every** rule; return all that fire. If none
fire, the page shows the "aligned" note instead.

```js
export function detectContradictions({ emotions, priorities: p, buildingType, site }) {
  const high = (v) => v >= 70, low = (v) => v <= 30;
  const has = (e) => emotions.includes(e);
  const out = [];

  // 1. Sustainability vs. high-embodied-carbon leanings
  if (high(p.sustainability) && low(p.lowCarbon)) {
    out.push({
      id: "sustain-carbon",
      title: "Sustainability vs. embodied carbon",
      body: "Your sustainability priority is high, but low-carbon construction is rated low. High-embodied-carbon systems (concrete, steel) would undercut your stated intent.",
      alternatives: ["Cross-Laminated Timber", "Rammed Earth", "Recycled Brick"],
    });
  }

  // 2. Budget vs. natural / low-carbon premium materials
  if (high(p.budget) && (high(p.naturalMaterials) || high(p.lowCarbon))) {
    out.push({
      id: "budget-natural",
      title: "Budget vs. premium natural materials",
      body: "Tight budget sits alongside a strong pull toward natural / low-carbon materials, which often carry a cost premium. Expect to prioritise where the natural palette appears.",
      alternatives: ["Use timber/earth selectively at key public spaces", "Recycled brick & concrete for back-of-house", "Prefabrication to offset labour cost"],
    });
  }

  // 3. Calm intent vs. very high playfulness (esp. schools)
  if (has("calm") && high(p.playfulness)) {
    out.push({
      id: "calm-play",
      title: "Calm vs. high playfulness",
      body: "You chose Calm as an intention while pushing playfulness very high. Without zoning, active energy can erode the calm atmosphere you're after.",
      alternatives: ["Zone active and quiet wings", "Acoustic buffers between them", "Provide dedicated quiet retreat spaces"],
    });
  }

  // 4. Reflection / Calm vs. high community interaction
  if ((has("reflection") || has("calm")) && high(p.communityInteraction)) {
    out.push({
      id: "quiet-community",
      title: "Quiet retreat vs. high community interaction",
      body: "Intentions of quiet/reflection compete with a high community-interaction priority. Both are achievable but need clear spatial separation.",
      alternatives: ["Graded transition from social to quiet zones", "A retreat space off the main social heart"],
    });
  }

  // 5. Flexibility intent/priority vs. high durability + heavy materials
  if ((has("flexibility") || high(p.flexibility)) && high(p.durability) && low(p.budget)) {
    out.push({
      id: "flex-durable",
      title: "Flexibility vs. heavyweight permanence",
      body: "Flexible, reconfigurable space and very high durability can pull against each other — permanent heavy construction resists change.",
      alternatives: ["Permanent core + loose-fit interior", "Demountable partitions", "Long-life shell, short-life fit-out strategy"],
    });
  }

  // 6. Passive design priority vs. site that demands the opposite
  if (high(p.passiveDesign) && site === "arid" && has("freedom") && /* large glazing implied */ true) {
    out.push({
      id: "passive-arid-glazing",
      title: "Open/glazed character vs. arid passive design",
      body: "An open, expansive character in an arid climate risks heat gain. Passive performance here favours smaller, shaded openings and thermal mass.",
      alternatives: ["Shade and recess glazing", "Courtyard plan", "High thermal mass walls"],
    });
  }

  // 7. Accessibility priority vs. play emotion implying level changes
  if (high(p.accessibility) && has("play")) {
    out.push({
      id: "access-play",
      title: "Accessibility vs. playful level changes",
      body: "Playful split-levels, ramps and climbable thresholds must be checked against your high accessibility priority so no group is excluded.",
      alternatives: ["Provide accessible parallel routes", "Ramp gradients within code", "Inclusive play elements at multiple abilities"],
    });
  }

  // 8. Efficiency priority vs. exploration/curiosity (meandering circulation is 'inefficient')
  if (high(p.efficiency) && (has("exploration") || has("curiosity"))) {
    out.push({
      id: "efficiency-wander",
      title: "Efficiency vs. exploratory circulation",
      body: "Episodic, meandering routes that create discovery also add circulation area, which works against a high space-efficiency priority. Decide where each wins.",
      alternatives: ["Concentrate 'wander' at the public route only", "Keep service/back-of-house direct", "Borrow circulation as usable space"],
    });
  }

  return out;
}
```

> Note: rule 6 references "large glazing implied" — since the brief has no glazing
> input, treat the `freedom`/`wonder` emotions as a proxy for an open, glazed
> character. Keep the heuristic but make it easy to tune.

---

## 9. Screen specifications

Shared chrome on every screen: `ProgressBar` pinned top (`STEP 1 → STEP 2 → STEP 3 →
RESULTS`), a back link (hidden on step 0), and a primary `Continue` button bottom-right
that is **disabled until the screen's gate passes**. Wrap each page root in
`key={step}` so the enter animation replays on every transition.

### Screen 1 — Emotional intent (`EmotionSelection.jsx`)

- Title: **"How should people feel in this space?"**
- Subtitle: **"Select between 3 and 5 emotions that represent your design intention."**
- Responsive grid of `EmotionCard`s (e.g. `grid-cols-2 sm:grid-cols-3 lg:grid-cols-5`,
  square-ish cards, generous gap).
- Click flips the card and toggles selection (§6). Enforce max 5 (block the 6th,
  pulse the counter). Live counter "N of 5 selected".
- Gate: `emotions.length >= 3`. Continue enabled at 3–5.

### Screen 2 — Design priorities (`PrioritySelection.jsx`)

- Title: **"What principles matter most?"**
- Eleven `SliderControl`s, each 0–100, default 50, value shown beside the label, e.g.
  **"Sustainability — 85%"**. Update live on drag.
- Categories (in this order): Sustainability, Budget, Efficiency, Passive Design,
  Community Interaction, Natural Materials, Playfulness, Flexibility, Low Carbon
  Construction, Accessibility, Durability.
- Style the track in `sand`, the filled portion and thumb in `umber`; thin, no chrome.
- Gate: none (defaults are valid). Continue always enabled.

### Screen 3 — Project type + site (`ProjectContext.jsx`)

- Title: **"What are you designing?"**
- **Section 1 — Building type:** selectable `BuildingTypeCard`s, single-select:
  School, Housing, Museum, Library, Community Centre, Hospitality, Commercial, Public
  Space, Workplace, **Other**. Selecting "Other" reveals a text input
  ("Enter building type", e.g. Childcare Centre, Wellness Retreat, Sports Facility,
  Indigenous Cultural Centre); store in `buildingTypeOther`.
- **Section 2 — Site context:** `SiteSelector` cards, single-select from the 10 sites
  in §8.4.
- Gate: `buildingType !== null` **and** (if "other", `buildingTypeOther.trim()` non-empty)
  **and** `site !== null`.

### Screen 4 — Results (`ResultsPage.jsx`)

- On mount: render `LoadingState` ("Translating concept into architecture…") for
  2–3s, then call `generate(inputs, shuffleSeed)`, store, and reveal the six sections
  staggered (§7). Section components:
  - **Design DNA** — one large premium card, big thin title + subtitle.
  - **Spatial Strategies** — grid of `ResultCard`s (one per strategy string).
  - **Material Recommendations** — grid of material `ResultCard`s, each showing name +
    three labelled scores (Sustainability / Durability / Cost) as small bars or numbers.
  - **Environmental Strategies** — grid of `ResultCard`s.
  - **Precedent Projects** — horizontally scrollable row of `PrecedentCard`s
    (name, architect, reason). Snap scrolling, hidden scrollbar, fade edges.
  - **Contradiction Detector** — `WarningCard`s (earthy amber, `warn`/`warnbg`, ⚠ mark,
    title, body, optional "Suggested alternatives" list). If empty, show the aligned note.
- Footer: **Regenerate Design Path** (bumps `shuffleSeed`, re-runs `generate`, re-reveals
  with a quick fade — keep DNA/spatial stable, reshuffle precedent ties and any "pick N"
  lists), and **Start over** (reset to step 0).

---

## 10. Component contracts

```
ProgressBar      ({ step })                          // 0..3, highlights current, shows labels
EmotionCard      ({ emotion, selected, disabled, onToggle })  // handles flip + illustration
SliderControl    ({ label, value, onChange })        // 0..100, shows "Label — N%"
BuildingTypeCard ({ type, selected, onSelect })      // type = { id, label }
SiteSelector     ({ sites, value, onChange })        // single-select group
ResultCard       ({ title, children, index })        // generic result tile; index drives stagger delay
PrecedentCard    ({ precedent })                     // { name, architect, reason }
WarningCard      ({ warning })                        // { title, body, alternatives? }
LoadingState     ({ text })                          // animated thin line, no spinner cliché
```

Keep all of these **presentational** (props in, callbacks out). All selection logic
lives in `App.jsx` / `DesignContext`. All design logic lives in `/engine` + `/data`.

---

## 11. Build order (milestones)

1. **Scaffold** — Vite + React + Tailwind installed; theme tokens from §5 in
   `tailwind.config.js`; `index.css` with `@tailwind` directives, base type, and the
   keyframes (`archform-enter`, flip, reduced-motion guard). App renders a blank paper
   canvas with `ProgressBar`.
2. **State + routing** — `DesignContext` / reducer, `step` navigation, `Continue`/`Back`
   wiring with per-screen gates. Screens can be empty placeholders.
3. **Screen 1** — `EmotionCard` flip + illustrations + selection rules + counter.
4. **Screen 2** — `SliderControl` × 11, live values.
5. **Screen 3** — building type (incl. Other input) + site selectors.
6. **Data + engine** — drop in all `/data` files (§8) and `engine/generate.js`; unit-check
   `generate` against the sample inputs in §12 in isolation before wiring UI.
7. **Screen 4** — loading state, then all six result sections; Regenerate + Start over.
8. **Polish** — page transitions, hover lifts, stagger, horizontal precedent scroll,
   responsive (desktop + tablet), reduced-motion, empty/edge states.
9. **Deploy** — `vite build`, push to Vercel (Vite preset, output `dist`).

---

## 12. Acceptance criteria & sanity checks

The build is done when:

- The full flow works on desktop **and** tablet widths, animated transitions throughout.
- Screen 1 enforces 3–5 selections; cards flip and reveal line illustrations on select.
- All 11 sliders work and show live "Label — N%".
- Screen 3 single-selects building type + site; "Other" reveals and stores free text.
- Results show the loading line for 2–3s, then all six sections render from `generate()`.
- "Regenerate Design Path" reshuffles secondary recommendations without changing the
  primary DNA.
- No external network calls, no console errors, `npm run build` succeeds clean.
- Visual language matches §5: warm white, sand/earth accents, thin type, whitespace,
  soft hovers — no bright colors, no generic SaaS chrome.

**Engine sanity checks** (verify `generate` by hand or with a quick test):

| Input | Expect |
|---|---|
| emotions `[curiosity, exploration, play]` | spatial list leads with the fragmented-circulation pair bonus |
| emotions `[community, connection, belonging]` | DNA → "Community-Driven Designer"; central gathering strategies |
| priorities sustainability 90, lowCarbon 20 | a "Sustainability vs. embodied carbon" warning fires |
| priorities sustainability 85, naturalMaterials 80 | materials lead with CLT / rammed earth / recycled brick |
| site `coastal` | environmental = cross-vent, corrosion-resistant, deep overhangs, elevated floors |
| emotions include `calm`, playfulness 90 | "Calm vs. high playfulness" warning fires |
| building School + emotions `[play, freedom, curiosity]` | Fuji Kindergarten / KAIT rank high in precedents |
| all sliders 50, 3 neutral emotions | DNA falls back to "Integrated Contextual Designer"; ≥4 precedents still returned |

---

## 13. Notes & guardrails for the implementer

- Precedent facts (architect attributions) are baked into `/data` — treat them as
  given content, not something to fetch. If you add precedents, keep attributions
  accurate.
- Don't introduce TypeScript, a router, or a state library unless it genuinely
  simplifies — the brief favours minimalism.
- Every list the engine returns should be safe when inputs are sparse (always return at
  least something sensible; never throw on empty selections — though gates should
  prevent reaching results with fewer than 3 emotions).
- Keep `generate` pure and deterministic except for the seeded shuffle so results are
  reproducible and testable.
- Accessibility: cards are buttons (keyboard-focusable, `aria-pressed`), sliders are
  real `<input type="range">`, honour `prefers-reduced-motion`.

