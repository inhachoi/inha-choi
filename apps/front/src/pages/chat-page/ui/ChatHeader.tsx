import styled from "@emotion/styled";

import { choi } from "@/shared/assets";

interface Props {
  onReset: () => void;
  disabled: boolean;
}

export function ChatHeader({ onReset, disabled }: Props) {
  return (
    <Container>
      <UserInfo>
        <Avatar src={choi} alt="최경일 프로필" />
        <Meta>
          <UserName>최경일</UserName>
          <UserTag>ENTJ</UserTag>
        </Meta>
      </UserInfo>
      <ResetButton onClick={onReset} disabled={disabled} aria-label="채팅 초기화">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </ResetButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--color-bg-hover);
  border-bottom: 1px solid var(--color-border);
  flex-shrink: 0;

  @media (max-width: 480px) {
    padding: 10px 12px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;

  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
  }
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const UserName = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text-primary);

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const UserTag = styled.span`
  font-size: 0.75rem;
  color: var(--color-text-secondary);

  @media (max-width: 480px) {
    font-size: 0.65rem;
  }
`;

const ResetButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 0;
  color: var(--color-text-secondary);
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;

  &:hover:not(:disabled) {
    color: var(--color-text-primary);
    background: var(--color-border);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`;
