import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

const __dirname = path.dirname(__filename);

const STATIC_PAGES = ["/", "/posts", "/guestbook", "/chat", "/games"];

async function fetchAllVelogSlugs(): Promise<string[]> {
  const slugs: string[] = [];
  let cursor: string | null = null;

  try {
    do {
      const res = await fetch("https://v2.velog.io/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          operationName: "Posts",
          query: `query Posts($username: String, $cursor: ID, $limit: Int) {
            posts(username: $username, cursor: $cursor, limit: $limit) {
              id
              url_slug
            }
          }`,
          variables: { username: "chlruddlf73", cursor, limit: 50 },
        }),
      });
      const json = await res.json() as { data?: { posts?: { id: string; url_slug: string }[] } };
      const posts = json.data?.posts ?? [];
      slugs.push(...posts.map((p) => p.url_slug));
      cursor = posts.length > 0 ? posts[posts.length - 1].id : null;
    } while (cursor);
  } catch (e) {
    console.warn("[prerender] Velog slug fetch 실패, 동적 라우트 제외:", e);
  }

  return slugs;
}

export default defineConfig(async () => {
  const slugs = await fetchAllVelogSlugs();
  const postPages = slugs.flatMap((slug) => [
    { path: `/_mainLayout/${slug}` },
    { path: `/posts/${slug}` },
  ]);

  return {
    plugins: [
      tanstackStart({
      spa: { enabled: true },
      pages: [
        ...STATIC_PAGES.map((p) => ({ path: p })),
        ...postPages,
      ],
      router: {
        entry: "./app/router",
        routesDirectory: "./app/routes",
        generatedRouteTree: "./app/routeTree.gen.ts",
      },
      client: {
        entry: "./main",
      },
    }),
      react(),
      svgr(),
    ],

    server: {
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
        },
      },
    },

    resolve: {
      alias: { "@": path.resolve(__dirname, "src") },
    },
  };
});
