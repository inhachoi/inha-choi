import { Title, Article } from "../components";
import styled from "@emotion/styled";
import mdn from "../assets/mdn.png";
import react from "../assets/react.png";

export function Contribution() {
  return (
    <Container>
      <Title>Open Source Contribution</Title>
      <Article>
        <Img src={react} />
        reactjs / ko.react.dev Effect 문서 번역
      </Article>
      <Article>
        <Img src={react} />
        reactjs / ko.react.dev 커스텀 훅 문서 번역
      </Article>
      <Article>
        <Img src={mdn} />
        mdn / translated-contenteact.dev 비동기 예시 코드 수정
      </Article>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  gap: 10px;
  margin: 20px 0px;
`;

const Img = styled.img`
  height: 100%;
`;
