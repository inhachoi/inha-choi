import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import { StartClient } from "@tanstack/react-start/client";

Sentry.init({
  dsn: "https://d7cc6f47f62bf2a243307eadaca0f048@o4511053851066368.ingest.us.sentry.io/4511069006266368",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StartClient />
  </StrictMode>,
);
