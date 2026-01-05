import express from "express";
import { chatController } from "./chat.controller.js";

const router = express.Router();

router.post("/", chatController);

export default router;
