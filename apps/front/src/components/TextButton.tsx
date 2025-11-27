import styled from "@emotion/styled";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface TextButtonProps {
  children: ReactNode;
  toGo: string;
}

export function TextButton({ children, toGo }: TextButtonProps) {
  return <Container to={toGo}>{children}</Container>;
}

const Container = styled(Link)`
  cursor: pointer;
  position: relative;
  text-decoration: none;
  color: inherit;

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 1.5px;
    bottom: 0;
    left: 0;
    background-color: currentColor;
    transition: width 0.3s ease-out;
  }

  &:hover {
    &::after {
      width: 100%;
    }
  }
`;
