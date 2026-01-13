import { formatYearMonth } from "@/shared/lib/utils";
import { Article } from "@/shared/ui";
import { useInfinitePosts } from "../model/hooks";
import { useRef, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import styled from "@emotion/styled";
import { getArticleHeight } from "../lib/utils";

export const PostsList = () => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfinitePosts();

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  const rowVirtualizer = useVirtualizer({
    count: posts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: getArticleHeight,
    overscan: 2,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const handleResize = () => {
      rowVirtualizer.measure();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [rowVirtualizer]);

  useEffect(() => {
    const lastItem = virtualItems[virtualItems.length - 1];
    if (!lastItem) return;

    if (
      lastItem.index >= posts.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    virtualItems,
    posts.length,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  ]);

  return (
    <ScrollContainer ref={parentRef}>
      <Inner style={{ height: rowVirtualizer.getTotalSize() }}>
        {virtualItems.map((virtualRow) => {
          const post = posts[virtualRow.index];

          return (
            <Row
              key={post.link}
              ref={rowVirtualizer.measureElement}
              style={{ transform: `translateY(${virtualRow.start}px)` }}
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
      </Inner>
    </ScrollContainer>
  );
};

const ScrollContainer = styled.div`
  width: 100%;
  height: calc(100vh - 340px);
  overflow-y: auto;

  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    height: calc(100vh - 260px);
  }

  @media (max-width: 480px) {
    height: calc(100vh - 190px);
  }
`;

const Inner = styled.div`
  position: relative;
  width: 100%;
`;

const Row = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;
