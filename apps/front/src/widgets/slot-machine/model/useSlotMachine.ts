import { useState, useEffect } from "react";
import { calculateRollInterval } from "../lib";

export const useSlotMachine = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  // 처음 화면 진입시 스핀 시작
  useEffect(() => {
    const t = setTimeout(() => {
      setIsSpinning(true);
    }, 0);

    return () => clearTimeout(t);
  }, []);

  // 슬롯 굴리기
  useEffect(() => {
    const delay = calculateRollInterval(currentIndex);

    const timer = setTimeout(() => {
      if (delay >= 600) {
        setIsSpinning(false);
        return;
      }

      setCurrentIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleClick = () => {
    setCurrentIndex(0);
    setIsSpinning(true);
  };

  return { isSpinning, handleClick, currentIndex };
};
