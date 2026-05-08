---
name: good-bundling
description: Use when modifying build config, vite.config, adding new packages, setting up code splitting, or working with module resolution and imports
---

# Good Bundling

번들링은 여러 파일을 하나로 합치는 과정이다. **번들 크기를 줄이고 로딩 속도를 높이는 것**이 목표.

---

## 번들링 동작 원리

1. Entry point부터 `import`/`require`를 따라가며 모든 모듈 탐색
2. 의존성 그래프(Dependency Graph) 생성
3. 파일들을 병합하여 번들 파일 생성
4. 최적화 적용: Tree Shaking, Code Splitting, Minification

---

## 핵심 최적화

### Tree Shaking — 사용하지 않는 코드 제거

번들러가 실제 사용되는 export만 포함하도록 불필요한 코드를 제거한다.

```ts
// ❌ 전체 라이브러리 import → lodash 전체가 번들에 포함
import _ from "lodash";

// ✅ named import → 사용하는 함수만 포함
import { debounce } from "lodash-es"; // es 버전이 tree-shaking 가능
```

Tree Shaking이 잘 안 되는 경우:

- CommonJS(`require`)로 작성된 라이브러리
- `index.ts` barrel export 남용 (불필요한 모듈까지 참조됨)
- side effect가 있는 모듈 (`"sideEffects": false` 설정 확인)

### Code Splitting — 필요할 때만 로드

라우트 단위로 lazy import를 적용하면 초기 번들 크기를 줄일 수 있다.

```tsx
// 라우트별 lazy import
const LoginPage = lazy(() => import("./LoginPage"));
const DashboardPage = lazy(() => import("./DashboardPage"));

// 큰 라이브러리는 동적 import
const { default: Chart } = await import("chart.js");
```

---

## 패키지 추가 시 체크리스트

- [ ] 번들 크기 확인 → [bundlephobia.com](https://bundlephobia.com)
- [ ] Tree-shakable한 패키지인가? (ESM 지원 여부)
- [ ] 더 가벼운 대안이 있나?
- [ ] 이미 설치된 패키지로 해결되지 않나?

---

## Import 규칙

```ts
// ❌ 전체 import
import _ from "lodash";
import * as R from "ramda";

// ✅ named import
import { debounce } from "lodash-es";
import { map } from "ramda";
```

barrel export(`index.ts`)는 DX를 높이지만 tree-shaking을 방해할 수 있다. 내부 모듈에서 서로 참조할 때는 직접 경로 import를 고려한다.

---

## 빌드 확인

```bash
# 빌드 + 타입 체크 (tsc -b 포함)
pnpm --filter front build

# 번들 분석 (vite-bundle-visualizer 등)
pnpm --filter front build --mode analyze
```
