import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app/forgot")({
  loader: () => {
    throw redirect({ to: "/app" });
  },
});
