# Modal Routing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 포스트 클릭 시 URL이 변경되는 중첩 라우트 기반 iframe 모달을 구현한다.

**Architecture:** `indexRoute`의 자식으로 `$slug` 라우트, `postsRoute`의 자식으로 `$slug` 라우트를 추가한다. 부모 페이지에 `<Outlet />`을 추가해 모달이 페이지 위에 렌더링된다. `Article` 컴포넌트는 `overlay-kit` 대신 TanStack Router `Link`를 사용해 slug 기반 라우트로 이동한다.

**Tech Stack:** TanStack Router (`@tanstack/react-router`), `@emotion/styled`, React

---

## File Map

| 파일 | 변경 유형 | 역할 |
|---|---|---|
| `apps/front/src/app/router.tsx` | Modify | 중첩 모달 라우트 추가 |
| `apps/front/src/pages/main-page/ui/MainPage.tsx` | Modify | `<Outlet />` 추가 |
| `apps/front/src/pages/main-page/ui/PostModal.tsx` | Create | 메인 페이지 모달 라우트 컴포넌트 |
| `apps/front/src/pages/posts-page/ui/PostsPage.tsx` | Modify | `<Outlet />` 추가 |
| `apps/front/src/pages/posts-page/ui/PostModal.tsx` | Create | posts 페이지 모달 라우트 컴포넌트 |
| `apps/front/src/shared/lib/linkToSlug.ts` | Create | velog link → slug 변환 헬퍼 |
| `apps/front/src/shared/lib/index.ts` | Modify | `linkToSlug` export 추가 |
| `apps/front/src/shared/ui/Article.tsx` | Modify | `overlay.open()` 제거, `Link` 기반 네비게이션으로 교체 |

---

### Task 1: router.tsx에 중첩 모달 라우트 추가

**Files:**
- Modify: `apps/front/src/app/router.tsx`

- [ ] **Step 1: 모달 라우트 정의 및 라우트 트리 연결**

`apps/front/src/app/router.tsx`를 아래와 같이 교체한다.

```tsx
import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router";

import { RootLayout } from "@/app/layouts/RootLayout";

const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: lazyRouteComponent(() => import("@/pages/main-page")),
});

const indexPostModalRoute = createRoute({
  getParentRoute: () => indexRoute,
  path: "$slug",
  component: lazyRouteComponent(
    () => import("@/pages/main-page/ui/PostModal"),
  ),
});

const postsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/posts",
  component: lazyRouteComponent(() => import("@/pages/posts-page")),
});

const postsPostModalRoute = createRoute({
  getParentRoute: () => postsRoute,
  path: "$slug",
  component: lazyRouteComponent(
    () => import("@/pages/posts-page/ui/PostModal"),
  ),
});

const guestbookRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/guestbook",
  component: lazyRouteComponent(() => import("@/pages/guestbook-page")),
});

const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chat",
  component: lazyRouteComponent(() => import("@/pages/chat-page")),
});

const gamesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/games",
});

const gamesIndexRoute = createRoute({
  getParentRoute: () => gamesRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/games/$gameId", params: { gameId: "memory" } });
  },
});

const gamesGameIdRoute = createRoute({
  getParentRoute: () => gamesRoute,
  path: "$gameId",
  component: lazyRouteComponent(() => import("@/pages/games-page")),
});

const splatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "$",
  component: lazyRouteComponent(() => import("@/pages/not-found-page")),
});

const routeTree = rootRoute.addChildren([
  indexRoute.addChildren([indexPostModalRoute]),
  postsRoute.addChildren([postsPostModalRoute]),
  guestbookRoute,
  chatRoute,
  gamesRoute.addChildren([gamesIndexRoute, gamesGameIdRoute]),
  splatRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Register {
    router: typeof router;
  }
}
```

- [ ] **Step 2: 커밋**

```bash
git add apps/front/src/app/router.tsx
git commit -m "feat: 포스트 모달 중첩 라우트 추가"
```

