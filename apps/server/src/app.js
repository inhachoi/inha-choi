import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CONFIG } from "./shared/config/auth.config.js";
import { attachUser } from "./shared/middleware/auth.js";
import authRoutes from "./modules/auth/auth.routes.js";
import guestbookRoutes from "./modules/guestbook/guestbook.routes.js";
import postsRoutes from "./modules/posts/posts.routes.js";

const app = express();

app.use(
  cors({
    origin: CONFIG.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(attachUser);

app.use("/api/auth", authRoutes);
app.use("/api/guestbook", guestbookRoutes);
app.use("/api/posts", postsRoutes);

export default app;
