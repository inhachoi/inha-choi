import styled from "@emotion/styled";
import { LogoButton, TextButton } from "@/shared/ui";
import { colors } from "@toss/tds-colors";

export function NavigationBar() {
  return (
    <Container>
      <Wrapper>
        <LogoButton />
        
        <TextButtonGroup>
          <TextButton toGo="/posts">Posts</TextButton>
          <TextButton toGo="/guestbook">Guestbook</TextButton>
          <TextButton toGo="/chat">Chat</TextButton>
        </TextButtonGroup>
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
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-sizing: border-box;
  box-shadow: 0 4px 50px ${colors.grey200};

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

const TextButtonGroup = styled.section`
  display: flex;
  gap: 15px;
`;
