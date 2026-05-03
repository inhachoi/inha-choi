import { createFileRoute } from "@tanstack/react-router";

import GuestbookPage from "@/pages/guestbook-page";

export const Route = createFileRoute("/guestbook")({
  component: GuestbookPage,
});
