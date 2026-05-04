import { useEffect, useRef } from "react";
import styled from "@emotion/styled";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSend: (text: string) => void;
  disabled: boolean;
}

export function ChatInput({ value, onChange, onSend, disabled }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    // border-box 사용 시 scrollHeight는 border 미포함 → 2px 보정
    el.style.height = `${el.scrollHeight + 2}px`;
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    // IME 조합 중인 마지막 글자가 DOM에 잔류하는 것을 막기 위해 직접 초기화
    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
  };

  return (
    <Container>
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="메시지를 입력하세요"
        rows={1}
        autoFocus
      />
      <SendButton onClick={handleSend} disabled={disabled || !value.trim()} aria-label="전송">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 19V5" />
          <path d="M5 12l7-7 7 7" />
        </svg>
      </SendButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: var(--color-bg-hover);
  border-top: 1px solid var(--color-border);
  flex-shrink: 0;

  @media (max-width: 480px) {
    padding: 8px 10px;
    gap: 6px;
  }
`;

const Textarea = styled.textarea`
  flex: 1;
  box-sizing: border-box;
  resize: none;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  outline: none;
  padding: 6px 12px;
  font-size: 0.875rem;
  line-height: 1.5;
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  min-height: 32px;
  max-height: 120px;
  overflow-y: auto;
  transition: border-color 0.2s;

  &::placeholder {
    color: var(--color-text-secondary);
  }

  &:focus {
    border-color: var(--color-text-secondary);
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 5px 10px;
    min-height: 32px;
  }
`;

const SendButton = styled.button`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: #ffffff;
  background: #1e293b;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;

  &:hover:not(:disabled) {
    opacity: 0.8;
    transform: scale(1.05);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;
