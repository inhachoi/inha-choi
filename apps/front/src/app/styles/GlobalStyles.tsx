import { css,Global } from "@emotion/react";

export function GlobalStyles() {
  return (
    <Global
      styles={css`
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
