import { GlitchText } from "../components";
import styled from "@emotion/styled";

export function Main() {
  return (
    <Container>
      <GlitchText>내 이름은 경일</GlitchText>
    </Container>
  );
}

const Container = styled.div`
  padding: 10px;
  background: pink;
`;
