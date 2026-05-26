import { useCallback, useEffect, useMemo, useState } from "react";

const KEY = "esteti-custom-checklists";

export interface ChecklistItem {
  id: string;
  text: string;
}

type StoredChecklists = Record<string, ChecklistItem[]>;

function read(): StoredChecklists {
  if (typeof window === "undefined") return {};
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function write(next: StoredChecklists) {
  localStorage.setItem(KEY, JSON.stringify(next));
}

function defaultItems(items: string[]): ChecklistItem[] {
  return items.map((text, index) => ({ id: `default-${index}`, text }));
}

function createItemId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `custom-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function useCustomChecklist(procedureId: string, defaults: string[]) {
  const fallbackItems = useMemo(() => defaultItems(defaults), [defaults]);
  const [stored, setStored] = useState<StoredChecklists>({});

  useEffect(() => {
    setStored(read());
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setStored(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const customItems = stored[procedureId];
  const hasCustomChecklist = Boolean(customItems);
  const items = customItems ?? fallbackItems;

  const saveItems = useCallback(
    (updater: ChecklistItem[] | ((items: ChecklistItem[]) => ChecklistItem[])) => {
      setStored((prev) => {
        const current = prev[procedureId] ?? fallbackItems;
        const nextItems = typeof updater === "function" ? updater(current) : updater;
        const next = { ...prev, [procedureId]: nextItems };
        write(next);
        return next;
      });
    },
    [fallbackItems, procedureId],
  );

  const startCustomizing = useCallback(() => {
    saveItems((current) => current);
  }, [saveItems]);

  const updateItem = useCallback(
    (id: string, text: string) => {
      saveItems((current) => current.map((item) => (item.id === id ? { ...item, text } : item)));
    },
    [saveItems],
  );

  const addItem = useCallback(() => {
    saveItems((current) => [...current, { id: createItemId(), text: "Novo check" }]);
  }, [saveItems]);

  const deleteItem = useCallback(
    (id: string) => {
      saveItems((current) => current.filter((item) => item.id !== id));
    },
    [saveItems],
  );

  const moveItem = useCallback(
    (id: string, direction: -1 | 1) => {
      saveItems((current) => {
        const index = current.findIndex((item) => item.id === id);
        const nextIndex = index + direction;
        if (index < 0 || nextIndex < 0 || nextIndex >= current.length) return current;
        const next = [...current];
        const [item] = next.splice(index, 1);
        next.splice(nextIndex, 0, item);
        return next;
      });
    },
    [saveItems],
  );

  const reset = useCallback(() => {
    setStored((prev) => {
      const next = { ...prev };
      delete next[procedureId];
      write(next);
      return next;
    });
  }, [procedureId]);

  return {
    items,
    hasCustomChecklist,
    startCustomizing,
    updateItem,
    addItem,
    deleteItem,
    moveItem,
    reset,
  };
}
