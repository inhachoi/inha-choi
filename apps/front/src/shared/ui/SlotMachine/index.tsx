import styled from "@emotion/styled";
import { motion, useAnimate } from "motion/react";
import { useState } from "react";
import { shuffle } from "./utils";

interface SlotMachineType {
  data: string[];
}

export function SlotMachine({ data }: SlotMachineType) {
  const [items, setItems] = useState(() => shuffle([...data]));
  const [isAnimating, setIsAnimating] = useState(false);
  const [scope, animate] = useAnimate();

  const handleClick = async () => {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);
    await animate(scope.current, { y: -40 }, { duration: 0.3 });
    setItems((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
    await animate(scope.current, { y: 0 }, { duration: 0 });
    setIsAnimating(false);
  };

  return (
    <Container>
      <SlotReelTrack ref={scope}>
        {items.map((item, i) => {
          return <SlotItem key={i}>{item}</SlotItem>;
        })}
      </SlotReelTrack>

      <SpinButton onClick={handleClick} disabled={isAnimating}>
        Go
      </SpinButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  overflow: hidden;
`;

const SlotReelTrack = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const SlotItem = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SpinButton = styled(motion.button)``;
