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
          --color-border: #d1d5db;
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
          --color-border: rgba(255, 255, 255, 0.2);
        }

        /* chatscope chat UI 다크모드 오버라이드 */
        [data-theme="dark"] {
          .cs-chat-container,
          .cs-conversation-header,
          .cs-message-input {
            background-color: var(--color-bg-primary);
            color: var(--color-text-primary);
            border-color: var(--color-bg-hover);
          }

          .cs-message-list {
            background-color: var(--color-bg-page);
          }

          .cs-message-input__content-editor-wrapper,
          .cs-message-input__content-editor {
            background-color: var(--color-bg-primary);
            color: var(--color-text-primary);
          }

          .cs-message--incoming .cs-message__content {
            background-color: var(--color-bg-hover);
            color: var(--color-text-primary);
          }

          .cs-message--outgoing .cs-message__content {
            color: #ffffff;
          }

          .cs-typing-indicator {
            background-color: var(--color-bg-primary);
            color: var(--color-text-secondary);
          }

          .cs-button {
            color: var(--color-text-secondary);
          }

          .cs-conversation-header,
          .cs-conversation-header__content,
          .cs-conversation-header__user-name,
          .cs-conversation-header__info {
            background-color: var(--color-bg-primary) !important;
            color: var(--color-text-secondary) !important;
          }

          .cs-message-input__content-editor[data-placeholder]:empty::before {
            color: var(--color-text-secondary);
          }
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
