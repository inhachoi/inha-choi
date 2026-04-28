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

## PR 생성 규칙

"PR 올려줘" 요청 시 아래를 따를 것:

- 언어: 반드시 한글
- git log로 커밋 히스토리 확인 후 내용 자동 작성
- `.github/PULL_REQUEST_TEMPLATE.md` 형식 준수:

```
## 📌 Summary

- (작업 내용 bullet point)

<br/>

## 📝 Details
<!-- 상세 설명 -->

<br/>

close #이슈번호 (해당되는 경우)
```

## 환경 설정

- gh CLI 경로: `C:\Program Files\GitHub CLI`
