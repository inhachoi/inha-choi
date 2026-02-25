import type { ReactNode } from "react";
import styled from "@emotion/styled";

interface Props {
  children: ReactNode;
  to: string;
}

export function TextLink({ children, to }: Props) {
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
  background: var(--color-bg-primary);
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  color: var(--color-text-primary);
  text-decoration: none;

  box-shadow: 0 4px 10px var(--color-card-shadow);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    background: var(--color-bg-hover);
    transform: translateY(-2px);
    box-shadow: 0 8px 16px var(--color-card-shadow-hover);
  }

  @media (max-width: 768px) {
    height: 45px;
  }

  @media (max-width: 480px) {
    height: 40px;
  }
`;
