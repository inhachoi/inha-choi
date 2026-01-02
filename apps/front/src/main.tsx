import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/app/App.tsx";
import { AppProviders } from "./app/providers/AppProviders";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
);
