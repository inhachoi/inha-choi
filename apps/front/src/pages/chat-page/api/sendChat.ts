import type { MessageDTO } from "../model";

export const sendChat = (nextMessages: MessageDTO[]) => {
  return fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: nextMessages }),
  });
};
