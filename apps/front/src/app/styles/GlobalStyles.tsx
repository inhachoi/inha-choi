import { css, Global } from "@emotion/react";

export function GlobalStyles() {
  return (
    <Global
      styles={css`
        :root {
          --color-bg-primary: #ffffff;
          --color-bg-page: #f9fafb;
          --color-bg-hover: #f3f4f6;
          --color-text-primary: #111111;
          --color-text-secondary: #6b7280;
          --color-text-title: #111827;
          --color-shadow: rgba(0, 0, 0, 0.08);
          --color-card-shadow: rgba(0, 0, 0, 0.06);
          --color-card-shadow-hover: rgba(0, 0, 0, 0.12);
          --color-glitch-shadow-1: #e5e7eb;
          --color-glitch-shadow-2: #f3f4f6;
        }

        [data-theme="dark"] {
          --color-bg-primary: #1e1e2e;
          --color-bg-page: #13131f;
          --color-bg-hover: #2d2d42;
          --color-text-primary: #f1f5f9;
          --color-text-secondary: #94a3b8;
          --color-text-title: #e2e8f0;
          --color-shadow: rgba(0, 0, 0, 0.4);
          --color-card-shadow: rgba(0, 0, 0, 0.3);
          --color-card-shadow-hover: rgba(0, 0, 0, 0.5);
          --color-glitch-shadow-1: #2d2d42;
          --color-glitch-shadow-2: #1e1e2e;
        }

        html,
        body {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        html::-webkit-scrollbar,
        body::-webkit-scrollbar {
          display: none;
        }
      `}
    />
  );
}
