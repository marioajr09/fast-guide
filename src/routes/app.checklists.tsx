import { createFileRoute, Link } from "@tanstack/react-router";
import { ListChecks } from "lucide-react";
import { procedures, type Procedure } from "@/data/procedures";
import { useCustomChecklists, type ChecklistItem } from "@/store/custom-checklists";
import { usePinnedChecklists } from "@/store/pinned-checklists";

export const Route = createFileRoute("/app/checklists")({
  component: Checklists,
});

interface ChecklistCardProps {
  checklist: ChecklistItem[] | string[];
  procedure: Procedure;
  showCustomTag?: boolean;
}

function ChecklistCard({ checklist, procedure, showCustomTag = false }: ChecklistCardProps) {
  const Icon = procedure.icon;

  return (
    <Link
      to="/app/procedure/$id"
      params={{ id: procedure.id }}
      search={{ tab: "checklist" }}
      className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
    >
      <div
        className={`grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br ${procedure.color} text-white`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-display text-sm font-semibold">{procedure.name}</div>
        <div className="truncate text-xs text-muted-foreground">{procedure.info.title}</div>
        {showCustomTag && (
          <div className="mt-1 inline-flex rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
            Personalizado
          </div>
        )}
      </div>
      <div className="shrink-0 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-muted-foreground">
        {checklist.length} {checklist.length === 1 ? "item" : "itens"}
      </div>
    </Link>
  );
}

function Checklists() {
  const customChecklists = useCustomChecklists();
  const { pinned } = usePinnedChecklists();

  const pinnedItems = pinned
    .map((id) => {
      const procedure = procedures.find((item) => item.id === id);
      if (!procedure) return null;
      return {
        procedure,
        checklist: customChecklists[id] ?? procedure.info.checklist,
        isCustom: Boolean(customChecklists[id]),
      };
    })
    .filter((item) => item !== null);

  const customItems = procedures
    .map((procedure) => ({
      procedure,
      checklist: customChecklists[procedure.id],
    }))
    .filter((item) => item.checklist && !pinned.includes(item.procedure.id));

  const hasAnyChecklist = pinnedItems.length > 0 || customItems.length > 0;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-semibold">Checklists</h1>
        <p className="text-sm text-muted-foreground">Seus roteiros fixados e personalizados.</p>
      </div>

      {!hasAnyChecklist ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center">
          <ListChecks className="mx-auto h-6 w-6 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            Fixe ou personalize um checklist em qualquer procedimento para ele aparecer aqui.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {pinnedItems.length > 0 && (
            <section className="space-y-3">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Fixados</div>
              <div className="space-y-2">
                {pinnedItems.map(({ procedure, checklist, isCustom }) => (
                  <ChecklistCard
                    key={procedure.id}
                    procedure={procedure}
                    checklist={checklist}
                    showCustomTag={isCustom}
                  />
                ))}
              </div>
            </section>
          )}

          {customItems.length > 0 && (
            <section className="space-y-3">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Personalizados
              </div>
              <div className="space-y-2">
                {customItems.map(({ procedure, checklist }) => (
                  <ChecklistCard key={procedure.id} procedure={procedure} checklist={checklist} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
