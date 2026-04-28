## 프로젝트 구조

- 패키지 매니저: pnpm workspaces
- FE: apps/front (Vite + React + TypeScript)
- BE: apps/server (Express)
- 모노레포 구조: pnpm workspaces

## 명령어

- 루트 설치: `pnpm install`
- FE 개발: `pnpm --filter front dev`
- BE 개발: `pnpm --filter server dev`

## 공통 규칙

- 커밋은 작업 단위로 세분화할 것
- 새 패키지 추가 시 반드시 `pnpm add` 사용할 것 (npm, yarn 금지)
