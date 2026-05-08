import { createFileRoute } from "@tanstack/react-router";

import PostsPage from "@/pages/posts-page";
import { SITE_URL } from "@/shared/config";
import { buildPageHead } from "@/shared/lib";

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
