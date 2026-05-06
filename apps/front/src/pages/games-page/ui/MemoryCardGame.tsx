import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

import { useMemoryGame } from "../model";

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function MemoryCardGame() {
  const {
    cards,
    moves,
    time,
    previewing,
    previewCountdown,
    won,
    wrongCards,
    justMatchedCards,
    handleCardClick,
    reset,
  } = useMemoryGame();

  return (
    <Wrapper>
      <Stats>
        <StatItem>
          {previewing ? `🕐 ${previewCountdown}초 후 시작` : `⏱ ${formatTime(time)}`}
        </StatItem>
        <StatItem>🔄 {moves}회</StatItem>
        <ResetButton onClick={reset}>새 게임</ResetButton>
      </Stats>

      <Grid>
        {cards.map((card) => (
          <CardWrapper
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            isPreviewing={previewing}
            isWrong={wrongCards.includes(card.id)}
          >
            <CardInner isRevealed={card.isFlipped || card.isMatched || previewing}>
              <CardBack>?</CardBack>
              <CardFront
                isMatched={card.isMatched}
                isJustMatched={justMatchedCards.includes(card.id)}
                isWrong={wrongCards.includes(card.id)}
              >
                {card.emoji}
              </CardFront>
            </CardInner>
          </CardWrapper>
        ))}
      </Grid>

      {won && (
        <WinOverlay>
          <WinBox>
            <WinEmoji>🎉</WinEmoji>
            <WinTitle>완료!</WinTitle>
            <WinStats>
              <div>시간: {formatTime(time)}</div>
              <div>시도: {moves}회</div>
            </WinStats>
            <PlayAgainButton onClick={reset}>다시 하기</PlayAgainButton>
          </WinBox>
        </WinOverlay>
      )}
    </Wrapper>
  );
}

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(6px); }
  60% { transform: translateX(-6px); }
  80% { transform: translateX(6px); }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 1rem;
  color: var(--color-text-primary);
`;

const StatItem = styled.span`
  font-weight: 600;
`;

const ResetButton = styled.button`
  padding: 6px 14px;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  background: transparent;
  color: var(--color-text-primary);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.15s;

  &:hover {
    background: var(--color-bg-secondary);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  width: 100%;
  max-width: 400px;

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const CardWrapper = styled.div<{ isPreviewing: boolean; isWrong: boolean }>`
  perspective: 600px;
  aspect-ratio: 1;
  cursor: ${({ isPreviewing }) => (isPreviewing ? "default" : "pointer")};
  ${({ isWrong }) =>
    isWrong &&
    css`
      animation: ${shake} 0.5s ease;
    `}
`;

const CardInner = styled.div<{ isRevealed: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.4s ease;
  transform: ${({ isRevealed }) => (isRevealed ? "rotateY(180deg)" : "rotateY(0deg)")};
`;

const cardFaceBase = css`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
`;

const CardBack = styled.div`
  ${cardFaceBase}
  background: var(--color-bg-hover);
  border: 2px solid var(--color-border);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-text-secondary);
  user-select: none;
  transform: rotateY(0deg);

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const CardFront = styled.div<{
  isMatched: boolean;
  isJustMatched: boolean;
  isWrong: boolean;
}>`
  ${cardFaceBase}
  border: 2px solid
    ${({ isMatched, isJustMatched, isWrong }) => {
      if (isWrong) return "#ef4444";
      if (isJustMatched) return "#22c55e";
      if (isMatched) return "var(--color-text-secondary)";
      return "var(--color-border)";
    }};
  background: ${({ isMatched, isJustMatched, isWrong }) => {
    if (isWrong) return "rgba(239, 68, 68, 0.15)";
    if (isJustMatched) return "rgba(34, 197, 94, 0.15)";
    if (isMatched) return "var(--color-bg-hover)";
    return "var(--color-bg-primary)";
  }};
  font-size: 2rem;
  transform: rotateY(180deg);
  user-select: none;
  transition:
    border-color 0.2s,
    background 0.2s;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const WinOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const WinBox = styled.div`
  background: var(--color-bg-primary);
  border: 2px solid var(--color-border);
  border-radius: 16px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
`;

const WinEmoji = styled.div`
  font-size: 3rem;
`;

const WinTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-text-primary);
`;

const WinStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 1rem;
  color: var(--color-text-secondary);
`;

const PlayAgainButton = styled.button`
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
    background: var(--color-bg-secondary);
  }
`;
