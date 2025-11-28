import type { ReactNode } from "react";
import styled from "@emotion/styled";
import { colors } from "@toss/tds-colors";

interface TextLinkProps {
  children: ReactNode;
  to: string;
}

export function TextLink({ children, to }: TextLinkProps) {
  return (
    <Container href={to} target="_blank">
      {children}
    </Container>
  );
}

const Container = styled.a`
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 5px 20px;
  width: 100%;
  height: 50px;
  background: white;
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  color: black;
  text-decoration: none;

  &:hover {
    background: ${colors.grey100};
  }
`;
