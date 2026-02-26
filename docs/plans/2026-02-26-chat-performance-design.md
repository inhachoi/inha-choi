# 챗봇 응답속도 개선 설계

## 배경

`/chat` 페이지의 AI 챗봇(gpt-5-nano 기반)이 TTFT(Time to First Token) 기준 3초 이상 지연이 발생하고 있다. 첫 대화부터 느리며 대화 길이와 무관하게 항상 느린 패턴이다. 추가로 페르소나 정보 부족과 단답형 응답으로 인한 대화 단절감 문제도 있다.

## 문제 진단

### 성능 (최우선)

- **HTTP 커넥션 오버헤드:** OpenAI 클라이언트가 명시적 keep-alive 설정 없이 동작 중. AWS 서버 → OpenAI API 구간에서 매 요청마다 TCP+TLS 핸드셰이크가 발생할 수 있어 300-600ms 추가 지연.
- **스트리밍 버퍼 지연:** `res.write()` 후 `res.flush()` 미호출로 delta 데이터가 버퍼에 쌓인 후 전송될 수 있음.

### 품질 (보조)

- 시스템 프롬프트 정보 부족 (기술/MBTI/취미만, 학력·프로젝트·관심사 없음)
- `"답변은 1~2문장"` 하드 규칙으로 인한 단답·대화 단절감
- few-shots 3개로 대화 패턴 다양성 부족

## 설계

### 변경 범위

백엔드 2개 파일만 변경. 프론트엔드 변경 없음.

```
apps/server/src/modules/chat/
├── chat.service.js   ← HTTP keep-alive + flush
└── chat.propmt.js    ← 프롬프트 확장
```

### 1. HTTP Keep-alive 커넥션 풀 (`chat.service.js`)

```js
import https from "https";

const agent = new https.Agent({ keepAlive: true });
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  httpAgent: agent,
});
```

- 모듈 최상단에서 `https.Agent`를 싱글턴으로 생성해 커넥션 재사용
- 기존 TCP+TLS 핸드셰이크 오버헤드 제거

### 2. 스트리밍 즉시 flush (`chat.service.js`)

```js
res.write(`data: ${delta}\n\n`);
if (res.flush) res.flush();
```

- delta write 직후 `res.flush()` 호출
- 버퍼 지연 없이 클라이언트에 즉시 전달

### 3. 시스템 프롬프트 확장 (`chat.propmt.js`)

추가 정보:
- 학력: 인하대학교 컴퓨터공학과 졸업
- 프로젝트 이력: 개발자 최경일 / BooLock / 동네방네 / 냉장고를 부탁해
- 관심사: 소통을 기반으로 한 경험 개선
- `"답변은 1~2문장"` 제한 제거 → `"핵심만 자연스럽게, 대화 흐름 이어가기"` 로 완화

### 4. Few-shots 확장 (`chat.propmt.js`)

3개 → 8개로 확대. 추가 시나리오:
- 학교/전공 질문
- 프로젝트 관련 질문
- 개인적인 관심사 질문
- 대화 이어가는 패턴

## 결정 사항

- **Context Window 관리 제외:** 첫 대화부터 느리므로 context 크기가 원인이 아님. 긴 대화 사용자의 이전 대화 기억 유지를 위해 미적용.
- **프론트엔드 변경 없음:** SSE 파싱·렌더링은 정상 동작 중.

## 작업 브랜치

`refactor-52`
