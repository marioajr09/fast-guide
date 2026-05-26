import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowDown, ArrowLeft, ArrowUp, Check, Pin, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { myChecklistPinKey, useMyChecklists } from "@/store/my-checklists";
import { usePinnedChecklists } from "@/store/pinned-checklists";

export const Route = createFileRoute("/app/my-checklist/$id")({
  component: MyChecklistPage,
});

function MyChecklistPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const {
    checklists,
    renameChecklist,
    addItem,
    updateItem,
    deleteItem,
    moveItem,
    deleteChecklist,
  } = useMyChecklists();
  const { has: hasPinnedChecklist, toggle: togglePinnedChecklist } = usePinnedChecklists();
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const checklist = checklists[id];
  const pinKey = myChecklistPinKey(id);
  const checklistPinned = hasPinnedChecklist(pinKey);

  if (!checklist) {
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

  const removeChecklist = () => {
    if (!window.confirm("Apagar este checklist?")) return;
    if (checklistPinned) togglePinnedChecklist(pinKey);
    deleteChecklist(id);
    navigate({ to: "/app/checklists" });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Link
          to="/app/checklists"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>
        <div className="flex items-center gap-2">
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
          <button
            onClick={removeChecklist}
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-muted-foreground hover:text-destructive"
            aria-label="Apagar checklist"
            title="Apagar checklist"
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
          value={checklist.name}
          onChange={(event) => renameChecklist(id, event.target.value)}
          className="mt-2 w-full rounded-2xl border border-border bg-card px-4 py-3 font-display text-xl font-semibold outline-none focus:border-primary"
          placeholder="Nome do checklist"
        />
        <p className="mt-2 text-xs text-muted-foreground">Checklist independente</p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="space-y-2">
          {checklist.items.map((item, index) => {
            const on = checked[item.id];
            return (
              <div
                key={item.id}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-xl border border-border bg-background p-2"
              >
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => moveItem(id, item.id, -1)}
                    disabled={index === 0}
                    className="grid h-7 w-7 place-items-center rounded-md border border-border text-muted-foreground disabled:opacity-30"
                    aria-label="Mover item para cima"
                    title="Mover para cima"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => moveItem(id, item.id, 1)}
                    disabled={index === checklist.items.length - 1}
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
                    onChange={(event) => updateItem(id, item.id, event.target.value)}
                    className={`min-h-11 w-full rounded-lg border border-border bg-card px-3 text-sm outline-none focus:border-primary ${
                      on ? "text-muted-foreground line-through" : ""
                    }`}
                    placeholder="Novo item do checklist"
                  />
                </div>

                <button
                  onClick={() => {
                    deleteItem(id, item.id);
                    setChecked((current) => {
                      const next = { ...current };
                      delete next[item.id];
                      return next;
                    });
                  }}
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
            onClick={() => addItem(id)}
            className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-primary/60 bg-primary/10 px-3 py-2 text-sm text-primary"
          >
            <Plus className="h-4 w-4" /> Adicionar check
          </button>
        </div>
      </div>
    </div>
  );
}
