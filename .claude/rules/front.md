---
paths:
  - "apps/front/**/*.ts"
  - "apps/front/**/*.tsx"
---

# Front 레이어 규칙

이 규칙은 `apps/front/` 작업 시에만 로드된다.

## 아키텍처

- FSD 구조를 철저히 따를 것 (app / pages / widgets / features / entities / shared)
- 레이어 단방향 의존성: 상위 레이어는 하위 레이어만 참조 가능
- 각 슬라이스는 index.ts (Public API)를 통해서만 외부에 노출할 것
- 슬라이스 간 직접 import 금지 (같은 레이어 내 cross-import 금지)

## 기술 스택

- 클라이언트 상태: Zustand
- 스타일링: Emotion (`@emotion/react`, `@emotion/styled`)
- 서버 상태 / 캐싱: TanStack Query
- 라우팅: TanStack Router (TanStack Start 기반)
- 가상화: TanStack Virtual
- 애니메이션: Motion (Framer Motion)
- 모달 / 오버레이: overlay-kit
- 에러 트래킹: Sentry

## 스타일 규칙

- 컬러 토큰: CSS 커스텀 변수(`--color-*`) 사용
- 다크모드: `data-theme="dark"` 속성 기반 (Zustand `useTheme` 스토어로 제어)

## 작업 규칙

- 작업 후 반드시 `pnpm --filter front lint --fix` 실행할 것
- 작업 후 반드시 `pnpm --filter front build` 로 빌드 에러 확인할 것
