---
name: good-debug
description: Use when encountering a bug, unexpected behavior, or error in the frontend - before attempting any fix
---

# Good Debug

**증상이 아닌 원인을 수정한다.** 에러를 숨기거나 우회하지 않는다.

---

## 디버깅 4단계

### 1. 진단 — 무엇이 문제인지 정확히 파악

에러 메시지를 첫 줄만 보지 말고 전체를 읽는다.

| 에러 종류        | 확인 포인트                             |
| ---------------- | --------------------------------------- |
| `SyntaxError`    | 괄호/따옴표 불일치, 잘못된 키워드       |
| `TypeError`      | 객체가 undefined인데 접근, `await` 누락 |
| `ReferenceError` | 변수 선언 위치, 스코프                  |
| 네트워크 에러    | CORS, 인증, 4xx vs 5xx 구분             |
| 모듈 에러        | ESM vs CommonJS, 경로, 확장자           |

에러 메시지를 통째로 검색하기 전에: **무슨 의미인지 → 어떤 상황인지 → 가능한 원인**을 순서대로 생각한다.

### 2. 재현 — 재현 안 되면 고칠 수 없다

재현 조건을 최소화한다. 관련 없는 비동기 처리, 상태 관리, UI를 제거하고 핵심 로직만 남긴다.

```tsx
// 복잡한 컴포넌트 대신 핵심 함수만 분리해서 테스트
const result = calculateDiscount(price, coupon);
console.log(result);
```

특정 데이터/상태에서만 발생하면 그 조건을 고정한다. 재현이 빠를수록 원인 파악도 빠르다.

### 3. 수정 — 근본 원인을 고친다

증상만 고치면 버그는 다른 형태로 다시 나타난다.

```ts
// ❌ 증상만 숨김 — 왜 undefined인지 파악하지 않음
const user = selectedUser as User; // assertion으로 에러 회피
const name = selectedUser!.name; // non-null assertion

// ✅ 근본 원인 처리
if (!selectedUser) throw new Error("selectedUser is required");
const name = selectedUser.name;
```

```ts
// ❌ 레이스 컨디션을 setTimeout으로 임시 방편
setTimeout(() => refetch(), 300);

// ✅ AbortController로 이전 요청 취소
const controller = new AbortController();
fetch(url, { signal: controller.signal });
```

**비즈니스 로직을 순수 함수로 분리**하면 독립적으로 테스트할 수 있고, 같은 버그가 재발하면 테스트로 잡을 수 있다.

### 4. 재발 방지

- 고친 조건과 같은 조건에서 다시 재현 시도해서 검증
- 엣지 케이스(빈 배열, null, 최대값 등)도 확인
- 같은 패턴의 버그가 다른 곳에 있지 않은지 탐색

---

## 주요 디버깅 도구

| 상황             | 도구                                   |
| ---------------- | -------------------------------------- |
| 컴포넌트 상태    | React DevTools                         |
| 서버 상태 / 캐싱 | React Query Devtools                   |
| 라우팅 문제      | TanStack Router Devtools               |
| 네트워크 요청    | 브라우저 Network 탭                    |
| 번들/빌드 에러   | `pnpm --filter front build`            |
| 타입 에러        | `pnpm --filter front build` (tsc 포함) |

---

## 하지 말 것

- `// @ts-ignore` 로 타입 에러 무시
- `try { } catch(e) {}` 빈 catch
- 원인 모르고 `key` 바꿔서 리렌더링 강제
- `!` (non-null assertion) 남용
- `setTimeout`으로 타이밍 문제 임시 해결
