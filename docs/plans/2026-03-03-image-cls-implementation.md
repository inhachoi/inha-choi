# 이미지 최적화 + CLS 개선 구현 계획

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** SVG 아이콘 전환 + 전 페이지 CLS 제거

**Architecture:** 세 단계로 분리 커밋. Step 1은 SVGR 도입으로 아이콘을 컴포넌트화, Step 2는 HTML width/height 속성 추가로 브라우저 공간 선점, Step 3은 Skeleton UI + fade-in으로 비동기 로딩 CLS 제거.

**Tech Stack:** Vite 7 + vite-plugin-svgr, React 19, Emotion CSS-in-JS, React Query, pnpm

---

## 사전 준비: SVG 파일 수집

구현 전에 아래 SVG 파일을 직접 준비해야 한다. 각 출처에서 다운로드하거나 복사해서 저장.

| 파일명 | 출처 |
|--------|------|
| `github.svg` | https://simpleicons.org/ 에서 "GitHub" 검색 → SVG 다운로드 |
| `react.svg` | https://simpleicons.org/ 에서 "React" 검색 → SVG 다운로드 |
| `mdn.svg` | https://simpleicons.org/ 에서 "MDN Web Docs" 검색 → SVG 다운로드 |
| `heart.svg` | 아래 내용을 직접 파일로 저장 |
| `logo.svg` | 기존 `logo.png`를 벡터로 변환하거나, PNG 유지 시 Step 1 Task 4 참고 |

`heart.svg` 직접 작성:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
</svg>
```

저장 위치: `apps/front/src/shared/assets/icons/` (Task 1에서 디렉토리 생성 후 배치)

---

## Step 1: SVG 아이콘 전환

### Task 1: vite-plugin-svgr 설치 및 Vite 설정

**Files:**
- Modify: `apps/front/vite.config.ts`
- Modify: `apps/front/src/vite-env.d.ts`

**Step 1: 패키지 설치**

```bash
cd apps/front
pnpm add -D vite-plugin-svgr
```

**Step 2: vite.config.ts 수정**

```ts
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), svgr()],

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },

  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
});
```

**Step 3: SVG 타입 선언 추가**

`apps/front/src/vite-env.d.ts` 파일을 열어 아래 내용을 추가:

```ts
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
```

> `vite-env.d.ts`에 `/// <reference types="vite/client" />`가 이미 있다면 두 번째 줄만 추가.

**Step 4: 동작 확인**

```bash
cd apps/front
pnpm dev
```

콘솔에 에러 없이 개발 서버가 뜨면 완료.

---

### Task 2: assets 디렉토리 구조 재편

**Files:**
- Create: `apps/front/src/shared/assets/icons/` (디렉토리)
- Create: `apps/front/src/shared/assets/images/` (디렉토리)
- Modify: `apps/front/src/shared/assets/index.ts`

**Step 1: 디렉토리 생성 및 파일 이동**

```bash
cd apps/front/src/shared/assets

# 디렉토리 생성
mkdir icons
mkdir images

# 래스터 이미지를 images/로 이동
mv choi.jpg images/
mv inhachoi.png images/
mv boolock.png images/
mv dongnaebangnae.jpg images/
mv refrigerator.jpg images/
mv defaultUser.png images/
mv shake.png images/
mv velog.jpg images/
```

**Step 2: SVG 파일 배치**

사전 준비에서 수집한 SVG 파일들을 `icons/`에 넣는다:
```
apps/front/src/shared/assets/icons/
  github.svg
  react.svg
  mdn.svg
  heart.svg
  logo.svg   ← logo.png를 SVG로 변환했다면 여기에, 아니면 images/에 PNG 유지
```

> logo를 SVG로 변환하지 못했다면 `logo.png`는 `images/`에 두고, index.ts에서 래스터로 export한다.

**Step 3: index.ts 전면 교체**

