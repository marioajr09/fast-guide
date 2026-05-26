import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Search as SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { procedures } from "@/data/procedures";

export const Route = createFileRoute("/app/search")({
  component: SearchPage,
});

const quickSearches = ["frequência", "drenagem", "tempo", "higienização", "proteção", "gel", "checklist", "temperatura"];

function normalizeSearchText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function SearchPage() {
  const [q, setQ] = useState("");
  const hasSearch = q.trim().length > 0;

  const results = useMemo(() => {
    const term = normalizeSearchText(q.trim());
    if (!term) return [];
    return procedures.filter((p) => {
      const hay = normalizeSearchText([
        p.name,
        p.tagline,
        p.info.title,
        ...p.info.parameters.map((x) => `${x.label} ${x.value}`),
        ...p.info.checklist,
        ...p.info.commonErrors,
        ...p.info.contraindications,
      ]
        .join(" "));
      return hay.includes(term);
    });
  }, [q]);

  return (
    <div className="space-y-5">
      <Link to="/app" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Link>

      <div className="space-y-2">
        <label htmlFor="procedure-search" className="text-xs uppercase tracking-widest text-muted-foreground">
          Digite para pesquisar:
        </label>
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3">
          <SearchIcon className="h-4 w-4 text-muted-foreground" />
          <input
            id="procedure-search"
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ex: frequencia, microagulhamento, tempo..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {!hasSearch ? (
        <div className="space-y-3">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
            Buscas rápidas
          </div>
          <div className="flex flex-wrap gap-2">
            {quickSearches.map((term) => (
              <button
                key={term}
                onClick={() => setQ(term)}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition hover:text-foreground"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            {results.length} resultado{results.length === 1 ? "" : "s"}
          </div>
          {results.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.id}
                to="/app/procedure/$id"
                params={{ id: p.id }}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
              >
                <div className={`grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br ${p.color} text-white`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="truncate font-display text-sm font-semibold">{p.info.title}</div>
                  <div className="truncate text-xs text-muted-foreground">{p.tagline}</div>
                </div>
              </Link>
            );
          })}
          {results.length === 0 && (
            <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              Nada encontrado. Tente outro termo.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
