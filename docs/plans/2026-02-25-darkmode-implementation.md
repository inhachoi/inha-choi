# 다크모드 구현 계획

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**목표:** feat-12 브랜치에서 Zustand + CSS Variables 방식으로 다크모드 온오프 기능을 구현한다.

**아키텍처:** Zustand 스토어(`shared/model/theme.ts`)가 isDark 상태와 toggle 함수를 관리하고, CSS Variables가 색상 전환을 담당한다. `index.html`에 인라인 스크립트를 추가해 첫 렌더 전 테마를 적용해 화면 깜빡임을 방지한다. FSD 단방향 의존성(shared ← widgets ← app)을 준수한다.

**기술 스택:** React 19, Emotion CSS-in-JS, Zustand, CSS Variables, TypeScript

---

### 작업 1: feat-12 브랜치 생성 및 Zustand 설치

**파일:**
- 실행 위치: `apps/front/`

**단계 1: feat-12 브랜치 생성**

```bash
cd /c/Users/USER/Desktop/coding/inha-choi
git checkout -b feat-12
```

예상 결과: `Switched to a new branch 'feat-12'`

**단계 2: Zustand 설치**

```bash
cd apps/front && pnpm add zustand
```

예상 결과: `package.json` dependencies에 `"zustand"` 항목 추가됨

**단계 3: 설치 확인**

`apps/front/package.json`의 `"dependencies"`에 `"zustand"` 항목이 추가되었는지 확인.

---

### 작업 2: index.html에 테마 초기화 스크립트 추가 (화면 깜빡임 방지)

**파일:**
- 수정: `apps/front/index.html`

**단계 1: `</head>` 직전에 인라인 스크립트 삽입**

`apps/front/index.html`의 `</head>` 바로 앞에 다음을 추가:

```html
    <script>
      (function () {
        var theme = localStorage.getItem("theme");
        if (theme === "dark") {
          document.documentElement.setAttribute("data-theme", "dark");
        }
      })();
    </script>
```

React가 로드되기 전에 동기 실행되어 첫 렌더 깜빡임을 방지한다.

**단계 2: 커밋**

```bash
git add apps/front/index.html
git commit -m "feat: 다크모드 테마 초기화 스크립트 추가 (화면 깜빡임 방지)"
```

---

### 작업 3: CSS Variables 정의 (GlobalStyles.tsx)

**파일:**
- 수정: `apps/front/src/app/styles/GlobalStyles.tsx`

**단계 1: 기존 파일을 아래 내용으로 교체**

```tsx
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
```

**단계 2: 커밋**

```bash
git add apps/front/src/app/styles/GlobalStyles.tsx
git commit -m "feat: 다크모드 CSS 변수 토큰 정의"
```

---

### 작업 4: Zustand 테마 스토어 생성

**파일:**
- 생성: `apps/front/src/shared/model/theme.ts`

**단계 1: 파일 생성**

```ts
import { create } from "zustand";

interface ThemeStore {
  isDark: boolean;
  toggle: () => void;
}

const getInitialDark = (): boolean => {
  try {
    return localStorage.getItem("theme") === "dark";
  } catch {
    return false;
  }
};

export const useTheme = create<ThemeStore>((set) => ({
  isDark: getInitialDark(),
  toggle: () =>
    set((state) => {
      const next = !state.isDark;
      localStorage.setItem("theme", next ? "dark" : "light");
      document.documentElement.setAttribute("data-theme", next ? "dark" : "");
      return { isDark: next };
    }),
}));
```

**설계 포인트:**
- `getInitialDark()`: 모듈 import 시점에 localStorage를 동기 읽어 초기값 결정 → useEffect 불필요
- `toggle`: 상태(Zustand), 저장소(localStorage), DOM attribute를 동시에 업데이트
- AppProviders 수정 불필요

---

### 작업 5: shared/model Public API 업데이트

**파일:**
- 수정: `apps/front/src/shared/model/index.ts`

**단계 1: useTheme export 추가**

기존:
```ts
export type { PostDTO } from "./types";
export { usePosts } from "./usePosts";
```

변경 후:
```ts
export type { PostDTO } from "./types";
export { usePosts } from "./usePosts";
export { useTheme } from "./theme";
```

**단계 2: 커밋**

```bash
git add apps/front/src/shared/model/theme.ts apps/front/src/shared/model/index.ts
git commit -m "feat: Zustand 테마 스토어 생성 및 Public API 등록"
```

---

### 작업 6: ThemeToggleButton 컴포넌트 생성

**파일:**
- 생성: `apps/front/src/shared/ui/ThemeToggleButton.tsx`

**단계 1: 파일 생성**

