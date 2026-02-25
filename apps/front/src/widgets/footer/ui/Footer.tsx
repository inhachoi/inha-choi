import styled from "@emotion/styled";

export function Footer() {
  return <Container>Ⓒ 2025. inhachoi. All right reserved.</Container>;
}

const Container = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  background: var(--color-bg-primary);
  color: var(--color-text-secondary);
  box-shadow: 0 -4px 50px var(--color-shadow);

  @media (max-width: 768px) {
    font-size: 0.8rem;
    height: 65px;
  }

  @media (max-width: 480px) {
    font-size: 0.6rem;
    height: 50px;
  }
`;
