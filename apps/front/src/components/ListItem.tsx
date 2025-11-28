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

  &:hover {
    background: ${colors.grey100};
  }
`;