```ts
// SVG 아이콘 — React 컴포넌트로 export
export { default as GithubIcon } from "./icons/github.svg?react";
export { default as ReactIcon } from "./icons/react.svg?react";
export { default as MdnIcon } from "./icons/mdn.svg?react";
export { default as HeartIcon } from "./icons/heart.svg?react";
export { default as LogoIcon } from "./icons/logo.svg?react";

// 래스터 이미지 — URL string으로 export (기존 방식 유지)
export { default as choi } from "./images/choi.jpg";
export { default as inhachoi } from "./images/inhachoi.png";
export { default as boolock } from "./images/boolock.png";
export { default as dongnaebangnae } from "./images/dongnaebangnae.jpg";
export { default as refreigerator } from "./images/refrigerator.jpg";
export { default as defaultUser } from "./images/defaultUser.png";
export { default as shake } from "./images/shake.png";
export { default as velog } from "./images/velog.jpg";
```

> logo를 PNG 유지할 경우: `export { default as LogoIcon } from "./images/logo.png";` 으로 교체하고, LogoButton.tsx에서 `<img src={LogoIcon}>` 방식 그대로 사용.

**Step 4: 빌드 확인**

```bash
cd apps/front
pnpm build
```

에러 없이 빌드 완료되면 성공.

---

### Task 3: Article.tsx — heart 아이콘 교체

**Files:**
- Modify: `apps/front/src/shared/ui/Article.tsx`

**현재 코드 (Article.tsx 36번째 줄 근처):**
```tsx
import { heart } from "../assets";
// ...
<Img src={heart} alt="좋아요 마크" loading="lazy" />
```

**변경 후:**
```tsx
import { HeartIcon } from "../assets";
// ...
<HeartIcon width={15} height={15} aria-label="좋아요 마크" />
```

`Img` styled.img 컴포넌트는 heart에서만 쓰였으므로 제거한다.

**Step 1: Article.tsx 수정 후 개발 서버에서 메인 페이지 확인**

하트 아이콘이 Popular Posts 섹션에 정상 노출되는지 확인.

---

### Task 4: LogoButton.tsx — logo 교체

**Files:**
- Modify: `apps/front/src/shared/ui/LogoButton.tsx`

**logo.svg 사용 시 변경 후:**
```tsx
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import { LogoIcon } from "../assets";

export function LogoButton() {
  const navigate = useNavigate();

  return (
    <Wrapper onClick={() => navigate("/")}>
      <LogoIcon width={40} height={40} aria-label="홈페이지 로고" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;

  & svg {
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
  }

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
  }
`;
```

> logo를 PNG 유지할 경우: 기존 코드에서 import 경로만 `"../assets"`의 `logo` → `LogoIcon`으로 바꾸고 `<img src={LogoIcon}>` 유지.

**확인:** 네비게이션 바 로고 정상 노출 + 클릭 시 메인 이동.

---

### Task 5: constants.ts — github, react, mdn 아이콘 교체

**Files:**
- Modify: `apps/front/src/pages/main-page/config/constants.ts`
- Modify: `apps/front/src/pages/main-page/ui/Contribution.tsx`

**현재 constants.ts:**
```ts
import { react, mdn } from "@/shared/assets";

export const OPEN_SOURCE_CONTRIBUTION = [
  { url: "...", src: react, content: "...", date: "..." },
  { url: "...", src: mdn, content: "...", date: "..." },
  // ...
];
```

**변경 후 constants.ts:**

`src` 필드를 제거하고 `icon` 필드로 교체한다:

```ts
import { ReactIcon, MdnIcon } from "@/shared/assets";
import type { FC, SVGProps } from "react";

type IconComponent = FC<SVGProps<SVGSVGElement>>;

export const OPEN_SOURCE_CONTRIBUTION: {
  url: string;
  icon: IconComponent;
  content: string;
  date: string;
}[] = [
  {
    url: "https://github.com/reactjs/ko.react.dev/pull/1356#issuecomment-3567598733",
    icon: ReactIcon,
    content: "reactjs / ko.react.dev Effect 문서 번역",
    date: "2025.11",
  },
  {
    url: "https://github.com/reactjs/ko.react.dev/pull/1355",
    icon: ReactIcon,
    content: "reactjs / ko.react.dev 커스텀 훅 문서 번역",
    date: "2025.11",
  },
  {
    url: "ttps://github.com/mdn/translated-content/pull/28427",
    icon: MdnIcon,
    content: "mdn / translated-content 비동기 예시 코드 수정",
    date: "2025.08",
  },
];
```

**변경 후 Contribution.tsx:**

```tsx
import styled from "@emotion/styled";

