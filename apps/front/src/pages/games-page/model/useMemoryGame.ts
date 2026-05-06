import { useCallback, useEffect, useState } from "react";

import { CLEANUP_DELAY_MS, FLIP_DELAY_MS, PREVIEW_SECONDS } from "../lib/constants";
import { createShuffledCards } from "../lib/shuffle";

import type { CardDTO } from "./types";

export function useMemoryGame(): {
  cards: CardDTO[];
  moves: number;
  time: number;
  previewing: boolean;
  previewCountdown: number;
  won: boolean;
  wrongCards: number[];
  justMatchedCards: number[];
  handleCardClick: (id: number) => void;
  reset: () => void;
} {
  const [cards, setCards] = useState<CardDTO[]>(createShuffledCards);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [time, setTime] = useState(0);
  const [started, setStarted] = useState(false);
  const [previewing, setPreviewing] = useState(true);
  const [previewCountdown, setPreviewCountdown] = useState(PREVIEW_SECONDS);
  const [wrongCards, setWrongCards] = useState<number[]>([]);
  const [justMatchedCards, setJustMatchedCards] = useState<number[]>([]);

  const won = cards.length > 0 && cards.every((c) => c.isMatched);

  useEffect(() => {
    if (!previewing) return;
    const totalTimer = setTimeout(() => setPreviewing(false), PREVIEW_SECONDS * 1000);
    const countdownInterval = setInterval(() => {
      setPreviewCountdown((c) => Math.max(0, c - 1));
    }, 1000);
    return () => {
      clearTimeout(totalTimer);
      clearInterval(countdownInterval);
    };
  }, [previewing]);

  useEffect(() => {
    if (!started || won) return;
    const interval = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [started, won]);

  const handleCardClick = useCallback(
    (id: number) => {
      if (previewing || isChecking) return;
      const card = cards[id];
      if (card.isFlipped || card.isMatched) return;
      if (flipped.length === 2) return;

      if (!started) setStarted(true);

      const newFlipped = [...flipped, id];
      setCards((prev) => prev.map((c) => (c.id === id ? { ...c, isFlipped: true } : c)));
      setFlipped(newFlipped);

      if (newFlipped.length < 2) return;

      setMoves((m) => m + 1);
      setIsChecking(true);

      const [a, b] = newFlipped;
      const isMatch = cards[a].emoji === cards[b].emoji;

      setTimeout(() => {
        if (isMatch) {
          setJustMatchedCards([a, b]);
        } else {
          setWrongCards([a, b]);
        }
        setTimeout(() => {
          if (isMatch) {
            setCards((prev) =>
              prev.map((c) => (c.id === a || c.id === b ? { ...c, isMatched: true } : c)),
            );
            setJustMatchedCards([]);
          } else {
            setCards((prev) =>
              prev.map((c) => (c.id === a || c.id === b ? { ...c, isFlipped: false } : c)),
            );
            setWrongCards([]);
          }
          setFlipped([]);
          setIsChecking(false);
        }, CLEANUP_DELAY_MS);
      }, FLIP_DELAY_MS);
    },
    [cards, flipped, isChecking, previewing, started],
  );

  const reset = () => {
    setCards(createShuffledCards());
    setFlipped([]);
    setMoves(0);
    setIsChecking(false);
    setTime(0);
    setStarted(false);
    setPreviewing(true);
    setPreviewCountdown(PREVIEW_SECONDS);
    setWrongCards([]);
    setJustMatchedCards([]);
  };

  return {
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
  };
}
