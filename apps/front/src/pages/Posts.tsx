import { usePosts } from "../hooks";
import styled from "@emotion/styled";
import { Article } from "../components";
import { formatYearMonth } from "../utils";

export function Posts() {
  const posts = usePosts();

  return (
    <Container>
      <PostsHeader>{posts.length} posts</PostsHeader>
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

const Container = styled.div``;

const AllPosts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 50px 0;
`;

const PostsHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin: 50px 0;
`;
