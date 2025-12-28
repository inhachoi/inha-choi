import styled from "@emotion/styled";
import { colors } from "@toss/tds-colors";

export function Footer() {
  return <Container>Ⓒ 2025. inhachoi. All right reserved.</Container>;
}

const Container = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  background: white;
  color: ${colors.grey500};
  box-shadow: 0 -4px 50px ${colors.grey200};

  @media (max-width: 768px) {
    font-size: 0.8rem;
    height: 65px;
  }

  @media (max-width: 480px) {
    font-size: 0.6rem;
    height: 50px;
  }
`;
