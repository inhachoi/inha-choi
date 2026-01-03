import styled from "@emotion/styled";
import type { ReactNode } from "react";

export const Header = ({ children }: { children: ReactNode }) => {
  return <Container>{children}</Container>;
};

const Container = styled.header`
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 1.5rem;
  line-height: 1.5;
  margin: 0 0 50px 0;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin: 0 0 35px 0;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin: 0 0 20px 0;
  }
`;
