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
          {Array.from({ length: 3 }).map((_, i) => (
            <CommentSkeleton key={i}>
              <AvatarSkeletonWrapper>
                <Skeleton width="100%" height="100%" borderRadius="10px" />
              </AvatarSkeletonWrapper>
              <Skeleton width="100%" height="80px" borderRadius="10px" />
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
  gap: 20px;
  padding: 0 10px;
  margin-top: 20px;
`;

const CommentSkeleton = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
`;

const AvatarSkeletonWrapper = styled.div`
  width: 75px;
  height: 75px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }

  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
  }
`;