---

### Task 2: MainPage에 Outlet 추가

**Files:**
- Modify: `apps/front/src/pages/main-page/ui/MainPage.tsx`

- [ ] **Step 1: `<Outlet />` 추가**

`apps/front/src/pages/main-page/ui/MainPage.tsx`를 아래와 같이 수정한다.

```tsx
import styled from "@emotion/styled";
import { Outlet } from "@tanstack/react-router";

import { Contribution } from "./Contribution";
import { Introduce } from "./Introduce";
import { PopularPosts } from "./PopularPosts";
import { Projects } from "./Projects";

export default function MainPage() {
  return (
    <Container>
      <Introduce />
      <Content>
        <Projects />
        <PopularPosts />
        <Contribution />
      </Content>
      <Outlet />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 768px;
  padding: 0 15px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    gap: 45px;
  }

  @media (max-width: 480px) {
    gap: 20px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 768px;
  gap: 70px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    gap: 45px;
  }

  @media (max-width: 480px) {
    gap: 20px;
  }
`;
```

- [ ] **Step 2: 커밋**

```bash
git add apps/front/src/pages/main-page/ui/MainPage.tsx
git commit -m "feat: MainPage에 모달 Outlet 추가"
```

---

### Task 3: 메인 페이지용 PostModal 컴포넌트 생성

**Files:**
- Create: `apps/front/src/pages/main-page/ui/PostModal.tsx`

`$slug`로 `usePosts()`에서 포스트를 찾아 `IframeModal`을 렌더링한다. 닫기 시 `indexRoute` (`/`)로 이동한다.

- [ ] **Step 1: `PostModal.tsx` 생성**

```tsx
import { useNavigate, useParams } from "@tanstack/react-router";

import { linkToSlug } from "@/shared/lib";
import { usePosts } from "@/shared/model";
import { IframeModal } from "@/shared/ui";

export default function PostModal() {
  const { slug } = useParams({ strict: false });
  const navigate = useNavigate();
  const { posts } = usePosts();

  const post = posts.find((p) => linkToSlug(p.link) === slug);

  const handleClose = () => {
    navigate({ to: "/" });
  };

  if (!post) return null;

  return <IframeModal url={post.link} isOpen={true} onClose={handleClose} />;
}
```

- [ ] **Step 2: 커밋**

```bash
git add apps/front/src/pages/main-page/ui/PostModal.tsx
git commit -m "feat: 메인 페이지 포스트 모달 라우트 컴포넌트 추가"
```

---

### Task 4: PostsPage에 Outlet 추가

**Files:**
- Modify: `apps/front/src/pages/posts-page/ui/PostsPage.tsx`

- [ ] **Step 1: `<Outlet />` 추가**

`apps/front/src/pages/posts-page/ui/PostsPage.tsx`를 아래와 같이 수정한다.

```tsx
import styled from "@emotion/styled";
import { Outlet } from "@tanstack/react-router";

import { PostsList } from "./PostsList";

