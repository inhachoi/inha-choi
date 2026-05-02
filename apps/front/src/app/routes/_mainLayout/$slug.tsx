import { createFileRoute } from "@tanstack/react-router";

import PostModal from "@/pages/main-page/ui/PostModal";

export const Route = createFileRoute("/_mainLayout/$slug")({
  component: PostModal,
});
