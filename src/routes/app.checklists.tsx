import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CircleHelp, ClipboardList, ListChecks, Plus } from "lucide-react";
import { procedures, type Procedure } from "@/data/procedures";
import { useCustomChecklists, type ChecklistItem } from "@/store/custom-checklists";
import { useMyChecklists, type MyChecklist } from "@/store/my-checklists";
import { usePinnedChecklists } from "@/store/pinned-checklists";

export const Route = createFileRoute("/app/checklists")({
  component: Checklists,
});

const checklistIdeas = [
  "preparação geral da cabine",
  "biossegurança",
  "anamnese",
  "pós-atendimento",
  "materiais para aula/prática",
  "rotina própria de estágio ou clínica",
];

interface ProcedureChecklistCardProps {
  checklist: ChecklistItem[] | string[];
  procedure: Procedure;
  showCustomTag?: boolean;
}

function ProcedureChecklistCard({
  checklist,
  procedure,
  showCustomTag = false,
}: ProcedureChecklistCardProps) {
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
      <ItemCount count={checklist.length} />
    </Link>
  );
}

function MyChecklistCard({
  checklist,
  showPinnedTag = false,
}: {
  checklist: MyChecklist;
  showPinnedTag?: boolean;
}) {
  return (
    <Link
      to="/app/my-checklist/$id"
      params={{ id: checklist.id }}
      className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
    >
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
        <ClipboardList className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-display text-sm font-semibold">{checklist.name}</div>
        <div className="truncate text-xs text-muted-foreground">Checklist independente</div>
        {showPinnedTag && (
          <div className="mt-1 inline-flex rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-[10px] text-primary">
            Meu checklist
          </div>
        )}
      </div>
      <ItemCount count={checklist.items.length} />
    </Link>
  );
}

function ItemCount({ count }: { count: number }) {
  return (
    <div className="shrink-0 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-muted-foreground">
      {count} {count === 1 ? "item" : "itens"}
    </div>
  );
}

function Checklists() {
  const navigate = useNavigate();
  const customChecklists = useCustomChecklists();
  const { checklists } = useMyChecklists();
  const { pinned } = usePinnedChecklists();
  const myChecklists = Object.values(checklists).sort((a, b) => a.createdAt - b.createdAt);

  const pinnedItems = pinned
    .map((key) => {
      if (key.startsWith("my:")) {
        const checklist = checklists[key.slice(3)];
        return checklist ? ({ type: "my", checklist } as const) : null;
      }

      const procedure = procedures.find((item) => item.id === key);
      if (!procedure) return null;
      return {
        type: "procedure",
        procedure,
        checklist: customChecklists[key] ?? procedure.info.checklist,
        isCustom: Boolean(customChecklists[key]),
      } as const;
    })
    .filter((item) => item !== null);

  const pinnedMyIds = new Set(
    pinned.filter((key) => key.startsWith("my:")).map((key) => key.slice(3)),
  );
  const myItems = myChecklists.filter((checklist) => !pinnedMyIds.has(checklist.id));

  const customItems = procedures
    .map((procedure) => ({
      procedure,
      checklist: customChecklists[procedure.id],
    }))
    .filter((item) => item.checklist && !pinned.includes(item.procedure.id));

  const hasAnyChecklist = pinnedItems.length > 0 || myItems.length > 0 || customItems.length > 0;

  const createAndOpenChecklist = () => {
    navigate({ to: "/app/my-checklist/$id", params: { id: "new" } });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Checklists</h1>
          <p className="text-sm text-muted-foreground">Seus roteiros fixados e personalizados.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="group relative">
            <button
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground"
              aria-label="Ver ideias de checklist"
              title="Ideias de checklist"
            >
              <CircleHelp className="h-4 w-4" />
            </button>
            <div className="pointer-events-none absolute right-0 top-10 z-10 w-64 rounded-xl border border-border bg-popover p-3 text-xs text-popover-foreground opacity-0 shadow-card transition group-hover:opacity-100 group-focus-within:opacity-100">
              <div className="mb-2 font-display font-semibold">Ideias para o dia a dia</div>
              <ul className="space-y-1 text-muted-foreground">
                {checklistIdeas.map((idea) => (
                  <li key={idea}>{idea}</li>
                ))}
              </ul>
            </div>
          </div>
          <button
            onClick={createAndOpenChecklist}
            className="grid h-11 w-11 place-items-center rounded-full border border-primary bg-background text-primary shadow-glow transition hover:bg-primary hover:text-primary-foreground"
            aria-label="Criar checklist"
            title="Adicionar checklist"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
      </div>

      {!hasAnyChecklist ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center">
          <ListChecks className="mx-auto h-6 w-6 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            Fixe, personalize ou crie um checklist para ele aparecer aqui.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {pinnedItems.length > 0 && (
            <section className="space-y-3">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Fixados</div>
              <div className="space-y-2">
                {pinnedItems.map((item) =>
                  item.type === "my" ? (
                    <MyChecklistCard
                      key={`my-${item.checklist.id}`}
                      checklist={item.checklist}
                      showPinnedTag
                    />
                  ) : (
                    <ProcedureChecklistCard
                      key={`procedure-${item.procedure.id}`}
                      procedure={item.procedure}
                      checklist={item.checklist}
                      showCustomTag={item.isCustom}
                    />
                  ),
                )}
              </div>
            </section>
          )}

          {myItems.length > 0 && (
            <section className="space-y-3">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Meus checklists
              </div>
              <div className="space-y-2">
                {myItems.map((checklist) => (
                  <MyChecklistCard key={checklist.id} checklist={checklist} />
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
                  <ProcedureChecklistCard
                    key={procedure.id}
                    procedure={procedure}
                    checklist={checklist}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
