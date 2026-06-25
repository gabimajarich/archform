import { useDesign } from "../context/DesignContext.jsx";
import { SITES } from "../data/environmentMappings.js";
import { BUILDING_TYPES } from "../data/buildingTypes.js";
import BuildingTypeCard from "../components/BuildingTypeCard.jsx";
import SiteSelector from "../components/SiteSelector.jsx";

export default function ProjectContext() {
  const { state, dispatch } = useDesign();

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-10 md:py-16">
      <p className="text-xs uppercase tracking-wide2 text-stone">Step 3 — Project &amp; site</p>
      <h1 className="mt-3 font-display text-4xl md:text-5xl font-light text-ink tracking-tightish">
        What are you designing?
      </h1>

      {/* Section 1 — Building type */}
      <section className="mt-10">
        <h2 className="text-sm uppercase tracking-wide2 text-umber">Building type</h2>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {BUILDING_TYPES.map((type) => (
            <BuildingTypeCard
              key={type.id}
              type={type}
              selected={state.buildingType === type.id}
              onSelect={(id) => dispatch({ type: "SET_BUILDING_TYPE", id })}
            />
          ))}
        </div>

        {state.buildingType === "other" && (
          <div className="mt-4 max-w-md animate-enter">
            <label htmlFor="building-other" className="sr-only">
              Enter building type
            </label>
            <input
              id="building-other"
              type="text"
              value={state.buildingTypeOther}
              onChange={(e) => dispatch({ type: "SET_BUILDING_OTHER", value: e.target.value })}
              placeholder="Enter building type — e.g. Childcare Centre, Wellness Retreat"
              autoFocus
              className="w-full rounded-2xl border border-sand bg-surface px-4 py-3 text-sm text-ink placeholder:text-stone/70 shadow-card outline-none transition focus:border-umber focus:ring-1 focus:ring-umber"
            />
          </div>
        )}
      </section>

      {/* Section 2 — Site context */}
      <section className="mt-12">
        <h2 className="text-sm uppercase tracking-wide2 text-umber">Site context</h2>
        <div className="mt-4">
          <SiteSelector
            sites={SITES}
            value={state.site}
            onChange={(id) => dispatch({ type: "SET_SITE", id })}
          />
        </div>
      </section>
    </div>
  );
}
