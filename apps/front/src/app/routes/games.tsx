import { createFileRoute, Outlet } from "@tanstack/react-router";

import { SITE_URL } from "@/shared/config";
import { buildPageHead } from "@/shared/lib";

export const Route = createFileRoute("/games")({
  head: () => ({
    ...buildPageHead({
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
