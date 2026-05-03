import { createFileRoute } from "@tanstack/react-router";

import ChatPage from "@/pages/chat-page";

const OG_IMAGE = "https://www.gyeung-il.com/assets/choi-CBcsyV5s.jpg";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI 채팅 | 개발자 최경일" },
      { key: "description", name: "description", content: "최경일 AI와 대화해보세요" },
      { key: "og:title", property: "og:title", content: "AI 채팅 | 개발자 최경일" },
      { key: "og:description", property: "og:description", content: "최경일 AI와 대화해보세요" },
      { key: "og:image", property: "og:image", content: OG_IMAGE },
      { key: "og:url", property: "og:url", content: "https://www.gyeung-il.com/chat" },
      { key: "twitter:title", name: "twitter:title", content: "AI 채팅 | 개발자 최경일" },
      { key: "twitter:description", name: "twitter:description", content: "최경일 AI와 대화해보세요" },
      { key: "twitter:image", name: "twitter:image", content: OG_IMAGE },
    ],
  }),
  component: ChatPage,
});
