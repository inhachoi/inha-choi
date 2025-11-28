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

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    background: ${colors.grey100};
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }
`;