```tsx
import styled from "@emotion/styled";

import { useTheme } from "@/shared/model";

export function ThemeToggleButton() {
  const { isDark, toggle } = useTheme();

  return (
    <Button
      onClick={toggle}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  color: var(--color-text-primary);
  border-radius: 6px;
  transition: background 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: var(--color-bg-hover);
  }

  svg {
    width: 20px;
    height: 20px;

    @media (max-width: 768px) {
      width: 18px;
      height: 18px;
    }

    @media (max-width: 480px) {
      width: 16px;
      height: 16px;
    }
  }
`;
```

---

### 작업 7: shared/ui Public API 업데이트

**파일:**
- 수정: `apps/front/src/shared/ui/index.ts`

**단계 1: ThemeToggleButton export 추가**

```ts
export { Article } from "./Article";
export { Date } from "./Date";
export { Header } from "./Header";
export { IframeModal } from "./IframeModal";
export { ListItem } from "./ListItem";
export { LoadingSpinner } from "./LoadingSpinner";
export { LogoButton } from "./LogoButton";
export { Project } from "./Project";
export { TextButton } from "./TextButton";
export { TextLink } from "./TextLink";
export { ThemeToggleButton } from "./ThemeToggleButton";
export { Title } from "./Title";
```

**단계 2: 커밋**

```bash
git add apps/front/src/shared/ui/ThemeToggleButton.tsx apps/front/src/shared/ui/index.ts
git commit -m "feat: ThemeToggleButton 컴포넌트 생성 및 Public API 등록"
```

---

### 작업 8: NavigationBar 업데이트 (토글 버튼 추가 + CSS 변수 적용)

**파일:**
- 수정: `apps/front/src/widgets/navigation-bar/ui/NavigationBar.tsx`

**단계 1: 파일 전체 교체**

```tsx
import styled from "@emotion/styled";

import { LogoButton, TextButton, ThemeToggleButton } from "@/shared/ui";

