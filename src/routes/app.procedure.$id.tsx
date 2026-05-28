import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Bookmark,
  Check,
  ChevronDown,
  ChevronUp,
  Pencil,
  Pin,
  Play,
  Plus,
  RotateCcw,
  Trash2,
  AlertTriangle,
  Ban,
  Lightbulb,
  Sliders,
  ListChecks,
  BookOpen,
} from "lucide-react";
import { useEffect, useState } from "react";
import { VideoPlayer } from "@/components/VideoPlayer";
import { procedures, forgotOptions, type ForgotKey } from "@/data/procedures";
import { useCustomChecklist } from "@/store/custom-checklists";
import { useFavorites } from "@/store/favorites";
import { usePinnedChecklists } from "@/store/pinned-checklists";

import type { ParameterGroup, VideoSource } from "@/data/procedures";

type BaseTab = "video" | "tutorial" | "checklist" | "errors" | "contra" | "params";
type Tab = BaseTab | string;
type ProcedureSource = "checklists" | "favorites" | "search";

const baseTabKeys: BaseTab[] = ["video", "tutorial", "checklist", "errors", "contra", "params"];
const sourceKeys: ProcedureSource[] = ["checklists", "favorites", "search"];
const QUICK_SHORTCUTS_OPEN_KEY = "esteti-quick-shortcuts-open";

const backRoutes: Record<ProcedureSource, "/app/checklists" | "/app/favorites" | "/app/search"> = {
  checklists: "/app/checklists",
  favorites: "/app/favorites",
  search: "/app/search",
};

function readQuickShortcutsOpen() {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(QUICK_SHORTCUTS_OPEN_KEY) !== "false";
}

export const Route = createFileRoute("/app/procedure/$id")({
  loader: ({ params }): { procId: string } => {
    const proc = procedures.find((p) => p.id === params.id);
    if (!proc) throw notFound();
    return { procId: proc.id };
  },
  validateSearch: (search: Record<string, unknown>): { tab?: string; from?: ProcedureSource } => ({
    tab: typeof search.tab === "string" ? search.tab : undefined,
    from: sourceKeys.includes(search.from as ProcedureSource)
      ? (search.from as ProcedureSource)
      : undefined,
  }),
  component: ProcedurePage,
  notFoundComponent: () => (
    <div className="p-10 text-center text-sm text-muted-foreground">
      Procedimento não encontrado.
    </div>
  ),
});

const baseTabs: { key: BaseTab; label: string; icon: typeof Play }[] = [
  { key: "video", label: "Vídeo", icon: Play },
  { key: "tutorial", label: "Tutorial", icon: BookOpen },
  { key: "checklist", label: "Checklist", icon: ListChecks },
  { key: "params", label: "Parâmetros", icon: Sliders },
  { key: "errors", label: "Erros", icon: AlertTriangle },
  { key: "contra", label: "Contraind.", icon: Ban },
];

