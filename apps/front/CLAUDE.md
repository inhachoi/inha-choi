## 아키텍처

- FSD 구조를 철저히 따를 것 (app / pages / widgets / features / entities / shared)
- 레이어 단방향 의존성: 상위 레이어는 하위 레이어만 참조 가능
- 각 슬라이스는 index.ts (Public API)를 통해서만 외부에 노출할 것
- 슬라이스 간 직접 import 금지 (같은 레이어 내 cross-import 금지)

## 작업 규칙

- 작업 후 반드시 `pnpm --filter front lint --fix` 실행할 것
- 작업 후 반드시 `pnpm --filter front build` 로 빌드 에러 확인할 것

<!-- intent-skills:start -->

## Skill Loading

Before substantial work:

- Skill check: run `npx @tanstack/intent@latest list`, or use skills already listed in context.
- Skill guidance: if one local skill clearly matches the task, run `npx @tanstack/intent@latest load <package>#<skill>` and follow the returned `SKILL.md`.
- Monorepos: when working across packages, run the skill check from the workspace root and prefer the local skill for the package being changed.
- Multiple matches: prefer the most specific local skill for the package or concern you are changing; load additional skills only when the task spans multiple packages or concerns.
<!-- intent-skills:end -->
