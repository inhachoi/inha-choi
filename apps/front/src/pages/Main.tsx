import styled from "@emotion/styled";
import { Contribution, Introduce, PopularPosts, RecentStudy } from "../widgets";

export function Main() {
  return (
    <Container>
      <Introduce />
      <PopularPosts />
      <RecentStudy />
      <Contribution />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 100px;
  width: 100%
`;
