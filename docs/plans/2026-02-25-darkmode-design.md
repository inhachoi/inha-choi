# 다크모드 기능 설계 문서

**날짜:** 2026-02-25
**브랜치:** feat-12
**상태:** 승인됨

---

## 개요

inha-choi 프론트엔드(apps/front)에 다크모드 토글 기능을 추가한다. 토글 아이콘은 NavigationBar 우측 끝에 위치한다. 설정은 localStorage에 저장되어 새로고침 후에도 유지된다. 기존 FSD 아키텍처 위에서 Zustand로 상태를 관리하고 CSS Variables로 스타일을 전환한다.

---

## 아키텍처

### FSD 레이어별 역할

```
shared/
  model/
    theme.ts          ← Zustand 스토어 + useTheme 훅
    index.ts          ← Public API: useTheme export
  ui/
    ThemeToggleButton.tsx  ← ☀️/🌙 아이콘 버튼 컴포넌트
    index.ts               ← Public API: ThemeToggleButton export

app/
  styles/
    GlobalStyles.tsx   ← CSS Variables 정의 (라이트/다크 색상 토큰)

widgets/
  navigation-bar/
    ui/NavigationBar.tsx  ← ThemeToggleButton을 우측에 배치
```

### 의존성 방향 (FSD 규칙)

```
widgets → shared (허용)
app → widgets, shared (허용)
shared ← 상위 레이어에서 import 금지 (강제)
```

---

## CSS 토큰 설계

```css
/* 라이트 모드 (기본값) */
:root {
  --color-bg-primary: #ffffff;           /* 네비바, 풋터, 카드 배경 */
  --color-bg-page: #f9fafb;              /* 페이지 전체 배경 (grey50) */
  --color-bg-hover: #f3f4f6;             /* 카드 hover 배경 (grey100) */
  --color-text-primary: #111111;         /* 본문 주요 텍스트 */
  --color-text-secondary: #6b7280;       /* 부제목, 날짜 등 보조 텍스트 */
  --color-text-title: #111827;           /* 섹션 제목 텍스트 (grey900) */
  --color-shadow: rgba(0, 0, 0, 0.08);  /* 네비바/풋터 그림자 */
  --color-card-shadow: rgba(0, 0, 0, 0.06);
  --color-card-shadow-hover: rgba(0, 0, 0, 0.12);
  --color-glitch-shadow-1: #e5e7eb;
  --color-glitch-shadow-2: #f3f4f6;
}

/* 다크 모드 */
[data-theme="dark"] {
  --color-bg-primary: #1e1e2e;
  --color-bg-page: #13131f;
  --color-bg-hover: #2d2d42;
  --color-text-primary: #f1f5f9;
  --color-text-secondary: #94a3b8;
  --color-text-title: #e2e8f0;
  --color-shadow: rgba(0, 0, 0, 0.4);   /* 강화된 그림자로 영역 분리 유지 */
  --color-card-shadow: rgba(0, 0, 0, 0.3);
  --color-card-shadow-hover: rgba(0, 0, 0, 0.5);
  --color-glitch-shadow-1: #2d2d42;
  --color-glitch-shadow-2: #1e1e2e;
}
```

---

## Zustand 스토어 (`shared/model/theme.ts`)

```ts
// 모듈 import 시점에 localStorage를 동기 읽어 초기값 결정 → useEffect 불필요
const getInitialDark = (): boolean => {
  try {
    return localStorage.getItem("theme") === "dark";
  } catch {
    return false;
  }
};

interface ThemeStore {
  isDark: boolean;
  toggle: () => void;
}
```

---

## 토글 버튼 위치

```
NavigationBar:
[ 🏠 Logo ]  [ Posts ] [ Guestbook ] [ Chat ]  [ ☀️/🌙 ]
                                              ← 우측 고정 (space-between 3번째 자식)
```

- `ThemeToggleButton`은 `shared/ui/`에 두고 `NavigationBar`에서 import
- 반응형에서도 아이콘 크기 조정 포함 (768px, 480px)

---

## 수정 대상 컴포넌트

하드코딩된 색상을 CSS Variables로 교체하는 파일 목록:

| 컴포넌트 | 파일 | 변경 내용 |
|---------|------|---------|
| NavigationBar | `widgets/navigation-bar/ui/NavigationBar.tsx` | 배경, 그림자 |
| Footer | `widgets/footer/ui/Footer.tsx` | 배경, 텍스트, 그림자 |
| PageLayout | `app/routes/AppRouter.tsx` | 페이지 배경 |
| Article | `shared/ui/Article.tsx` | 카드 배경, 텍스트, hover |
| TextLink | `shared/ui/TextLink.tsx` | 배경, 텍스트 |
| ListItem | `shared/ui/ListItem.tsx` | 배경, hover |
| Header | `shared/ui/Header.tsx` | 텍스트 색상 추가 |
| Title | `shared/ui/Title.tsx` | 텍스트 색상 |
| GlitchText | `widgets/glitch-text/ui/GlitchText.tsx` | 텍스트, text-shadow |

---

## localStorage 저장 방식

- 토글 시: `localStorage.setItem("theme", "dark" | "light")` + `document.documentElement.setAttribute("data-theme", ...)` 동시 업데이트
- 화면 깜빡임 방지: `index.html`에 인라인 스크립트 추가 → React 로드 전에 data-theme 적용
- Zustand 초기값: 모듈 import 시 localStorage에서 동기 읽기

---

## 반응형 대응

기존 브레이크포인트(768px, 480px)는 모두 유지. ThemeToggleButton 아이콘 크기:
- 기본: 20px
- 768px: 18px
- 480px: 16px
