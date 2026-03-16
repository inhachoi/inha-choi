import express from "express";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const router = express.Router();
const analyticsClient = new BetaAnalyticsDataClient({
  keyFilename: "./src/inha-choi-blog-f077aad0b595.json",
});

router.get("/daily", async (req, res) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const dateStr = yesterday.toISOString().split("T")[0];

  const [response] = await analyticsClient.runReport({
    property: `properties/517918257`,
    dateRanges: [{ startDate: dateStr, endDate: dateStr }],
    metrics: [
      { name: "activeUsers" },
      { name: "sessions" },
      { name: "averageSessionDuration" },
    ],
    dimensions: [{ name: "pagePath" }],
  });

  const pages = response.rows?.map((row) => ({
    path: row.dimensionValues[0].value,
    activeUsers: row.metricValues[0].value,
    sessions: row.metricValues[1].value,
    avgDuration: Math.round(row.metricValues[2].value) + "초",
  }));

  res.json({ date: dateStr, pages });
});

export default router;
