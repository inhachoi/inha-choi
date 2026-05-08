import { createFileRoute } from "@tanstack/react-router";

import GuestbookPage from "@/pages/guestbook-page";
import { SITE_URL } from "@/shared/config";
import { buildPageHead } from "@/shared/lib";

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
