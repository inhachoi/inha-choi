import styled from "@emotion/styled";
import { CommentWriter } from "./CommentWriter";
import { CommentsList } from "./CommentsList";
import { useGithubLogin } from "../model/hooks";
import { Header } from "@/shared/ui";

export default function GuestbookPage() {
  const {
    comments,
    user,
    content,
    setContent,
    submitting,
    handleLogin,
    handleSubmit,
  } = useGithubLogin();

  return (
    <Container>
      <Header>
        👋👋👋
        <br />
        반가워요! <br />
        자유롭게 방명록 남겨주세요 :)
      </Header>
      <CommentWriter
        user={user!}
        content={content}
        setContent={setContent}
        submitting={submitting}
        handleLogin={handleLogin}
        handleSubmit={handleSubmit}
      />
      <CommentsList comments={comments} />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 50px 0;

  @media (max-width: 768px) {
    margin: 35px 0;
  }

  @media (max-width: 480px) {
    margin: 20px 0;
  }
`;
