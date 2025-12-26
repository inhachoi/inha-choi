import styled from "@emotion/styled";
import { Contribution, Introduce, PopularPosts, Projects } from "@/widgets";

import { useErrorBoundary } from "react-error-boundary";

export default function MainPage() {
  const { showBoundary } = useErrorBoundary();

  return (
    <Container>
      <Introduce />

      <button
        onClick={() => {
          showBoundary(new Error("강제 에러"));
        }}
      >
        에러 발생
      </button>

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
