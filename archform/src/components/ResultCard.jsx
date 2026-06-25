// Generic result tile. `index` drives the stagger delay so sections reveal in
// sequence. Children render arbitrary content (strategy text, material scores…).
export default function ResultCard({ title, children, index = 0 }) {
  return (
    <div
      className="animate-rise rounded-2xl border border-sand bg-surface p-5 shadow-card transition duration-300 ease-soft hover:-translate-y-0.5 hover:shadow-lift"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {title && (
        <h4 className="text-sm md:text-base text-ink leading-relaxed">{title}</h4>
      )}
      {children}
    </div>
  );
}
