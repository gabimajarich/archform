import { useDesign } from "../context/DesignContext.jsx";
import SliderControl from "../components/SliderControl.jsx";
import { PRIORITIES } from "../data/priorities.js";

export default function PrioritySelection() {
  const { state, dispatch } = useDesign();

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-10 md:py-16">
      <p className="text-xs uppercase tracking-wide2 text-stone">Step 2 — Design priorities</p>
      <h1 className="mt-3 font-display text-4xl md:text-5xl font-light text-ink tracking-tightish">
        What principles matter most?
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/70">
        Weight each principle to shape the materials, strategies and precedents ARCHFORM
        proposes. There are no wrong answers — the defaults are a balanced starting point.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1 max-w-4xl">
        {PRIORITIES.map(({ key, label }) => (
          <SliderControl
            key={key}
            label={label}
            value={state.priorities[key]}
            onChange={(value) => dispatch({ type: "SET_PRIORITY", key, value })}
          />
        ))}
      </div>
    </div>
  );
}
