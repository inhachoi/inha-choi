import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { connectDB } from "./db.js";
import { User } from "./models/User.js";
import { GuestbookComment } from "./models/GuestbookComment.js";
import { attachUser, requireAuth } from "./middleware/auth.js";

const app = express();
const PORT = 3000;

// CORS 허용 (front localhost:5173 요청 가능하게)
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(attachUser);

const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_REDIRECT_URI,
  JWT_SECRET,
} = process.env;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET || !GITHUB_REDIRECT_URI) {
  console.warn("[Auth] GitHub OAuth 환경변수가 설정되지 않았습니다.");
}

const VELOG_GRAPHQL_ENDPOINT = "https://v2.velog.io/graphql";
const VELOG_USERNAME = "chlruddlf73";

// 1) GitHub 로그인 시작: GitHub 로그인 페이지로 리다이렉트
app.get("/api/auth/github/login", (req, res) => {
  const state = crypto.randomBytes(16).toString("hex");

  // CSRF 방지용 state를 쿠키에 저장
  res.cookie("oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
  });

  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: GITHUB_REDIRECT_URI,
    scope: "read:user",
    state,
  });

  const githubAuthUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;

  return res.redirect(githubAuthUrl);
});

// 2) GitHub 콜백: code 받아서 토큰 + 유저정보 얻고, 우리 JWT 쿠키 발급
app.get("/api/auth/github/callback", async (req, res) => {
  try {
    const { code, state } = req.query;
    const savedState = req.cookies.oauth_state;

    if (!code || !state || !savedState || state !== savedState) {
      return res.status(400).send("Invalid OAuth state");
    }

    // 더 이상 state 쿠키는 필요 없으니 삭제
    res.clearCookie("oauth_state");

    // 1) code로 access_token 교환
    const tokenRes = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: GITHUB_REDIRECT_URI,
        }),
      }
    );

    const tokenJson = await tokenRes.json();

    if (!tokenJson.access_token) {
      console.error("GitHub 토큰 응답 에러:", tokenJson);
      return res.status(500).send("GitHub token exchange failed");
    }

    const accessToken = tokenJson.access_token;

    // 2) access_token으로 GitHub 유저 정보 조회
    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": "gyeung-il-guestbook",
      },
    });

    const ghUser = await userRes.json();

    if (!ghUser || !ghUser.id) {
      console.error("GitHub 유저 정보 에러:", ghUser);
      return res.status(500).send("GitHub user fetch failed");
    }

    // 3) MongoDB에 User upsert
    const githubId = String(ghUser.id);

    const user = await User.findOneAndUpdate(
      { githubId },
      {
        githubId,
        login: ghUser.login,
        avatarUrl: ghUser.avatar_url,
        profileUrl: ghUser.html_url,
      },
      { new: true, upsert: true }
    );

    // 4) 우리 서비스용 JWT 발급
    const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // 5) JWT를 HttpOnly 쿠키로 저장
    res.cookie("auth_token", token, {
      httpOnly: true,
      sameSite: "lax",
      // 로컬 http 환경이니까 secure: false
    });

    // 마지막으로 프론트의 guestbook 페이지로 리다이렉트
    return res.redirect("http://localhost:5173/guestbook");
  } catch (error) {
    console.error("GitHub OAuth callback 에러:", error);
    return res.status(500).send("OAuth error");
  }
});

// 현재 로그인된 유저 정보 확인용
app.get("/api/auth/me", (req, res) => {
  if (!req.user) {
    return res.status(200).json({ user: null });
  }

  return res.json({ user: req.user });
});

// 방명록 목록 조회
app.get("/api/guestbook", async (req, res) => {
  try {
    const comments = await GuestbookComment.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .populate("user");

    const result = comments.map((c) => ({
      id: c._id.toString(),
      content: c.content,
      createdAt: c.createdAt,
      user: {
        id: c.user._id.toString(),
        login: c.user.login,
        avatarUrl: c.user.avatarUrl,
        profileUrl: c.user.profileUrl,
      },
    }));

    return res.json({ comments: result });
  } catch (error) {
    console.error("[Guestbook] 목록 조회 에러:", error);
    return res.status(500).json({ error: "방명록 조회 실패" });
  }
});

// 방명록 작성 (로그인 필수)
app.post("/api/guestbook", requireAuth, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ error: "내용을 입력해주세요." });
    }

    const comment = await GuestbookComment.create({
      user: req.user.id,
      content: content.trim(),
    });

    const populated = await comment.populate("user");

    return res.status(201).json({
      id: populated._id.toString(),
      content: populated.content,
      createdAt: populated.createdAt,
      user: {
        id: populated.user._id.toString(),
        login: populated.user.login,
        avatarUrl: populated.user.avatarUrl,
        profileUrl: populated.user.profileUrl,
      },
    });
  } catch (error) {
    console.error("[Guestbook] 작성 에러:", error);
    return res.status(500).json({ error: "방명록 작성 실패" });
  }
});

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

// 서버 시작 전에 DB 먼저 연결
async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server due to DB error:", error);
    process.exit(1);
  }
}

startServer();
