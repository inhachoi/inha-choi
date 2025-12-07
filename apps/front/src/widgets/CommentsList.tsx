import { useGithubLogin } from "@/shared/hooks";
import styled from "@emotion/styled";
import { colors } from "@toss/tds-colors";

export function CommentsList() {
  const { comments, user } = useGithubLogin();

  return (
    <>
      <ListHeader>
        {comments.length}개의 방명록
        <hr />
      </ListHeader>

      {comments.map((comment) => (
        <CommentItem>
          <Avatar src={comment.user.avatarUrl} alt="프로필 사진" />
          <ItemBody key={comment.id}>
            <Meta>
              {user && `${comment?.user.login}`} commented {comment.createdAt}
            </Meta>
            <Content>{comment.content}</Content>
          </ItemBody>
        </CommentItem>
      ))}
    </>
  );
}

const ListHeader = styled.div`
  padding: 10px 10px 0 10px;
`;

const CommentItem = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 10px;
  margin: 30px 0;
`;

const Avatar = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 10px;
  object-fit: cover;
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
`;

const Meta = styled.div`
  align-self: flex-start;
  text-algin: left;
  padding: 15px 10px;
  color: ${colors.grey700};
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
`;