import { Date, TextLink, Title } from "@/shared/ui";

import { OPEN_SOURCE_CONTRIBUTION } from "../config/constants";

export function Contribution() {
  return (
    <Container>
      <Title>Open Source Contribution</Title>

      {OPEN_SOURCE_CONTRIBUTION.map((data) => (
        <TextLink key={data.url} to={data.url}>
          <data.icon width={40} height={40} aria-hidden="true" />
          {data.content}
          <Date>{data.date}</Date>
        </TextLink>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  margin: 20px 0 100px 0;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin: 20px 0 80px 0;
  }

  @media (max-width: 480px) {
    font-size: 0.6rem;
    margin: 20px 0 60px 0;
  }
`;
```

> 기존 `Img` styled.img는 사용처가 없어지므로 삭제.

**확인:** 메인 페이지 Contribution 섹션에 React/MDN 아이콘 정상 노출.

---

### Task 6: Step 1 커밋

```bash
cd "C:\Users\USER\Desktop\coding\inha-choi"
git add apps/front/vite.config.ts
git add apps/front/src/vite-env.d.ts
git add apps/front/src/shared/assets/
git add apps/front/src/shared/ui/Article.tsx
git add apps/front/src/shared/ui/LogoButton.tsx
git add apps/front/src/pages/main-page/config/constants.ts
git add apps/front/src/pages/main-page/ui/Contribution.tsx
git commit -m "feat: SVG 아이콘 전환 및 SVGR 도입 (github, react, mdn, heart, logo)"
```

---

## Step 2: 이미지 width/height 속성 추가

### Task 7: InteractionCard — width/height 속성 추가

**Files:**
- Modify: `apps/front/src/widgets/interaction-card/ui/InteractionCard.tsx`

**현재 코드:**
```tsx
<Img src={src} alt={alt} width={width} loading="lazy" />
```

`width` prop은 이미 있지만 `height`가 없다. 프로필 사진은 정방형이므로 같은 값을 사용:

**변경 후:**
```tsx
<Img src={src} alt={alt} width={width} height={width} loading="lazy" />
```

---

### Task 8: Projects — width/height 속성 추가

**Files:**
- Modify: `apps/front/src/pages/main-page/ui/Projects.tsx`

**현재 코드:**
```tsx
<img src={data.src} alt={data.alt} loading="lazy" />
```

**변경 후:**
```tsx
<img src={data.src} alt={data.alt} width={192} height={100} loading="lazy" />
```

---

### Task 9: Step 2 커밋

```bash
cd "C:\Users\USER\Desktop\coding\inha-choi"
git add apps/front/src/widgets/interaction-card/ui/InteractionCard.tsx
git add apps/front/src/pages/main-page/ui/Projects.tsx
git commit -m "fix: 이미지 width/height 속성 추가로 CLS 개선"
```

---

## Step 3: 스켈레톤 UI + 외부 이미지 fade-in

### Task 10: Skeleton 컴포넌트 생성

**Files:**
- Create: `apps/front/src/shared/ui/Skeleton.tsx`
- Modify: `apps/front/src/shared/ui/index.ts`

**Skeleton.tsx 전체:**

```tsx
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

interface Props {
  width?: string;
  height?: string;
  borderRadius?: string;
}

export function Skeleton({ width = "100%", height = "16px", borderRadius = "4px" }: Props) {
  return <Box width={width} height={height} borderRadius={borderRadius} />;
}

const shimmer = keyframes`
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const Box = styled.div<Required<Props>>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ borderRadius }) => borderRadius};
  background: linear-gradient(
    90deg,
    var(--color-bg-hover) 25%,
    var(--color-bg-primary) 50%,
    var(--color-bg-hover) 75%
  );
  background-size: 800px 100%;
  animation: ${shimmer} 1.4s infinite linear;
`;
```

**index.ts에 추가:**

```ts
export { Skeleton } from "./Skeleton";
```

---

### Task 11: Article.tsx — 외부 썸네일 fade-in + 스켈레톤

**Files:**
- Modify: `apps/front/src/shared/ui/Article.tsx`

Article은 메인/포스트 페이지 공통이므로 여기서 한 번만 수정하면 양쪽에 모두 적용된다.

**변경 후 Article.tsx 전체:**

```tsx
import { useState } from "react";
import styled from "@emotion/styled";
import { overlay } from "overlay-kit";

import { HeartIcon } from "../assets";
import { Skeleton } from "./Skeleton";
import { Date } from "./Date";
import { IframeModal } from "./IframeModal";

interface Props {
  title: string;
  link: string;
  thumbnail: string;
  likes: number;
  released_at: string;
}

export function Article({ title, link, thumbnail, likes, released_at }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Container
      onClick={() => {
        overlay.open(({ isOpen, close }) => (
          <IframeModal url={link} isOpen={isOpen} onClose={close} />
        ));
      }}
    >
      <ThumbnailWrapper>
        {!loaded && <Skeleton width="192px" height="100%" borderRadius="0" />}
        <Thumbnail
          src={thumbnail}
          alt="썸네일 사진"
          width={192}
          height={100}
          loaded={loaded}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
        />
      </ThumbnailWrapper>

      <ContentWrapper>
        {title}
        <Date>{released_at}</Date>
      </ContentWrapper>

      <LikesWrapper>
        <HeartIcon width={15} height={15} aria-label="좋아요 마크" />
        {likes}
      </LikesWrapper>
    </Container>
  );
}

// ... (기존 Container, ThumbnailWrapper, ContentWrapper, LikesWrapper styled 컴포넌트 유지)

const Thumbnail = styled.img<{ loaded: boolean }>`
  position: ${({ loaded }) => (loaded ? "static" : "absolute")};
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
  transition: opacity 0.3s ease;
  width: 192px;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease, opacity 0.3s ease;

  @media (max-width: 768px) {
    width: 130px;
  }

  @media (max-width: 480px) {
    width: 90px;
  }
`;
```

`ThumbnailWrapper`에 `position: relative`를 추가해 스켈레톤과 이미지가 같은 공간을 차지하도록 한다:

```tsx
const ThumbnailWrapper = styled.div`
  position: relative;
  object-fit: cover;
  overflow: hidden;
  flex-shrink: 0;
  width: 192px;
  height: 100%;

  @media (max-width: 768px) {
    width: 130px;
  }

  @media (max-width: 480px) {
    width: 90px;
  }
`;
```

> Task 3에서 이미 `heart` → `HeartIcon`으로 교체했으므로 중복 작업 없음.

**확인:** 메인 페이지 Popular Posts, Posts 페이지에서 썸네일이 스켈레톤 → 이미지로 부드럽게 전환되는지 확인.

---

### Task 12: PopularPosts — 로딩 스켈레톤

**Files:**
- Modify: `apps/front/src/pages/main-page/model/usePopularPosts.ts`
- Modify: `apps/front/src/pages/main-page/ui/PopularPosts.tsx`

**usePopularPosts.ts — isLoading 노출:**

```ts
import { sortPostsByLikes } from "@/shared/lib";
import { usePosts } from "@/shared/model";

export const usePopularPosts = () => {
  const { posts, isLoading } = usePosts();
  const popularPosts = sortPostsByLikes(posts).slice(0, 3);

  return { popularPosts, isLoading };
};
```

**PopularPosts.tsx — 스켈레톤 적용:**

```tsx
import styled from "@emotion/styled";

import { formatYearMonth } from "@/shared/lib";
import { Article, Skeleton, Title } from "@/shared/ui";

import { usePopularPosts } from "../model";

export function PopularPosts() {
  const { popularPosts, isLoading } = usePopularPosts();

  return (
    <Container>
      <Title>Popular Posts</Title>

      {isLoading
        ? Array.from({ length: 3 }).map((_, i) => (
            <ArticleSkeleton key={i}>
              <Skeleton width="192px" height="100%" borderRadius="0" />
              <ContentSkeleton>
                <Skeleton width="70%" height="16px" />
                <Skeleton width="40%" height="12px" />
              </ContentSkeleton>
              <Skeleton width="60px" height="16px" />
            </ArticleSkeleton>
          ))
        : popularPosts.map((post) => (
            <Article
              key={post.link}
              title={post.title}
              link={post.link}
              thumbnail={post.thumbnail}
              likes={post.likes}
              released_at={formatYearMonth(post.released_at)}
            />
          ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 480px) {
    gap: 6px;
  }
`;

const ArticleSkeleton = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  background: var(--color-bg-primary);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px var(--color-card-shadow);

  @media (max-width: 768px) {
    height: 68px;
  }

  @media (max-width: 480px) {
    height: 47px;
  }
`;

const ContentSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 8px;
  padding: 0 10px;
`;
```

---

### Task 13: InteractionCard — 프로필 사진 스켈레톤

**Files:**
- Modify: `apps/front/src/widgets/interaction-card/ui/InteractionCard.tsx`

**변경 후:**

```tsx
import { useState } from "react";
import styled from "@emotion/styled";
import { colors } from "@toss/tds-colors";

import { Skeleton } from "@/shared/ui";

import { useMouseMove } from "../model/useMouseMove";

interface Props {
  src: string;
  alt: string;
  width: number;
}

export function InteractionCard({ src, alt, width }: Props) {
  const { containerRef, overlayRef } = useMouseMove();
  const [loaded, setLoaded] = useState(false);

  return (
    <Container ref={containerRef}>
      {!loaded && (
        <Skeleton
          width={`${width}px`}
          height={`${width}px`}
          borderRadius="100%"
        />
      )}
      <Overlay ref={overlayRef} style={{ display: loaded ? "block" : "none" }} />
      <Img
        src={src}
        alt={alt}
        width={width}
        height={width}
        loading="lazy"
        loaded={loaded}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </Container>
  );
}

const Container = styled.div`
  display: inline-block;
  position: relative;
  transition: transform 0.25s ease-out;
  will-change: transform;
`;

const Img = styled.img<{ loaded: boolean }>`
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
  position: ${({ loaded }) => (loaded ? "static" : "absolute")};
  transition: opacity 0.3s ease;
  border-radius: 100%;
  box-shadow: 2px 10px 20px ${colors.grey400};

  @media (max-width: 768px) {
    width: 200px;
  }
  @media (max-width: 580px) {
    width: 175px;
  }
  @media (max-width: 480px) {
    width: 150px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    110deg,
    transparent 35%,
    rgba(255, 255, 255, 0.6) 45%,
    rgba(255, 255, 255, 0.6) 45%,
    transparent 50%
  );
  filter: brightness(1.1) opacity(0.8);
  mix-blend-mode: color-dodge;
  background-size: 150% 150%;
  background-position: 100%;
  transition: background-position 0.15s ease-out;
  border-radius: 100%;
`;
```

---

### Task 14: Guestbook — 댓글 로딩 스켈레톤 + 아바타 fade-in

**Files:**
- Modify: `apps/front/src/pages/guestbook-page/model/useGithubLogin.ts`
- Modify: `apps/front/src/pages/guestbook-page/ui/CommentsList.tsx`
- Modify: `apps/front/src/pages/guestbook-page/ui/GuestbookPage.tsx`

**useGithubLogin.ts — isLoading 추가:**

```ts
import { useEffect, useState } from "react";
import { type FormEvent } from "react";

import { getComments, getMe, submitComment } from "../api";

import type { CommentDTO, UserDTO } from "./types.ts";

export const useGithubLogin = () => {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [comments, setComments] = useState<CommentDTO[]>([]);
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getMe().then(setUser),
      getComments().then(setComments),
    ]).finally(() => setIsLoading(false));
  }, []);

  const handleLogin = () => {
    window.location.href = "/api/auth/github/login";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    try {
      const newComment = await submitComment(content);
      setComments((prev) => [newComment, ...prev]);
      setContent("");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    user,
    content,
    setContent,
    comments,
    submitting,
    isLoading,
    handleLogin,
    handleSubmit,
  };
};
```

**CommentsList.tsx — 아바타 fade-in 추가:**

```tsx
import { useState } from "react";
import styled from "@emotion/styled";

