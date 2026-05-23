import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search, Sparkles, Zap, Clock, ShieldCheck, BookmarkCheck, PlayCircle } from "lucide-react";
import { procedures } from "@/data/procedures";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Estetiq — Seu guia técnico de bolso para Estética" },
      { name: "description", content: "Consulta técnica instantânea durante procedimentos estéticos. Microlearning para alunos e profissionais de Estética e Cosmetologia." },
      { property: "og:title", content: "Estetiq — Guia técnico de bolso" },
      { property: "og:description", content: "Menos tempo procurando. Mais segurança executando." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 glass">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight">Estetiq</span>
          </Link>
          <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
            <a href="#problema" className="hover:text-foreground">Problema</a>
            <a href="#como-funciona" className="hover:text-foreground">Como funciona</a>
            <a href="#categorias" className="hover:text-foreground">Categorias</a>
          </nav>
          <Link
            to="/app"
            className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90"
          >
            Abrir app
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-20 md:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Microlearning para Estética e Cosmetologia
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              Menos tempo procurando.
              <br />
              <span className="text-gradient">Mais segurança executando.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              Estetiq é o seu guia técnico de bolso. Consulta instantânea de parâmetros, sequências e
              contraindicações durante a prática — em segundos, no celular.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/app/forgot"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95"
              >
                Esqueci isso
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/app"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-6 py-3 text-sm font-medium text-foreground hover:bg-card"
              >
                <PlayCircle className="h-4 w-4" /> Ver protótipo
              </Link>
            </div>
          </div>

          {/* Mock phone */}
          <div className="mx-auto mt-16 max-w-sm">
            <div className="relative rounded-[2.5rem] border border-border bg-card p-3 shadow-card">
              <div className="rounded-[2rem] bg-background p-5">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>9:41</span>
                  <span>Estetiq</span>
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-muted-foreground">
                  <Search className="h-4 w-4" /> Buscar procedimento…
                </div>
                <button className="mt-3 flex w-full items-center justify-between rounded-2xl bg-gradient-primary px-4 py-4 text-left text-primary-foreground shadow-glow">
                  <div>
                    <div className="text-xs opacity-80">Atalho rápido</div>
                    <div className="font-display text-lg font-semibold">Esqueci isso</div>
                  </div>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {procedures.slice(0, 6).map((p) => {
                    const Icon = p.icon;
                    return (
                      <div key={p.id} className="aspect-square rounded-xl border border-border bg-card p-2 text-[10px] text-muted-foreground">
                        <Icon className="h-4 w-4 text-foreground" />
                        <div className="mt-2 leading-tight">{p.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problema */}
      <section id="problema" className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">O problema</span>
            <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
              Você sabe o procedimento. Só esqueceu <em className="not-italic text-gradient">aquele detalhe</em>.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Durante a prática, ninguém quer abrir PDFs gigantes nem pesquisar em 4 lugares diferentes.
              E ter vergonha de perguntar de novo não deveria custar a sua segurança técnica.
            </p>
          </div>
          <ul className="space-y-3">
            {[
              "Esqueceu a frequência da Corrente Russa.",
              "Não lembra a profundidade da agulha para estrias.",
              "Dúvida sobre a temperatura alvo da Radiofrequência.",
              "Precisa do checklist da Limpeza de Pele agora.",
            ].map((q) => (
              <li key={q} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                {q}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Como funciona</span>
            <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
              Consulta técnica em 3 toques.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { n: "01", t: "Toque em ‘Esqueci isso’", d: "Atalho gigante na tela inicial. Sem fricção." },
              { n: "02", t: "Escolha o procedimento", d: "Eletroterapia, LED, RF, Microagulhamento e mais." },
              { n: "03", t: "Receba a resposta", d: "Vídeo curto, checklist, parâmetros e contraindicações." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-background p-6">
                <div className="font-display text-sm text-muted-foreground">{s.n}</div>
                <div className="mt-2 font-display text-xl font-semibold">{s.t}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categorias */}
      <section id="categorias" className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Categorias</span>
            <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">Tudo que você usa na prática.</h2>
          </div>
          <Link to="/app" className="hidden text-sm text-muted-foreground hover:text-foreground md:inline">
            Ver no app →
          </Link>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {procedures.map((p) => {
            const Icon = p.icon;
            return (
              <Link
                key={p.id}
                to="/app/procedure/$id"
                params={{ id: p.id }}
                className="group flex items-center justify-between rounded-2xl border border-border bg-card p-5 transition hover:border-primary/40 hover:shadow-glow"
              >
                <div className="flex items-center gap-4">
                  <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${p.color} text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-display text-base font-semibold">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.tagline}</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-foreground" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { i: Clock, t: "Resposta em segundos", d: "Tempo médio de consulta abaixo de 8s." },
            { i: ShieldCheck, t: "Conteúdo confiável", d: "Curado e revisado por especialistas." },
            { i: Zap, t: "Microlearning", d: "Vídeos de 20–40s e tutoriais diretos." },
            { i: BookmarkCheck, t: "Favoritos", d: "Salve o que você mais usa." },
          ].map((f) => (
            <div key={f.t} className="rounded-2xl border border-border bg-card p-5">
              <f.i className="h-5 w-5 text-primary" />
              <div className="mt-3 font-display text-base font-semibold">{f.t}</div>
              <div className="mt-1 text-sm text-muted-foreground">{f.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-5 pb-24">
        <div className="overflow-hidden rounded-3xl border border-border bg-gradient-primary p-10 text-center text-primary-foreground shadow-glow">
          <h3 className="font-display text-3xl font-semibold md:text-4xl">
            Seu guia técnico de bolso.
          </h3>
          <p className="mx-auto mt-3 max-w-xl opacity-90">
            Aprendizado rápido para momentos reais. Comece agora — é grátis enquanto estamos em MVP.
          </p>
          <Link
            to="/app"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground hover:opacity-90"
          >
            Abrir o app <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Estetiq</span>
          <span>Feito para alunos e profissionais de Estética.</span>
        </div>
      </footer>
    </div>
  );
}
