import styled from "@emotion/styled";
import { Logo } from "./Logo";

export function NavigationBar() {
  return (
    <Container>
      <Logo />
      <div>
        <span>Posts</span>
        <span>Study</span>
      </div>
    </Container>
  );
}

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  background: skyblue;
`;
 