import { createFileRoute } from "@tanstack/react-router";

import PostModal from "@/pages/posts-page/ui/PostModal";
import { fetchVelogPost } from "@/shared/api";
import { SITE_URL } from "@/shared/config";
import { buildPageHead } from "@/shared/lib";

export const Route = createFileRoute("/posts/$slug")({
  loader: ({ params }) => {
    if (typeof window !== "undefined") return null;
    return fetchVelogPost(params.slug);
  },
  head: ({ loaderData, params }) => ({
    ...buildPageHead({
      title: loaderData?.title ? `${loaderData.title} | 개발자 최경일` : "블로그 | 개발자 최경일",
      description: loaderData?.short_description ?? "최경일의 개발 블로그",
      url: `${SITE_URL}/posts/${params.slug}`,
      image: loaderData?.thumbnail ?? undefined,
    }),
  }),
  component: PostModal,
});
