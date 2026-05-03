# 동적 OG 태그 설계

## 목표

URL을 카카오톡 등 메신저에 공유할 때, 각 페이지/포스팅에 맞는 OG 미리보기(제목, 설명, 이미지)가 뜨도록 한다.

## 전제 조건

- 배포 환경: nginx가 `dist/client/` 정적 파일 서빙, `/api/*`는 Express 프록시
- 카카오톡 등 메신저는 JS 미실행 → 서버에서 내려주는 HTML에 OG 태그가 있어야 함
- 해결 방식: **빌드 타임 pre-render** — 각 URL별 HTML 파일을 미리 생성

## 구현 방식

### 1. 정적 라우트 head() 정의

각 route 파일에 `head()` 함수를 추가해 페이지별 OG 태그를 선언한다.

| 라우트 | og:title | og:description | og:image |
|--------|----------|----------------|----------|
| `/` | 개발자 최경일 | UX와 소통에 집중합니다. | 프로필 사진 |
| `/posts` | 블로그 \| 개발자 최경일 | 최경일의 개발 블로그 | 프로필 사진 |
| `/guestbook` | 방명록 \| 개발자 최경일 | 방명록을 남겨주세요 | 프로필 사진 |
| `/chat` | AI 채팅 \| 개발자 최경일 | AI와 대화해보세요 | 프로필 사진 |
| `/games` | 미니게임 \| 개발자 최경일 | 미니게임 모음 | 프로필 사진 |
| `/_mainLayout/$slug` | 포스트 제목 | 포스트 설명 | 포스트 썸네일 |
| `/posts/$slug` | 포스트 제목 | 포스트 설명 | 포스트 썸네일 |

- 공통 fallback image: `https://www.gyeung-il.com/assets/choi-CBcsyV5s.jpg`

### 2. 동적 포스트 OG — route loader

`/_mainLayout/$slug`와 `/posts/$slug` 두 route 파일에 TanStack Router `loader`를 추가한다.

- loader에서 Velog GraphQL API(`https://v2.velog.io/graphql`)에 `ReadPost` 쿼리로 slug에 해당하는 포스트의 `title`, `thumbnail`, `short_description`을 fetch
- `head()` 함수에서 loader 데이터를 받아 OG 태그에 사용
- pre-render 시 이 loader가 빌드 타임에 실행되어 HTML에 올바른 OG 태그가 포함됨

```ts
// 예시
loader: async ({ params }) => {
  const res = await fetch("https://v2.velog.io/graphql", {
    method: "POST",
    body: JSON.stringify({
      operationName: "ReadPost",
      query: `query ReadPost($username: String, $url_slug: String) {
        post(username: $username, url_slug: $url_slug) {
          title
          thumbnail
          short_description
        }
      }`,
      variables: { username: "chlruddlf73", url_slug: params.slug },
    }),
  });
  const { data } = await res.json();
  return data.post;
},
head: ({ loaderData }) => ({
  meta: [
    { property: "og:title", content: loaderData?.title ?? "개발자 최경일" },
    { property: "og:description", content: loaderData?.short_description ?? "UX와 소통에 집중합니다." },
    { property: "og:image", content: loaderData?.thumbnail ?? "https://www.gyeung-il.com/assets/choi-CBcsyV5s.jpg" },
  ],
}),
```

### 3. 서버 posts API description 추가

현재 `/api/posts` 응답에 `description`이 누락되어 있다. Velog의 `short_description` 필드를 추가한다.

- 파일: `apps/server/src/modules/posts/posts.routes.js`
- GraphQL query에 `short_description` 추가
- 응답 mapping에 `description: p.short_description` 추가
- `PostDTO`에 `description` 필드 실질적으로 반영

### 4. Pre-render 설정

`vite.config.ts`의 TanStack Start prerender 옵션에 경로 목록을 제공한다.

- 정적 경로: `/posts`, `/guestbook`, `/chat`, `/games` 명시
- 동적 포스트 경로: 빌드 시 Velog API에서 전체 포스팅 slug 목록을 fetch해서 `/_mainLayout/[slug]`, `/posts/[slug]` 경로를 자동 생성
- 포스팅이 많으면 페이지네이션을 반복 호출해서 전체 slug 수집

```ts
// vite.config.ts 예시
tanstackStart({
  prerender: {
    routes: async () => {
      const slugs = await fetchAllVelogSlugs(); // 빌드 타임 fetch
      return [
        "/posts",
        "/guestbook",
        "/chat",
        "/games",
        ...slugs.map((s) => `/_mainLayout/${s}`),
        ...slugs.map((s) => `/posts/${s}`),
      ];
    },
  },
})
```

### 5. Nginx root 경로 수정

TanStack Start 마이그레이션으로 빌드 output이 `dist/` → `dist/client/`로 변경되었다. nginx 설정을 반영한다.

- `root /home/ubuntu/inha-choi/apps/front/dist;` → `root /home/ubuntu/inha-choi/apps/front/dist/client;`
- `try_files`는 현행 유지 (`$uri /index.html` → pre-render된 파일 없으면 shell로 fallback)

## 파일 변경 목록

| 파일 | 변경 내용 |
|------|-----------|
| `apps/front/src/app/routes/posts.tsx` | head() 추가 |
| `apps/front/src/app/routes/guestbook.tsx` | head() 추가 |
| `apps/front/src/app/routes/chat.tsx` | head() 추가 |
| `apps/front/src/app/routes/games.tsx` | head() 추가 |
| `apps/front/src/app/routes/_mainLayout/$slug.tsx` | loader + head() 추가 |
| `apps/front/src/app/routes/posts.$slug.tsx` | loader + head() 추가 |
| `apps/front/vite.config.ts` | prerender 설정 추가 |
| `apps/server/src/modules/posts/posts.routes.js` | short_description 추가 |
| `apps/front/src/shared/model/types.ts` | PostDTO description 반영 |
| `infra/nginx/inhachoi.conf` | root 경로 dist/client로 수정 |

## 빌드/배포 영향

- 빌드 시 Velog API 외부 호출 발생 (포스팅 수에 비례, 수초 이내 예상)
- 새 포스팅 올린 후 재빌드+재배포 필요 (기존과 동일한 배포 절차)
- nginx 설정 변경은 서버에서 `sudo nginx -s reload` 한 번 필요
