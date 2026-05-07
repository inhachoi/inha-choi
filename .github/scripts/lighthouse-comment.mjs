import { readFileSync, readdirSync, appendFileSync } from "fs";

const PAGES = ["/", "/posts", "/chat", "/games", "/guestbook"];

const CATEGORIES = [
  { key: "performance", label: "Performance" },
  { key: "accessibility", label: "Accessibility" },
  { key: "best-practices", label: "Best Practices" },
  { key: "seo", label: "SEO" },
];

function readResults(dir) {
  const results = {};
  const dirPath = `./${dir}`;

  let files;
  try {
    files = readdirSync(dirPath).filter((f) => /^lhr-.+\.json$/.test(f));
  } catch {
    console.error(`[lighthouse] ${dirPath} 디렉토리를 읽을 수 없음`);
    return results;
  }

  const seen = new Set();

  for (const file of files) {
    try {
      const lhr = JSON.parse(readFileSync(`${dirPath}/${file}`, "utf-8"));
      const url = lhr.requestedUrl ?? lhr.finalUrl;
      if (!url) continue;

      const page = new URL(url).pathname || "/";
      if (seen.has(page)) continue;
      seen.add(page);

      results[page] = {
        performance: Math.round((lhr.categories?.performance?.score ?? 0) * 100),
        accessibility: Math.round((lhr.categories?.accessibility?.score ?? 0) * 100),
        "best-practices": Math.round((lhr.categories?.["best-practices"]?.score ?? 0) * 100),
        seo: Math.round((lhr.categories?.seo?.score ?? 0) * 100),
      };
    } catch (e) {
      console.warn(`[lighthouse] ${file} 파싱 실패:`, e.message);
    }
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

const base = readResults("base-results");
const pr = readResults("pr-results");

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
