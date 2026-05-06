import { useCallback, useEffect, useRef, useState } from "react";

import { AUTO_ADVANCE_SECONDS, TOTAL_ROUNDS } from "../lib/constants";

import type { ReactionGameState } from "./types";

export function useReactionGame(): {
  gameState: ReactionGameState;
  round: number;
  records: number[];
  currentResult: number | null;
  earlyClick: boolean;
  resultCountdown: number;
  bgColor: string | undefined;
  mainText: string;
  subText: string;
  handleBoxClick: () => void;
  reset: () => void;
} {
  const [gameState, setGameState] = useState<ReactionGameState>("idle");
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
    const isLastRound = round >= TOTAL_ROUNDS;
    const advanceTimer = setTimeout(() => {
      if (isLastRound) {
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

  const bgColor = (() => {
    if (gameState === "idle") return "#000";
    if (gameState === "waiting") return "#ef4444";
    if (gameState === "active") return "#22c55e";
    return undefined;
  })();

  const mainText = (() => {
    if (gameState === "idle") return "시작";
    if (gameState === "waiting") return "기다리세요...";
    if (gameState === "active") return "지금!";
    if (gameState === "result") return currentResult !== null ? `${currentResult}ms` : "";
    return "";
  })();

  const subText = (() => {
    if (earlyClick && gameState === "waiting") return "너무 빨라요!";
    if (gameState === "result")
      return `${resultCountdown}초 후 ${round >= TOTAL_ROUNDS ? "결과" : "다음 라운드"}`;
    if (gameState === "waiting" && !earlyClick) return "초록색으로 바뀌면 클릭하세요";
    return "";
  })();

  return {
    gameState,
    round,
    records,
    currentResult,
    earlyClick,
    resultCountdown,
    bgColor,
    mainText,
    subText,
    handleBoxClick,
    reset,
  };
}
