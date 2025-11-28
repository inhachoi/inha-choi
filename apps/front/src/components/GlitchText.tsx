import type { ReactNode } from "react";
import styled from "@emotion/styled";
import { colors } from "@toss/tds-colors";

export function GlitchText({ children }: { children: ReactNode }) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  line-height: 1.3;

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
      transform: skewX(-50deg);
    }
    10% {
      transform: skewX(29deg);
    }
    12.5% {
      transform: skewX(-30deg);
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
  color: ${colors.grey900};
  animation: wiggle 3s infinite;
  text-shadow: 0.3rem 0.1rem ${colors.grey200},
    -0.2rem -0.1rem ${colors.grey100};

  overflow: hidden;
`;