import { formatYearMonthDay } from "@/shared/lib";
import { Skeleton } from "@/shared/ui";

import type { CommentDTO } from "../model";

export function CommentsList({ comments }: { comments: CommentDTO[] }) {
  return (
    <>
      <ListHeader>
        {comments.length}개의 방명록
        <hr />
      </ListHeader>

      {comments.map((comment) => (
        <CommentItem key={comment.id}>
          <AvatarWrapper>
            <AvatarImage src={comment.user.avatarUrl} />
          </AvatarWrapper>
          <ItemBody>
            <Meta>
              {comment.user.login} 님의 방명록 -{" "}
              {formatYearMonthDay(comment.createdAt)}
            </Meta>
            <Content>{comment.content}</Content>
          </ItemBody>
        </CommentItem>
      ))}
    </>
  );
}

function AvatarImage({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Skeleton width="75px" height="75px" borderRadius="10px" />}
      <Avatar
        src={src}
        alt="프로필 사진"
        width={75}
        height={75}
        loading="lazy"
        loaded={loaded}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </>
  );
}

// ... (기존 styled 컴포넌트 유지)

const AvatarWrapper = styled.div`
  position: relative;
  width: 75px;
  height: 75px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }

  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
  }
`;

const Avatar = styled.img<{ loaded: boolean }>`
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
  position: ${({ loaded }) => (loaded ? "static" : "absolute")};
  transition: opacity 0.3s ease;
  width: 75px;
  height: 75px;
  border-radius: 10px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }

  @media (max-width: 480px) {
    width: 45px;
    height: 45px;
  }
`;
```

**GuestbookPage.tsx — 댓글 로딩 스켈레톤:**

```tsx
import styled from "@emotion/styled";