export function NavigationBar() {
  return (
    <Container>
      <Wrapper>
        <LogoButton />

        <TextButtonGroup>
          <TextButton toGo="/posts">Posts</TextButton>
          <TextButton toGo="/guestbook">Guestbook</TextButton>
          <TextButton toGo="/chat">Chat</TextButton>
        </TextButtonGroup>

        <ThemeToggleButton />
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px;
  background: var(--color-bg-primary);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  box-sizing: border-box;
  box-shadow: 0 4px 50px var(--color-shadow);

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 8px 10px;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 6px 10px;
  }
`;

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 768px;
`;

const TextButtonGroup = styled.section`
  display: flex;
  gap: 15px;
`;
```

**변경 내용:**
- `colors` import 제거
- `ThemeToggleButton` import 및 Wrapper 우측 끝에 배치
- `background: white` → `background: var(--color-bg-primary)`
- `box-shadow` → `var(--color-shadow)` (다크모드에서 강화되어 영역 분리 유지)

**단계 2: 커밋**

```bash
git add apps/front/src/widgets/navigation-bar/ui/NavigationBar.tsx
git commit -m "feat: NavigationBar에 ThemeToggleButton 추가 및 다크모드 CSS 변수 적용"
```

---

### 작업 9: Footer CSS 변수 적용

**파일:**
- 수정: `apps/front/src/widgets/footer/ui/Footer.tsx`

**단계 1: 파일 전체 교체**

```tsx
import styled from "@emotion/styled";

export function Footer() {
  return <Container>Ⓒ 2025. inhachoi. All right reserved.</Container>;
}

const Container = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  background: var(--color-bg-primary);
  color: var(--color-text-secondary);
  box-shadow: 0 -4px 50px var(--color-shadow);

  @media (max-width: 768px) {
    font-size: 0.8rem;
    height: 65px;
  }

  @media (max-width: 480px) {
    font-size: 0.6rem;
    height: 50px;
  }
`;
```

**단계 2: 커밋**

```bash
git add apps/front/src/widgets/footer/ui/Footer.tsx
git commit -m "feat: Footer 다크모드 CSS 변수 적용"
```

---

### 작업 10: AppRouter PageLayout CSS 변수 적용

**파일:**
- 수정: `apps/front/src/app/routes/AppRouter.tsx`

**단계 1: PageLayout 스타일 수정 및 colors import 제거**

`background: ${colors.grey50}` → `background: var(--color-bg-page)`

변경 후 PageLayout:
```tsx
const PageLayout = styled.div`
  display: flex;
  justify-content: center;
  background: var(--color-bg-page);
  margin: 60px 0 0 0;
  min-width: 370px;
  min-height: calc(100vh - 140px);

  @media (max-width: 768px) {
    margin: 51px 0 0 0;
    min-height: calc(100vh - 114px);
  }

  @media (max-width: 480px) {
    margin: 42px 0 0 0;
    min-height: calc(100vh - 90px);
  }
`;
```

파일 상단의 `import { colors } from "@toss/tds-colors"` 줄도 제거한다.

**단계 2: 커밋**

```bash
git add apps/front/src/app/routes/AppRouter.tsx
git commit -m "feat: AppRouter 페이지 배경 다크모드 CSS 변수 적용"
```

---

### 작업 11: Article CSS 변수 적용

**파일:**
- 수정: `apps/front/src/shared/ui/Article.tsx`

**단계 1: Container 스타일 수정**

아래 항목을 교체한다:
- `background: white` → `background: var(--color-bg-primary)`
- `color: black` → `color: var(--color-text-primary)`
- `box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06)` → `box-shadow: 0 4px 10px var(--color-card-shadow)`
- hover: `background: ${colors.grey100}` → `background: var(--color-bg-hover)`
- hover: `box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12)` → `box-shadow: 0 8px 16px var(--color-card-shadow-hover)`

변경 후 Container:
```tsx
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  width: 100%;
  height: 100px;
  background: var(--color-bg-primary);
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  overflow: hidden;
  color: var(--color-text-primary);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
  box-shadow: 0 4px 10px var(--color-card-shadow);

  &:hover {
    background: var(--color-bg-hover);
    transform: translateY(-4px);
    box-shadow: 0 8px 16px var(--color-card-shadow-hover);
  }

  &:hover div > img {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    height: 68px;

    div {
      font-size: 0.8em;
    }
  }

  @media (max-width: 480px) {
    height: 47px;

    div {
      font-size: 0.6em;
    }
  }
`;
```

`colors` import를 제거한다.

**단계 2: 커밋**

```bash
git add apps/front/src/shared/ui/Article.tsx
git commit -m "feat: Article 다크모드 CSS 변수 적용"
```

---

### 작업 12: TextLink CSS 변수 적용

**파일:**
- 수정: `apps/front/src/shared/ui/TextLink.tsx`

**단계 1: Container 스타일 수정**

- `background: white` → `background: var(--color-bg-primary)`
- `color: black` → `color: var(--color-text-primary)`
- `box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06)` → `box-shadow: 0 4px 10px var(--color-card-shadow)`
- hover: `background: ${colors.grey100}` → `background: var(--color-bg-hover)`
- hover: `box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12)` → `box-shadow: 0 8px 16px var(--color-card-shadow-hover)`

변경 후 Container:
```tsx
const Container = styled.a`
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 5px 20px;
  width: 100%;
  height: 50px;
  background: var(--color-bg-primary);
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  color: var(--color-text-primary);
  text-decoration: none;

  box-shadow: 0 4px 10px var(--color-card-shadow);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    background: var(--color-bg-hover);
    transform: translateY(-2px);
    box-shadow: 0 8px 16px var(--color-card-shadow-hover);
  }

  @media (max-width: 768px) {
    height: 45px;
  }

  @media (max-width: 480px) {
    height: 40px;
  }
`;
```

`colors` import를 제거한다.

**단계 2: 커밋**

```bash
git add apps/front/src/shared/ui/TextLink.tsx
git commit -m "feat: TextLink 다크모드 CSS 변수 적용"
```

---

### 작업 13: ListItem CSS 변수 적용

**파일:**
- 수정: `apps/front/src/shared/ui/ListItem.tsx`

**단계 1: Container 스타일 수정**

- `background: white` → `background: var(--color-bg-primary)`
- `box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06)` → `box-shadow: 0 4px 10px var(--color-card-shadow)`
- hover: `background: ${colors.grey100}` → `background: var(--color-bg-hover)`
- hover: `box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12)` → `box-shadow: 0 8px 16px var(--color-card-shadow-hover)`

변경 후 Container:
```tsx
const Container = styled.a`
  display: flex;
  align-items: center;
  width: 100%;
  background: var(--color-bg-primary);
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  overflow: hidden;
  gap: 30px;
  text-decoration: none;

  box-shadow: 0 4px 10px var(--color-card-shadow);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    background: var(--color-bg-hover);
    transform: translateY(-3px);
    box-shadow: 0 8px 16px var(--color-card-shadow-hover);
  }

  @media (max-width: 768px) {
    gap: 22.5px;
  }

  @media (max-width: 480px) {
    gap: 15px;
  }
`;
```

`colors` import를 제거한다.

**단계 2: 커밋**

```bash
git add apps/front/src/shared/ui/ListItem.tsx
git commit -m "feat: ListItem 다크모드 CSS 변수 적용"
```

---

### 작업 14: Header CSS 변수 적용

**파일:**
- 수정: `apps/front/src/shared/ui/Header.tsx`

**단계 1: Container에 color 추가**

현재 명시적 색상이 없으므로 다크모드에서 보이지 않을 수 있다. `color` 속성을 추가한다.

변경 후 Container:
```tsx
const Container = styled.header`
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 1.5rem;
  line-height: 1.5;
  margin: 0 0 50px 0;
  color: var(--color-text-primary);

  @media (max-width: 768px) {
    font-size: 1.25rem;
    margin: 0 0 35px 0;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    margin: 0 0 20px 0;
  }
`;
```

**단계 2: 커밋**

```bash
git add apps/front/src/shared/ui/Header.tsx
git commit -m "feat: Header 다크모드 텍스트 색상 CSS 변수 적용"
```

---

### 작업 15: Title CSS 변수 적용

**파일:**
- 수정: `apps/front/src/shared/ui/Title.tsx`

**단계 1: 스타일 수정**

`color: ${colors.grey900}` → `color: var(--color-text-title)`

변경 후 Container:
```tsx
const Container = styled.h2`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 30px;
  font-size: 1.5rem;
  padding: 10px 20px;
  font-weight: bold;
  color: var(--color-text-title);
  border-radius: 10px;

  @media (max-width: 768px) {
    font-size: 1.25rem;
    padding: 7.5px 15px;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 5px 10px;
  }
`;
```

`colors` import를 제거한다.

**단계 2: 커밋**

```bash
git add apps/front/src/shared/ui/Title.tsx
git commit -m "feat: Title 다크모드 CSS 변수 적용"
```

---

### 작업 16: GlitchText CSS 변수 적용

**파일:**
- 수정: `apps/front/src/widgets/glitch-text/ui/GlitchText.tsx`

**단계 1: 스타일 수정**

- `color: ${colors.grey900}` → `color: var(--color-text-title)`
- `text-shadow: 0.3rem 0.1rem ${colors.grey200}, -0.2rem -0.1rem ${colors.grey100}` →
  `text-shadow: 0.3rem 0.1rem var(--color-glitch-shadow-1), -0.2rem -0.1rem var(--color-glitch-shadow-2)`

변경 후 Container:
```tsx
const Container = styled.div`
  line-height: 1.3;

  @keyframes wiggle {
    0% {
      transform: skewX(24deg);
    }
    2.5% {
      transform: skewX(-8deg);
    }
    5% {
      transform: skewX(55deg);
    }
    7.5% {
      transform: skewX(-50deg);
    }
    10% {
      transform: skewX(29deg);
    }
    12.5% {
      transform: skewX(-30deg);
    }
    15% {
      transform: skewX(3deg);
    }
    17.5% {
      transform: skewX(-2deg);
    }
    20% {
      transform: skewX(1deg);
    }
    22.5% {
      transform: skewX(10deg);
    }
    100% {
      transform: skewX(0deg);
    }
  }

  font-size: 2rem;
  color: var(--color-text-title);
  animation: wiggle 3s infinite;
  text-shadow: 0.3rem 0.1rem var(--color-glitch-shadow-1),
    -0.2rem -0.1rem var(--color-glitch-shadow-2);
  overflow: hidden;
  z-index: 10;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  @media (max-width: 580px) {
    font-size: 1.3rem;
  }
  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;
```

`colors` import를 제거한다.

**단계 2: 최종 커밋**

```bash
git add apps/front/src/widgets/glitch-text/ui/GlitchText.tsx
git commit -m "feat: GlitchText 다크모드 CSS 변수 적용"
```

---

### 작업 17: 빌드 검증

**단계 1: 타입 체크**

```bash
cd apps/front && pnpm exec tsc --noEmit
```

예상 결과: 오류 없음

**단계 2: 빌드 실행**

```bash
cd apps/front && pnpm build
```

예상 결과: 오류 없이 빌드 성공

**단계 3: 개발 서버 실행 후 수동 확인**

```bash
cd apps/front && pnpm dev
```

확인 항목:
- [ ] 네비게이션 바 우측에 달/해 아이콘 표시
- [ ] 클릭 시 다크모드 전환 (배경, 텍스트 색상 변경)
- [ ] 헤더, 풋터, 카드, 제목 텍스트 모두 가시적
- [ ] 네비바/풋터 그림자로 영역 분리 유지
- [ ] 새로고침 후에도 마지막 설정 유지
- [ ] 반응형 (768px, 480px) 레이아웃 정상 동작
- [ ] 다시 클릭 시 라이트모드 복귀
