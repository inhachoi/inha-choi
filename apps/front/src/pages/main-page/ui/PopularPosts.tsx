import styled from "@emotion/styled";

import { formatYearMonth } from "@/shared/lib";
import { Article, Skeleton, Title } from "@/shared/ui";

import { usePopularPosts } from "../model";

export function PopularPosts() {
  const { popularPosts, isLoading } = usePopularPosts();

  return (
    <Container>
      <Title>Popular Posts</Title>

      {isLoading
        ? Array.from({ length: 3 }).map((_, i) => (
            <ArticleSkeleton key={i}>
              <Skeleton width="192px" height="100%" borderRadius="0" />
              <ContentSkeleton>
                <Skeleton width="70%" height="16px" />
                <Skeleton width="40%" height="12px" />
              </ContentSkeleton>
              <Skeleton width="60px" height="16px" />
            </ArticleSkeleton>
          ))
        : popularPosts.map((post) => (
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

const ArticleSkeleton = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  background: var(--color-bg-primary);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px var(--color-card-shadow);

  @media (max-width: 768px) {
    height: 68px;
  }

  @media (max-width: 480px) {
    height: 47px;
  }
`;

const ContentSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
  padding: 0 10px;
`;
