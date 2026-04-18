import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import { choi } from "@/shared/assets";

export function TypingIndicator() {
  return (
    <Row>
      <AvatarImg src={choi} alt="최경일" />
      <Bubble>
        <Dot $delay="0s" />
        <Dot $delay="0.18s" />
        <Dot $delay="0.36s" />
      </Bubble>
    </Row>
  );
}

const bounce = keyframes`
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.35;
  }
  30% {
    transform: translateY(-5px);
    opacity: 1;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 0 16px;

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

const Bubble = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 12px 15px;
  border-radius: 16px 16px 16px 4px;
  background: var(--color-bg-hover);
`;

const Dot = styled.span<{ $delay: string }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-text-secondary);
  animation: ${bounce} 1.1s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay};
`;
