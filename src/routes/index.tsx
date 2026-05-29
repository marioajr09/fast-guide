import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Search, Sparkles, PlayCircle, ClipboardList } from "lucide-react";
import { procedures } from "@/data/procedures";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fast Guide - Guia Técnico para Estética" },
      {
        name: "description",
        content:
          "Consulta técnica instantânea durante procedimentos estéticos. Microlearning para alunos e profissionais de Estética e Cosmetologia.",
      },
      { property: "og:title", content: "Fast Guide - Guia técnico de bolso" },
      { property: "og:description", content: "Menos tempo procurando. Mais segurança executando." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 glass">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
              <ClipboardList className="h-4 w-4 -ml-0.5 -mt-0.5" />
              <Sparkles className="absolute bottom-1 right-0.5 h-3.5 w-3.5 drop-shadow-md" />
            </div>
            <span className="font-display text-lg font-semibold tracking-tight">Fast Guide</span>
          </Link>
          <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
            <a href="#problema" className="hover:text-foreground">
              Problema
            </a>
            <a href="#como-funciona" className="hover:text-foreground">
              Como funciona
            </a>
            <a href="#categorias" className="hover:text-foreground">
              Categorias
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-12 md:pt-12">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mt-6 font-display text-3xl font-semibold leading-[1.18] tracking-tight sm:text-4xl sm:leading-[1.12] md:text-6xl md:leading-[1.05]">
              <span className="block sm:inline">Menos tempo</span>{" "}
              <span className="block sm:inline">procurando.</span>
              <br />
              <span className="block pb-1 text-gradient sm:inline">Mais segurança</span>{" "}
              <span className="block pb-1 text-gradient sm:inline">executando.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-[19rem] text-sm leading-relaxed text-muted-foreground sm:max-w-xl sm:text-base md:mt-7 md:text-xl">
              A informação certa, no momento em que você precisa.
            </p>

            {/* Separador */}
            <div className="mx-auto max-w-6xl px-4 my-8">
              <div className="h-0.5 w-full bg-border/80" />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:mt-12">
              <Link
                to="/app"
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-primary px-7 py-5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-95"
              >
                <PlayCircle className="h-4 w-4" /> Abrir o app
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Mock phone */}
          <div className="mx-auto mt-14 max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-[26rem]">
            <div className="relative rounded-[2.5rem] border border-border bg-card p-3 shadow-card">
              <div className="rounded-[2rem] bg-background p-5">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  {/* Conhecimento de bola elite aqui */}
                  <span>9:41</span>
                  <span>Fast Guide</span>
                </div>
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-muted-foreground">
                  <Search className="h-4 w-4" /> Buscar procedimento…
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {procedures.slice(0, 6).map((p) => {
                    const Icon = p.icon;
                    return (
                      // Mock do app
                      <div
                        key={p.id}
                        className="aspect-square rounded-xl border border-border bg-card p-2 text-[10px] text-muted-foreground"
                      >
                        <Icon className="h-4 w-4 text-foreground" />
                        <div className="mt-2 truncate leading-tight">{p.name}</div>
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
      <section id="problema" className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              O problema
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
              Você sabe o procedimento. Só esqueceu{" "}
              <em className="not-italic text-gradient">aquele detalhe</em>.
            </h2>
            <p className="mt-4 text-justify text-muted-foreground">
              Durante a prática, ninguém quer abrir PDFs gigantes nem pesquisar em 4 lugares
              diferentes. E ter vergonha de perguntar de novo não deveria custar a sua segurança
              técnica.
            </p>
          </div>
          <ul className="space-y-3">
            {[
              "Esqueceu a frequência da Corrente Russa.",
              "Não lembra a profundidade da agulha para estrias.",
              "Dúvida sobre a temperatura alvo da Radiofrequência.",
              "Precisa do checklist da Limpeza de Pele agora.",
            ].map((q) => (
              <li
                key={q}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-sm transition hover:bg-card/60"
              >
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                {q}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-5 py-12">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Como funciona
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
              Consulta técnica em 3 toques.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { n: "01", t: "Toque em ‘Esqueci isso’", d: "Atalho em destaque na tela inicial." },
              {
                n: "02",
                t: "Escolha o procedimento",
                d: "Corrente Russa, LED, RF, Microagulhamento e mais.",
              },
              {
                n: "03",
                t: "Resposta rápida",
                d: "Vídeos rápidos e orientações práticas em segundos.",
              },
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
      <section id="categorias" className="mx-auto max-w-6xl px-5 py-10 md:py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Categorias
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold md:text-4xl">
              Tudo que você usa na prática.
            </h2>
          </div>
          <Link
            to="/app"
            className="text-sm font-medium text-primary transition hover:text-primary/80"
          >
            Ver no app →
          </Link>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {procedures.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                className="flex items-center rounded-2xl border border-border bg-card p-5 transition hover:bg-card/60"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${p.color} text-white`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-display text-base font-semibold">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.tagline}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Separador */}
      <div className="mx-auto max-w-6xl px-5 my-2 md:my-6">
        <div className="h-px w-full bg-border/60" />
      </div>

      {/* CTA */}
      <section id="cta" className="mx-auto max-w-4xl px-5 py-8 mb-6 md:px-6 md:py-14 md:mb-10">
        <div className="overflow-hidden rounded-2xl border border-border bg-gradient-primary px-5 py-7 text-center text-primary-foreground shadow-glow sm:rounded-3xl sm:px-6 sm:py-8 md:px-8 md:py-9">
          <h3 className="font-display text-xl font-semibold leading-tight sm:text-2xl md:text-3xl">
            Seu guia técnico de bolso.
          </h3>
          <p className="mx-auto mt-2 max-w-lg text-sm opacity-80 sm:mt-3 sm:text-base md:text-lg">
            Comece agora — [INCLUIR VALOR!!!]
          </p>
          <Link
            to="/app"
            className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-background px-6 py-2.5 text-sm font-semibold text-foreground transition hover:opacity-90 sm:mt-6 sm:px-7 sm:py-3"
          >
            Abrir o app <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Fast Guide</span>
          <span>Feito para alunos e profissionais de Estética.</span>
        </div>
      </footer>
    </div>
  );
}
