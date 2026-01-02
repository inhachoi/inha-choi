import OpenAI from "openai";
import { SYSTEM_PROMPT } from "./chat.propmt.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function createChatResponse(messages) {
  const response = await openai.responses.create({
    model: "gpt-5-nano",
    input: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
  });

  return response.output_text;
}
