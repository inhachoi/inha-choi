import { createFileRoute, Outlet } from "@tanstack/react-router";

const OG_IMAGE = "https://www.gyeung-il.com/assets/choi-CBcsyV5s.jpg";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: "미니게임 | 개발자 최경일" },
      { key: "description", name: "description", content: "최경일이 만든 미니게임 모음" },
      { key: "og:title", property: "og:title", content: "미니게임 | 개발자 최경일" },
      { key: "og:description", property: "og:description", content: "최경일이 만든 미니게임 모음" },
      { key: "og:image", property: "og:image", content: OG_IMAGE },
      { key: "og:url", property: "og:url", content: "https://www.gyeung-il.com/games" },
      { key: "twitter:title", name: "twitter:title", content: "미니게임 | 개발자 최경일" },
      { key: "twitter:description", name: "twitter:description", content: "최경일이 만든 미니게임 모음" },
      { key: "twitter:image", name: "twitter:image", content: OG_IMAGE },
    ],
  }),
  component: GamesLayout,
});

function GamesLayout() {
  return <Outlet />;
}
