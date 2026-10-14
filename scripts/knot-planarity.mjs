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
const PROJECT_COUNT = pipelines.length;

const orient = (ax, ay, bx, by, cx, cy) => (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
const properlyCross = (a, b, c, d) =>
  orient(...a, ...b, ...c) * orient(...a, ...b, ...d) < 0 &&
  orient(...c, ...d, ...a) * orient(...c, ...d, ...b) < 0;

let failed = false;
let checked = 0;

function checkKnot(label, letters, seed) {
  const n = letters.length;
  const edges = generateKnotEdges(n, seed);
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
  checked++;
  if (!ok) {
    failed = true;
    console.log(`FAIL ${label} nodes=${n} edges=${edges.length} crossings=${crossings}`);
  }
}

// Fixed-mode seeds (classic code_idx experience).
for (let idx = 0; idx < PROJECT_COUNT; idx++) {
  const letters = (pipelines[idx] + animals[idx]).replace(/[^a-z]/gi, '');
  checkKnot(`fixed idx=${idx}`, letters, knotSeed(idx));
}

// Random-mode seeds: every (animal × pipeline) combo.
for (let a = 0; a < PROJECT_COUNT; a++) {
  for (let p = 0; p < PROJECT_COUNT; p++) {
    const letters = (pipelines[p] + animals[a]).replace(/[^a-z]/gi, '');
    checkKnot(`random a=${a} p=${p}`, letters, knotSeed(a * PROJECT_COUNT + p + PROJECT_COUNT));
  }
}

if (failed) {
  console.error('knot generator produced an unwinnable seed');
  process.exit(1);
}
console.log(`all ${checked} seeds planar`);
