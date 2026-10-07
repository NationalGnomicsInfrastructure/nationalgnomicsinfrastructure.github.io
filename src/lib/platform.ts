export function codeIdx(max: number): number {
  const idx = parseInt(localStorage.getItem('code_idx') ?? '', 10);
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

export function onForm(opts: {
  inputId: string;
  doneKey: string;
  check: (value: string) => boolean;
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

  submitBtn.addEventListener('click', () => {
    if (!opts.check(input.value)) {
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
