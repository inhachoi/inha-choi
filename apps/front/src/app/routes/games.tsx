import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/games")({
  component: GamesLayout,
});

function GamesLayout() {
  return <Outlet />;
}
