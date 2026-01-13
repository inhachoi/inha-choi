import styled from "@emotion/styled";
import { colors } from "@toss/tds-colors";
import { PostsSort } from "./PostsSort";
import { PostsList } from "./PostsList";
import { useSortPosts } from "../model/hooks";

export default function PostsPage() {
  const { sortType, setSortType, sortedPosts } = useSortPosts();

  return (
    <Container>
      <Header>All</Header>
      <PostsLayout>
        <PostsCount>{sortedPosts.length} posts</PostsCount>
        <PostsSort sortType={sortType} setSortType={setSortType} />
        <PostsList posts={sortedPosts} />
      </PostsLayout>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 768px;
  padding: 50px 15px;

  @media (max-width: 768px) {
    padding: 35px 15px;
  }

  @media (max-width: 480px) {
    padding: 20px 15px;
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const PostsLayout = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 20px 0;

  @media (max-width: 768px) {
    gap: 15px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const PostsCount = styled.h2`
  color: ${colors.grey500};
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;
