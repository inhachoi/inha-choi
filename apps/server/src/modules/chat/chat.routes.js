import express from "express";
import OpenAI from "openai";

const router = express.Router();

const openai = new OpenAI({
  apiKey:
    "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",
});

router.post("/", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: "messages must be an array" });
    }

    const response = await openai.responses.create({
      model: "gpt-5-nano",
      input: messages,
    });

    res.json({
      message: response.output_text,
    });
  } catch (error) {
    console.error("[CHAT ERROR]", error);
    res.status(500).json({ error: "Chatbot response failed" });
  }
});

export default router;
