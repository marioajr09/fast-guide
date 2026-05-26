import { createFileRoute, Link } from "@tanstack/react-router";
import { Grid2X2, List, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { procedures } from "@/data/procedures";

export const Route = createFileRoute("/app/")({
  component: AppHome,
});

type ProcedureView = "grid" | "list";

const VIEW_KEY = "esteti-procedure-view";

function readProcedureView(): ProcedureView {
  if (typeof window === "undefined") return "grid";
  return localStorage.getItem(VIEW_KEY) === "list" ? "list" : "grid";
}

function AppHome() {
  const [view, setView] = useState<ProcedureView>(() => readProcedureView());

  useEffect(() => {
    localStorage.setItem(VIEW_KEY, view);
  }, [view]);

  return (
    <div className="space-y-7">
      {/* Configurações e espaçamento da seção de pesquisa */}
      <section className="space-y-2 pt-2">
        <Link
          to="/app/search"
          className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-4 text-sm text-muted-foreground"
        >
          <Search className="h-4 w-4" /> Buscar procedimento, parâmetro, dúvida…
        </Link>
      </section>

      <section className="border-t border-border pt-5">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              Procedimentos
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">Abra o guia rápido do atendimento.</p>
          </div>
          <div className="flex rounded-full border border-border bg-card p-1">
            <button
              onClick={() => setView("grid")}
              className={`grid h-8 w-8 place-items-center rounded-full transition ${
                view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
              aria-label="Exibir em grade"
              title="Grade"
            >
              <Grid2X2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`grid h-8 w-8 place-items-center rounded-full transition ${
                view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
              aria-label="Exibir em lista"
              title="Lista"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {view === "grid" ? (
          <div className="grid grid-cols-2 gap-3">
            {procedures.map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.id}
                  to="/app/procedure/$id"
                  params={{ id: p.id }}
                  className="rounded-2xl border border-border bg-card p-4 transition hover:border-primary/40"
                >
                  <div
                    className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${p.color} text-white`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-3 font-display text-sm font-semibold">{p.name}</div>
                  <div className="text-[11px] text-muted-foreground">{p.tagline}</div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3">
            {procedures.map((p) => {
              const Icon = p.icon;
              return (
                <Link
                  key={p.id}
                  to="/app/procedure/$id"
                  params={{ id: p.id }}
                  className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 transition hover:border-primary/40"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${p.color} text-white`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate font-display text-base font-semibold">{p.name}</div>
                      <div className="truncate text-xs text-muted-foreground">{p.tagline}</div>
                    </div>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">Abrir →</span>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
