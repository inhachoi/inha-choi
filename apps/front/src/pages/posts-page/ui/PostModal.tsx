import { useNavigate, useParams } from "@tanstack/react-router";

import { IframeModal } from "@/shared/ui";

export default function PostModal() {
  const { slug } = useParams({ strict: false });
  const navigate = useNavigate();

  if (!slug) return null;

  const url = `https://velog.io/@chlruddlf73/${slug}`;

  const handleClose = () => {
    navigate({ to: "/posts" });
  };

  return <IframeModal url={url} isOpen={true} onClose={handleClose} />;
}
