import { GlitchText, InteractionCard } from "@/shared/ui";
import { choi } from "@/shared/assets";
import styled from "@emotion/styled";

export function Introduce() {
  return (
    <Container>
      <GlitchText>
        안녕하세요! <br />
        UX와 소통에 집중하는 <br />
        개발자 최경일입니다.
      </GlitchText>
      <InteractionCard src={choi} alt="개발자 경일 사진" width={250} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 768px;
  box-sizing: border-box;
  padding: 30px 50px 0 50px;

  @media (max-width: 768px) {
    padding: 20px 30px 0 30px;
  }

  @media (max-width: 480px) {
    padding: 10px 10px 0 10px;
  }
`;
