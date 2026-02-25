import styled from "@emotion/styled";

import { LogoButton, TextButton, ThemeToggleButton } from "@/shared/ui";

export function NavigationBar() {
  return (
    <Container>
      <Wrapper>
        <LogoButton />

        <RightGroup>
          <TextButtonGroup>
            <TextButton toGo="/posts">Posts</TextButton>
            <TextButton toGo="/guestbook">Guestbook</TextButton>
            <TextButton toGo="/chat">Chat</TextButton>
          </TextButtonGroup>

          <ThemeToggleButton />
        </RightGroup>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px;
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-sizing: border-box;
  box-shadow: 0 4px 50px var(--color-shadow);

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 8px 10px;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 6px 10px;
  }
`;

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 768px;
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TextButtonGroup = styled.section`
  display: flex;
  gap: 15px;
`;
