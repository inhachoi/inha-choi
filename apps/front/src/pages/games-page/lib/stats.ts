import { PERCENTILE_TABLE } from "./constants";

export function getTopPercent(ms: number): number {
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

export function getAverage(records: number[]): number {
  return Math.round(records.reduce((a, b) => a + b, 0) / records.length);
}

export function getBest(records: number[]): number {
  return Math.min(...records);
}
