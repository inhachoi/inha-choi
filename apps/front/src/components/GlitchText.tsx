import type { ReactNode } from "react";
import styled from "@emotion/styled";

export function GlitchText({ children }: { children: ReactNode }) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  @keyframes wiggle {
    0% {
      transform: skewX(24deg);
    }
    2.5% {
      transform: skewX(-8deg);
    }
    5% {
      transform: skewX(55deg);
    }
    7.5% {
      transform: skewX(-90deg);
    }
    10% {
      transform: skewX(29deg);
    }
    12.5% {
      transform: skewX(-90deg);
    }
    15% {
      transform: skewX(3deg);
    }
    17.5% {
      transform: skewX(-2deg);
    }
    20% {
      transform: skewX(1deg);
    }
    22.5% {
      transform: skewX(10deg);
    }
    100% {
      transform: skewX(0deg);
    }
  }

  font-size: 2rem;
  color: white;
  animation: wiggle 3s infinite;
  text-shadow: 0.3rem 0.1rem rgba(189, 33, 106, 0.8),
    -0.2rem -0.1rem rgba(255, 145, 0, 0.8), -0.3rem 0rem rgb(88, 75, 238);
`;
