import styled from "@emotion/styled";
import { Contribution, Introduce, PopularPosts, Projects } from "../widgets";

export function Main() {
  return (
    <Container>
      <Introduce />
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
  gap: 70px;
`;
