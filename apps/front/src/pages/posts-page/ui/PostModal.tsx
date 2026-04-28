import { useNavigate, useParams } from "@tanstack/react-router";

import { linkToSlug } from "@/shared/lib";
import { usePosts } from "@/shared/model";
import { IframeModal } from "@/shared/ui";

export default function PostModal() {
  const { slug } = useParams({ strict: false });
  const navigate = useNavigate();
  const { posts } = usePosts();

  const post = posts.find((p) => linkToSlug(p.link) === slug);

  const handleClose = () => {
    navigate({ to: "/posts" });
  };

  if (!post) return null;

  return <IframeModal url={post.link} isOpen={true} onClose={handleClose} />;
}
