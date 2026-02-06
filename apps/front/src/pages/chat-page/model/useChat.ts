import { useEffect,useState } from "react";

import { sendChat } from "../api";
import { CHAT_STORAGE_KEY } from "../config";

import type { MessageDTO } from "./types";

export function useChat() {
  const [messages, setMessages] = useState<MessageDTO[]>(() => {
    const stored = localStorage.getItem(CHAT_STORAGE_KEY);
    if (!stored) return [];

    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");

  useEffect(() => {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  async function sendMessage(text: string) {
    if (loading) return;

    const nextMessages: MessageDTO[] = [
      ...messages,
      { role: "user", content: text },
    ];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setStreamingMessage("");

    const response = await sendChat(nextMessages);
    const reader = response.body!.getReader();
    const decoder = new TextDecoder("utf-8");

    let accumulated = "";
    let buffer = "";
    let currentEventData = [];

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (line === "") {
          if (currentEventData.length > 0) {
            const data = currentEventData.join("\n");
            if (data === "[DONE]") {
              setMessages((prev) => [
                ...prev,
                { role: "assistant", content: accumulated },
              ]);
              setStreamingMessage("");
              setLoading(false);
              return;
            }
            accumulated += data;
            setStreamingMessage(accumulated);
            currentEventData = [];
          }
          continue;
        }

        if (line.startsWith("data: ")) {
          const data = line.replace("data: ", "");
          currentEventData.push(data);
        }
      }
    }
  }

  const resetChat = () => {
    setMessages([]);
    setStreamingMessage("");
  };

  return {
    messages,
    input,
    setInput,
    loading,
    streamingMessage,
    sendMessage,
    resetChat,
  };
}
