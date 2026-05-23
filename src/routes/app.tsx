import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { Home, Search, Bookmark, Sparkles } from "lucide-react";

export const Route = createFileRoute("/app")({
  component: AppShell,
});

function AppShell() {
  const { pathname } = useLocation();
  const tabs: { to: "/app" | "/app/search" | "/app/favorites"; label: string; icon: typeof Home; exact?: boolean }[] = [
    { to: "/app", label: "Início", icon: Home, exact: true },
    { to: "/app/search", label: "Buscar", icon: Search },
    { to: "/app/favorites", label: "Favoritos", icon: Bookmark },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-30 glass">
        <div className="mx-auto flex max-w-md items-center justify-between px-5 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <span className="font-display text-base font-semibold">Fast Guide</span>
          </Link>
          <span className="text-xs text-muted-foreground">MVP</span>
        </div>
      </header>

      <main className="mx-auto max-w-md px-5 py-6">
        <Outlet />
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-md items-center justify-around px-4 py-2.5">
          {tabs.map((t) => {
            const active = t.exact ? pathname === t.to : pathname.startsWith(t.to);
            const Icon = t.icon;
            return (
              <Link
                key={t.to}
                to={t.to}
                className={`flex flex-1 flex-col items-center gap-1 rounded-lg py-1.5 text-[11px] ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <Icon className={`h-5 w-5 ${active ? "text-primary" : ""}`} />
                {t.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
