import { createChatResponse } from "./chat.service.js";

export async function chatController(req, res) {
  const { messages } = req.body;

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: "messages must be an array" });
  }

  try {
    const message = await createChatResponse(messages);
    res.json({ message });
  } catch (e) {
    console.error("[CHAT ERROR]", e);
    res.status(500).json({ error: "Chatbot response failed" });
  }
}
