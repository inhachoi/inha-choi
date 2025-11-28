import styled from "@emotion/styled";
import { colors } from "@toss/tds-colors";
import type { ReactNode } from "react";

export function ListItem({ children }: { children: ReactNode }) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 100px;
  padding: 5px 20px;
  width: 100%;
  height: 50px;
  background: white;
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    background: ${colors.grey100};
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }
`;
