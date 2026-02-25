# Dark Mode Feature Design

**Date:** 2026-02-25
**Branch:** feat-12
**Status:** Approved

---

## Overview

Add a dark mode toggle to the inha-choi frontend (apps/front). The toggle icon lives in the top-right of the NavigationBar. Preference persists via localStorage. Built on the existing FSD architecture using Zustand for state and CSS Variables for styling.

---

## Architecture

### FSD Layer Responsibilities

```
shared/
  model/
    theme.ts          ← Zustand store + useTheme hook
    index.ts          ← Public API: exports useTheme
  ui/
    ThemeToggleButton.tsx  ← ☀️/🌙 icon button component
    index.ts               ← Public API: exports ThemeToggleButton

app/
  providers/
    AppProviders.tsx   ← Add ThemeInitializer (reads localStorage on mount)
  styles/
    GlobalStyles.tsx   ← CSS Variables for light/dark tokens

widgets/
  navigation-bar/
    ui/NavigationBar.tsx  ← Import ThemeToggleButton, place in top-right
```

### Dependency Direction (FSD rules)

```
widgets → shared (allowed)
app → widgets, shared (allowed)
shared ← no imports from upper layers (enforced)
```

---

## CSS Token Design

```css
/* Light mode (default) */
:root {
  --color-bg-primary: #ffffff;
  --color-bg-page: #f9fafb;
  --color-text-primary: #111111;
  --color-text-secondary: #6b7280;
  --color-shadow: rgba(0, 0, 0, 0.08);
  --color-border-hover: #f3f4f6;
}

/* Dark mode */
[data-theme="dark"] {
  --color-bg-primary: #1e1e2e;
  --color-bg-page: #13131f;
  --color-text-primary: #f1f5f9;
  --color-text-secondary: #94a3b8;
  --color-shadow: rgba(0, 0, 0, 0.4);  /* stronger shadow for area separation */
  --color-border-hover: #2d2d42;
}
```

---

## Zustand Store (`shared/model/theme.ts`)

```ts
import { create } from 'zustand';

interface ThemeStore {
  isDark: boolean;
  toggle: () => void;
  initialize: () => void;
}

export const useTheme = create<ThemeStore>((set) => ({
  isDark: false,
  toggle: () =>
    set((state) => {
      const next = !state.isDark;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', next ? 'dark' : '');
      return { isDark: next };
    }),
  initialize: () => {
    const saved = localStorage.getItem('theme');
    const isDark = saved === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : '');
    set({ isDark });
  },
}));
```

---

## Toggle Button

- Icon: sun (☀️ or SVG) for light mode, moon (🌙 or SVG) for dark mode
- Located in NavigationBar, right-aligned
- Responsive: size adjusts at 768px and 480px breakpoints
- Accessible: aria-label indicating current mode

---

## Components to Update (CSS Variable Migration)

| Component | File | Changes |
|-----------|------|---------|
| NavigationBar | `widgets/navigation-bar/ui/NavigationBar.tsx` | bg, shadow → CSS vars |
| Footer | `widgets/footer/ui/Footer.tsx` | bg, text, shadow → CSS vars |
| PageLayout | `app/routes/AppRouter.tsx` | page bg → CSS vars |
| Article | `shared/ui/Article.tsx` | card bg, text, hover → CSS vars |
| TextLink | `shared/ui/TextLink.tsx` | bg, text → CSS vars |
| ListItem | `shared/ui/ListItem.tsx` | bg, hover → CSS vars |
| Header | `shared/ui/Header.tsx` | text color → CSS vars |
| Title | `shared/ui/Title.tsx` | text color → CSS vars |
| GlitchText | `widgets/glitch-text/ui/GlitchText.tsx` | text color → CSS vars |

---

## Persistence

- On app mount: `useTheme.getState().initialize()` reads localStorage and sets `data-theme`
- On toggle: writes to localStorage and updates `data-theme` immediately
- No flash-of-wrong-theme issue: initialization runs in AppProviders before render

---

## Responsive Considerations

All existing breakpoints (768px, 480px) are preserved. ThemeToggleButton sizing:
- Default: 24px icon, 8px padding
- 768px: 22px icon
- 480px: 20px icon
