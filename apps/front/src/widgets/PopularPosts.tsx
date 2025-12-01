import styled from "@emotion/styled";
import { Title, Article } from "../components";
import { usePopularPosts } from "../hooks";

export function PopularPosts() {
  const popularPosts = usePopularPosts();

  const formatYearMonth = (iso: string) => {
    const date = new Date(iso);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}.${month}`;
  };

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
  width: 700px;
  gap: 10px;
`;
