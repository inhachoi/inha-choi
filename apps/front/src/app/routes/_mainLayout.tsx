import { createFileRoute } from "@tanstack/react-router";

import { buildPageHead, SITE_NAME, SITE_URL } from "@/app/lib";
import MainPage from "@/pages/main-page";

export const Route = createFileRoute("/_mainLayout")({
  head: () => ({
    ...buildPageHead({
      title: SITE_NAME,
      description:
        "UX와 소통에 집중하는 프론트엔드 개발자 최경일의 개인 홈페이지입니다. 블로그, 방명록, AI 채팅, 미니게임 등 직접 만든 서비스를 소개합니다.",
      url: `${SITE_URL}/`,
    }),
  }),
  component: MainPage,
});
