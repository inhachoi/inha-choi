import { useEffect, useRef } from "react";
import styled from "@emotion/styled";

import { Header } from "@/shared/ui";

import { useChat } from "../model";

import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";

const INITIAL_MESSAGE =
  "난 AI 최경일 챗봇이야.\n개발, 취미, 시덥잖은 이야기 뭐든 좋으니 편하게 말해줘ㅎㅎ";

export default function ChatPage() {
  const { sendMessage, messages, loading, input, setInput, streamingMessage, resetChat } =
    useChat();

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingMessage, loading]);

  return (
    <Container>
      <Header>
        🤖🤖🤖 <br />
        궁금한걸 물어보세요! <br />
        AI이지만, 성격은 똑같아요 :)
      </Header>

      <ChatContainerWrapper>
        <ChatHeader onReset={resetChat} disabled={loading} />

        <MessageScrollArea>
          <MessageList>
            <MessageBubble role="assistant" content={INITIAL_MESSAGE} />

            {messages.map((msg, i) => (
              <MessageBubble key={i} role={msg.role} content={msg.content} />
            ))}

            {streamingMessage && (
              <MessageBubble role="assistant" content={streamingMessage} />
            )}

            {loading && !streamingMessage && <TypingIndicator />}

            <div ref={bottomRef} />
          </MessageList>
        </MessageScrollArea>

        <ChatInput
          value={input}
          onChange={setInput}
          onSend={sendMessage}
          disabled={loading}
        />
      </ChatContainerWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 370px;
  max-width: 768px;
  width: 100%;
  height: calc(90vh - 140px);
  margin: 50px 0;

  @media (max-width: 768px) {
    margin: 35px 0;
    height: calc(90vh - 114px);
  }

  @media (max-width: 480px) {
    margin: 20px 0;
    height: calc(95vh - 90px);
  }
`;

const ChatContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  overflow: hidden;
  background: var(--color-bg-primary);
  box-shadow: 0 4px 24px var(--color-shadow);
`;

const MessageScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  background: var(--color-bg-primary);
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 0;

  @media (max-width: 480px) {
    gap: 8px;
    padding: 12px 0;
  }
`;
