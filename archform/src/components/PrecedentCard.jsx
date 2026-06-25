import Because from "./Because.jsx";

export default function PrecedentCard({ precedent }) {
  return (
    <article className="snap-start shrink-0 w-72 md:w-80 rounded-2xl border border-sand bg-surface p-6 shadow-card transition duration-300 ease-soft hover:-translate-y-0.5 hover:shadow-lift print:break-inside-avoid">
      <div className="flex h-full flex-col">
        <h4 className="font-display text-xl font-light text-ink tracking-tightish leading-snug">
          {precedent.name}
        </h4>
        <p className="mt-1 text-xs uppercase tracking-wide2 text-stone">
          {precedent.architect}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-ink/75">
          {precedent.reason}
        </p>
        <div className="mt-auto">
          <Because drivers={precedent.because} label="Matched" />
        </div>
      </div>
    </article>
  );
}
