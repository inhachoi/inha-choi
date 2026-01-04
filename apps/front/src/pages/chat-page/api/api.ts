import { type MessageType } from "../model/types";

export const chatApi = (nextMessages: MessageType[]) => {
  return fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: nextMessages }),
  });
};
