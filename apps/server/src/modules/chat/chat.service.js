import OpenAI from "openai";
import { SYSTEM_PROMPT } from "./chat.propmt.js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function createChatStream(messages, res) {
  const stream = await client.responses.create({
    model: "gpt-5-nano",
    input: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      ...messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ],
    stream: true,
  });

  for await (const event of stream) {
    if (event.type === "response.output_text.delta") {
      const delta = event.delta || "";
      if (delta.includes("\n")) {
        const lines = delta.split("\n");
        lines.forEach((line) => {
          res.write(`data: ${line}\n`);
        });
        res.write("\n");
      } else {
        res.write(`data: ${delta}\n\n`);
      }
    }

    if (event.type === "response.completed") {
      res.write("data: [DONE]\n\n");
      res.end();
      return;
    }
  }
}
