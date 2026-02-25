import {
  Avatar,
  Button,
  ChatContainer,
  ConversationHeader,
  Message,
  MessageInput,
  MessageList,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import styled from "@emotion/styled";

import { choi } from "@/shared/assets";
import { Header } from "@/shared/ui";

import { useChat } from "../model";

export default function ChatPage() {
  const {
    sendMessage,
    messages,
    loading,
    input,
    setInput,
    streamingMessage,
    resetChat,
  } = useChat();

  return (
    <Container>
      <Header>
        🤖🤖🤖 <br />
        궁금한걸 물어보세요! <br />
        AI이지만, 성격은 똑같아요 :)
      </Header>

      <ChatContainerWrapper>
        <ChatContainer>
          <ConversationHeader>
            <Avatar name="최경일" src={choi} />
            <ConversationHeader.Content userName="최경일" info="ENTJ" />
            <ConversationHeader.Actions>
              <Button onClick={resetChat} disabled={loading}>
                reset
              </Button>
            </ConversationHeader.Actions>
          </ConversationHeader>

          <MessageList
            typingIndicator={
              loading ? <TypingIndicator content="답변 중..." /> : null
            }
          >
            <Message
              model={{
                direction: "incoming",
                message:
                  "난 AI 최경일 챗봇이야. <br/>개발, 취미, 시덥잖은 이야기 뭐든 좋으니 편하게 말해줘ㅎㅎ",
                position: "single",
              }}
            />

            {messages.map((msg, i) => (
              <Message
                key={i}
                model={{
                  direction: msg.role === "user" ? "outgoing" : "incoming",
                  message: msg.content,
                  position: "single",
                }}
              />
            ))}

            {streamingMessage && (
              <Message
                model={{
                  direction: "incoming",
                  message: streamingMessage,
                  position: "single",
                }}
              />
            )}
          </MessageList>

          <MessageInput
            placeholder="메시지를 입력하세요"
            value={input}
            onChange={setInput}
            onSend={sendMessage}
            sendDisabled={loading}
            attachButton={false}
            fancyScroll
            autoFocus
            activateAfterChange
          />
        </ChatContainer>
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
  height: 100%;
  border: 2px solid var(--color-border);
  border-radius: 10px;
  overflow: hidden;

  .cs-message__html-content {
    line-height: 1.5;
    white-space: pre-wrap;
  }
`;
