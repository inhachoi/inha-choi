import { createFileRoute } from "@tanstack/react-router";

import { buildPageHead, SITE_URL } from "@/app/lib";
import GuestbookPage from "@/pages/guestbook-page";

export const Route = createFileRoute("/guestbook")({
  head: () => ({
    ...buildPageHead({
      title: "방명록 | 개발자 최경일",
      description: "여러분의 흔적을 남겨주세요",
      url: `${SITE_URL}/guestbook`,
    }),
  }),
  component: GuestbookPage,
});
