import styled from "@emotion/styled";
import { colors } from "@toss/tds-colors";

export function Footer() {
  return (
    <Container>
      <span>Ⓒ 2025. inhachoi. All right reserved.</span>
    </Container>
  );
}

const Container = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  background: white;
  color: ${colors.grey500};
  box-shadow: 0 -4px 50px ${colors.grey200};
`;
