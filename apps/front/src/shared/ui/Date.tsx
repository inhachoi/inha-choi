import type { ReactNode } from "react";
import styled from "@emotion/styled";

export function Date({ children }: { children: ReactNode }) {
  return <Container>{children}</Container>;
}

const Container = styled.span`
  font-size: 0.8rem;
  color: var(--color-text-secondary);

  @media (max-width: 768px) {
    font-size: 0.6rem;
  }

  @media (max-width: 480px) {
    font-size: 0.5rem;
  }
`;
