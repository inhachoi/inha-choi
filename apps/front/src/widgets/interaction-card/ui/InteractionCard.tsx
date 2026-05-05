import { useState } from "react";
import styled from "@emotion/styled";

import { Skeleton } from "@/shared/ui";

import { useMouseMove } from "../model/useMouseMove";

interface Props {
  src: string;
  alt: string;
  width: number;
}

export function InteractionCard({ src, alt, width }: Props) {
  const { containerRef, overlayRef } = useMouseMove();
  const [loaded, setLoaded] = useState(false);

  return (
    <Container ref={containerRef}>
      {!loaded && <SkeletonCircle width={width} />}
      <Overlay ref={overlayRef} loaded={loaded} />
      <Img
        src={src}
        alt={alt}
        width={width}
        height={width}
        loading="lazy"
        loaded={loaded}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </Container>
  );
}

function SkeletonCircle({ width }: { width: number }) {
  return (
    <SkeletonWrapper width={width}>
      <Skeleton width="100%" height="100%" borderRadius="100%" />
    </SkeletonWrapper>
  );
}

const Container = styled.div`
  display: inline-block;
  position: relative;
  transition: transform 0.25s ease-out;
  will-change: transform;
`;

const SkeletonWrapper = styled.div<{ width: number }>`
  width: ${({ width }) => width}px;
  height: ${({ width }) => width}px;
  border-radius: 100%;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
  @media (max-width: 580px) {
    width: 175px;
    height: 175px;
  }
  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
  }
`;

const Img = styled.img<{ loaded: boolean }>`
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
  position: ${({ loaded }) => (loaded ? "static" : "absolute")};
  transition: opacity 0.3s ease;
  border-radius: 100%;
  box-shadow: 2px 10px 20px #b0b8c1;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
  }
  @media (max-width: 580px) {
    width: 175px;
    height: 175px;
  }
  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
  }
`;

const Overlay = styled.div<{ loaded: boolean }>`
  display: ${({ loaded }) => (loaded ? "block" : "none")};
  position: absolute;
  inset: 0;
  background: linear-gradient(
    110deg,
    transparent 35%,
    rgba(255, 255, 255, 0.6) 45%,
    rgba(255, 255, 255, 0.6) 45%,
    transparent 50%
  );
  filter: brightness(1.1) opacity(0.8);
  mix-blend-mode: color-dodge;
  background-size: 150% 150%;
  background-position: 100%;
  transition: background-position 0.15s ease-out;
  border-radius: 100%;
`;
