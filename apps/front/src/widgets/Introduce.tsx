import { GlitchText } from "../components";
import choi from "../assets/choi.jpg";
import styled from "@emotion/styled";

export function Introduce() {
  return (
    <Container>
      <GlitchText>
        안녕하세요! <br />
        UX와 소통에 집중하는 <br />
        개발자 최경일입니다.
      </GlitchText>
      <Img src={choi} alt="개발자 경일 사진" width={250} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  box-sizing: border-box;
  padding: 30px 50px 0 50px;

  @media (max-width: 768px) {
    div {
      font-size: 1.5rem;
    }
  }
`;

const Img = styled.img`
  border-radius: 1000px;

  @media (max-width: 768px) {
    width: 150px;
  }
`;
