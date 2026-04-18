import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import { choi } from "@/shared/assets";

interface Props {
  role: "user" | "assistant";
  content: string;
}

export function MessageBubble({ role, content }: Props) {
  const isUser = role === "user";

  return (
    <Row $isUser={isUser}>
      {!isUser && <AvatarImg src={choi} alt="최경일" />}
      <Bubble $isUser={isUser}>{content}</Bubble>
    </Row>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Row = styled.div<{ $isUser: boolean }>`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  justify-content: ${({ $isUser }) => ($isUser ? "flex-end" : "flex-start")};
  padding: 0 16px;
  animation: ${fadeIn} 0.2s ease-out;

  @media (max-width: 480px) {
    padding: 0 12px;
    gap: 6px;
  }
`;

const AvatarImg = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
  margin-bottom: 2px;

  @media (max-width: 480px) {
    width: 22px;
    height: 22px;
  }
`;

const Bubble = styled.div<{ $isUser: boolean }>`
  max-width: 68%;
  padding: 10px 14px;
  border-radius: ${({ $isUser }) =>
    $isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px"};
  font-size: 0.875rem;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;

  background: ${({ $isUser }) => ($isUser ? "#1e293b" : "var(--color-bg-hover)")};
  color: ${({ $isUser }) => ($isUser ? "#f1f5f9" : "var(--color-text-primary)")};

  @media (max-width: 768px) {
    max-width: 78%;
    font-size: 0.85rem;
    padding: 9px 12px;
  }

  @media (max-width: 480px) {
    max-width: 82%;
    font-size: 0.8rem;
    padding: 8px 11px;
  }
`;
