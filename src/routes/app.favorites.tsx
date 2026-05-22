import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark } from "lucide-react";
import { useFavorites } from "@/store/favorites";
import { procedures } from "@/data/procedures";

export const Route = createFileRoute("/app/favorites")({
  component: Favorites,
});

function Favorites() {
  const { favorites } = useFavorites();
  const items = procedures.filter((p) => favorites.includes(p.id));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-semibold">Favoritos</h1>
        <p className="text-sm text-muted-foreground">Acesso rápido ao que você mais usa.</p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center">
          <Bookmark className="mx-auto h-6 w-6 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            Nada salvo ainda. Toque no ícone de marcador em um procedimento para favoritar.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((p) => {
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
                <div>
                  <div className="font-display text-sm font-semibold">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.tagline}</div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
