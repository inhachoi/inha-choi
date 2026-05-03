import { createFileRoute } from "@tanstack/react-router";

import NotFoundPage from "@/pages/not-found-page";

export const Route = createFileRoute("/$")({
  component: NotFoundPage,
});
