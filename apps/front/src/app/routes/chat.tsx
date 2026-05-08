import { createFileRoute } from "@tanstack/react-router";

import ChatPage from "@/pages/chat-page";
import { SITE_URL } from "@/shared/config";
import { buildPageHead } from "@/shared/lib";

export const Route = createFileRoute("/chat")({
  head: () => ({
    ...buildPageHead({
      title: "AI 채팅 | 개발자 최경일",
      description: "최경일 AI와 대화해보세요",
      url: `${SITE_URL}/chat`,
    }),
  }),
  component: ChatPage,
});
