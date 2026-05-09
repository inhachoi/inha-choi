# GitHub Copilot PR 리뷰 가이드

## 리뷰 철학

1. **80% 이상 확신할 때만 코멘트** — 불확실하면 코멘트 없이 승인한다.
2. **ESLint · TypeScript가 잡는 것은 지적 금지** — CI가 이미 처리한다.
3. **한 PR에 코멘트 최대 7개** — 핵심만 남긴다.
4. **같은 패턴 여러 곳에서 발견 시 대표 1개만** — 반복 코멘트 금지.
5. **추측성 표현 금지** — "고려해보세요", "더 좋을 것 같습니다" 사용 금지.

**리뷰 범위**: diff에 포함된 변경 라인만. 기존 코드·일반론 언급 금지.

---

## CI가 잡는 것 (지적 금지)

- **import 순서** — `eslint-plugin-simple-import-sort`
- **interface vs type** — `consistent-type-definitions` (interface 강제)
- **interface 네이밍** — PascalCase + `Props` / `DTO` suffix
- **React Hooks 규칙** — `eslint-plugin-react-hooks`
- **TypeScript strict 모드** — null 체크, 암묵적 `any`, 미사용 변수 등

---

## 프로젝트 컨텍스트

**FE** (`apps/front`): React 19, TypeScript 5.9, Vite 7

| 역할 | 라이브러리 |
|------|-----------|
| 서버 상태 | TanStack Query 5 |
| 라우팅 | TanStack Router 1 (TanStack Start) |
| 클라이언트 상태 | Zustand 5 |
| 스타일 | Emotion (`@emotion/react`, `@emotion/styled`) |
| 오버레이 | overlay-kit |
| 에러 트래킹 | Sentry |

- 다크모드: `data-theme="dark"` + `useTheme` Zustand 스토어
- 컬러: CSS 커스텀 변수(`--color-*`) 사용

**BE** (`apps/server`): Express 5, Mongoose 9, jsonwebtoken 9, OpenAI SDK

---

## BLOCKER — FSD 아키텍처 위반

반드시 지적합니다.

- 같은 레이어 내 cross-import (예: `pages/A`에서 `pages/B` 직접 import)
- 하위 레이어에서 상위 레이어 참조 (예: `shared`에서 `pages` import)
- 슬라이스를 `index.ts`가 아닌 내부 파일로 직접 import

---

## 필수 지적 대상

### 보안
- Express 라우트에서 JWT/인증 미들웨어 누락
- `console.log`에 토큰·비밀번호 포함
- 사용자 입력값이 MongoDB 쿼리에 검증 없이 삽입
- `process.env` 값을 API 응답에 직접 포함

### 성능
- `useEffect` 의존성에 `useCallback` 없이 함수 전달 → 무한 리렌더 위험
- TanStack Query 키에 렌더마다 새 객체/배열 생성

### 코드 품질
- 의미 불명 매직 넘버 (이름 있는 상수로 대체 필요)
- 중첩 삼항 2단계 이상
- 이름과 동작이 불일치하는 함수 (숨은 사이드이펙트)

---

## 지적 금지 대상

- 이미 동작하는 코드에 대한 리팩터링 권고
- Emotion 대신 다른 스타일 솔루션 제안
- "에러 처리를 추가하세요" (Express 미들웨어가 담당)
- 네이밍 취향 ("더 명확한 이름이 있을 것 같습니다")
- "테스트 코드를 추가하면 좋겠습니다" (테스트 미도입)
- Zustand 대신 다른 상태관리 제안

---

## 출력 형식

코멘트가 필요한 경우만:

```
**문제**: (한 줄 요약)
**이유**: (구체적 근거)
**제안**: (수정 방향, 필요 시 코드)
```

---

## 우선순위

1. BLOCKER (FSD 위반 · 보안)
2. 버그 / 로직 오류
3. 성능 저하
4. 코드 품질

총 7개 초과 시 BLOCKER와 버그만 남기고 나머지 제거.
