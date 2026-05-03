import { createFileRoute } from "@tanstack/react-router";

import PostsPage from "@/pages/posts-page";

const OG_IMAGE = "https://www.gyeung-il.com/assets/choi-CBcsyV5s.jpg";

export const Route = createFileRoute("/posts")({
  head: () => ({
    meta: [
      { title: "블로그 | 개발자 최경일" },
      { key: "description", name: "description", content: "최경일의 개발 블로그" },
      { key: "og:title", property: "og:title", content: "블로그 | 개발자 최경일" },
      { key: "og:description", property: "og:description", content: "최경일의 개발 블로그" },
      { key: "og:image", property: "og:image", content: OG_IMAGE },
      { key: "og:url", property: "og:url", content: "https://www.gyeung-il.com/posts" },
      { key: "twitter:title", name: "twitter:title", content: "블로그 | 개발자 최경일" },
      { key: "twitter:description", name: "twitter:description", content: "최경일의 개발 블로그" },
      { key: "twitter:image", name: "twitter:image", content: OG_IMAGE },
    ],
  }),
  component: PostsPage,
});
