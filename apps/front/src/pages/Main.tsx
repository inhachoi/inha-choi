import styled from "@emotion/styled";
import { Contribution, Introduce, PopularPosts, RecentStudy } from "../widgets";

export function Main() {
  return (
    <Container>
      <Introduce />
      <Contribution />
      <PopularPosts />
      <RecentStudy />
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

