import { useCallback, useEffect, useState } from "react";

const KEY = "esteti-pinned-checklists";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function usePinnedChecklists() {
  const [pinned, setPinned] = useState<string[]>([]);

  useEffect(() => {
    setPinned(read());
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setPinned(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = useCallback((id: string) => {
    setPinned((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const has = useCallback((id: string) => pinned.includes(id), [pinned]);

  return { pinned, toggle, has };
}
