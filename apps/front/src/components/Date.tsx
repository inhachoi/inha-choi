import type { ReactNode } from "react";
import styled from "@emotion/styled";
import { colors } from "@toss/tds-colors";

export function Date({ children }: { children: ReactNode }) {
  return <Container>{children}</Container>;
}

const Container = styled.span`
  font-size: 0.8rem;
  color: ${colors.grey400};
`;
