import styled from "@emotion/styled";
import {
  Contribution,
  FoodSlotMachine,
  Introduce,
  PopularPosts,
  Projects,
} from "@/widgets";

export function MainPage() {
  return (
    <Container>
      <Introduce />
      <FoodSlotMachine />
      <Projects />
      <PopularPosts />
      <Contribution />
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
  gap: 70px;
  padding: 0 15px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    gap: 45px;
  }

  @media (max-width: 480px) {
    gap: 20px;
  }
`;
