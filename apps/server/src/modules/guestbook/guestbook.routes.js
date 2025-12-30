import express from "express";
import { GuestbookComment } from "./guestbook.model.js";
import { requireAuth } from "../../shared/middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
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

  res.json({ comments: result });
});

router.post("/", requireAuth, async (req, res) => {
  const comment = await GuestbookComment.create({
    user: req.user.id,
    content: req.body.content.trim(),
  });

  const populated = await comment.populate("user");

  res.status(201).json({
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
});

export default router;
