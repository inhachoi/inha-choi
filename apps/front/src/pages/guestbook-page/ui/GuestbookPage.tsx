import styled from "@emotion/styled";

import { Header, Skeleton } from "@/shared/ui";

import { useGithubLogin } from "../model";

import { CommentsList } from "./CommentsList";
import { CommentWriter } from "./CommentWriter";

export default function GuestbookPage() {
  const {
    comments,
    user,
    content,
    setContent,
    submitting,
    isLoading,
    handleLogin,
    handleSubmit,
  } = useGithubLogin();

  return (
    <Container>
      <Header>
        👋👋👋
        <br />
        반가워요! <br />
        자유롭게 방명록 남겨주세요 :)
      </Header>
      <CommentWriter
        user={user!}
        content={content}
        setContent={setContent}
        submitting={submitting}
        handleLogin={handleLogin}
        handleSubmit={handleSubmit}
      />
      {isLoading ? (
        <SkeletonList>
          <ListHeaderSkeleton>
            <Skeleton width="100px" height="16px" />
          </ListHeaderSkeleton>
          {Array.from({ length: 3 }).map((_, i) => (
            <CommentSkeleton key={i}>
              <Skeleton width="75px" height="75px" borderRadius="10px" />
              <ItemBodySkeleton>
                <Skeleton width="50%" height="14px" />
                <Skeleton width="100%" height="48px" borderRadius="5px" />
              </ItemBodySkeleton>
            </CommentSkeleton>
          ))}
        </SkeletonList>
      ) : (
        <CommentsList comments={comments} />
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 50px 0;

  @media (max-width: 768px) {
    margin: 35px 0;
  }

  @media (max-width: 480px) {
    margin: 20px 0;
  }
`;

const SkeletonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 20px;
`;

const ListHeaderSkeleton = styled.div`
  padding: 15px 10px 0 10px;
`;

const CommentSkeleton = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 10px;
  align-items: flex-start;

  @media (max-width: 768px) {
    gap: 15px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const ItemBodySkeleton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  padding: 15px;
  background: var(--color-bg-hover);
  border-radius: 10px;

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media (max-width: 480px) {
    padding: 5px;
  }
`;
