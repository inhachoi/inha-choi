import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import styled from "@emotion/styled";
import { shake } from "@/shared/assets";
import { shuffleArray } from "./utils";
import { colors } from "@toss/tds-colors";

interface Props {
  dataArr: string[];
}

const SLOT_ITEM_HEIGHT = 40;

export const SlotMachine = ({ dataArr }: Props) => {
  const [spinCount, setSpinCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastIndex = dataArr.length - 1;

  const shuffledDataArr = shuffleArray(dataArr);

  // 초반은 빨리, 뒤로 갈수록 천천히 (ms 단위)
  const getStepDelay = (index: number) => {
    const base = 50; // 시작 속도
    const step = 90; // 점점 느려지는 정도
    return base + index * step;
  };

  // 인덱스 하나씩 증가시키며 슬롯 굴리기 (점점 느려지게)
  useEffect(() => {
    if (currentIndex >= lastIndex) {
      return;
    }

    const delay = getStepDelay(currentIndex); // 현재 단계에 따른 delay(ms)

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev < lastIndex ? prev + 1 : prev));
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex, lastIndex, shuffledDataArr.length]);

  const handleClick = () => {
    setCurrentIndex(0);
    setSpinCount((prev) => prev + 1);
  };

  return (
    <Container>
      오늘 점심은...
      <SlotReelTrack>
        <AnimatePresence mode="popLayout">
          {shuffledDataArr.map((text, i) => {
            const isLast = i === lastIndex;

            if (i !== currentIndex) {
              return null;
            }

            return (
              <SlotItem
                key={`${text}-${spinCount}-${i}`}
                initial={{ scaleY: 0.3, y: "-50%", opacity: 0 }}
                animate={{
                  scaleY: 1,
                  y: 0,
                  opacity: 1,
                  filter: isLast ? "none" : "blur(1.5px)",
                }}
                exit={{ scaleY: 0.3, y: "50%", opacity: 0 }}
                transition={{
                  duration: isLast ? 0.4 : 0.18,
                  ease: isLast ? "easeInOut" : "linear",
                }}
              >
                {text}
              </SlotItem>
            );
          })}
        </AnimatePresence>
      </SlotReelTrack>
      <SpinButton
        onClick={handleClick}
        whileTap={{ scale: 0.9, scaleY: 1 }}
        whileHover={{ scaleY: -1 }}
        aria-label="셔플"
      >
        <Img src={shake} alt="셔플 아이콘" />
      </SpinButton>
    </Container>
  );
};

export default SlotMachine;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SlotReelTrack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 200px;
  height: ${SLOT_ITEM_HEIGHT}px;
  border: 1px solid ${colors.grey300};
  border-radius: 5px;
  overflow: hidden;
`;

const SlotItem = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${SLOT_ITEM_HEIGHT}px;
  padding: 0 10px;
  white-space: nowrap;
`;

const SpinButton = styled(motion.button)`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
`;

const Img = styled.img`
  height: 30px;
`;
