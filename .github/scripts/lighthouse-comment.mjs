import { readFileSync, appendFileSync } from "fs";

const PAGES = ["/", "/posts", "/chat", "/games", "/guestbook"];

const CATEGORIES = [
  { key: "performance", label: "Performance" },
  { key: "accessibility", label: "Accessibility" },
  { key: "best-practices", label: "Best Practices" },
  { key: "seo", label: "SEO" },
];

function readManifest(dir) {
  const manifest = JSON.parse(readFileSync(`./${dir}/manifest.json`, "utf-8"));
  const results = {};

  for (const entry of manifest) {
    const path = new URL(entry.url).pathname || "/";
    if (!entry.isRepresentativeRun) continue;
    results[path] = {
      performance: Math.round((entry.summary.performance ?? 0) * 100),
      accessibility: Math.round((entry.summary.accessibility ?? 0) * 100),
      "best-practices": Math.round((entry.summary["best-practices"] ?? 0) * 100),
      seo: Math.round((entry.summary.seo ?? 0) * 100),
    };
  }

  return results;
}

function emoji(score) {
  if (score >= 90) return "🟢";
  if (score >= 50) return "🟡";
  return "🔴";
}

function diff(after, before) {
  const d = after - before;
  if (d > 0) return `**+${d}**`;
  if (d < 0) return `**${d}**`;
  return "±0";
}

const base = readManifest("base-results");
const pr = readManifest("pr-results");

const now = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

let comment = `## ⚡ Lighthouse CI 결과\n\n> 측정 시각: ${now} KST\n\n`;

for (const page of PAGES) {
  const b = base[page];
  const p = pr[page];

  comment += `### \`${page}\`\n\n`;

  if (!b || !p) {
    comment += `> 측정 실패\n\n`;
    continue;
  }

  comment += `| 항목 | Before | After | 변화 |\n`;
  comment += `|---|:---:|:---:|:---:|\n`;

  for (const { key, label } of CATEGORIES) {
    const before = b[key];
    const after = p[key];
    comment += `| ${label} | ${emoji(before)} ${before} | ${emoji(after)} ${after} | ${diff(after, before)} |\n`;
  }

  comment += "\n";
}

appendFileSync(
  process.env.GITHUB_OUTPUT,
  `comment<<LIGHTHOUSE_EOF\n${comment}\nLIGHTHOUSE_EOF\n`
);
