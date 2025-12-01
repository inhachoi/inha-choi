import styled from "@emotion/styled";
import { Title, Article } from "../components";
import { usePopularPosts } from "../hooks";

export function PopularPosts() {
  const popularPosts = usePopularPosts();

  return (
    <Container>
      <Title>Popular Posts</Title>
      {popularPosts.map((post) => (
        <Article
          key={post.link}
          title={post.title}
          link={post.link}
          thumbnail={post.thumbnail}
          likes={post.likes}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  gap: 10px;
`;
