import styled from "@emotion/styled";
import { colors } from "@toss/tds-colors";
import { overlay } from "overlay-kit";
import { heart } from "../assets";
import { Date, IframeModal } from "../ui";

interface Props {
  title: string;
  link: string;
  thumbnail: string;
  likes: number;
  released_at: string;
}

export function Article({ title, link, thumbnail, likes, released_at }: Props) {
  return (
    <Container
      onClick={() => {
        overlay.open(({ isOpen, close }) => (
          <IframeModal url={link} isOpen={isOpen} onClose={close} />
        ));
      }}
    >
      <ThumbnailWrapper>
        <Thumbnail src={thumbnail} alt="썸네일 사진" />
      </ThumbnailWrapper>

      <ContentWrapper>
        {title}
        <Date>{released_at}</Date>
      </ContentWrapper>

      <LikesWrapper>
        <Img src={heart} alt="좋아요 마크" loading="lazy" />
        {likes}
      </LikesWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  width: 100%;
  height: 100px;
  background: white;
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  overflow: hidden;
  color: black;

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);

  &:hover {
    background: ${colors.grey100};
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }

  &:hover div > img {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    height: 68px;

    div {
      font-size: 0.8em;
    }
  }

  @media (max-width: 480px) {
    height: 47px;

    div {
      font-size: 0.6em;
    }
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

  @media (max-width: 768px) {
    width: 130px;
  }

  @media (max-width: 480px) {
    width: 90px;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  padding: 0 10px;
  font-size: 1rem;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 10px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const LikesWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 75px;
  }

  @media (max-width: 480px) {
    width: 50px;
  }
`;

const Img = styled.img`
  cursor: pointer;
  width: 15px;

  @media (max-width: 768px) {
    width: 12.5px;
  }

  @media (max-width: 480px) {
    width: 10px;
  }
`;
