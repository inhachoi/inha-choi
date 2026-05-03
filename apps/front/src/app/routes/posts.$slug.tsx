import { createFileRoute } from "@tanstack/react-router";

import PostModal from "@/pages/posts-page/ui/PostModal";

const VELOG_API = "https://v2.velog.io/graphql";
const FALLBACK_IMAGE = "https://www.gyeung-il.com/assets/choi-CBcsyV5s.jpg";

async function fetchVelogPost(slug: string) {
  try {
    const res = await fetch(VELOG_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        operationName: "ReadPost",
        query: `query ReadPost($username: String, $url_slug: String) {
          post(username: $username, url_slug: $url_slug) {
            title
            thumbnail
            short_description
          }
        }`,
        variables: { username: "chlruddlf73", url_slug: slug },
      }),
    });
    const { data } = await res.json();
    return data?.post ?? null;
  } catch {
    return null;
  }
}

export const Route = createFileRoute("/posts/$slug")({
  loader: ({ params }) => {
    if (typeof window !== "undefined") return null;
    return fetchVelogPost(params.slug);
  },
  head: ({ loaderData }) => {
    const title = loaderData?.title
      ? `${loaderData.title} | 개발자 최경일`
      : "블로그 | 개발자 최경일";
    const description = loaderData?.short_description ?? "최경일의 개발 블로그";
    const image = loaderData?.thumbnail ?? FALLBACK_IMAGE;

    return {
      meta: [
        { title },
        { key: "description", name: "description", content: description },
        { key: "og:title", property: "og:title", content: title },
        { key: "og:description", property: "og:description", content: description },
        { key: "og:image", property: "og:image", content: image },
        { key: "twitter:title", name: "twitter:title", content: title },
        { key: "twitter:description", name: "twitter:description", content: description },
        { key: "twitter:image", name: "twitter:image", content: image },
      ],
    };
  },
  component: PostModal,
});
