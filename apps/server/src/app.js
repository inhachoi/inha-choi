import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CONFIG } from "./config/auth.config.js";
import { attachUser } from "./middleware/auth.js";
import authRoutes from "./routes/auth.routes.js";
import guestbookRoutes from "./routes/guestbook.routes.js";
import postsRoutes from "./routes/posts.routes.js";

const app = express();

app.use(
  cors({
    origin: CONFIG.FRONTEND_URL,
    credential: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(attachUser);

app.use("/api/auth", authRoutes);
app.use("/api/guestbook", guestbookRoutes);
app.use("/api/posts", postsRoutes);

export default app;
