import { colors } from "@toss/tds-colors";
import styled from "@emotion/styled";
import { useMouseMove } from "../model/useMouseMove";

interface Props {
  src: string;
  alt: string;
  width: number;
}

export function InteractionCard({ src, alt, width }: Props) {
  const { containerRef, overlayRef } = useMouseMove();

  return (
    <Container ref={containerRef}>
      <Overlay ref={overlayRef} />
      <Img src={src} alt={alt} width={width} loading="lazy" />
    </Container>
  );
}

const Container = styled.div`
  display: inline-block;
  position: relative;
  transition: transform 0.25s ease-out;
  will-change: transform;
`;

const Img = styled.img`
  border-radius: 100%;
  box-shadow: 2px 10px 20px ${colors.grey400};

  @media (max-width: 768px) {
    width: 200px;
  }
  @media (max-width: 580px) {
    width: 175px;
  }
  @media (max-width: 480px) {
    width: 150px;
  }
`;

const Overlay = styled.div`
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
