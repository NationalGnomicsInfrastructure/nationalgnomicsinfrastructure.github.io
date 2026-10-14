// Planarity guard for the detangling knot generator: every access-code seed
// must yield a knot that can be drawn without crossings. Independent oracle:
// place nodes evenly on a unit circle and test chord segments for proper
// intersections (geometry, not the generator's index-order predicate).
import { generateKnotEdges, knotSeed } from '../src/lib/knot.ts';
import {
  RETRIEVAL_ANSWERS_ENC,
  SPIRIT_ANIMALS_ENC,
  decodeAnswerList,
} from '../src/lib/platform-content.ts';

const pipelines = decodeAnswerList(RETRIEVAL_ANSWERS_ENC);
const animals = decodeAnswerList(SPIRIT_ANIMALS_ENC);

const orient = (ax, ay, bx, by, cx, cy) => (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
const properlyCross = (a, b, c, d) =>
  orient(...a, ...b, ...c) * orient(...a, ...b, ...d) < 0 &&
  orient(...c, ...d, ...a) * orient(...c, ...d, ...b) < 0;

let failed = false;
for (let idx = 0; idx < pipelines.length; idx++) {
  const n = (pipelines[idx] + animals[idx]).replace(/[^a-z]/gi, '').length;
  const edges = generateKnotEdges(n, knotSeed(idx));
  const pts = Array.from({ length: n }, (_, i) => {
    const t = (2 * Math.PI * i) / n - Math.PI / 2;
    return [Math.cos(t), Math.sin(t)];
  });
  let crossings = 0;
  for (let i = 0; i < edges.length; i++) {
    for (let j = i + 1; j < edges.length; j++) {
      const [a, b] = edges[i];
      const [c, d] = edges[j];
      if (a === c || a === d || b === c || b === d) continue;
      if (properlyCross(pts[a], pts[b], pts[c], pts[d])) crossings++;
    }
  }
  const ok = crossings === 0 && edges.length === n + 4;
  console.log(
    `idx ${String(idx).padStart(2)} ${pipelines[idx].padEnd(12)} nodes=${String(n).padStart(2)} edges=${edges.length} crossings=${crossings} ${ok ? 'ok' : 'FAIL'}`,
  );
  if (!ok) failed = true;
}
if (failed) {
  console.error('knot generator produced an unwinnable seed');
  process.exit(1);
}
console.log('all seeds planar');
