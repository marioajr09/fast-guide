import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowDown, ArrowLeft, ArrowUp, Check, Pin, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { myChecklistPinKey, useMyChecklists, type MyChecklist } from "@/store/my-checklists";
import { usePinnedChecklists } from "@/store/pinned-checklists";

export const Route = createFileRoute("/app/my-checklist/$id")({
  component: MyChecklistPage,
});

function createDraftItemId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `draft-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function normalizeChecklist(checklist: MyChecklist) {
  return JSON.stringify({
    name: checklist.name,
    items: checklist.items.map((item) => item.text),
  });
}

function createNewDraft(): MyChecklist {
  return {
    id: "new",
    name: "Novo checklist",
    items: [{ id: createDraftItemId(), text: "Novo check" }],
    createdAt: Date.now(),
  };
}

function MyChecklistPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { checklists, createChecklistFromDraft, saveChecklist, deleteChecklist } =
    useMyChecklists();
  const { has: hasPinnedChecklist, toggle: togglePinnedChecklist } = usePinnedChecklists();
  const isNew = id === "new";
  const existingChecklist = isNew ? undefined : checklists[id];
  const [draft, setDraft] = useState<MyChecklist>(() => existingChecklist ?? createNewDraft());
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const pinKey = myChecklistPinKey(id);
  const checklistPinned = hasPinnedChecklist(pinKey);

  const initialSnapshot = useMemo(
    () => normalizeChecklist(existingChecklist ?? createNewDraft()),
    [existingChecklist],
  );
  const hasChanges = normalizeChecklist(draft) !== initialSnapshot;

  if (!isNew && !existingChecklist) {
    return (
      <div className="space-y-5">
        <Link
          to="/app/checklists"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          Checklist não encontrado.
        </div>
      </div>
    );
  }

  const saveDraft = () => {
    const cleanDraft = {
      ...draft,
      name: draft.name.trim() || "Novo checklist",
    };

    if (isNew) {
      const newId = createChecklistFromDraft({ name: cleanDraft.name, items: cleanDraft.items });
      navigate({ to: "/app/my-checklist/$id", params: { id: newId } });
      return newId;
    }

    saveChecklist({ ...cleanDraft, id, createdAt: existingChecklist?.createdAt ?? Date.now() });
    setDraft(cleanDraft);
    return id;
  };

  const handleBack = () => {
    if (hasChanges) {
      const shouldSave = window.confirm(
        "Salvar alterações antes de voltar? Clique em OK para salvar ou Cancelar para descartar.",
      );
      if (shouldSave) saveDraft();
    }
    navigate({ to: "/app/checklists" });
  };

  const removeChecklist = () => {
    if (isNew) {
      navigate({ to: "/app/checklists" });
      return;
    }

    if (!window.confirm("Apagar este checklist?")) return;
    if (checklistPinned) togglePinnedChecklist(pinKey);
    deleteChecklist(id);
    navigate({ to: "/app/checklists" });
  };

  const addDraftItem = () => {
    setDraft((current) => ({
      ...current,
      items: [...current.items, { id: createDraftItemId(), text: "Novo check" }],
    }));
  };

  const updateDraftItem = (itemId: string, text: string) => {
    setDraft((current) => ({
      ...current,
      items: current.items.map((item) => (item.id === itemId ? { ...item, text } : item)),
    }));
  };

  const deleteDraftItem = (itemId: string) => {
    setDraft((current) => ({
      ...current,
      items: current.items.filter((item) => item.id !== itemId),
    }));
    setChecked((current) => {
      const next = { ...current };
      delete next[itemId];
      return next;
    });
  };

  const moveDraftItem = (itemId: string, direction: -1 | 1) => {
    setDraft((current) => {
      const index = current.items.findIndex((item) => item.id === itemId);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= current.items.length) return current;
      const items = [...current.items];
      const [item] = items.splice(index, 1);
      items.splice(nextIndex, 0, item);
      return { ...current, items };
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar
        </button>
        <div className="flex items-center gap-2">
          {!isNew && (
            <button
              onClick={() => togglePinnedChecklist(pinKey)}
              className={`grid h-9 w-9 place-items-center rounded-full border ${
                checklistPinned
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
              aria-label={checklistPinned ? "Desfixar checklist" : "Fixar checklist"}
              title={checklistPinned ? "Desfixar checklist" : "Fixar checklist"}
            >
              <Pin className="h-4 w-4" fill={checklistPinned ? "currentColor" : "none"} />
            </button>
          )}
          <button
            onClick={saveDraft}
            className="grid h-9 w-9 place-items-center rounded-full border border-primary bg-primary text-primary-foreground"
            aria-label="Salvar checklist"
            title="Salvar checklist"
          >
            <Check className="h-4 w-4" />
          </button>
          <button
            onClick={removeChecklist}
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-muted-foreground hover:text-destructive"
            aria-label={isNew ? "Descartar checklist" : "Apagar checklist"}
            title={isNew ? "Descartar checklist" : "Apagar checklist"}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div>
        <label
          htmlFor="my-checklist-name"
          className="text-xs uppercase tracking-widest text-muted-foreground"
        >
          Nome do checklist
        </label>
        <input
          id="my-checklist-name"
          value={draft.name}
          onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))}
          className="mt-2 w-full rounded-2xl border border-border bg-card px-4 py-3 font-display text-xl font-semibold outline-none focus:border-primary"
          placeholder="Nome do checklist"
        />
        <p className="mt-2 text-xs text-muted-foreground">Checklist independente</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="space-y-2">
          {draft.items.map((item, index) => {
            const on = checked[item.id];
            return (
              <div
                key={item.id}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-xl border border-border bg-background p-2"
              >
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => moveDraftItem(item.id, -1)}
                    disabled={index === 0}
                    className="grid h-7 w-7 place-items-center rounded-md border border-border text-muted-foreground disabled:opacity-30"
                    aria-label="Mover item para cima"
                    title="Mover para cima"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => moveDraftItem(item.id, 1)}
                    disabled={index === draft.items.length - 1}
                    className="grid h-7 w-7 place-items-center rounded-md border border-border text-muted-foreground disabled:opacity-30"
                    aria-label="Mover item para baixo"
                    title="Mover para baixo"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="flex min-w-0 items-center gap-2">
                  <button
                    onClick={() =>
                      setChecked((current) => ({ ...current, [item.id]: !current[item.id] }))
                    }
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-md border transition ${
                      on
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card"
                    }`}
                    aria-label={on ? "Desmarcar item" : "Marcar item"}
                    title={on ? "Desmarcar item" : "Marcar item"}
                  >
                    {on && <Check className="h-4 w-4" />}
                  </button>
                  <input
                    value={item.text}
                    onChange={(event) => updateDraftItem(item.id, event.target.value)}
                    className={`min-h-11 w-full rounded-lg border border-border bg-card px-3 text-sm outline-none focus:border-primary ${
                      on ? "text-muted-foreground line-through" : ""
                    }`}
                    placeholder="Novo item do checklist"
                  />
                </div>

                <button
                  onClick={() => deleteDraftItem(item.id)}
                  className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground hover:text-destructive"
                  aria-label="Apagar item"
                  title="Apagar item"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            );
          })}
          <button
            onClick={addDraftItem}
            className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-primary/60 bg-primary/10 px-3 py-2 text-sm text-primary"
          >
            <Plus className="h-4 w-4" /> Adicionar check
          </button>
        </div>
      </div>
    </div>
  );
}
