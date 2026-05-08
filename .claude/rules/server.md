---
paths:
  - "apps/server/**/*.ts"
  - "apps/server/**/*.js"
---

# Server 레이어 규칙

이 규칙은 `apps/server/` 작업 시에만 로드된다.

## 기술 스택

- 런타임: Node.js
- 프레임워크: Express
- 환경변수: `apps/server/.env`, `.env.local` (절대 커밋 금지)

## 환경변수 보안

- `.env`, `.env.local`, `.env.production` 파일은 **절대 읽지 말 것**
- 환경변수 추가가 필요하면 `.env.example` 만 수정하고 사용자에게 알릴 것
- API 키, 토큰, DB 비밀번호는 코드에 하드코딩 금지

## API 설계

- 응답 형식 일관성 유지
- 에러 핸들링은 Express 미들웨어 사용
- Sentry 연동 시 민감 정보(요청 body, 헤더의 토큰) 마스킹 필수

## 작업 규칙

- 새 라우트 추가 시 OpenAPI 스펙도 같이 업데이트 (있다면)
- 작업 후 반드시 `pnpm --filter server typecheck`
