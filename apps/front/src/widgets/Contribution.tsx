import { Title, TextLink, Date } from "../components";
import styled from "@emotion/styled";
import mdn from "../assets/mdn.png";
import react from "../assets/react.png";

export function Contribution() {
  return (
    <Container>
      <Title>Open Source Contribution</Title>
      <TextLink to="https://github.com/mdn/translated-content/pull/28427">
        <Img src={react} />
        reactjs / ko.react.dev Effect 문서 번역
        <Date>2025.11</Date>
      </TextLink>
      <TextLink to="https://github.com/reactjs/ko.react.dev/pull/1355">
        <Img src={react} />
        reactjs / ko.react.dev 커스텀 훅 문서 번역
        <Date>2025.11</Date>
      </TextLink>
      <TextLink to="https://github.com/reactjs/ko.react.dev/pull/1356#issuecomment-3567598733">
        <Img src={mdn} />
        mdn / translated-contenteact.dev 비동기 예시 코드 수정
        <Date>2025.08</Date>
      </TextLink>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  gap: 10px;
  margin: 20px 0 100px 0;
`;

const Img = styled.img`
  width: 40px;
`;
