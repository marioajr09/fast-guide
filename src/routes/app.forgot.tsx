import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { procedures } from "@/data/procedures";

export const Route = createFileRoute("/app/forgot")({
  component: Forgot,
});

function Forgot() {
  return (
    <div className="space-y-6">
      <Link to="/app" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Voltar
      </Link>
      <div>
        <span className="text-xs uppercase tracking-widest text-primary">Esqueci isso</span>
        <h1 className="mt-2 font-display text-2xl font-semibold">
          Qual procedimento você está fazendo?
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Toque para abrir o guia rápido.</p>
      </div>

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
              <div className="flex items-center gap-3">
                <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${p.color} text-white`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-display text-base font-semibold">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.tagline}</div>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">Abrir →</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
