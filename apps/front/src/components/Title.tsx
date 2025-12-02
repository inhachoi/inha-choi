import type { ReactNode } from "react";
import styled from "@emotion/styled";
import { colors } from "@toss/tds-colors";

export function Title({ children }: { children: ReactNode }) {
  return <Container>{children}</Container>;
}

const Container = styled.h2`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 30px;
  font-size: 1.5rem;
  padding: 10px 20px;
  font-weight: bold;
  color: ${colors.grey900};
  border-radius: 10px;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    padding: 7.5px 15px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 5px 10px;
  }
`;
