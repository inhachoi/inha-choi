import { useState } from "react";
import { chatApi } from "../api/chatApi";
import { type MessageType } from "./types";

export function useChat() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");

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

  return {
    messages,
    input,
    setInput,
    loading,
    streamingMessage,
    sendMessage,
  };
}
