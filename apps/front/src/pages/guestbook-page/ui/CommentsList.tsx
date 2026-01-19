import styled from "@emotion/styled";
import { colors } from "@toss/tds-colors";
import { formatYearMonthDay } from "@/shared/lib/utils";
import type { CommentDTO } from "../model/types";

export function CommentsList({ comments }: { comments: CommentDTO[] }) {
  return (
    <>
      <ListHeader>
        {comments.length}개의 방명록
        <hr />
      </ListHeader>

      {comments.map((comment) => (
        <CommentItem key={comment.id}>
          <Avatar
            src={comment.user.avatarUrl}
            alt="프로필 사진"
            loading="lazy"
          />
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

const ListHeader = styled.div`
  padding: 15px 10px 0 10px;

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

const Avatar = styled.img`
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

const Meta = styled.div`
  align-self: flex-start;
  text-algin: left;
  padding: 15px 10px;
  color: ${colors.grey700};

  @media (max-width: 768px) {
    padding: 12.5px 8px;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 10px 6px;
    font-size: 0.6rem;
  }
`;

const ItemBody = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  width: 100%;
  padding: 0 15px;
  background: ${colors.grey100};
  border: 1px solid ${colors.grey200};
  border-radius: 10px;

  @media (max-width: 768px) {
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    padding: 0 5px;
  }
`;

const Content = styled.div`
  width: 100%;
  background: ${colors.grey50};
  border: 1px solid ${colors.grey200};
  border-radius: 5px;
  padding: 10px;
  margin: 0 0 10px 0;
  box-sizing: border-box;
  white-space: pre-wrap;
  word-break: break-word;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 0.6rem;
  }
`;
