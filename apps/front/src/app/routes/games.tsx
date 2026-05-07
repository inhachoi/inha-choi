import { createFileRoute, Outlet } from "@tanstack/react-router";

import { buildMeta, SITE_URL } from "@/app/lib";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: buildMeta({
      title: "미니게임 | 개발자 최경일",
      description: "최경일이 만든 미니게임 모음",
      url: `${SITE_URL}/games`,
    }),
  }),
  component: GamesLayout,
});

function GamesLayout() {
  return <Outlet />;
}
