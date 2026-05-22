import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavStore {
  favorites: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
}

export const useFavorites = create<FavStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggle: (id) =>
        set((s) => ({
          favorites: s.favorites.includes(id)
            ? s.favorites.filter((f) => f !== id)
            : [...s.favorites, id],
        })),
      has: (id) => get().favorites.includes(id),
    }),
    { name: "esteti-favs" }
  )
);
