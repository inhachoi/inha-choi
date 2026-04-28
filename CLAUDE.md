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
- PR 생성 시 `C:\Program Files\GitHub CLI\gh.exe` 전체 경로 사용

형식:

```
## 📌 Summary

- (핵심 변경사항 bullet point)

<br/><br/>

## 📝 Details

섹션명 (`파일명`)

문제 상황 또는 배경 설명.

해결 방법 설명. 필요 시 코드 블록 포함.

```코드```

- 수정/추가 파일: `경로/파일명`

---

(섹션 반복, `---` 로 구분)

<br/>

close #이슈번호
```

Details 작성 기준:
- 섹션 헤더에 관련 파일명 명시
- 문제/배경 → 해결 순서로 서술
- 코드 스니펫은 정말 필요할 때만, 핵심 부분만 포함하고 나머지는 `...`이나 주석으로 추상화
- 섹션 간 `<br/>` 줄바꿈으로 구분

## 환경 설정

- gh CLI 경로: `C:\Program Files\GitHub CLI`
