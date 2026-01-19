import styled from "@emotion/styled";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom"; // Link 대신 NavLink 사용

interface Props {
  children: ReactNode;
  toGo: string;
}

export function TextButton({ children, toGo }: Props) {
  return <Container to={toGo}>{children}</Container>;
}

const Container = styled(NavLink)`
  cursor: pointer;
  position: relative;
  text-decoration: none;
  color: inherit;
  font-weight: 400;

  &::after {
    content: "";
    position: absolute;
    width: 0;
    height: 1px;
    bottom: -5px;
    left: 0;
    background-color: currentColor;
    transition: width 0.3s ease-out;
  }

  &:hover {
    &::after {
      width: 100%;
    }
  }

  &.active {
    &::after {
      width: 100%;
    }
  }
`;
