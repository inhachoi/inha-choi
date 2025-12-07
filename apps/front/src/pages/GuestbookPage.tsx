import styled from "@emotion/styled";
import { CommentsList, CommentWriter } from "@/widgets";

export function GuestbookPage() {
  return (
    <Container>
      <Header>
        👋👋👋
        <br />
        반가워요! <br />
        자유롭게 방명록 남겨주세요 :)
      </Header>

      <CommentWriter />

      <CommentsList />
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

const Header = styled.header`
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 1.5rem;
  line-height: 1.5;
  margin: 0 0 50px 0;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;
