import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { attachUser } from "./shared/middleware/auth.js";
import authRoutes from "./modules/auth/auth.routes.js";
import guestbookRoutes from "./modules/guestbook/guestbook.routes.js";
import postsRoutes from "./modules/posts/posts.routes.js";

const app = express();
const allowedOrigins = ["http://localhost:5173", "https://www.gyeung-il.com"];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
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
