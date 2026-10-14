export const SOCKS_KEY = 'socks_found';
export const SOCK_TOTAL = 7;

export function foundSocks(): number[] {
  try {
    const raw = localStorage.getItem(SOCKS_KEY);
    const arr: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(arr)) return [];
    return arr.filter(
      (n): n is number => Number.isInteger(n) && n >= 1 && n <= SOCK_TOTAL,
    );
  } catch {
    return [];
  }
}

export function markSockFound(id: number): number {
  if (!Number.isInteger(id) || id < 1 || id > SOCK_TOTAL) {
    return foundSocks().length;
  }
  const found = foundSocks();
  if (!found.includes(id)) {
    found.push(id);
    localStorage.setItem(SOCKS_KEY, JSON.stringify(found));
  }
  return found.length;
}
