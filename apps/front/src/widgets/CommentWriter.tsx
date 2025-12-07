import styled from "@emotion/styled";
import { colors } from "@toss/tds-colors";
import { defaultUser, github } from "@/assets";
import { useGithubLogin } from "@/shared/hooks";

export function CommentWriter() {
  const { user, content, setContent, submitting, handleLogin, handleSubmit } =
    useGithubLogin();

  return (
    <Container>
      <Avatar src={user?.avatarUrl || defaultUser} alt="프로필 사진" />

      <WriterForm>
        <Greeting>
          {user && `${user?.login} 님,`} 오늘 하루도 행복하세요 ☺️
        </Greeting>

        <InputArea
          placeholder="소소한 인사 한 줄도 큰 힘이 돼요!"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={!user}
        ></InputArea>

        {user ? (
          <SubmitButton
            onClick={handleSubmit}
            disabled={!content.trim() || submitting}
          >
            등록
          </SubmitButton>
        ) : (
          <LoginButton onClick={handleLogin}>
            <img src={github} alt="깃허브 로고 이미지" width={70} />
            GitHub으로 로그인
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
`;

const Greeting = styled.div`
  align-self: flex-start;
  text-algin: left;
  padding: 15px 10px;
  color: ${colors.grey700};
`;

const InputArea = styled.textarea`
  width: 100%;
  height: 10vh;
  resize: vertical;
  border: 1px solid ${colors.grey200};
  border-radius: 5px;
  outline: none;
  padding: 10px;
  box-sizing: border-box;

  &:focus {
    border: 1px solid ${colors.grey900};
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  height: 30px;
  margin: 10px 0;
  padding: 5px 15px;
  border: none;
  border-radius: 10px;
  background: ${colors.black};
  color: white;
  cursor: pointer;
  font-size: 1rem;
`;

const LoginButton = SubmitButton;
