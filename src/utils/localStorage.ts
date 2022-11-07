/**
 * Making work with Localstorage safe
 */

const setItem = (key: string, value: Record<string, unknown>) => {
  try {
    return localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

const getItem = (key: string): Record<string, unknown> | undefined => {
  try {
    return JSON.parse(localStorage.getItem(key) ?? "null") ?? undefined;
  } catch {
    return undefined;
  }
};

export { setItem, getItem };
