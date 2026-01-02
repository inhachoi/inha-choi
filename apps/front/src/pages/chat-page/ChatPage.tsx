import {
  ChatContainer,
  Avatar,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  ConversationHeader,
} from "@chatscope/chat-ui-kit-react";
import { useChat } from "./hooks";
import { choi } from "@/shared/assets";
import styled from "@emotion/styled";
import { Header } from "@/shared/ui";

export default function ChatPage() {
  const { sendMessage, messages, loading, input, setInput } =
    useChat();

  return (
    <Container>
      <Header>
        🤖🤖🤖 <br />
        궁금한걸 물어보세요! <br />
        AI이지만, 성격은 똑같아요 :)
      </Header>

      <ChatContainer>
        <ConversationHeader>
          <Avatar name="최경일" src={choi} />
          <ConversationHeader.Content info="ENTJ" userName="최경일" />
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
                "난 AI 최경일 챗봇이야. <br/>개발, 취미, 시덥잖은 이야기 뭐든 좋으니 편하게 말해봐ㅎㅎ",
              position: "single",
            }}
          />
          {messages.map((msg, index) => (
            <Message
              key={index}
              model={{
                direction: msg.role === "user" ? "outgoing" : "incoming",
                message: msg.content,
                position: "single",
                sender: msg.role,
              }}
            />
          ))}
        </MessageList>

        <MessageInput
          placeholder="메시지를 입력하세요"
          value={input}
          onChange={setInput}
          onSend={(text) => sendMessage(text)}
          disabled={loading}
        />
      </ChatContainer>
    </Container>
  );
}

const Container = styled.div`
  min-width: 370px;
  max-width: 768px;
  width: 100%;
  height: calc(80vh - 140px);
  margin: 50px 0;

  @media (max-width: 768px) {
    margin: 35px 0;
  }

  @media (max-width: 480px) {
    margin: 20px 0;
  }
`;
