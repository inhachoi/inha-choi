import styled from "@emotion/styled";
import { Title, Article } from "../components";

export function PopularPosts() {
  return (
    <Container>
      <Title>Popular Posts</Title>
      <Article>Post 1</Article>
      <Article>Post 2</Article>
      <Article>Post 3</Article>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  gap: 10px;
`;
