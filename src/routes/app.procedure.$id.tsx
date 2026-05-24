import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Bookmark, Check, Play, AlertTriangle, Ban, Sliders, ListChecks, BookOpen } from "lucide-react";
import { useState } from "react";
import { VideoPlayer } from "@/components/VideoPlayer";
import { procedures, forgotOptions, type ForgotKey } from "@/data/procedures";
import { useFavorites } from "@/store/favorites";

import type { VideoSource } from "@/data/procedures";

export const Route = createFileRoute("/app/procedure/$id")({
  loader: ({ params }): { procId: string } => {
    const proc = procedures.find((p) => p.id === params.id);
    if (!proc) throw notFound();
    return { procId: proc.id };
  },
  component: ProcedurePage,
  notFoundComponent: () => (
    <div className="p-10 text-center text-sm text-muted-foreground">Procedimento não encontrado.</div>
  ),
});

type Tab = "video" | "tutorial" | "checklist" | "errors" | "contra" | "params";

const tabs: { key: Tab; label: string; icon: typeof Play }[] = [
  { key: "video", label: "Vídeo", icon: Play },
  { key: "tutorial", label: "Tutorial", icon: BookOpen },
  { key: "checklist", label: "Checklist", icon: ListChecks },
  { key: "params", label: "Parâmetros", icon: Sliders },
  { key: "errors", label: "Erros", icon: AlertTriangle },
  { key: "contra", label: "Contraind.", icon: Ban },
];

function ProcedureVideo({ video, fallbackLength }: { video?: VideoSource; fallbackLength: string }) {
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
  const proc = procedures.find((p) => p.id === procId);

  if (!proc) throw notFound();

  const { has, toggle } = useFavorites();
  const Icon = proc.icon;
  const [tab, setTab] = useState<Tab>("video");
  const [forgot, setForgot] = useState<ForgotKey | null>(null);
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const tabFromForgot = (k: ForgotKey): Tab => {
    if (k === "parametros" || k === "tempo") return "params";
    if (k === "sequencia") return "checklist";
    if (k === "configuracao") return "tutorial";
    return "tutorial";
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Link to="/app" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
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
        <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${proc.color} text-white`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h1 className="font-display text-xl font-semibold leading-tight">{proc.info.title}</h1>
          <p className="text-xs text-muted-foreground">{proc.tagline}</p>
        </div>
      </div>

      {/* O que você esqueceu? */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Atalhos rápidos</div>
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
          <ul className="space-y-2">
            {proc.info.checklist.map((item, i) => {
              const on = checked[i];
              return (
                <li key={i}>
                  <button
                    onClick={() => setChecked((c) => ({ ...c, [i]: !c[i] }))}
                    className="flex w-full items-center gap-3 rounded-xl border border-border bg-background p-3 text-left text-sm"
                  >
                    <span
                      className={`grid h-5 w-5 place-items-center rounded-md border transition ${
                        on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"
                      }`}
                    >
                      {on && <Check className="h-3.5 w-3.5" />}
                    </span>
                    <span className={on ? "text-muted-foreground line-through" : ""}>{item}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {tab === "params" && (
          <div className="divide-y divide-border">
            {proc.info.parameters.map((p) => (
              <div key={p.label} className="flex items-center justify-between py-3 text-sm">
                <span className="text-muted-foreground">{p.label}</span>
                <span className="font-display font-semibold text-foreground">{p.value}</span>
              </div>
            ))}
          </div>
        )}

        {tab === "errors" && (
          <ul className="space-y-2">
            {proc.info.commonErrors.map((e, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl border border-border bg-background p-3 text-sm">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                {e}
              </li>
            ))}
          </ul>
        )}

        {tab === "contra" && (
          <ul className="space-y-2">
            {proc.info.contraindications.map((c, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl border border-border bg-background p-3 text-sm">
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
