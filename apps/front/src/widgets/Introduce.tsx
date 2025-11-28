import { GlitchText } from "../components";
import choi from "../assets/choi.jpg";
import styled from "@emotion/styled";

export function Introduce() {
  return (
    <Container>
      <GlitchText>
        안녕하세요! <br />
        UX와 소통에 집중하는 <br />
        개발자 경일입니다.
      </GlitchText>
      <Img src={choi} alt="개발자 경일 사진" width={250} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
  padding: 30px 0 0 0;
`;

const Img = styled.img`
  border-radius: 1000px;
`;
