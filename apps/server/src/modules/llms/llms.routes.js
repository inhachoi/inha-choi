import express from "express";

const router = express.Router();

let cache = null;
const CACHE_TTL_MS = 60 * 60 * 1000;

router.get("/", async (req, res) => {
  try {
    if (cache && Date.now() < cache.expiresAt) {
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      return res.send(cache.data);
    }

    const response = await fetch("https://v2.velog.io/graphql", {
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

    const result = await response.json();
    const posts = result.data?.posts ?? [];

    const postLines = posts
      .map((p) => `- [${p.title}](https://www.gyeung-il.com/posts/${p.url_slug}): ${p.short_description}`)
      .join("\n");

    const text = `# 개발자 최경일 (gyeung-il.com)
> UX와 소통에 집중하는 프론트엔드 개발자 최경일의 개인 홈페이지.

## 주요 페이지
- [블로그](https://www.gyeung-il.com/posts): 프론트엔드 개발 관련 글 모음
- [방명록](https://www.gyeung-il.com/guestbook): 방문자 메시지
- [AI 채팅](https://www.gyeung-il.com/chat): Claude 기반 AI 채팅
- [미니게임](https://www.gyeung-il.com/games): 직접 만든 미니게임 모음

## 최근 블로그 포스트
${postLines}
`;

    cache = { data: text, expiresAt: Date.now() + CACHE_TTL_MS };

    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.send(text);
  } catch (err) {
    console.error("llms.txt 오류:", err);
    return res.status(500).send("오류가 발생했습니다.");
  }
});

export default router;