export default function PostsPage() {
  return (
    <Container>
      <Header>All</Header>
      <PostsLayout>
        <PostsCount>26 posts</PostsCount>
        <PostsList />
      </PostsLayout>
      <Outlet />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 768px;
  padding: 50px 15px;

  @media (max-width: 768px) {
    padding: 35px 15px;
  }

  @media (max-width: 480px) {
    padding: 20px 15px;
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 2rem;
  color: var(--color-text-primary);

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const PostsLayout = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin: 20px 0 0 0;

  @media (max-width: 768px) {
    gap: 15px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const PostsCount = styled.h2`
  color: var(--color-text-secondary);
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;
```

- [ ] **Step 2: 커밋**

```bash
git add apps/front/src/pages/posts-page/ui/PostsPage.tsx
git commit -m "feat: PostsPage에 모달 Outlet 추가"
```

---

### Task 5: posts 페이지용 PostModal 컴포넌트 생성

**Files:**
- Create: `apps/front/src/pages/posts-page/ui/PostModal.tsx`

닫기 시 `/posts`로 이동하는 것 외에는 Task 3과 동일한 구조.

- [ ] **Step 1: `PostModal.tsx` 생성**

```tsx
import { useNavigate, useParams } from "@tanstack/react-router";

import { linkToSlug } from "@/shared/lib";
import { usePosts } from "@/shared/model";
import { IframeModal } from "@/shared/ui";

export default function PostModal() {
  const { slug } = useParams({ strict: false });
  const navigate = useNavigate();
  const { posts } = usePosts();

  const post = posts.find((p) => linkToSlug(p.link) === slug);

  const handleClose = () => {
    navigate({ to: "/posts" });
  };

  if (!post) return null;

  return <IframeModal url={post.link} isOpen={true} onClose={handleClose} />;
}
```

- [ ] **Step 2: 커밋**

```bash
git add apps/front/src/pages/posts-page/ui/PostModal.tsx
git commit -m "feat: posts 페이지 포스트 모달 라우트 컴포넌트 추가"
```

---

### Task 6: linkToSlug 헬퍼 생성 및 Article 컴포넌트 교체

**Files:**
- Create: `apps/front/src/shared/lib/linkToSlug.ts`
- Modify: `apps/front/src/shared/lib/index.ts`
- Modify: `apps/front/src/shared/ui/Article.tsx`

`overlay.open()` 제거, Container를 `styled(Link)`로 교체한다. `to`와 `params`를 props로 받아 각 호출부에서 라우트를 지정하게 한다.

- [ ] **Step 1: `linkToSlug.ts` 생성**

`apps/front/src/shared/lib/linkToSlug.ts`:

```ts
export const linkToSlug = (link: string): string =>
  link.split("/").at(-1) ?? "";
```

- [ ] **Step 2: `shared/lib/index.ts`에 export 추가**

```ts
export { formatYearMonth } from "./formatYearMonth";
export { formatYearMonthDay } from "./formatYearMonthDay";
export { linkToSlug } from "./linkToSlug";
export { sortPostsByLikes } from "./sortPostsByLikes";
```

- [ ] **Step 3: Article.tsx 수정**

```tsx
import { useState } from "react";
import styled from "@emotion/styled";
import { Link } from "@tanstack/react-router";

import { HeartIcon } from "../assets";

import { Date } from "./Date";
import { Skeleton } from "./Skeleton";

interface Props {
  title: string;
  link: string;
  thumbnail: string;
  likes: number;
  released_at: string;
  to: string;
  params: Record<string, string>;
}

export function Article({
  title,
  link,
  thumbnail,
  likes,
  released_at,
  to,
  params,
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Container to={to} params={params}>
      <ThumbnailWrapper>
        {!loaded && <Skeleton width="100%" height="100%" borderRadius="0" />}
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
        <StyledHeartIcon aria-label="좋아요 마크" />
        {likes}
      </LikesWrapper>
    </Container>
  );
}

const Container = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  width: 100%;
  height: 100px;
  background: var(--color-bg-primary);
  border-radius: 10px;
  cursor: pointer;
  box-sizing: border-box;
  overflow: hidden;
  color: var(--color-text-primary);
  text-decoration: none;

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
  box-shadow: 0 4px 10px var(--color-card-shadow);

  &:hover {
    background: var(--color-bg-hover);
    transform: translateY(-4px);
    box-shadow: 0 8px 16px var(--color-card-shadow-hover);
  }

  &:hover div > img {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    height: 68px;

    div {
      font-size: 0.8em;
    }
  }

  @media (max-width: 480px) {
    height: 47px;

    div {
      font-size: 0.6em;
    }
  }
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
  overflow: hidden;
  width: 192px;
  height: 100%;

  @media (max-width: 768px) {
    width: 130px;
  }

  @media (max-width: 480px) {
    width: 90px;
  }
`;

const Thumbnail = styled.img<{ loaded: boolean }>`
  position: ${({ loaded }) => (loaded ? "static" : "absolute")};
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease, opacity 0.3s ease;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  padding: 0 10px;
  font-size: 1rem;
  gap: 12px;

  @media (max-width: 768px) {
    gap: 10px;
  }

  @media (max-width: 480px) {
    gap: 8px;
  }
`;

const StyledHeartIcon = styled(HeartIcon)`
  width: 15px;
  height: 15px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 12.5px;
    height: 12.5px;
  }

  @media (max-width: 480px) {
    width: 10px;
    height: 10px;
  }
`;

const LikesWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 75px;
  }

  @media (max-width: 480px) {
    width: 50px;
  }
`;
```

- [ ] **Step 4: PopularPosts.tsx에서 Article에 to/params 전달**

`apps/front/src/pages/main-page/ui/PopularPosts.tsx`에서 import에 `linkToSlug` 추가 후 `Article` 호출 부분을 수정한다.

```tsx
import { formatYearMonth, linkToSlug } from "@/shared/lib";
```

```tsx
popularPosts.map((post) => (
  <Article
    key={post.link}
    title={post.title}
    link={post.link}
    thumbnail={post.thumbnail}
    likes={post.likes}
    released_at={formatYearMonth(post.released_at)}
    to="/$slug"
    params={{ slug: linkToSlug(post.link) }}
  />
))
```

- [ ] **Step 5: PostsList.tsx에서 Article에 to/params 전달**

`apps/front/src/pages/posts-page/ui/PostsList.tsx`에서 import에 `linkToSlug` 추가 후 `Article` 호출 부분을 수정한다.

```tsx
import { formatYearMonth, linkToSlug } from "@/shared/lib";
```

```tsx
<Article
  title={post.title}
  link={post.link}
  thumbnail={post.thumbnail}
  likes={post.likes}
  released_at={formatYearMonth(post.released_at)}
  to="/posts/$slug"
  params={{ slug: linkToSlug(post.link) }}
/>
```

- [ ] **Step 6: lint 실행**

```bash
pnpm --filter front lint --fix
```

- [ ] **Step 7: 빌드 에러 확인**

```bash
pnpm --filter front build
```

Expected: 빌드 성공, 에러 없음

- [ ] **Step 8: 커밋**

```bash
git add apps/front/src/shared/lib/linkToSlug.ts \
        apps/front/src/shared/lib/index.ts \
        apps/front/src/shared/ui/Article.tsx \
        apps/front/src/pages/main-page/ui/PopularPosts.tsx \
        apps/front/src/pages/posts-page/ui/PostsList.tsx
git commit -m "feat: Article 컴포넌트를 Link 기반 라우트 네비게이션으로 교체"
```

---

### Task 7: 동작 수동 검증

- [ ] **Step 1: 개발 서버 실행**

```bash
pnpm --filter front dev
```

- [ ] **Step 2: 메인 페이지 모달 확인**
  - `/` 접속
  - Popular Posts 중 하나 클릭
  - URL이 `/포스트제목`으로 변경되는지 확인
  - 모달이 뜨는지 확인
  - 닫기 버튼 클릭 시 `/`로 돌아오는지 확인
  - 브라우저 뒤로가기로 모달 닫힘 확인
  - `/포스트제목` URL 직접 입력 시 모달 열린 채로 로딩되는지 확인

- [ ] **Step 3: posts 페이지 모달 확인**
  - `/posts` 접속
  - 포스트 하나 클릭
  - URL이 `/posts/포스트제목`으로 변경되는지 확인
  - 닫기 버튼 클릭 시 `/posts`로 돌아오는지 확인
  - 브라우저 뒤로가기로 모달 닫힘 확인
  - `/posts/포스트제목` URL 직접 입력 시 모달 열린 채로 로딩되는지 확인
