import { useState, useMemo } from "react";
import { usePosts } from "../shared/hooks";
import styled from "@emotion/styled";
import { Article } from "@/shared/ui";
import { formatYearMonth } from "@/shared/utils";
import { colors } from "@toss/tds-colors";

export function Posts() {
  const { posts } = usePosts();
  const [sortType, setSortType] = useState<"latest" | "oldest" | "likes">(
    "latest"
  );

  // 정렬된 posts를 useMemo로 계산
  const sortedPosts = useMemo(() => {
    if (!posts) return [];

    switch (sortType) {
      case "latest":
        return [...posts].sort(
          (a, b) =>
            new Date(b.released_at).getTime() -
            new Date(a.released_at).getTime()
        );
      case "oldest":
        return [...posts].sort(
          (a, b) =>
            new Date(a.released_at).getTime() -
            new Date(b.released_at).getTime()
        );
      case "likes":
        return [...posts].sort((a, b) => b.likes - a.likes);
      default:
        return posts;
    }
  }, [posts, sortType]);

  return (
    <Container>
      <Header>All</Header>

      <AllPosts>
        <Description>{posts.length} posts</Description>

        <SortButtonGroup>
          <SortButton
            active={sortType === "latest"}
            onClick={() => setSortType("latest")}
          >
            최신순
          </SortButton>
          <SortButton
            active={sortType === "oldest"}
            onClick={() => setSortType("oldest")}
          >
            오래된순
          </SortButton>
          <SortButton
            active={sortType === "likes"}
            onClick={() => setSortType("likes")}
          >
            좋아요순
          </SortButton>
        </SortButtonGroup>

        {sortedPosts.map((post) => (
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

const Container = styled.div`
  width: 100%;
  max-width: 768px;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px 0 0 0;
  gap: 10px;
  font-size: 2rem;
`;

const AllPosts = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
`;

const Description = styled.h2`
  color: ${colors.grey500};
  font-size: 1rem;
`;

const SortButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 24px 0;
`;

const SortButton = styled.button<{ active: boolean }>`
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid
    ${({ active }) => (active ? colors.grey500 : colors.greyOpacity300)};
  background: ${({ active }) => (active ? colors.grey500 : "transparent")};
  color: ${({ active }) => (active ? colors.white : colors.grey600)};
  font-weight: ${({ active }) => (active ? 600 : 400)};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    ${({ active }) => !active && `background: ${colors.greyOpacity100};`}
  }
`;
