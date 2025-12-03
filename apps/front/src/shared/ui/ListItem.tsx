import styled from "@emotion/styled";
import { colors } from "@toss/tds-colors";
import type { ReactNode } from "react";

interface ListItemProps {
  children: ReactNode;
  url: string;
}

export function ListItem({ children, url }: ListItemProps) {
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
  background: white;
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  overflow: hidden;
  gap: 30px;
  text-decoration: none;

  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    background: ${colors.grey100};
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    gap: 22.5px;
  }

  @media (max-width: 480px) {
    gap: 15px;
  }
`;
