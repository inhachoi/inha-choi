import { createFileRoute } from "@tanstack/react-router";

import GamesPage from "@/pages/games-page";

export const Route = createFileRoute("/games/$gameId")({
  component: GamesPage,
});
