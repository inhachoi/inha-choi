import express from "express";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { CONFIG, isProd } from "#/shared/config/auth.config.js";
import { User } from "./user.model.js";

const router = express.Router();

router.get("/github/login", (req, res) => {
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

  res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
});

router.get("/github/callback", async (req, res) => {
  try {
    const { code, state } = req.query;
    const savedState = req.cookies.oauth_state;

    if (!code || !state || !savedState || state !== savedState) {
      return res.status(400).send("Invalid OAuth state");
    }

    res.clearCookie("oauth_state");

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
    const accessToken = tokenJson.access_token;

    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": "guestbook-app",
      },
    });

    const ghUser = await userRes.json();
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

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: isProd,
    });

    res.redirect(`${CONFIG.FRONTEND_URL}/guestbook`);
  } catch (e) {
    console.error("OAuth error:", e);
    res.status(500).send("OAuth error");
  }
});

router.get("/me", (req, res) => {
  res.json({ user: req.user ?? null });
});

export default router;
