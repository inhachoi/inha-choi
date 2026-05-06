import styled from "@emotion/styled";

import { getAverage, getBest, getTopPercent,TOTAL_ROUNDS } from "../lib";
import { useReactionGame } from "../model";

export default function ReactionGame() {
  const {
    gameState,
    round,
    records,
    earlyClick,
    bgColor,
    mainText,
    subText,
    handleBoxClick,
    reset,
  } = useReactionGame();

  const isBoxClickable =
    gameState === "idle" || gameState === "waiting" || gameState === "active";

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
          <MainText isActive={gameState === "active"} onColoredBg={gameState !== "result"}>
            {mainText}
          </MainText>
          {gameState !== "idle" && (
            <SubText
              isWarning={earlyClick && gameState === "waiting"}
              onColoredBg={gameState === "waiting" || gameState === "active"}
            >
              {subText}
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