import { Header, Skeleton } from "@/shared/ui";

import { useGithubLogin } from "../model";

import { CommentsList } from "./CommentsList";
import { CommentWriter } from "./CommentWriter";

export default function GuestbookPage() {
  const {
    comments,
    user,
    content,
    setContent,
    submitting,
    isLoading,
    handleLogin,
    handleSubmit,
  } = useGithubLogin();

  return (
    <Container>
      <Header>
        👋👋👋
        <br />
        반가워요! <br />
        자유롭게 방명록 남겨주세요 :)
      </Header>
      <CommentWriter
        user={user!}
        content={content}
        setContent={setContent}
        submitting={submitting}
        handleLogin={handleLogin}
        handleSubmit={handleSubmit}
      />
      {isLoading ? (
        <SkeletonList>
          {Array.from({ length: 3 }).map((_, i) => (
            <CommentSkeleton key={i}>
              <Skeleton width="75px" height="75px" borderRadius="10px" />
              <Skeleton width="100%" height="80px" borderRadius="10px" />
            </CommentSkeleton>
          ))}
        </SkeletonList>
      ) : (
        <CommentsList comments={comments} />
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 50px 0;

  @media (max-width: 768px) {
    margin: 35px 0;
  }

  @media (max-width: 480px) {
    margin: 20px 0;
  }
`;

const SkeletonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 10px;
  margin-top: 20px;
`;

const CommentSkeleton = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
`;
```

---

### Task 15: Projects — 썸네일 스켈레톤

**Files:**
- Modify: `apps/front/src/pages/main-page/ui/Projects.tsx`

Projects의 썸네일은 정적 import 이미지라 로딩이 매우 빠르지만, 처음 진입 시 짧게 레이아웃 시프트가 발생할 수 있다. Task 8에서 `width`/`height` 속성을 이미 추가했으므로, 여기서는 추가로 fade-in만 적용한다.

**변경 후 Project.tsx (`shared/ui/Project.tsx`):**

`thumbnail`은 `ReactNode`를 받는 구조라 이미 외부에서 `<img>`를 감싸서 전달하는 방식이다. Projects.tsx에서 스켈레톤이 포함된 thumbnail 컴포넌트를 전달하도록 수정한다.

```tsx
// pages/main-page/ui/Projects.tsx
import { useState } from "react";
import styled from "@emotion/styled";

import { Project, Skeleton, Title } from "@/shared/ui";

import { PROJECTS } from "../config";

function ProjectThumbnail({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <ThumbnailContainer>
      {!loaded && <Skeleton width="100%" height="100%" borderRadius="0" />}
      <ThumbnailImg
        src={src}
        alt={alt}
        width={192}
        height={100}
        loading="lazy"
        loaded={loaded}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </ThumbnailContainer>
  );
}

export function Projects() {
  return (
    <Container>
      <Title>Projects</Title>

      {PROJECTS.map((data) => (
        <Project
          key={data.url}
          thumbnail={<ProjectThumbnail src={data.src} alt={data.alt} />}
          title={data.title}
          description={data.description}
          period={data.period}
          url={data.url}
        />
      ))}
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  margin: 20px 0px;

  @media (max-width: 768px) {
    gap: 17.5px;
  }

  @media (max-width: 480px) {
    gap: 15px;
  }
`;

const ThumbnailContainer = styled.div`
  position: relative;
  width: 192px;
  height: 100px;
  overflow: hidden;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 130px;
    height: 80px;
  }

  @media (max-width: 480px) {
    width: 90px;
    height: 60px;
  }
`;

const ThumbnailImg = styled.img<{ loaded: boolean }>`
  position: ${({ loaded }) => (loaded ? "static" : "absolute")};
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
  transition: opacity 0.3s ease, transform 0.3s ease;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
```

---

### Task 16: Step 3 커밋

```bash
cd "C:\Users\USER\Desktop\coding\inha-choi"
git add apps/front/src/shared/ui/Skeleton.tsx
git add apps/front/src/shared/ui/index.ts
git add apps/front/src/shared/ui/Article.tsx
git add apps/front/src/pages/main-page/model/usePopularPosts.ts
git add apps/front/src/pages/main-page/ui/PopularPosts.tsx
git add apps/front/src/pages/main-page/ui/Projects.tsx
git add apps/front/src/widgets/interaction-card/ui/InteractionCard.tsx
git add apps/front/src/pages/guestbook-page/model/useGithubLogin.ts
git add apps/front/src/pages/guestbook-page/ui/CommentsList.tsx
git add apps/front/src/pages/guestbook-page/ui/GuestbookPage.tsx
git commit -m "feat: 스켈레톤 UI 도입 및 전 페이지 CLS 개선"
```

---

## 최종 확인 체크리스트

- [ ] 메인 페이지: Popular Posts 로딩 중 스켈레톤 3개 → 데이터 후 카드로 전환
- [ ] 메인 페이지: 프로필 사진 원형 스켈레톤 → fade-in
- [ ] 메인 페이지: Projects 썸네일 스켈레톤 → fade-in
- [ ] 메인 페이지: Contribution 섹션 React/MDN SVG 아이콘 정상 노출
- [ ] Posts 페이지: 각 아티클 썸네일 스켈레톤 → fade-in
- [ ] Guestbook 페이지: 댓글 로딩 중 스켈레톤 3개 → 댓글 목록으로 전환
- [ ] Guestbook 페이지: 각 댓글 아바타 스켈레톤 → fade-in
- [ ] 네비게이션 바: 로고 정상 노출 + 클릭 시 메인 이동
- [ ] 다크모드 전환 시 스켈레톤 색상도 자동 전환 (CSS 변수 사용 확인)
- [ ] `pnpm build` 에러 없이 완료
