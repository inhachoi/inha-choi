import { formatYearMonth } from "@/shared/lib";
import { Article } from "@/shared/ui";
import { usePostsVirtualizer } from "../model";
import styled from "@emotion/styled";

export const PostsList = () => {
  const { parentRef, rowVirtualizer, virtualItems, posts } =
    usePostsVirtualizer();

  return (
    <VirtualContainer
      ref={parentRef}
      totalHeight={rowVirtualizer.getTotalSize()}
    >
      {virtualItems.map((virtualRow) => {
        const post = posts[virtualRow.index];

        return (
          <Row
            key={post.link}
            ref={rowVirtualizer.measureElement}
            translateY={virtualRow.start}
          >
            <Article
              title={post.title}
              link={post.link}
              thumbnail={post.thumbnail}
              likes={post.likes}
              released_at={formatYearMonth(post.released_at)}
            />
          </Row>
        );
      })}
    </VirtualContainer>
  );
};

const VirtualContainer = styled.div<{ totalHeight: number }>`
  width: 100%;
  height: calc(100vh - 340px);
  overflow-y: auto;
  position: relative;

  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: ${({ totalHeight }) => totalHeight}px;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    height: calc(100vh - 260px);
  }

  @media (max-width: 480px) {
    height: calc(100vh - 190px);
  }
`;

const Row = styled.div<{ translateY: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transform: translateY(${({ translateY }) => translateY}px);
`;
