export interface CardDTO {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export type ReactionGameState = "idle" | "waiting" | "active" | "result" | "done";
