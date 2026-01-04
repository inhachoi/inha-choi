import styled from "@emotion/styled";
import { colors } from "@toss/tds-colors";
import { Article } from "@/shared/ui";
import { formatYearMonth } from "@/shared/lib/utils";
import { useSortPosts } from "../model/hooks";

export function AllPosts() {
  const { sortType, setSortType, sortedPosts } = useSortPosts();

  return (
    <Container>
      <Description>{sortedPosts.length} posts</Description>

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
    </Container>
  );
}

const Container = styled.main`
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

const Description = styled.h2`
  color: ${colors.grey500};
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const SortButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 24px 0;

  @media (max-width: 768px) {
    gap: 10px;
    margin: 21px 0;
  }

  @media (max-width: 480px) {
    gap: 8px;
    margin: 18px 0;
  }
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

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 0.5rem;
  }
`;
