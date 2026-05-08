# gyeung-il.com

pnpm 모노레포 기반 개인 풀스택 블로그.

- **FE**: `apps/front` (Vite + React + TypeScript)
- **BE**: `apps/server` (Express)
- **인프라**: AWS EC2, n8n 자동화 파이프라인

## 명령어

- 루트 설치: `pnpm install`
- FE 개발: `pnpm --filter front dev`
- BE 개발: `pnpm --filter server dev`
- FE 빌드: `pnpm --filter front build`
- 타입체크: `pnpm -r typecheck`

## 공통 규칙

- 패키지 매니저: **pnpm 전용** (npm, yarn 금지)
- 커밋은 작업 단위로 세분화
- 새 패키지 추가 시 `pnpm add` 사용

## 상세 규칙

세부 규칙은 `.claude/rules/` 디렉토리 참조.
스킬(워크플로우)은 `.claude/skills/` 디렉토리 참조.
