import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { RootLayout } from "@/app/layouts/RootLayout";
import { FALLBACK_OG_IMAGE, SITE_NAME, SITE_URL } from "@/app/lib";
import { AppProviders } from "@/app/providers/AppProviders";
import { GlobalStyles } from "@/app/styles/GlobalStyles";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "UTF-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { key: "description", name: "description", content: "UX와 소통에 집중하는 프론트엔드 개발자 최경일의 개인 홈페이지입니다. 블로그, 방명록, AI 채팅, 미니게임 등 직접 만든 서비스를 소개합니다." },
      { key: "og:title", property: "og:title", content: SITE_NAME },
      { key: "og:description", property: "og:description", content: "UX와 소통에 집중하는 프론트엔드 개발자 최경일의 개인 홈페이지입니다. 블로그, 방명록, AI 채팅, 미니게임 등 직접 만든 서비스를 소개합니다." },
      { key: "og:url", property: "og:url", content: `${SITE_URL}/` },
      { key: "og:image", property: "og:image", content: FALLBACK_OG_IMAGE },
      { key: "og:image:alt", property: "og:image:alt", content: "개발자 최경일의 프로필 사진" },
      { key: "og:site_name", property: "og:site_name", content: SITE_NAME },
      { key: "og:type", property: "og:type", content: "website" },
      { key: "article:author", property: "article:author", content: "https://github.com/inhachoi" },
      { key: "twitter:card", name: "twitter:card", content: "summary_large_image" },
      { key: "twitter:title", name: "twitter:title", content: SITE_NAME },
      { key: "twitter:description", name: "twitter:description", content: "UX와 소통에 집중하는 프론트엔드 개발자 최경일의 개인 홈페이지입니다. 블로그, 방명록, AI 채팅, 미니게임 등 직접 만든 서비스를 소개합니다." },
      { key: "twitter:image", name: "twitter:image", content: FALLBACK_OG_IMAGE },
      { title: SITE_NAME },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/logo.png" },
      { rel: "sitemap", type: "application/xml", href: "/sitemap.xml" },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css",
      },
    ],
    scripts: [
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-X3JHD025QV",
        async: true,
      },
    ],
  }),
  component: Root,
});

function Root() {
  return (
    <html lang="ko">
      <head>
        <HeadContent />
        {/* Google Analytics inline */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-X3JHD025QV');`,
          }}
        />
        {/* 다크모드 깜빡임 방지 */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem("theme");if(t==="dark"){document.documentElement.setAttribute("data-theme","dark");}else{document.documentElement.removeAttribute("data-theme");}})();`,
          }}
        />
      </head>
      <body>
        <AppProviders>
          <GlobalStyles />
          <RootLayout />
        </AppProviders>
        {import.meta.env.DEV && <TanStackRouterDevtools />}
        <Scripts />
      </body>
    </html>
  );
}

