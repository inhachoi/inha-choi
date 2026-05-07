import { createFileRoute } from "@tanstack/react-router";

import { buildMeta, SITE_URL } from "@/app/lib";
import ChatPage from "@/pages/chat-page";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: buildMeta({
      title: "AI 채팅 | 개발자 최경일",
      description: "최경일 AI와 대화해보세요",
      url: `${SITE_URL}/chat`,
    }),
  }),
  component: ChatPage,
});
