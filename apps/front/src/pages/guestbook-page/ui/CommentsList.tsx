import { useState } from "react";
import styled from "@emotion/styled";

import { formatYearMonthDay } from "@/shared/lib";
import { Skeleton } from "@/shared/ui";

import type { CommentDTO } from "../model";

export function CommentsList({ comments }: { comments: CommentDTO[] }) {
  return (
    <>
      <ListHeader>
        {comments.length}개의 방명록
        <hr />
      </ListHeader>

      {comments.map((comment) => (
        <CommentItem key={comment.id}>
          <AvatarWrapper>
            <AvatarImage src={comment.user.avatarUrl ?? ""} />
          </AvatarWrapper>
          <ItemBody>
            <Meta>
              {comment.user.login} 님의 방명록 -{" "}
              {formatYearMonthDay(comment.createdAt)}
            </Meta>
            <Content>{comment.content}</Content>
          </ItemBody>
        </CommentItem>
      ))}
    </>
  );
}

function AvatarImage({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Skeleton width="75px" height="75px" borderRadius="10px" />}
      <Avatar
        src={src}
        alt="프로필 사진"
        width={75}
        height={75}
        loading="lazy"
        loaded={loaded}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </>
  );
}

const ListHeader = styled.div`
  padding: 15px 10px 0 10px;
  color: var(--color-text-primary);

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const CommentItem = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 10px;
  margin: 30px 0;

  @media (max-width: 768px) {
    gap: 15px;
    font-size: 0.85rem;
    margin: 22.5px 0;
  }

  @media (max-width: 480px) {
    gap: 10px;
    font-size: 0.7rem;
    margin: 15px 0;
  }
`;

const AvatarWrapper = styled.div`
  position: relative;
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

const Avatar = styled.img<{ loaded: boolean }>`
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
  position: ${({ loaded }) => (loaded ? "static" : "absolute")};
  transition: opacity 0.3s ease;
  width: 75px;
  height: 75px;
  border-radius: 10px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }

  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
  }
`;

const ItemBody = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  width: 100%;
  padding: 0 15px;
  background: var(--color-bg-hover);
  border: 1px solid var(--color-bg-hover);
  border-radius: 10px;

  @media (max-width: 768px) {
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    padding: 0 5px;
  }
`;

const Meta = styled.div`
  align-self: flex-start;
  text-algin: left;
  padding: 15px 10px;
  color: var(--color-text-secondary);

  @media (max-width: 768px) {
    padding: 12.5px 8px;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 10px 6px;
    font-size: 0.6rem;
  }
`;

const Content = styled.div`
  width: 100%;
  background: var(--color-bg-page);
  border: 1px solid var(--color-bg-hover);
  border-radius: 5px;
  padding: 10px;
  margin: 0 0 10px 0;
  box-sizing: border-box;
  white-space: pre-wrap;
  word-break: break-word;
  color: var(--color-text-primary);

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 0.6rem;
  }
`;
