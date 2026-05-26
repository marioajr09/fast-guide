import { useCallback, useEffect, useState } from "react";
import type { ChecklistItem } from "@/store/custom-checklists";

const KEY = "esteti-my-checklists";

export interface MyChecklist {
  id: string;
  name: string;
  items: ChecklistItem[];
  createdAt: number;
}

type StoredMyChecklists = Record<string, MyChecklist>;

function createItemId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `item-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function createChecklistId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `checklist-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function read(): StoredMyChecklists {
  if (typeof window === "undefined") return {};
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function write(next: StoredMyChecklists) {
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function myChecklistPinKey(id: string) {
  return `my:${id}`;
}

export function useMyChecklists() {
  const [checklists, setChecklists] = useState<StoredMyChecklists>(() => read());

  useEffect(() => {
    setChecklists(read());
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setChecklists(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const save = useCallback(
    (updater: StoredMyChecklists | ((current: StoredMyChecklists) => StoredMyChecklists)) => {
      setChecklists((current) => {
        const next = typeof updater === "function" ? updater(current) : updater;
        write(next);
        return next;
      });
    },
    [],
  );

  const createChecklist = useCallback(() => {
    const id = createChecklistId();
    const checklist: MyChecklist = {
      id,
      name: "Novo checklist",
      items: [{ id: createItemId(), text: "Novo check" }],
      createdAt: Date.now(),
    };
    save((current) => ({ ...current, [id]: checklist }));
    return id;
  }, [save]);

  const updateChecklist = useCallback(
    (id: string, updater: (checklist: MyChecklist) => MyChecklist) => {
      save((current) => {
        const checklist = current[id];
        if (!checklist) return current;
        return { ...current, [id]: updater(checklist) };
      });
    },
    [save],
  );

  const deleteChecklist = useCallback(
    (id: string) => {
      save((current) => {
        const next = { ...current };
        delete next[id];
        return next;
      });
    },
    [save],
  );

  const addItem = useCallback(
    (id: string) => {
      updateChecklist(id, (checklist) => ({
        ...checklist,
        items: [...checklist.items, { id: createItemId(), text: "Novo check" }],
      }));
    },
    [updateChecklist],
  );

  const updateItem = useCallback(
    (checklistId: string, itemId: string, text: string) => {
      updateChecklist(checklistId, (checklist) => ({
        ...checklist,
        items: checklist.items.map((item) => (item.id === itemId ? { ...item, text } : item)),
      }));
    },
    [updateChecklist],
  );

  const deleteItem = useCallback(
    (checklistId: string, itemId: string) => {
      updateChecklist(checklistId, (checklist) => ({
        ...checklist,
        items: checklist.items.filter((item) => item.id !== itemId),
      }));
    },
    [updateChecklist],
  );

  const moveItem = useCallback(
    (checklistId: string, itemId: string, direction: -1 | 1) => {
      updateChecklist(checklistId, (checklist) => {
        const index = checklist.items.findIndex((item) => item.id === itemId);
        const nextIndex = index + direction;
        if (index < 0 || nextIndex < 0 || nextIndex >= checklist.items.length) return checklist;
        const items = [...checklist.items];
        const [item] = items.splice(index, 1);
        items.splice(nextIndex, 0, item);
        return { ...checklist, items };
      });
    },
    [updateChecklist],
  );

  const renameChecklist = useCallback(
    (id: string, name: string) => {
      updateChecklist(id, (checklist) => ({ ...checklist, name }));
    },
    [updateChecklist],
  );

  return {
    checklists,
    createChecklist,
    renameChecklist,
    addItem,
    updateItem,
    deleteItem,
    moveItem,
    deleteChecklist,
  };
}
