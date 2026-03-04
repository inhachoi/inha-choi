# 이미지 최적화 + CLS 개선 설계 문서

**날짜:** 2026-03-03
**브랜치:** refactor-36
**상태:** 승인됨

---

## 개요

전 페이지에 걸쳐 발생하는 이미지 로딩 레이아웃 시프트(CLS)를 개선하고, 아이콘성 이미지를 SVG 컴포넌트로 전환한다. 작업은 세 단계로 나눠 각각 커밋한다.

---

## 접근 방향

**단계별 분리 (접근법 A)**

1. Step 1 — SVG 아이콘 전환 (github, react, mdn, heart, logo → SVG + SVGR)
2. Step 2 — 이미지 `width`/`height` 속성 추가 (Projects, Contribution, InteractionCard)
3. Step 3 — 스켈레톤 UI + 외부 이미지 fade-in (전 페이지)

각 단계가 독립적이므로 커밋 단위로 리뷰/롤백 가능하다.

---

## Step 1 — SVG 아이콘 전환

### 디렉토리 구조 변경

```
shared/assets/
  icons/              ← 신규: SVG 아이콘 전용
    github.svg
    react.svg
    mdn.svg
    heart.svg
    logo.svg
  images/             ← 기존 래스터 파일 이동
    choi.jpg
    inhachoi.png
    boolock.png
    dongnaebangnae.jpg
    refrigerator.jpg
    defaultUser.png
    shake.png
    velog.jpg
  index.ts            ← SVG는 컴포넌트, 래스터는 기존 방식으로 export
```

### Vite 설정

```ts
// apps/front/vite.config.ts
import svgr from "vite-plugin-svgr";

plugins: [react(), svgr()]
```

`vite-plugin-svgr` 설치 필요:
```
pnpm add -D vite-plugin-svgr
```

### TypeScript 타입 선언

```ts
// apps/front/src/vite-env.d.ts 또는 별도 svg.d.ts
declare module "*.svg?react" {
  import type { FC, SVGProps } from "react";
  const ReactComponent: FC<SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
```

### export 방식

```ts
// shared/assets/index.ts
// SVG 아이콘 — 컴포넌트로 export
export { default as GithubIcon } from "./icons/github.svg?react";
export { default as ReactIcon } from "./icons/react.svg?react";
export { default as MdnIcon } from "./icons/mdn.svg?react";
export { default as HeartIcon } from "./icons/heart.svg?react";
export { default as LogoIcon } from "./icons/logo.svg?react";

// 래스터 이미지 — 기존 방식 유지
export { default as choi } from "./images/choi.jpg";
export { default as inhachoi } from "./images/inhachoi.png";
// ... 나머지 래스터 동일
```

### 사용 방식 변경

```tsx
// Before
import { github } from "@/shared/assets";
<img src={github} alt="GitHub" />

// After
import { GithubIcon } from "@/shared/assets";
<GithubIcon width={24} height={24} aria-label="GitHub" />
```

### 변경 대상 사용처

| 아이콘 | 기존 파일 | 변경 위치 |
|--------|-----------|-----------|
| heart | Article.tsx | `shared/ui/Article.tsx` |
| logo | LogoButton.tsx | `shared/ui/LogoButton.tsx` |
| github | constants.ts | `pages/main-page/config/constants.ts` |
| react | constants.ts | `pages/main-page/config/constants.ts` |
| mdn | constants.ts | `pages/main-page/config/constants.ts` |

> `LogoButton.tsx`의 경우 `<img>` → `<LogoIcon>` 교체 후 onClick 핸들러는 wrapper `div`로 이동

---

## Step 2 — 이미지 `width`/`height` 속성 추가

CSS에 크기가 있어도 HTML 속성이 없으면 브라우저가 aspect-ratio를 모르기 때문에 이미지 로드 전 공간을 확보하지 못한다. 속성 값은 기존 CSS의 기본 크기(768px 이상 기준)를 따른다.

| 위치 | 파일 | 추가 속성 |
|------|------|-----------|
| InteractionCard 프로필 | `widgets/interaction-card/ui/InteractionCard.tsx` | `width={250} height={250}` |
| Projects 썸네일 | `pages/main-page/ui/Projects.tsx` | `width={192} height={100}` |
| Contribution 아이콘 | `pages/main-page/ui/Contribution.tsx` | `width={40} height={40}` |

