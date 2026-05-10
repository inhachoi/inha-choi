import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

const __dirname = path.dirname(__filename);

const STATIC_PAGES = ["/", "/posts", "/guestbook", "/chat", "/games", "/games/memory", "/games/reaction"];

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

async function fetchVelogPostsForLlms(): Promise<Array<{ title: string; url_slug: string; short_description: string }>> {
  try {
    const res = await fetch("https://v2.velog.io/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        operationName: "Posts",
        query: `query Posts($username: String, $limit: Int) {
          posts(username: $username, limit: $limit) {
            title
            url_slug
            short_description
          }
        }`,
        variables: { username: "chlruddlf73", limit: 20 },
      }),
    });
    const json = await res.json() as { data?: { posts?: Array<{ title: string; url_slug: string; short_description: string }> } };
    return json.data?.posts ?? [];
  } catch {
    return [];
  }
}

function buildLlmsTxtContent(posts: Array<{ title: string; url_slug: string; short_description: string }>): string {
  const postLines = posts
    .map((p) => `- [${p.title}](https://www.gyeung-il.com/posts/${p.url_slug}): ${p.short_description}`)
    .join("\n");

  return `# 개발자 최경일 (gyeung-il.com)
> UX와 소통에 집중하는 프론트엔드 개발자 최경일의 개인 홈페이지.

## 주요 페이지
- [블로그](https://www.gyeung-il.com/posts): 프론트엔드 개발 관련 글 모음
- [방명록](https://www.gyeung-il.com/guestbook): 방문자 메시지
- [AI 채팅](https://www.gyeung-il.com/chat): Claude 기반 AI 채팅
- [미니게임](https://www.gyeung-il.com/games): 직접 만든 미니게임 모음

## 최근 블로그 포스트
${postLines}
`;
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
      {
        name: "generate-llms-txt",
        async writeBundle({ dir }: { dir?: string }) {
          if (!dir || dir.includes("server")) return;
          const posts = await fetchVelogPostsForLlms();
          writeFileSync(path.join(dir, "llms.txt"), buildLlmsTxtContent(posts), "utf-8");
          console.log("[llms.txt] Generated successfully");
        },
      },
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
