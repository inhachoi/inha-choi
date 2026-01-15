import { createChatStream } from "./chat.service.js";

export async function chatController(req, res) {
  const { messages } = req.body;

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: "messages must be an array" });
  }

  // SSE 헤더
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  if (res.flushHeaders) {
    res.flushHeaders();
  }

  try {
    await createChatStream(messages, res);
  } catch (e) {
    console.error("[CHAT STREAM ERROR]", e);
    res.write("event: error\ndata: 스트리밍 실패\n\n");
    res.end();
  }
}
