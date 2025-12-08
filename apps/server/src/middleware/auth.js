import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set. Check your .env file.");
}

// 요청마다 쿠키의 auth_token을 파싱해서 req.user에 넣어주는 미들웨어
export async function attachUser(req, res, next) {
  const token = req.cookies?.auth_token;

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.userId).lean();

    if (!user) {
      req.user = null;
      return next();
    }

    req.user = {
      id: user._id.toString(),
      githubId: user.githubId,
      login: user.login,
      avatarUrl: user.avatarUrl,
      profileUrl: user.profileUrl,
    };

    return next();
  } catch (error) {
    console.error("[Auth] JWT 검증 에러:", error);
    req.user = null;
    return next();
  }
}

// 로그인이 반드시 필요한 라우트에서 쓰는 미들웨어
export function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "로그인이 필요합니다." });
  }
  return next();
}
