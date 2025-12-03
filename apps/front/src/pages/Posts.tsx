import { usePosts } from "../shared/hooks";
import styled from "@emotion/styled";
import { Article } from "../shared/ui";
import { formatYearMonth } from "../shared/utils";
import { colors } from "@toss/tds-colors";

export function Posts() {
  const posts = usePosts();

  return (
    <Container>
      <Header>
        <Title>All</Title>
        <Description>{posts.length} posts</Description>
      </Header>
      <AllPosts>
        {posts.map((post) => (
          <Article
            key={post.link}
            title={post.title}
            link={post.link}
            thumbnail={post.thumbnail}
            likes={post.likes}
            released_at={formatYearMonth(post.released_at)}
          />
        ))}
      </AllPosts>
    </Container>
  );
}

// const ToggleButton = ({ left, right }) => {
//   const isTo
//   return;
// };

const Container = styled.div`
  width: 100%;
  max-width: 768px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
  gap: 10px;
`;

const AllPosts = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 50px 0;
`;

const Title = styled.h1`
  font-size: 2rem;
`;

const Description = styled.h2`
  color: ${colors.grey500};
`;
