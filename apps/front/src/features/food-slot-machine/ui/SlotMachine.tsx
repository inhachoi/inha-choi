import { AnimatePresence, motion } from "motion/react";
import styled from "@emotion/styled";
import { shake } from "@/shared/assets";
import { shuffleArray } from "../lib/utils";
import { colors } from "@toss/tds-colors";
import type { SlotMachineType } from "../model/types";
import { useSlotMachine } from "../model/hooks";

export const SlotMachine = ({ prefix, dataArr }: SlotMachineType) => {
  const shuffledDataArr = shuffleArray(dataArr);
  const { isSpinning, handleClick, currentIndex } = useSlotMachine();

  const variants = {
    initial: { scaleY: 0.3, y: "-50%", opacity: 0 },
    animate: {
      scaleY: 1,
      y: 0,
      opacity: 1,
      filter: isSpinning ? "blur(2.5px)" : "none",
    },
    exit: { scaleY: 0.3, y: "50%", opacity: 0 },
  };

  return (
    <Container>
      {prefix}
      <SlotReelTrack>
        <AnimatePresence mode="popLayout">
          {shuffledDataArr.map((text, i) => {
            return i === currentIndex ? (
              <SlotItem
                key={i}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {text}
              </SlotItem>
            ) : null;
          })}
        </AnimatePresence>
      </SlotReelTrack>

      <SpinButton
        onClick={handleClick}
        whileTap={{ scale: 0.9, scaleY: 1 }}
        whileHover={{ scaleY: -1 }}
        aria-label="셔플"
      >
        <Img src={shake} alt="셔플 아이콘" loading="lazy" />
      </SpinButton>
    </Container>
  );
};

export default SlotMachine;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  @media (max-width: 768px) {
    gap: 4px;
    font-size: 0.75rem;
  }

  @media (max-width: 480px) {
    gap: 3px;
    font-size: 0.5rem;
  }
`;

const SlotReelTrack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 200px;
  height: 30px;
  border: 1px solid ${colors.grey300};
  border-radius: 5px;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 130px;
    height: 22.5px;
  }

  @media (max-width: 480px) {
    width: 100px;
    height: 15px;
  }
`;

const SlotItem = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  padding: 0 10px;
  white-space: nowrap;

  @media (max-width: 768px) {
    height: 22.5px;
  }

  @media (max-width: 480px) {
    height: 15px;
  }
`;

const SpinButton = styled(motion.button)`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const Img = styled.img`
  height: 25px;

  @media (max-width: 768px) {
    height: 18.75px;
  }

  @media (max-width: 480px) {
    height: 12.5px;
  }
`;
