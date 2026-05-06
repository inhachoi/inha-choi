import type { CardDTO } from "../model/types";

import { EMOJIS } from "./constants";

export function createShuffledCards(): CardDTO[] {
  const doubled = [...EMOJIS, ...EMOJIS];
  for (let i = doubled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
  }
  return doubled.map((emoji, id) => ({ id, emoji, isFlipped: false, isMatched: false }));
}
