import { useState, useEffect } from "react";
import { chatApi } from "../api/chatApi";
import { type MessageType } from "./types";

const CHAT_STORAGE_KEY = "chat_messages";

export function useChat() {
  const [messages, setMessages] = useState<MessageType[]>(() => {
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

    const nextMessages: MessageType[] = [
      ...messages,
      { role: "user", content: text },
    ];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setStreamingMessage("");

    const response = await chatApi(nextMessages);
    const reader = response.body!.getReader();
    const decoder = new TextDecoder("utf-8");

    let accumulated = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;

        const data = line.replace("data: ", "");

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
