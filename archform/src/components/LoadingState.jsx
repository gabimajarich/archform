// Calm loading indicator — a thin sweeping line, no spinner cliché.
export default function LoadingState({ text }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <div className="relative h-px w-56 overflow-hidden bg-sand">
        <span className="animate-sweep absolute inset-y-0 left-0 w-1/3 bg-umber" />
      </div>
      <p className="mt-8 font-display text-xl font-light text-umber tracking-tightish">
        {text}
      </p>
    </div>
  );
}