function ParameterGroupsView({ groups }: { groups: ParameterGroup[] }) {
  return (
    <div className="space-y-5">
      {groups.map((group) => (
        <section key={group.title || "default"}>
          {group.title && (
            <h3 className="mb-2 text-xs uppercase tracking-widest text-primary">{group.title}</h3>
          )}
          <div className="divide-y divide-border">
            {group.items.map((p) => (
              <div key={`${group.title}-${p.label}`} className="grid gap-1 py-3 text-sm">
                <span className="min-w-0 text-muted-foreground">{p.label}</span>
                <span className="min-w-0 font-display font-semibold leading-relaxed text-foreground">
                  {p.value}
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function ProcedureVideo({
  video,
  fallbackLength,
}: {
  video?: VideoSource;
  fallbackLength: string;
}) {
  if (!video) {
    return (
      <div>
        <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-background to-card">
          <div className="absolute inset-0 grid place-items-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow">
              <Play className="h-7 w-7" fill="currentColor" />
            </div>
          </div>
          <span className="absolute bottom-2 right-2 rounded-md bg-background/80 px-2 py-0.5 text-[11px] text-muted-foreground">
            {fallbackLength}
          </span>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Cadastre uma URL do YouTube ou um arquivo local para liberar o player nesta aula.
        </p>
      </div>
    );
  }

  return (
    <VideoPlayer
      src={video.type === "youtube" ? video.url : video.src}
      poster={video.type === "local" ? video.poster : undefined}
      title={video.title ?? "Video do procedimento"}
    />
  );
}

function ProcedurePage() {
  const { procId } = Route.useLoaderData() as { procId: string };
  const search = Route.useSearch();
  const proc = procedures.find((p) => p.id === procId);
  const backTo = search.from ? backRoutes[search.from] : "/app";

  if (!proc) throw notFound();

  const { has, toggle } = useFavorites();
  const { has: hasPinnedChecklist, toggle: togglePinnedChecklist } = usePinnedChecklists();
  const checklistPinned = hasPinnedChecklist(proc.id);
  const Icon = proc.icon;
  const extraTabs = proc.info.extraTabs ?? [];
  const tabs = [
    ...baseTabs,
    ...extraTabs.map((extraTab) => ({
      key: extraTab.key,
      label: extraTab.label,
      icon: Lightbulb,
    })),
  ];
  const validTabKeys = tabs.map((item) => item.key);
  const [tab, setTab] = useState<Tab>(
    search.tab && validTabKeys.includes(search.tab) ? search.tab : "video",
  );
  const [forgot, setForgot] = useState<ForgotKey | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [editingChecklist, setEditingChecklist] = useState(false);
  const [quickShortcutsOpen, setQuickShortcutsOpen] = useState(readQuickShortcutsOpen);
  const {
    items: checklistItems,
    hasCustomChecklist,
    startCustomizing,
    updateItem,
    addItem,
    deleteItem,
    moveItem,
    reset,
  } = useCustomChecklist(proc.id, proc.info.checklist);

  useEffect(() => {
    if (!search.tab) return;
    setTab(validTabKeys.includes(search.tab) ? search.tab : "video");
  }, [search.tab, validTabKeys.join("|")]);

  useEffect(() => {
    localStorage.setItem(QUICK_SHORTCUTS_OPEN_KEY, String(quickShortcutsOpen));
  }, [quickShortcutsOpen]);

  const tabFromForgot = (k: ForgotKey): Tab => {
    if (k === "parametros" || k === "tempo") return "params";
    if (k === "sequencia") {
      return extraTabs.some((extraTab) => extraTab.key === "sequencia") ? "sequencia" : "checklist";
    }
    if (k === "configuracao") return "tutorial";
    return "tutorial";
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Link
          to={backTo}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>
        <button
          onClick={() => toggle(proc.id)}
          className={`grid h-9 w-9 place-items-center rounded-full border border-border ${
            has(proc.id) ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"
          }`}
          aria-label="Favoritar"
        >
          <Bookmark className="h-4 w-4" fill={has(proc.id) ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div
          className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${proc.color} text-white`}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-display text-xl font-semibold leading-tight">{proc.info.title}</h1>
          <p className="text-xs text-muted-foreground">{proc.tagline}</p>
        </div>
      </div>

      {/* O que você esqueceu? */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <button
          onClick={() => setQuickShortcutsOpen((value) => !value)}
          className={`flex w-full items-center justify-between gap-3 text-left ${
            quickShortcutsOpen ? "min-h-7 py-1" : "min-h-4 py-0.5"
          }`}
          aria-expanded={quickShortcutsOpen}
        >
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Atalhos rápidos
          </span>
          {quickShortcutsOpen ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
        {quickShortcutsOpen && (
          <>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {forgotOptions.map((o) => (
                <button
                  key={o.key}
                  onClick={() => {
                    setForgot(o.key);
                    setTab(tabFromForgot(o.key));
                  }}
                  className={`rounded-full border px-3 py-1.5 text-xs transition ${
                    forgot === o.key
                      ? "border-primary bg-primary/15 text-foreground"
                      : "border-border bg-background text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
            {forgot && (
              <p className="mt-3 text-xs text-muted-foreground">
                {forgotOptions.find((o) => o.key === forgot)?.hint}
              </p>
            )}
          </>
        )}
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {tabs.map((t) => {
          const TIcon = t.icon;
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition ${
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              <TIcon className="h-3.5 w-3.5 shrink-0" /> <span className="truncate">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="rounded-2xl border border-border bg-card p-4">
        {tab === "video" && (
          <div>
            <ProcedureVideo video={proc.info.video} fallbackLength={proc.info.videoLength} />
            <p className="mt-3 text-sm text-muted-foreground">
              Vídeo curto demonstrando a técnica completa.
            </p>
          </div>
        )}

        {tab === "tutorial" && (
          <ol className="space-y-3">
            {proc.info.tutorial.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="text-foreground/90">{step}</span>
              </li>
            ))}
          </ol>
        )}

        {tab === "checklist" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Checklist</p>
                {hasCustomChecklist && (
                  <p className="mt-0.5 text-[11px] text-primary">Personalizado neste dispositivo</p>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => togglePinnedChecklist(proc.id)}
                  className={`grid h-9 w-9 place-items-center rounded-full border ${
                    checklistPinned
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label={checklistPinned ? "Desfixar checklist" : "Fixar checklist"}
                  title={checklistPinned ? "Desfixar checklist" : "Fixar checklist"}
                >
                  <Pin className="h-4 w-4" fill={checklistPinned ? "currentColor" : "none"} />
                </button>
                {editingChecklist && hasCustomChecklist && (
                  <button
                    onClick={() => {
                      if (window.confirm("Redefinir este checklist para o padrão do app?")) {
                        reset();
                        setChecked({});
                      }
                    }}
                    className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground"
                    aria-label="Redefinir checklist"
                    title="Redefinir checklist"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={() => {
                    if (!editingChecklist) startCustomizing();
                    setEditingChecklist((value) => !value);
                  }}
                  className={`grid h-9 w-9 place-items-center rounded-full border ${
                    editingChecklist
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label={editingChecklist ? "Concluir edição" : "Editar checklist"}
                  title={editingChecklist ? "Concluir edição" : "Editar checklist"}
                >
                  {editingChecklist ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Pencil className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {editingChecklist ? (
              <div className="space-y-2">
                {checklistItems.map((item, i) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-xl border border-border bg-background p-2"
                  >
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => moveItem(item.id, -1)}
                        disabled={i === 0}
                        className="grid h-7 w-7 place-items-center rounded-md border border-border text-muted-foreground disabled:opacity-30"
                        aria-label="Mover item para cima"
                        title="Mover para cima"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => moveItem(item.id, 1)}
                        disabled={i === checklistItems.length - 1}
                        className="grid h-7 w-7 place-items-center rounded-md border border-border text-muted-foreground disabled:opacity-30"
                        aria-label="Mover item para baixo"
                        title="Mover para baixo"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <input
                      value={item.text}
                      onChange={(event) => updateItem(item.id, event.target.value)}
                      className="min-h-11 w-full rounded-lg border border-border bg-card px-3 text-sm outline-none focus:border-primary"
                      placeholder="Novo item do checklist"
                    />
                    <button
                      onClick={() => {
                        deleteItem(item.id);
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
                ))}
                <button
                  onClick={addItem}
                  className="inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-dashed border-primary/60 bg-primary/10 px-3 py-2 text-sm text-primary"
                >
                  <Plus className="h-4 w-4" /> Adicionar check
                </button>
              </div>
            ) : (
              <ul className="space-y-2">
                {checklistItems.map((item) => {
                  const on = checked[item.id];
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setChecked((c) => ({ ...c, [item.id]: !c[item.id] }))}
                        className="flex w-full items-start gap-3 rounded-xl border border-border bg-background p-3 text-left text-sm"
                      >
                        <span
                          className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition ${
                            on
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-border bg-card"
                          }`}
                        >
                          {on && <Check className="h-3.5 w-3.5" />}
                        </span>
                        <span
                          className={`flex-1 leading-relaxed ${on ? "text-muted-foreground line-through" : ""}`}
                        >
                          {item.text}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}

        {tab === "params" && (
          <ParameterGroupsView
            groups={proc.info.parameterGroups ?? [{ title: "", items: proc.info.parameters }]}
          />
        )}

        {extraTabs.map(
          (extraTab) =>
            tab === extraTab.key && (
              <ParameterGroupsView key={extraTab.key} groups={extraTab.groups} />
            ),
        )}

        {tab === "errors" && (
          <ul className="space-y-2">
            {proc.info.commonErrors.map((e, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-border bg-background p-3 text-sm"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                {e}
              </li>
            ))}
          </ul>
        )}

        {tab === "contra" && (
          <ul className="space-y-2">
            {proc.info.contraindications.map((c, i) => (
              <li
                key={i}
                className="flex items-start gap-3 rounded-xl border border-border bg-background p-3 text-sm"
              >
                <Ban className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="text-center text-[11px] text-muted-foreground">
        Conteúdo de referência. Sempre siga o protocolo da sua instituição.
      </p>
    </div>
  );
}