> Step 1에서 SVG로 전환되는 heart, logo는 SVG props로 처리하므로 별도 작업 불필요

---

## Step 3 — 스켈레톤 UI + 외부 이미지 fade-in

### 기본 컴포넌트

```
shared/ui/
  Skeleton.tsx    ← shimmer 애니메이션 범용 스켈레톤
```

```tsx
// 사용 예시
<Skeleton width="192px" height="100px" borderRadius="4px" />
<Skeleton width="100%" height="20px" />
<Skeleton width="250px" height="250px" borderRadius="100%" />  // 원형
```

shimmer는 Emotion `keyframes`으로 구현, `--color-bg-hover` / `--color-bg-primary` CSS 변수를 활용해 다크모드 자동 대응.

### 적용 섹션별 상세

**① 메인 — PopularPosts**

- `usePopularPosts` isLoading 상태에서 `Article` 크기와 동일한 스켈레톤 카드 3개 표시
- 데이터 로드 완료 후 실제 리스트로 교체

**② 메인 — Projects 썸네일**

- `<img>`의 `onLoad` 이전에 썸네일 영역에 스켈레톤 표시
- 로드 완료 후 fade-in으로 실제 이미지 노출

**③ 메인 — Introduce 프로필 사진 (InteractionCard)**

- `choi.jpg`의 `onLoad` 이전에 원형 스켈레톤(`borderRadius: 100%`) 표시
- 로드 완료 후 fade-in

**④ Posts / 메인 공통 — Article 썸네일 (외부 velog 이미지)**

- `Article.tsx`에 `onLoad`/`onError` 핸들러 추가
- 로드 전: 썸네일 영역에 스켈레톤
- 로드 완료: fade-in transition으로 실제 이미지 노출
- `Article`은 메인(PopularPosts)과 Posts 페이지 공통 컴포넌트이므로 한 번 수정으로 양쪽 모두 적용

**⑤ Guestbook — 댓글 목록 + 아바타**

- `useGithubLogin` 로딩 상태에서 댓글 아이템 스켈레톤 3개 표시
- 각 댓글의 GitHub 아바타 이미지도 `onLoad` 전까지 스켈레톤

### FSD 레이어 규칙

- `Skeleton.tsx` → `shared/ui/` (하위 레이어에서 공통 사용)
- 각 섹션별 스켈레톤 레이아웃 조합은 해당 컴포넌트 내부에서 처리 (별도 파일 생성 없음)

---

## 변경 파일 요약

### Step 1
- `apps/front/vite.config.ts`
- `apps/front/src/vite-env.d.ts` (또는 `svg.d.ts`)
- `apps/front/src/shared/assets/` (구조 재편 + index.ts 수정)
- `apps/front/src/shared/ui/LogoButton.tsx`
- `apps/front/src/shared/ui/Article.tsx` (heart 아이콘)
- `apps/front/src/pages/main-page/config/constants.ts` (github, react, mdn)

### Step 2
- `apps/front/src/widgets/interaction-card/ui/InteractionCard.tsx`
- `apps/front/src/pages/main-page/ui/Projects.tsx`
- `apps/front/src/pages/main-page/ui/Contribution.tsx`

### Step 3
- `apps/front/src/shared/ui/Skeleton.tsx` (신규)
- `apps/front/src/shared/ui/Article.tsx` (onLoad/onError + fade-in)
- `apps/front/src/shared/ui/index.ts` (Skeleton export 추가)
- `apps/front/src/pages/main-page/ui/PopularPosts.tsx`
- `apps/front/src/pages/main-page/ui/Projects.tsx`
- `apps/front/src/widgets/interaction-card/ui/InteractionCard.tsx`
- `apps/front/src/pages/guestbook-page/ui/CommentsList.tsx`
- `apps/front/src/pages/guestbook-page/ui/GuestbookPage.tsx`

---

## 미적용 페이지

- `/chat` — 레이아웃 고정 높이(`calc(90vh - 140px)`)이므로 CLS 미발생. 변경 없음.
