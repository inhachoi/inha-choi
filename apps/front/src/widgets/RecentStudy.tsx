import { Title, Article } from "../components";
import styled from "@emotion/styled";

export function RecentStudy() {
  return (
    <Container>
      <Title>Recent Study</Title>
      <Article>동기 / 비동기</Article>
      <Article>Infinity + Virtual Scroll</Article>
      <Article>Glitch Text</Article>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  gap: 10px;
  margin: 20px 0px;
`;
