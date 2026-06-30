// Resolves a real project photo at runtime from Wikipedia's REST summary API.
// CORS-enabled, returns a stable thumbnail URL keyed by article title. Results
// are cached in-module so each title is fetched at most once per session.
// On any failure the caller falls back to the generated SVG portrait.

import { useEffect, useState } from "react";

const cache = new Map(); // title -> { src } | null (failed)
const inflight = new Map(); // title -> Promise

export async function fetchWikiImage(title) {
  if (!title) return null;
  if (cache.has(title)) return cache.get(title);
  if (inflight.has(title)) return inflight.get(title);

  const p = (async () => {
    try {
      const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      const json = await res.json();
      let src = json?.thumbnail?.source || json?.originalimage?.source || null;
      // Reject logos, maps, crests and SVG-derived lead images — not building photos.
      if (src && /logo|\.svg|coat_of_arms|locator|wiki\w*\.map|flag_of/i.test(src)) {
        src = null;
      }
      const result = src ? { src, credit: json?.title } : null;
      cache.set(title, result);
      return result;
    } catch {
      cache.set(title, null);
      return null;
    } finally {
      inflight.delete(title);
    }
  })();

  inflight.set(title, p);
  return p;
}

// React hook: returns the resolved photo URL, or null while loading / on failure.
export function useWikiImage(title) {
  const cached = title && cache.has(title) ? cache.get(title) : undefined;
  const [src, setSrc] = useState(cached?.src ?? null);

  useEffect(() => {
    let active = true;
    if (!title) { setSrc(null); return; }
    if (cache.has(title)) { setSrc(cache.get(title)?.src ?? null); return; }
    fetchWikiImage(title).then((r) => { if (active) setSrc(r?.src ?? null); });
    return () => { active = false; };
  }, [title]);

  return src;
}
