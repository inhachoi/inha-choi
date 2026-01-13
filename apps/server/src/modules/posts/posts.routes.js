import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { cursor } = req.query;

    const query = `
        query Posts($username: String, $cursor: ID, $limit: Int) {
          posts(username: $username, cursor: $cursor, limit: $limit) {
            id
            title
            url_slug
            thumbnail
            likes
            released_at
          }
        }
      `;

    const variables = {
      username: "chlruddlf73",
      cursor: cursor ?? null,
      limit: 10,
    };

    const response = await fetch("https://v2.velog.io/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        operationName: "Posts",
        query,
        variables,
      }),
    });

    const result = await response.json();

    if (!result.data?.posts) {
      return res.status(500).json({ error: "Velog 데이터 오류" });
    }

    const posts = result.data.posts;
    const nextCursor = posts.length > 0 ? posts[posts.length - 1].id : null;

    return res.json({
      posts: posts.map((p) => ({
        title: p.title,
        link: `https://velog.io/@chlruddlf73/${p.url_slug}`,
        thumbnail: p.thumbnail,
        likes: p.likes,
        released_at: p.released_at,
      })),
      nextCursor,
    });
  } catch (err) {
    console.error("Velog 오류:", err);
    return res.status(500).json({ error: "Velog 요청 실패" });
  }
});

export default router;
