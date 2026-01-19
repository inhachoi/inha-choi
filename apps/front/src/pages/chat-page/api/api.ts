import type { MessageDTO } from "../model/types";

export const chatApi = (nextMessages: MessageDTO[]) => {
  return fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: nextMessages }),
  });
};
