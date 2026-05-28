import { useEffect, useState, useCallback } from "react";
import { normalizeProcedureIds } from "@/data/procedures";

const KEY = "esteti-favs";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(parsed)
      ? normalizeProcedureIds(parsed.filter((item) => typeof item === "string"))
      : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(read());
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setFavorites(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const has = useCallback((id: string) => favorites.includes(id), [favorites]);

  return { favorites, toggle, has };
}
