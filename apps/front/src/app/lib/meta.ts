import { FALLBACK_OG_IMAGE } from "./constants";

export function buildMeta({
  title,
  description,
  url,
  image,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
}) {
  const img = image ?? FALLBACK_OG_IMAGE;
  return [
    { title },
    { key: "description", name: "description", content: description },
    { key: "og:title", property: "og:title", content: title },
    { key: "og:description", property: "og:description", content: description },
    { key: "og:image", property: "og:image", content: img },
    { key: "og:url", property: "og:url", content: url },
    { key: "twitter:card", name: "twitter:card", content: "summary_large_image" },
    { key: "twitter:title", name: "twitter:title", content: title },
    { key: "twitter:description", name: "twitter:description", content: description },
    { key: "twitter:image", name: "twitter:image", content: img },
  ];
}

export function buildPageHead(params: {
  title: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    meta: buildMeta(params),
    links: [{ key: "canonical", rel: "canonical", href: params.url }],
  };
}
