import styled from "@emotion/styled";

import { choi } from "@/shared/assets";
import { GlitchText, InteractionCard, SlotMachine } from "@/widgets";

import { FOOD_NAMES } from "../config";

export function Introduce() {
  return (
    <Container>
      <Content>
        <GlitchText>
          안녕하세요! <br />
          UX와 소통에 집중하는 <br />
          개발자 최경일입니다.
        </GlitchText>

        <SlotMachine prefix="점심은..🤔" dataArr={FOOD_NAMES} />
      </Content>

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
  padding: 30px 50px 30px 50px;

  @media (max-width: 768px) {
    padding: 20px 30px 0 30px;
  }

  @media (max-width: 480px) {
    padding: 10px 10px 0 10px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;

  @media (max-width: 768px) {
    gap: 40px;
  }

  @media (max-width: 480px) {
    gap: 30px;
  }
`;
