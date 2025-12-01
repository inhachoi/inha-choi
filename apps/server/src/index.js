import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

// CORS 허용 (front localhost:5173 요청 가능하게)
app.use(cors());
app.use(express.json());

const VELOG_GRAPHQL_ENDPOINT = "https://v2.velog.io/graphql";
const VELOG_USERNAME = "chlruddlf73";

// Velog GraphQL
app.get("/api/posts", async (req, res) => {
  try {
    // Velog 쿼리 문자열
    const query = `
      query Posts(
        $cursor: ID
        $username: String
        $temp_only: Boolean
        $tag: String
      ) {
        posts(
          cursor: $cursor
          username: $username
          temp_only: $temp_only
          tag: $tag
        ) {
          id
          title
          url_slug
          thumbnail
          likes
          released_at
        }
      }
    `;

    // 변수 세팅
    const variables = {
      cursor: null,
      username: VELOG_USERNAME,
      temp_only: false,
      tag: null,
    };

    const response = await fetch(VELOG_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        operationName: "Posts",
        query,
        variables,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({ error: "Velog 요청 실패" });
    }

    const result = await response.json();

    if (!result.data || !result.data.posts) {
      return res.status(500).json({ error: "Velog 데이터 형식 오류" });
    }

    const posts = result.data.posts.map((post) => ({
      title: post.title,
      link: `https://velog.io/@${VELOG_USERNAME}/${post.url_slug}`,
      thumbnail: post.thumbnail,
      likes: post.likes,
      released_at: post.released_at,
    }));

    return res.json({ posts });
  } catch (err) {
    return res.status(500).json({ err: "서버 내부 오류" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
