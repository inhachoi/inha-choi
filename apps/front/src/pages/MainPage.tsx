import styled from "@emotion/styled";
import { Contribution, Introduce, PopularPosts, Projects } from "@/widgets";

export default function MainPage() {
  return (
    <Container>
      <Introduce />
      <Content>
        <Projects />
        <PopularPosts />
        <Contribution />
      </Content>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 768px;
  padding: 0 15px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    gap: 45px;
  }

  @media (max-width: 480px) {
    gap: 20px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 768px;
  gap: 70px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    gap: 45px;
  }

  @media (max-width: 480px) {
    gap: 20px;
  }
`;
