import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search } from "lucide-react";
import { procedures } from "@/data/procedures";

export const Route = createFileRoute("/app/")({
  component: AppHome,
});

function AppHome() {
  return (
    <div className="space-y-7">
      {/* <div>
        <h1 className="font-display text-2xl font-semibold leading-tight">
          O que você precisa <span className="text-gradient">agora?</span>
        </h1>
      </div> */}

      {/* Configurações e espaçamento da seção de pesquisa */}
      <section className="space-y-2 pt-2">
        {/* <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Pesquisar
        </h2> */}
        <Link
          to="/app/search"
          className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-4 text-sm text-muted-foreground"
        >
          <Search className="h-4 w-4" /> Buscar procedimento, parâmetro, dúvida…
        </Link>
      </section>

      {/* Configurações da seção e título do "Atalho Rápido" */}
      <section className="space-y-2">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground pb-1">
          Atalho rápido
        </h2>
        <Link
          to="/app/forgot"
          // Tamanho e propriedades do botão
          className="group flex items-center justify-between rounded-3xl bg-gradient-primary px-5 py-5.5 text-primary-foreground shadow-glow"
        >
          {/* Tamanho e propriedades da fonte dentro do botão */}
          <div className="font-display text-2xl font-semibold">Esqueci isso</div>
          <ArrowRight className="h-6 w-6 transition group-hover:translate-x-1" />
        </Link>
      </section>

      <section className="border-t border-border pt-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Categorias
          </h2>
        </div>
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
                <div className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${p.color} text-white`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-3 font-display text-sm font-semibold">{p.name}</div>
                <div className="text-[11px] text-muted-foreground">{p.tagline}</div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
