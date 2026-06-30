import { useEffect, useState } from "react";
import { useDesign } from "../context/DesignContext.jsx";
import { buildingLabel } from "../data/buildingTypes.js";
import { SITE_LABELS } from "../data/environmentMappings.js";
import LoadingState from "../components/LoadingState.jsx";
import ResultCard from "../components/ResultCard.jsx";
import StrategyCard from "../components/StrategyCard.jsx";
import PrecedentCard from "../components/PrecedentCard.jsx";
import PrecedentModal from "../components/PrecedentModal.jsx";
import WarningCard from "../components/WarningCard.jsx";
import Because from "../components/Because.jsx";
import RadarChart from "../components/RadarChart.jsx";
import BubbleDiagram from "../components/BubbleDiagram.jsx";
import MaterialSwatchBoard from "../components/MaterialSwatchBoard.jsx";

function SectionHeader({ kicker, title, index = 0 }) {
  return (
    <div className="animate-rise" style={{ animationDelay: `${index * 80}ms` }}>
      <p className="text-xs uppercase tracking-wide2 text-stone">{kicker}</p>
      <h2 className="mt-2 font-display text-2xl md:text-3xl font-light text-ink tracking-tightish">
        {title}
      </h2>
    </div>
  );
}

function DiagramCard({ title, caption, drivers, children }) {
  return (
    <div className="animate-rise rounded-2xl border border-sand bg-surface p-5 shadow-card print:break-inside-avoid">
      {title && <h3 className="text-sm uppercase tracking-wide2 text-umber">{title}</h3>}
      <div className={`${title ? "mt-4" : ""} text-stone`}>{children}</div>
      {caption && <p className="mt-3 text-sm leading-relaxed text-ink/70">{caption}</p>}
      <Because drivers={drivers} />
    </div>
  );
}

export default function ResultsPage() {
  const { state, dispatch } = useDesign();
  const [loading, setLoading] = useState(true);
  const [openPrecedent, setOpenPrecedent] = useState(null);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => {
      dispatch({ type: "GENERATE" });
      setLoading(false);
    }, 2500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || !state.results) {
    return <LoadingState text="Translating concept into architecture…" />;
  }

  const { dna, spatial, materials, environmental, environmentBecause, precedents, warnings, program } = state.results;
  const buildingText = buildingLabel(state.buildingType, state.buildingTypeOther);
  const siteText = state.site ? SITE_LABELS[state.site] : null;

  const bubbleDrivers = [buildingText];
  if (state.priorities.communityInteraction >= 60 || state.emotions.includes("community") || state.emotions.includes("belonging")) {
    bubbleDrivers.push("Community interaction");
  }

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-10 md:py-16 space-y-16 print:space-y-8">
      {/* Print-only brief header */}
      <div className="hidden print:block border-b border-sand pb-4">
        <p className="text-xs uppercase tracking-wide2 text-stone">ARCHFORM — Design Brief</p>
        <p className="mt-1 text-sm text-ink/70">{buildingText}{siteText ? ` · ${siteText}` : ""}</p>
      </div>

      {/* 1. Design DNA + priorities fingerprint */}
      <section>
        <div className="animate-rise grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 rounded-2xl border border-sand bg-surface px-8 py-10 md:px-12 md:py-12 shadow-card print:break-inside-avoid">
          <div>
            <p className="text-xs uppercase tracking-wide2 text-stone">Your Design DNA</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-light text-ink tracking-tightish leading-tight">
              {dna.title}
            </h2>
            {/* confidence */}
            <div className="mt-5 max-w-md">
              <div className="flex items-center justify-between text-sm">
                <span className="text-umber">{dna.match}% match</span>
                <span className="text-stone">confidence</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-sand">
                <div className="h-full rounded-full bg-umber transition-all duration-700 ease-soft" style={{ width: `${dna.match}%` }} />
              </div>
            </div>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink/70">{dna.subtitle}</p>
            <Because drivers={dna.drivers} />
            {dna.secondary?.length > 0 && (
              <p className="mt-4 text-sm text-stone">
                Also leaning toward{" "}
                {dna.secondary.map((s, i) => (
                  <span key={s.key}>
                    <span className="text-umber">{s.title}</span> ({s.match}%){i < dna.secondary.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            )}
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full">
              <p className="mb-1 text-center text-xs uppercase tracking-wide2 text-stone">Priority fingerprint</p>
              <RadarChart priorities={state.priorities} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Generative diagrams */}
      <section>
        <SectionHeader kicker="01" title="Programme & Adjacency" />
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DiagramCard
            caption={`Bubbles sized by relative area for a ${buildingText.toLowerCase()}; communal hearts grow with community interaction, links thicken with connection.`}
            drivers={bubbleDrivers}
          >
            <BubbleDiagram program={program} />
          </DiagramCard>
        </div>
      </section>

      {/* 3. Spatial Strategies */}
      <section>
        <SectionHeader kicker="02" title="Spatial Strategies" />
        <p className="mt-1 text-xs text-stone">Click any strategy to expand the full detail.</p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {spatial.map((s, i) => (
            <StrategyCard key={s.id} strategy={s} index={i} />
          ))}
        </div>
      </section>

      {/* 4. Material Recommendations */}
      <section>
        <SectionHeader kicker="03" title="Material Palette" />
        <div className="mt-6">
          <MaterialSwatchBoard materials={materials} />
        </div>
      </section>

      {/* 5. Environmental Strategies */}
      <section>
        <SectionHeader kicker="04" title="Environmental Strategies" />
        {environmentBecause && (
          <p className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] text-stone">
            <span className="uppercase tracking-wide2 text-clay">Because</span>
            <span className="rounded-full border border-sand bg-paper px-2 py-0.5 text-ink/70">{environmentBecause} climate</span>
          </p>
        )}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {environmental.map((s, i) => (
            <ResultCard key={s} title={s} index={i} />
          ))}
        </div>
      </section>

      {/* 6. Precedent Projects */}
      <section>
        <SectionHeader kicker="05" title="Precedent Projects" />
        <div className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 pt-1 print:flex-wrap print:overflow-visible">
          {precedents.map((p) => (
            <PrecedentCard key={p.id} precedent={p} onOpen={setOpenPrecedent} />
          ))}
        </div>
      </section>

      {/* 7. Contradiction Detector */}
      <section>
        <SectionHeader kicker="06" title="Contradiction Detector" />
        {warnings.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {warnings.map((w) => (
              <WarningCard key={w.id} warning={w} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-moss/30 bg-surface p-6 shadow-card">
            <p className="text-sm leading-relaxed text-ink/75">
              No conflicts detected — your intentions and priorities are aligned.
            </p>
          </div>
        )}
      </section>

      {/* Footer actions */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-sand pt-8 print:hidden">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-full border border-umber bg-umber px-6 py-3 text-sm text-paper transition duration-300 ease-soft hover:bg-ink"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 9V2h12v7" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <path d="M6 14h12v8H6z" />
            </svg>
            Export PDF brief
          </button>
        </div>
        <button
          type="button"
          onClick={() => dispatch({ type: "RESET" })}
          className="text-sm text-stone underline-offset-4 transition hover:text-umber hover:underline"
        >
          Start over
        </button>
      </section>

      {/* Precedent detail modal */}
      {openPrecedent && (
        <PrecedentModal precedent={openPrecedent} onClose={() => setOpenPrecedent(null)} />
      )}
    </div>
  );
}
