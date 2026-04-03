import { useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

const TOTAL_ROUNDS = 3;
const AUTO_ADVANCE_SECONDS = 3;

// 일반 인구 기준 반응속도 분포 [ms, 상위 %]
// 출처: 반응속도 관련 연구 논문 평균 (일반 성인 기준, 평균 약 250ms)
// 상위 X% = 전체 중 상위 X%에 속함 (낮을수록 빠름)
const PERCENTILE_TABLE: [number, number][] = [
  [0, 1],
  [150, 1],
  [170, 3],
  [190, 8],
  [210, 15],
  [230, 25],
  [250, 40],
  [270, 55],
  [300, 70],
  [340, 82],
  [390, 91],
  [470, 96],
  [600, 99],
  [Infinity, 100],
];

type GameState = "idle" | "waiting" | "active" | "result" | "done";

function getTopPercent(ms: number): number {
  for (let i = 0; i < PERCENTILE_TABLE.length - 1; i++) {
    const [ms1, p1] = PERCENTILE_TABLE[i];
    const [ms2, p2] = PERCENTILE_TABLE[i + 1];
    if (ms <= ms2) {
      const t = (ms - ms1) / (ms2 - ms1);
      return Math.round(p1 + t * (p2 - p1));
    }
  }
  return 100;
}

function getAverage(records: number[]) {
  return Math.round(records.reduce((a, b) => a + b, 0) / records.length);
}

function getBest(records: number[]) {
  return Math.min(...records);
}

export default function ReactionGame() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [round, setRound] = useState(1);
  const [records, setRecords] = useState<number[]>([]);
  const [currentResult, setCurrentResult] = useState<number | null>(null);
  const [earlyClick, setEarlyClick] = useState(false);
  const [waitingAttempt, setWaitingAttempt] = useState(0);
  const [resultCountdown, setResultCountdown] = useState(AUTO_ADVANCE_SECONDS);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (gameState !== "waiting") return;
    const delay = Math.random() * 3000 + 1000;
    const t = setTimeout(() => {
      startTimeRef.current = Date.now();
      setGameState("active");
    }, delay);
    return () => clearTimeout(t);
  }, [gameState, waitingAttempt]);

  useEffect(() => {
    if (gameState !== "result") return;
    const advanceTimer = setTimeout(() => {
      if (round >= TOTAL_ROUNDS) {
        setGameState("done");
      } else {
        setRound((r) => r + 1);
        setResultCountdown(AUTO_ADVANCE_SECONDS);
        setCurrentResult(null);
        setEarlyClick(false);
        setGameState("waiting");
      }
    }, AUTO_ADVANCE_SECONDS * 1000);
    const countdownInterval = setInterval(() => {
      setResultCountdown((c) => Math.max(0, c - 1));
    }, 1000);
    return () => {
      clearTimeout(advanceTimer);
      clearInterval(countdownInterval);
    };
  }, [gameState, round]);

  const startGame = useCallback(() => {
    setGameState("waiting");
    setRound(1);
    setRecords([]);
    setCurrentResult(null);
    setEarlyClick(false);
    setWaitingAttempt(0);
    setResultCountdown(AUTO_ADVANCE_SECONDS);
  }, []);

  const handleBoxClick = useCallback(() => {
    if (gameState === "idle") {
      startGame();
    } else if (gameState === "waiting") {
      setEarlyClick(true);
      setWaitingAttempt((a) => a + 1);
    } else if (gameState === "active") {
      const elapsed = Date.now() - (startTimeRef.current ?? Date.now());
      setCurrentResult(elapsed);
      setRecords((prev) => [...prev, elapsed]);
      setResultCountdown(AUTO_ADVANCE_SECONDS);
      setGameState("result");
    }
  }, [gameState, startGame]);

  const reset = () => {
    setGameState("idle");
    setRound(1);
    setRecords([]);
    setCurrentResult(null);
    setEarlyClick(false);
    setWaitingAttempt(0);
    setResultCountdown(AUTO_ADVANCE_SECONDS);
  };

  const isBoxClickable =
    gameState === "idle" || gameState === "waiting" || gameState === "active";

  const bgColor =
    gameState === "idle"
      ? "#000"
      : gameState === "waiting"
        ? "#ef4444"
        : gameState === "active"
          ? "#22c55e"
          : undefined;

  const mainText = () => {
    switch (gameState) {
      case "idle":
        return "시작";
      case "waiting":
        return "기다리세요...";
      case "active":
        return "지금!";
      case "result":
        return currentResult !== null ? `${currentResult}ms` : "";
      case "done":
        return "";
    }
  };

  const subText = () => {
    if (earlyClick && gameState === "waiting") return "너무 빨라요!";
    if (gameState === "result")
      return `${resultCountdown}초 후 ${round >= TOTAL_ROUNDS ? "결과" : "다음 라운드"}`;
    if (gameState === "waiting" && !earlyClick)
      return "초록색으로 바뀌면 클릭하세요";
    return "";
  };

  return (
    <Wrapper>
      <Stats>
        <StatItem>
          {gameState === "idle" || gameState === "done"
            ? "반응속도 테스트"
            : `${round} / ${TOTAL_ROUNDS} 라운드`}
        </StatItem>
      </Stats>

      {gameState !== "done" ? (
        <GameBox
          onClick={isBoxClickable ? handleBoxClick : undefined}
          bgColor={bgColor}
          isClickable={isBoxClickable}
        >
            <MainText
            isActive={gameState === "active"}
            onColoredBg={gameState !== "result"}
          >
            {mainText()}
          </MainText>
          {gameState !== "idle" && (
            <SubText
              isWarning={earlyClick && gameState === "waiting"}
              onColoredBg={gameState === "waiting" || gameState === "active"}
            >
              {subText()}
            </SubText>
          )}
        </GameBox>
      ) : (
        <ResultBox>
          <ResultTitle>결과</ResultTitle>
          <RecordList>
            {records.map((r, i) => (
              <RecordItem key={i}>
                <span>{i + 1}회</span>
                <RecordValue>{r}ms</RecordValue>
              </RecordItem>
            ))}
          </RecordList>
          <Divider />
          <SummaryRow>
            <span>평균</span>
            <SummaryRight>
              <span>{getAverage(records)}ms</span>
              <PercentBadge>상위 {getTopPercent(getAverage(records))}%</PercentBadge>
            </SummaryRight>
          </SummaryRow>
          <SummaryRow isBest>
            <span>최고기록</span>
            <SummaryRight>
              <BestValue>{getBest(records)}ms</BestValue>
              <PercentBadge isBest>상위 {getTopPercent(getBest(records))}%</PercentBadge>
            </SummaryRight>
          </SummaryRow>
          <ResetButton onClick={reset}>다시 하기</ResetButton>
        </ResultBox>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: var(--color-text-primary);
`;

const StatItem = styled.span`
  font-weight: 600;
`;

const GameBox = styled.div<{ bgColor?: string; isClickable: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 1;
  border-radius: 16px;
  border: 2px solid var(--color-border);
  background: ${({ bgColor }) => bgColor ?? "var(--color-bg-secondary)"};
  cursor: ${({ isClickable }) => (isClickable ? "pointer" : "default")};
  transition: background-color 0.15s ease;
  user-select: none;
`;


const MainText = styled.div<{ isActive: boolean; onColoredBg: boolean }>`
  font-size: ${({ isActive }) => (isActive ? "3rem" : "2rem")};
  font-weight: 700;
  color: ${({ onColoredBg }) => (onColoredBg ? "#fff" : "var(--color-text-primary)")};
  transition:
    font-size 0.1s,
    color 0.15s;
`;

const SubText = styled.div<{ isWarning: boolean; onColoredBg: boolean }>`
  font-size: 0.9rem;
  font-weight: 500;
  min-height: 1.2em;
  color: ${({ isWarning, onColoredBg }) => {
    if (isWarning) return "#fff";
    if (onColoredBg) return "rgba(255, 255, 255, 0.85)";
    return "var(--color-text-secondary)";
  }};
`;

const ResultBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 400px;
  padding: 32px;
  border-radius: 16px;
  border: 2px solid var(--color-border);
  background: var(--color-bg-secondary);
  box-sizing: border-box;
`;

const ResultTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-text-primary);
`;

const RecordList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

const RecordItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  color: var(--color-text-secondary);
`;

const RecordValue = styled.span`
  font-weight: 600;
  color: var(--color-text-primary);
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: var(--color-border);
`;

const SummaryRow = styled.div<{ isBest?: boolean }>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: ${({ isBest }) => (isBest ? "1.1rem" : "0.95rem")};
  font-weight: 600;
  color: var(--color-text-primary);
`;

const BestValue = styled.span`
  color: #22c55e;
`;

const SummaryRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PercentBadge = styled.span<{ isBest?: boolean }>`
  font-size: 0.8rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 20px;
  background: ${({ isBest }) =>
    isBest ? "rgba(34, 197, 94, 0.15)" : "var(--color-bg-hover)"};
  color: ${({ isBest }) => (isBest ? "#22c55e" : "var(--color-text-secondary)")};
`;

const ResetButton = styled.button`
  margin-top: 8px;
  padding: 10px 24px;
  border: 2px solid var(--color-border);
  border-radius: 10px;
  background: transparent;
  color: var(--color-text-primary);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: var(--color-bg-hover);
  }
`;
