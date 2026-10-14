export function knotSeed(idx: number): number {
  return (idx + 1) * 0x9e3779b9;
}

export function mulberry32(seed: number): () => number {
  let a = seed | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Chords whose endpoints interleave around the cycle cross; rejecting those
// keeps the graph outerplanar (always drawable without crossings). A maximal
// non-crossing set has nodeCount - 3 chords, and nodeCount >= 7 for every
// current combo, so 4 chords always fit.
function chordsCross(a: number, b: number, c: number, d: number): boolean {
  const [lo1, hi1] = a < b ? [a, b] : [b, a];
  const [lo2, hi2] = c < d ? [c, d] : [d, c];
  return (lo1 < lo2 && lo2 < hi1 && hi1 < hi2) || (lo2 < lo1 && lo1 < hi2 && hi2 < hi1);
}

// Cycle + 4 chords for the detangling knot. The seed stream starts with the
// node-position draws (2 per node, consumed by the caller) so the chord set
// matches the historical per-idx seeds.
export function generateKnotEdges(nodeCount: number, seed: number): [number, number][] {
  const rng = mulberry32(seed);
  for (let i = 0; i < nodeCount; i++) {
    rng();
    rng();
  }
  const edges: [number, number][] = [];
  for (let i = 0; i < nodeCount; i++) edges.push([i, (i + 1) % nodeCount]);
  while (edges.length < nodeCount + 4) {
    const a = Math.floor(rng() * nodeCount);
    const b = Math.floor(rng() * nodeCount);
    if (a === b) continue;
    if (edges.some(([x, y]) => (x === a && y === b) || (x === b && y === a))) continue;
    const chords = edges.slice(nodeCount);
    if (chords.some(([x, y]) => chordsCross(a, b, x, y))) continue;
    edges.push([a, b]);
  }
  return edges;
}
