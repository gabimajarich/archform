export default function WaveBackground({ step = -1 }) {
  return (
    <div className="wave-bg" aria-hidden="true">
      {/* Base gradient canvas */}
      <div className="wave-base" />
      {/* Layered wave blobs — each drifts at its own speed */}
      <div className="wave-blob wave-blob-1" />
      <div className="wave-blob wave-blob-2" />
      <div className="wave-blob wave-blob-3" />
      <div className="wave-blob wave-blob-4" />
      <div className="wave-blob wave-blob-5" />
    </div>
  );
}
