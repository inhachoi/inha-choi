import styled from "@emotion/styled";
import { colors } from "@toss/tds-colors";
import { defaultUser } from "@/shared/assets";
import type { CommentWriterType } from "@/shared/lib/types";

export function CommentWriter({
  user,
  content,
  setContent,
  submitting,
  handleLogin,
  handleSubmit,
}: CommentWriterType) {
  return (
    <Container>
      <Avatar
        src={user?.avatarUrl || defaultUser}
        alt="프로필 사진"
        loading="lazy"
      />

      <WriterForm>
        <Greeting>
          {user && `${user?.login} 님,`} 오늘 하루도 행복하세요 ☺️
        </Greeting>

        <InputArea
          placeholder={
            user ? "소소한 인사 한 줄도 큰 힘이 돼요!" : "로그인이 필요해요!"
          }
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={!user}
        />

        {user ? (
          <SubmitButton
            onClick={handleSubmit}
            disabled={!content.trim() || submitting}
          >
            등록
          </SubmitButton>
        ) : (
          <LoginButton onClick={handleLogin}>
            GitHub 계정으로 로그인
          </LoginButton>
        )}
      </WriterForm>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 10px;
  margin: 30px 0;

  @media (max-width: 768px) {
    gap: 15px;
    font-size: 0.85rem;
    margin: 20px 0;

    img {
      width: 60px;
      height: 60px;
    }
  }

  @media (max-width: 480px) {
    gap: 10px;
    font-size: 0.7rem;
    margin: 10px 0;

    img {
      width: 45px;
      height: 45px;
    }
  }
`;

const Avatar = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 10px;
  object-fit: cover;
`;

const WriterForm = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  width: 100%;
  padding: 0 15px;
  background: ${colors.grey100};
  border: 1px solid ${colors.grey200};
  border-radius: 10px;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    font-size: 0.6rem;
    padding: 0 5px;
  }
`;

const Greeting = styled.div`
  align-self: flex-start;
  text-algin: left;
  padding: 15px 10px;
  color: ${colors.grey700};

  @media (max-width: 768px) {
    padding: 12.5px 8px;
  }

  @media (max-width: 480px) {
    padding: 10px 6px;
  }
`;

const InputArea = styled.textarea`
  width: 100%;
  height: 8vh;
  resize: vertical;
  border: 1px solid ${colors.grey200};
  border-radius: 5px;
  outline: none;
  padding: 10px;
  box-sizing: border-box;

  &:focus {
    border: 1px solid ${colors.grey900};
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 8px;
  }

  @media (max-width: 480px) {
    font-size: 0.6rem;
    padding: 6px;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 5px 15px;
  border: none;
  border-radius: 10px;
  background: ${colors.black};
  color: white;
  cursor: pointer;
  font-size: 1rem;

  @media (max-width: 768px) {
    margin: 7.5px 0;
    padding: 4px 12px;
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    margin: 5px 0;
    padding: 3px 9px;
    font-size: 0.5rem;
  }
`;

const LoginButton = SubmitButton;
