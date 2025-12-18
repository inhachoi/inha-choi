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
import dotenv from "dotenv";
import { isProd, CONFIG } from "./config/auth.config.js";

dotenv.config();
const app = express();
const PORT = 3000;

/* -------------------------------------------------------------
   1) 환경별 GitHub OAuth / Frontend URL 자동 분기 CONFIG
---------------------------------------------------------------- */
if (!CONFIG.CLIENT_ID || !CONFIG.CLIENT_SECRET || !CONFIG.REDIRECT_URI) {
  console.warn("[Auth] OAuth 환경변수가 올바르게 설정되지 않았습니다.");
}

/* -------------------------------------------------------------
   2) 미들웨어
---------------------------------------------------------------- */
app.use(
  cors({
    origin: CONFIG.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(attachUser);

/* -------------------------------------------------------------
   3) GitHub OAuth - 로그인 시작
---------------------------------------------------------------- */
app.get("/api/auth/github/login", (req, res) => {
  const state = crypto.randomBytes(16).toString("hex");

  res.cookie("oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
  });

  const params = new URLSearchParams({
    client_id: CONFIG.CLIENT_ID,
    redirect_uri: CONFIG.REDIRECT_URI,
    scope: "read:user",
    state,
  });

  const githubAuthUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
  return res.redirect(githubAuthUrl);
});

/* -------------------------------------------------------------
   4) GitHub OAuth - Callback 처리
---------------------------------------------------------------- */
app.get("/api/auth/github/callback", async (req, res) => {
  try {
    const { code, state } = req.query;
    const savedState = req.cookies.oauth_state;

    if (!code || !state || !savedState || state !== savedState) {
      return res.status(400).send("Invalid OAuth state");
    }

    res.clearCookie("oauth_state");

    // 1) access_token 요청
    const tokenRes = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id: CONFIG.CLIENT_ID,
          client_secret: CONFIG.CLIENT_SECRET,
          code,
          redirect_uri: CONFIG.REDIRECT_URI,
        }),
      }
    );

    const tokenJson = await tokenRes.json();

    if (!tokenJson.access_token) {
      console.error("GitHub token error:", tokenJson);
      return res.status(500).send("Token exchange failed");
    }

    const accessToken = tokenJson.access_token;

    // 2) GitHub 유저 정보
    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": "guestbook-app",
      },
    });

    const ghUser = await userRes.json();

    if (!ghUser || !ghUser.id) {
      console.error("GitHub user fetch error:", ghUser);
      return res.status(500).send("GitHub user fetch failed");
    }

    // 3) DB upsert
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

    // 4) JWT 발급하여 쿠키 저장
    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: isProd, // 배포에서는 secure true
    });

    // 5) 프론트 guestbook으로 redirect
    return res.redirect(`${CONFIG.FRONTEND_URL}/guestbook`);
  } catch (error) {
    console.error("OAuth callback error:", error);
    return res.status(500).send("OAuth error");
  }
});

/* -------------------------------------------------------------
   5) 로그인된 유저 정보
---------------------------------------------------------------- */
app.get("/api/auth/me", (req, res) => {
  return res.json({ user: req.user ?? null });
});

/* -------------------------------------------------------------
   6) 방명록 목록 조회
---------------------------------------------------------------- */
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
    console.error("[Guestbook] 목록 에러:", error);
    return res.status(500).json({ error: "방명록 조회 실패" });
  }
});

/* -------------------------------------------------------------
   7) 방명록 작성 (로그인 필요)
---------------------------------------------------------------- */
app.post("/api/guestbook", requireAuth, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content?.trim()) {
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

/* -------------------------------------------------------------
   8) Velog GraphQL
---------------------------------------------------------------- */
app.get("/api/posts", async (req, res) => {
  try {
    const query = `
      query Posts($cursor: ID, $username: String, $temp_only: Boolean, $tag: String) {
        posts(cursor: $cursor, username: $username, temp_only: $temp_only, tag: $tag) {
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
      cursor: null,
      username: "chlruddlf73",
      temp_only: false,
      tag: null,
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

    const posts = result.data.posts.map((p) => ({
      title: p.title,
      link: `https://velog.io/@chlruddlf73/${p.url_slug}`,
      thumbnail: p.thumbnail,
      likes: p.likes,
      released_at: p.released_at,
    }));

    return res.json({ posts });
  } catch (err) {
    console.error("Velog 오류:", err);
    return res.status(500).json({ error: "Velog 요청 실패" });
  }
});

/* -------------------------------------------------------------
   9) 서버 시작
---------------------------------------------------------------- */
async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error("DB 연결 실패:", e);
    process.exit(1);
  }
}

startServer();
