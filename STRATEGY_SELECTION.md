# ARCHFORM — How the 100 strategies are stored and surfaced

This explains how the spatial / architectural strategy library should work. Hand
this to the implementer alongside the main build guide.

## The core idea

The app ships with a **fixed local database of 100+ spatial strategies** — all of
them live in the code at all times (one data module, no fetching, no backend). The
user never sees all 100 at once. Instead, the **results page shows only the
strategies that relate to what the user selected on the earlier screens** (their
emotions, their priority sliders, their building type, and their site/climate).

So: the full library is always *present in memory*, but it is *filtered down* to a
relevant shortlist at the moment the results are generated. Think of it like a
database query — the table has 100 rows, but the page renders only the rows that
match the user's profile, ranked by how strongly they match.

## How a strategy "relates" to the user's choices

Every strategy in the database carries **trigger metadata** describing what makes it
relevant. Each strategy record looks like this:

```js
{
  id: "fragmented-circulation",
  category: "Circulation",
  title: "Fragmented circulation pathways",
  summary: "Break the route into episodes so movement becomes discovery.",
  // ...full expandable content (what / why / howToApply / tradeoffs / worksWith)...
  triggers: {
    emotions:   ["curiosity", "exploration", "play"],   // selecting any of these adds relevance
    priorities: { efficiency: "low" },                   // relevant when this slider sits in the LOW band
    buildingTypes: ["museum", "school", "library"],      // optional: extra relevance for these
    sites: [],                                            // optional: extra relevance for these climates
  },
}
```

### Priority conditions are bands (ranges), never exact values

A priority condition like `efficiency: "low"` does **not** mean "efficiency equals a
number." It means "the efficiency slider falls anywhere in the LOW range." Define the
three bands as explicit numeric ranges so every possible slider value lands in one:

```js
// 0..100 slider value -> band
const BANDS = { low: [0, 33], mid: [34, 66], high: [67, 100] };
```

So a strategy that wants `efficiency: "low"` matches whenever the slider is anywhere
in 0–33 — 23%, 8%, and 30% all match. Nothing snaps off at an arbitrary single value.
(If a strategy needs a custom cutoff, it may also give a raw range directly, e.g.
`sustainability: { min: 70 }` or `efficiency: { max: 33 }`, and the matcher treats
that range the same way.)

The user's selections from the first three screens are the **query**:

- the array of selected emotion ids,
- the 11 priority slider values (each read as high `>=70`, low `<=30`, or mid),
- the chosen building type,
- the chosen site/climate.

## The selection algorithm (run once, on the results page)

Do **not** use a simple on/off filter. Use a **relevance score** so the most fitting
strategies rise to the top and weak matches drop off. For each of the 100 strategies,
score it against the user's selections:

1. **+3** for every selected emotion that appears in the strategy's `triggers.emotions`.
2. **Up to +2 (graded)** for every priority condition the user's slider satisfies.
   The condition is a band/range (see above), so a slider at 23% still matches "low".
   Rather than a flat +2, scale the points by **how deep into the band** the slider
   sits, so an emphatic choice pulls the strategy higher than a borderline one:

   ```js
   // user value v (0..100), wanted band -> strength 0..1
   function priorityStrength(v, band) {
     if (band === "low")  return v <= 33 ? (33 - v) / 33 : 0;          // 0%→1.0, 33%→0
     if (band === "high") return v >= 67 ? (v - 67) / 33 : 0;          // 100%→1.0, 67%→0
     if (band === "mid")  return (v >= 34 && v <= 66) ? 1 - Math.abs(50 - v) / 16 : 0;
     return 0;
   }
   // contribution = 2 * priorityStrength(v, band)   // up to +2, scaled by emphasis
   ```

   Examples: efficiency 23 → strength ≈ 0.30 → ~+0.6; efficiency 5 → ≈ 0.85 → ~+1.7;
   efficiency 31 → ≈ 0.06 → still counts, but weakly. Both 23% and 5% register as
   "low" matches — the band is a range, and the depth just tunes the ranking.
3. **+2** if the user's building type is in `triggers.buildingTypes`.
4. **+1** if the user's site is in `triggers.sites`.

> Simpler fallback if you don't want grading: treat the condition as the band range
> only and award a flat **+2** for any slider value inside it. That alone fixes the
> "what about 23%?" problem; the graded version above is the more advanced option.

Then:

- **Keep** every strategy whose score is above a small threshold (e.g. `score >= 3`,
  i.e. at least one solid match). Discard the rest — those simply don't render.
- **Sort** the kept strategies by score, highest first, so the strongest matches lead.
- **Cap** the visible list (e.g. show the top 8–12) and optionally group them by their
  `category` so the results read as organised spatial moves, not a flat dump.
- **Guarantee a minimum** (e.g. always show at least 4). If too few clear the
  threshold, top up with the next-highest-scoring strategies so the page is never thin.

The result is that the user only ever sees strategies that genuinely connect to the
intentions and priorities they expressed — but behind the scenes, all 100 were
considered every time.

## Why scoring rather than a plain filter

- It **ranks** relevance, so the page leads with the most on-point ideas.
- It naturally handles **multiple selections** — a strategy matched by three of the
  user's emotions outranks one matched by a single emotion.
- It lets you **guarantee a useful number of results** without showing irrelevant
  filler.
- It stays **deterministic**: the same selections always produce the same shortlist
  (the only shuffle is the optional "Regenerate" reordering of equal-scoring ties).

## Expansion stays the same

Each surfaced strategy renders as a compact card (title + summary). Clicking it
expands to reveal the full record — what it is, why it works, how to apply it,
trade-offs, and links to related strategies. Only the *selection* is filtered; the
*depth* is always fully available once a card is shown.

## What to tell the database to contain

- One module (e.g. `data/strategies.js`) exporting an array of 100+ strategy records,
  each with the schema above.
- Spread across ~8 categories (Circulation, Threshold, Light, Massing, Social,
  Landscape, Structure/Flexibility, Sensory/Material), ~12–13 each.
- Every record must have `triggers` so it can be matched. A strategy with no triggers
  can never surface, so none should be left untagged.

## One-line summary for the code chat

> Store all 100 strategies locally with trigger tags (emotions, priority levels,
> building type, site). On the results page, score every strategy against the user's
> selections, keep and rank the matches above a threshold, cap the list, and render
> only those — each expandable to full detail. The full library is always in memory;
> only the relevant, ranked subset is ever shown.
