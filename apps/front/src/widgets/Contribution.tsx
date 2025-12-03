import { Title, TextLink, Date } from "../shared/ui";
import styled from "@emotion/styled";
import { mdn, react } from "../assets";
import {
  PR_REACT_JS_CUSTOM_HOOK_URL,
  PR_MDN_ASYNC_URL,
  PR_REACT_JS_EFFECT_URL,
} from "../shared/constants";

export function Contribution() {
  return (
    <Container>
      <Title>Open Source Contribution</Title>
      <TextLink to={PR_REACT_JS_EFFECT_URL}>
        <Img src={react} />
        reactjs / ko.react.dev Effect 문서 번역
        <Date>2025.11</Date>
      </TextLink>
      <TextLink to={PR_REACT_JS_CUSTOM_HOOK_URL}>
        <Img src={react} />
        reactjs / ko.react.dev 커스텀 훅 문서 번역
        <Date>2025.11</Date>
      </TextLink>
      <TextLink to={PR_MDN_ASYNC_URL}>
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
  width: 100%;
  gap: 10px;
  margin: 20px 0 100px 0;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin: 20px 0 80px 0;
  }

  @media (max-width: 480px) {
    font-size: 0.6rem;
    margin: 20px 0 60px 0;
  }
`;

const Img = styled.img`
  width: 40px;

  @media (max-width: 768px) {
    width: 32.5px;
  }

  @media (max-width: 480px) {
    width: 25px;
  }
`;
