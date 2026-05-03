import { createFileRoute } from "@tanstack/react-router";

import GuestbookPage from "@/pages/guestbook-page";

const OG_IMAGE = "https://www.gyeung-il.com/assets/choi-CBcsyV5s.jpg";

export const Route = createFileRoute("/guestbook")({
  head: () => ({
    meta: [
      { title: "방명록 | 개발자 최경일" },
      { key: "description", name: "description", content: "여러분의 흔적을 남겨주세요" },
      { key: "og:title", property: "og:title", content: "방명록 | 개발자 최경일" },
      { key: "og:description", property: "og:description", content: "여러분의 흔적을 남겨주세요" },
      { key: "og:image", property: "og:image", content: OG_IMAGE },
      { key: "og:url", property: "og:url", content: "https://www.gyeung-il.com/guestbook" },
      { key: "twitter:title", name: "twitter:title", content: "방명록 | 개발자 최경일" },
      { key: "twitter:description", name: "twitter:description", content: "여러분의 흔적을 남겨주세요" },
      { key: "twitter:image", name: "twitter:image", content: OG_IMAGE },
    ],
  }),
  component: GuestbookPage,
});
