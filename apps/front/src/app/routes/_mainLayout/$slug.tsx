import { createFileRoute } from "@tanstack/react-router";

import PostModal from "@/pages/main-page/ui/PostModal";
import { fetchVelogPost } from "@/shared/api";
import { SITE_URL } from "@/shared/config";
import { buildPageHead } from "@/shared/lib";

export const Route = createFileRoute("/_mainLayout/$slug")({
  loader: ({ params }) => {
    if (typeof window !== "undefined") return null;
    return fetchVelogPost(params.slug);
  },
  head: ({ loaderData, params }) => ({
    ...buildPageHead({
      title: loaderData?.title ? `${loaderData.title} | 개발자 최경일` : "개발자 최경일",
      description: loaderData?.short_description ?? "UX와 소통에 집중합니다.",
      url: `${SITE_URL}/${params.slug}`,
      image: loaderData?.thumbnail ?? undefined,
    }),
  }),
  component: PostModal,
});
