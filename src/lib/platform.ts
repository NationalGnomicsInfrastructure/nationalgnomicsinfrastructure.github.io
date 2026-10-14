import { PROJECT_COUNT } from './platform-content';

export const KEYS = {
  agent: 'agent',
  codeIdx: 'code_idx',
  mode: 'mode',
  speciesDone: 'species_done',
  spiritAnimal: 'spirit_animal',
  accession: 'accession',
  detangled: 'detangled',
  identificationDone: 'identification_done',
  deliveryDone: 'delivery_done',
  deliveredName: 'delivered_name',
  missOrder: 'miss_order',
  retrievalGuesses: 'retrieval_guesses',
} as const;

// The random-mode combo survives Cancel Delivery on purpose: re-entering the
// universal code restores the same experience (decision: restore, not re-roll).
export const COMBO_KEY = 'combo';

export const SESSION_KEYS = Object.values(KEYS);

export function codeIdx(max: number): number {
  const idx = parseInt(localStorage.getItem(KEYS.codeIdx) ?? '', 10);
  if (Number.isNaN(idx) || idx < 0 || idx >= max) {
    window.location.href = '/platform/';
    throw new Error('No valid access code found — redirecting to platform.');
  }
  return idx;
}

export type Experience = { animalIdx: number; pipelineIdx: number; seed: number };

// Random-mode pick (`animalIdx:pipelineIdx`), or null when not in random mode.
// Never redirects — safe for public pages that just want to inject records.
export function randomPick(): { animalIdx: number; pipelineIdx: number } | null {
  if (localStorage.getItem(KEYS.mode) !== 'random') return null;
  const m = /^(\d+):(\d+)$/.exec(localStorage.getItem(COMBO_KEY) ?? '');
  if (!m) return null;
  const animalIdx = parseInt(m[1], 10);
  const pipelineIdx = parseInt(m[2], 10);
  const max = PROJECT_COUNT;
  if (animalIdx < 0 || animalIdx >= max || pipelineIdx < 0 || pipelineIdx >= max) {
    return null;
  }
  return { animalIdx, pipelineIdx };
}

// The whole game chain derives from this one pick: fixed mode is the classic
// code_idx pair; random mode uses the persisted combo. `seed` keeps the knot
// deterministic within a session (fixed seeds unchanged from the originals).
export function experience(): Experience {
  const pick = randomPick();
  if (pick) {
    return {
      ...pick,
      seed: pick.animalIdx * PROJECT_COUNT + pick.pipelineIdx + PROJECT_COUNT,
    };
  }
  const idx = codeIdx(PROJECT_COUNT);
  return { animalIdx: idx, pipelineIdx: idx, seed: idx };
}

export function requireFlag(key: string): void {
  if (!localStorage.getItem(key)) {
    window.location.href = '/platform/';
  }
}

export function clearSession(): void {
  for (const key of SESSION_KEYS) {
    localStorage.removeItem(key);
  }
}

export function disconnect(): void {
  clearSession();
  window.location.href = '/platform/';
}

export async function sha256(str: string): Promise<string> {
  const buf = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(str),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function onForm(opts: {
  inputId: string;
  doneKey: string;
  check: (value: string) => boolean | Promise<boolean>;
  onSuccess?: () => void;
}): void {
  const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;
  const formArea = document.getElementById('form-area') as HTMLDivElement;
  const resultArea = document.getElementById('result-area') as HTMLDivElement;
  const errorMsg = document.getElementById('error-msg') as HTMLDivElement;
  const input = document.getElementById(opts.inputId) as HTMLInputElement;

  const showResult = () => {
    formArea.style.display = 'none';
    resultArea.style.display = 'block';
    opts.onSuccess?.();
  };

  if (localStorage.getItem(opts.doneKey)) showResult();

  submitBtn.addEventListener('click', async () => {
    if (!(await opts.check(input.value))) {
      errorMsg.style.display = 'block';
      return;
    }
    errorMsg.style.display = 'none';
    localStorage.setItem(opts.doneKey, '1');
    showResult();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submitBtn.click();
  });
}

// Letters → DNA via (charCode − 65) % 4 → A/T/G/C. Same formula generated
// the `sequence` column in gnomics-db.csv.
export function toBases(letters: string[]): string[] {
  return letters.map((ch) => 'ATGC'[(ch.charCodeAt(0) - 65) % 4]);
}

// The access code is the first 7 bases of (animal + pipeline).
export function accessCode(animal: string, pipeline: string): string {
  return toBases(
    (animal + pipeline).replace(/[^a-z]/gi, '').toUpperCase().split(''),
  )
    .slice(0, 7)
    .join('');
}
