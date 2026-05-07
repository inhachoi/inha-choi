import { createFileRoute } from "@tanstack/react-router";

import { buildPageHead, SITE_URL } from "@/app/lib";
import PostsPage from "@/pages/posts-page";

export const Route = createFileRoute("/posts")({
  head: () => ({
    ...buildPageHead({
      title: "블로그 | 개발자 최경일",
      description: "최경일의 개발 블로그",
      url: `${SITE_URL}/posts`,
    }),
  }),
  component: PostsPage,
});
