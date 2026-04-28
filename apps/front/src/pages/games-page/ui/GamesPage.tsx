import styled from "@emotion/styled";
import { useNavigate, useParams } from "@tanstack/react-router";

import MemoryCardGame from "./MemoryCardGame";
import ReactionGame from "./ReactionGame";

const GAMES = [
  { id: "memory", label: "🃏 기억력 카드" },
  { id: "reaction", label: "⚡ 반응속도" },
] as const;

type GameId = (typeof GAMES)[number]["id"];

function isValidGameId(id: string): id is GameId {
  return GAMES.some((g) => g.id === id);
}

export default function GamesPage() {
  const { gameId } = useParams({ from: "/games/$gameId" });
  const navigate = useNavigate();
  const activeGame: GameId = isValidGameId(gameId) ? gameId : "memory";

  return (
    <Container>
      <TabBar>
        {GAMES.map((game) => (
          <Tab
            key={game.id}
            isActive={activeGame === game.id}
            onClick={() => navigate({ to: "/games/$gameId", params: { gameId: game.id } })}
          >
            {game.label}
          </Tab>
        ))}
      </TabBar>

      <GameArea>
        {activeGame === "memory" && <MemoryCardGame />}
        {activeGame === "reaction" && <ReactionGame />}
      </GameArea>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 370px;
  max-width: 768px;
  width: 100%;
  padding: 40px 20px 60px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 30px 16px 50px;
  }

  @media (max-width: 480px) {
    padding: 20px 12px 40px;
  }
`;

const TabBar = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  border-bottom: 2px solid var(--color-border);
  padding-bottom: 0;
`;

const Tab = styled.button<{ isActive: boolean }>`
  padding: 8px 18px;
  border: none;
  border-bottom: 3px solid
    ${({ isActive }) => (isActive ? "var(--color-text-primary)" : "transparent")};
  background: transparent;
  color: ${({ isActive }) =>
    isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)"};
  font-size: 0.95rem;
  font-weight: ${({ isActive }) => (isActive ? 700 : 400)};
  cursor: pointer;
  margin-bottom: -2px;
  transition: all 0.15s;

  &:hover {
    color: var(--color-text-primary);
  }
`;

const GameArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
