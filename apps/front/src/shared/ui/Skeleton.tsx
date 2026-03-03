import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

interface Props {
  width?: string;
  height?: string;
  borderRadius?: string;
}

export function Skeleton({
  width = "100%",
  height = "16px",
  borderRadius = "4px",
}: Props) {
  return <Box width={width} height={height} borderRadius={borderRadius} />;
}

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const Box = styled.div<Required<Props>>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ borderRadius }) => borderRadius};
  background: linear-gradient(
    90deg,
    var(--color-bg-hover) 25%,
    var(--color-bg-primary) 50%,
    var(--color-bg-hover) 75%
  );
  background-size: 800px 100%;
  animation: ${shimmer} 1.4s infinite linear;
`;
