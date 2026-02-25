import type { ReactNode } from "react";
import styled from "@emotion/styled";

interface Props {
  children: ReactNode;
  url: string;
}

export function ListItem({ children, url }: Props) {
  return (
    <Container href={url} target="_blank">
      {children}
    </Container>
  );
}

const Container = styled.a`
  display: flex;
  align-items: center;
  width: 100%;
  background: var(--color-bg-primary);
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  overflow: hidden;
  gap: 30px;
  text-decoration: none;

  box-shadow: 0 4px 10px var(--color-card-shadow);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    background: var(--color-bg-hover);
    transform: translateY(-3px);
    box-shadow: 0 8px 16px var(--color-card-shadow-hover);
  }

  @media (max-width: 768px) {
    gap: 22.5px;
  }

  @media (max-width: 480px) {
    gap: 15px;
  }
`;
