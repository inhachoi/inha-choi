import styled from "@emotion/styled";

export default function ErrorBoundaryFallback() {
  return (
    <Container>
      <Code>Error</Code>

      <Title>
        일시적인 오류가 발생했어요.
        <br /> <br />
        새로고침하거나 홈으로 돌아가 주세요.
      </Title>

      <Actions>
        <HomeLink href="/">홈으로 돌아가기</HomeLink>
      </Actions>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 90vh;
`;

const Code = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: #4f46e5;
`;

const Title = styled.h1`
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  color: #111827;
  text-wrap: balance;
`;

const Actions = styled.div`
  margin-top: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;

const HomeLink = styled.a`
  border-radius: 0.375rem;
  background: #4f46e5;
  padding: 0.625rem 0.875rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffffff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  text-decoration: none;

  &:hover {
    background: #6366f1;
  }

  &:focus-visible {
    outline: 2px solid #4f46e5;
    outline-offset: 2px;
  }
`;
