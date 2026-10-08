export const KEYS = {
  mode: 'mode',
  codeIdx: 'code_idx',
  speciesDone: 'species_done',
  spiritAnimal: 'spirit_animal',
  accession: 'accession',
  detangled: 'detangled',
  identificationDone: 'identification_done',
  deliveryDone: 'delivery_done',
} as const;

export const SESSION_KEYS = [
  ...Object.values(KEYS),
  'team',
  'leader',
] as const;

export function codeIdx(max: number): number {
  const idx = parseInt(localStorage.getItem(KEYS.codeIdx) ?? '', 10);
  if (Number.isNaN(idx) || idx < 0 || idx >= max) {
    window.location.href = '/platform/';
  }
  return idx;
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
