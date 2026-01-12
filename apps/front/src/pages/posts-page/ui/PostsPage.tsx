import styled from "@emotion/styled";
import { AllPosts } from "./AllPosts";

export default function PostsPage() {
  return (
    <Container>
      <Header>All</Header>
      <AllPosts />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 768px;
  padding: 50px 15px;

  @media (max-width: 768px) {
    padding: 35px 15px;
  }

  @media (max-width: 480px) {
    padding: 20px 15px;
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;
