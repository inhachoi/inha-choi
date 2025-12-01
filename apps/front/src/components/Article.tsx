import styled from "@emotion/styled";
import { colors } from "@toss/tds-colors";
import heart from "../assets/heart.webp";

interface ArticleProps {
  title: string;
  link: string;
  thumbnail: string;
  likes: number;
}

export function Article({ title, link, thumbnail, likes }: ArticleProps) {
  return (
    <Container href={link} target="_blank">
      <ThumbnailWrapper>
        <Thumbnail src={thumbnail} alt="썸네일 사진" />
      </ThumbnailWrapper>

      <TitleWrapper>{title}</TitleWrapper>

      <LikesWrapper>
        <Img src={heart} alt="좋아요 마크" />
        {likes}
      </LikesWrapper>
    </Container>
  );
}

const Container = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  gap: 50px;
  width: 100%;
  height: 100px;
  background: white;
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  overflow: hidden;
  text-decoration: none;
  color: black;

  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);

  &:hover {
    background: ${colors.grey100};
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }

  &:hover div > img {
    transform: scale(1.1);
  }
`;

const ThumbnailWrapper = styled.div`
  object-fit: cover;
  overflow: hidden;
  flex-shrink: 0;
`;

const Thumbnail = styled.img`
  width: 192px;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 200px;
  font-size: 1rem;
`;

const LikesWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100px;
  flex-shrink: 0;
`;

const Img = styled.img`
  cursor: pointer;
  width: 15px;
`;
