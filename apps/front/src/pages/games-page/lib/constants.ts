export const EMOJIS = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];

export const PREVIEW_SECONDS = 5;
export const FLIP_DELAY_MS = 400;
export const CLEANUP_DELAY_MS = 600;

export const TOTAL_ROUNDS = 3;
export const AUTO_ADVANCE_SECONDS = 3;

// 일반 성인 기준 반응속도 백분위 분포 [ms, 상위 %]
export const PERCENTILE_TABLE: [number, number][] = [
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
