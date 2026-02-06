import styled from "@emotion/styled";
import { usePopularPosts } from "../model";
import { Title, Article } from "@/shared/ui";
import { formatYearMonth } from "@/shared/lib/utils";

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
          released_at={formatYearMonth(post.released_at)}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 480px) {
    gap: 6px;
  }
`;
