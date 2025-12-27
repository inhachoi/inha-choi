import styled from "@emotion/styled";

export default function NotFoundPage() {
  return (
    <Main>
      <Center>
        <Code>404</Code>

        <Title>페이지를 찾을 수 없습니다.</Title>

        <Actions>
          <HomeLink href="/">홈으로 돌아가기</HomeLink>
        </Actions>
      </Center>
    </Main>
  );
}

const Main = styled.main`
  display: grid;
  min-height: 100%;
  place-items: center;
  background: #ffffff;
  padding: 6rem 1.5rem;

  @media (min-width: 640px) {
    padding: 8rem 1.5rem;
  }

  @media (min-width: 1024px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const Center = styled.div`
  text-align: center;
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
