import { useState } from "react";
import { useDesign, canAdvance } from "./context/DesignContext.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import WaveBackground from "./components/WaveBackground.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import EmotionSelection from "./pages/EmotionSelection.jsx";
import PrioritySelection from "./pages/PrioritySelection.jsx";
import ProjectContext from "./pages/ProjectContext.jsx";
import ResultsPage from "./pages/ResultsPage.jsx";

const PAGES = [EmotionSelection, PrioritySelection, ProjectContext, ResultsPage];

export default function App() {
  const { state, dispatch } = useDesign();
  const { step } = state;
  const [landed, setLanded] = useState(false);
  const Page = PAGES[step];
  const isResults = step === 3;
  const gateOpen = canAdvance(state);

  const goBack = () => dispatch({ type: "GOTO_STEP", step: Math.max(0, step - 1) });
  const goNext = () => {
    if (!gateOpen) return;
    dispatch({ type: "GOTO_STEP", step: Math.min(3, step + 1) });
  };

  if (!landed) {
    return (
      <div className="min-h-screen">
        <WaveBackground step={-1} />
        <div key="landing" className="animate-enter">
          <LandingPage onEnter={() => setLanded(true)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <WaveBackground step={step} />
      <div className="print:hidden">
        <ProgressBar step={step} />
      </div>

      <main className="flex-1">
        <div key={step} className="animate-enter">
          <Page />
        </div>
      </main>

      {!isResults && (
        <footer className="sticky bottom-0 border-t border-sand/60 bg-white/30 backdrop-blur-md print:hidden">
          <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
            <div className="flex items-center justify-between py-4">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center gap-2 text-sm text-stone transition hover:text-umber"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  Back
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setLanded(false)}
                  className="inline-flex items-center gap-2 text-sm text-stone transition hover:text-umber"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  Back
                </button>
              )}

              <button
                type="button"
                onClick={goNext}
                disabled={!gateOpen}
                className={[
                  "inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm transition duration-300 ease-soft",
                  gateOpen
                    ? "border border-umber bg-umber text-paper hover:bg-ink"
                    : "border border-sand bg-surface text-stone/60 cursor-not-allowed",
                ].join(" ")}
              >
                {step === 2 ? "Generate design" : "Continue"}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
