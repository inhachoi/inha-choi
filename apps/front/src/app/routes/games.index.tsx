import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/games/")({
  beforeLoad: () => {
    throw redirect({ to: "/games/$gameId", params: { gameId: "memory" } });
  },
});
