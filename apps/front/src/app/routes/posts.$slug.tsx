import { createFileRoute } from "@tanstack/react-router";

import PostModal from "@/pages/posts-page/ui/PostModal";

export const Route = createFileRoute("/posts/$slug")({
  component: PostModal,
});
