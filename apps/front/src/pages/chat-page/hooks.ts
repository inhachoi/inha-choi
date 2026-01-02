import { useEffect, useRef, useState } from "react";

type MessageType = {
  role: "user" | "chatbot";
  content: string;
};

export const useChat = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // 최신 messages를 안전하게 참조하기 위한 ref (stale closure 방지)
  const messagesRef = useRef<MessageType[]>([]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (loading) return;

    const userMessage: MessageType = { role: "user", content: trimmed };

    // UI 즉시 반영 + 요청 payload도 동일한 nextMessages 사용
    const nextMessages = [...messagesRef.current, userMessage];
    setMessages(nextMessages);
    messagesRef.current = nextMessages;

    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await res.json();

      const chatbotMessage: MessageType = {
        role: "chatbot",
        content: data?.message || "알 수 없는 응답입니다.",
      };

      setMessages((prev) => [...prev, chatbotMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "chatbot", content: "에러가 발생했습니다." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return { sendMessage, messages, loading, bottomRef, input, setInput };
};
