import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { RootLayout } from "@/app/layouts/RootLayout";
import { AppProviders } from "@/app/providers/AppProviders";
import { GlobalStyles } from "@/app/styles/GlobalStyles";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "UTF-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { name: "description", content: "UX와 소통에 집중합니다." },
      { property: "og:title", content: "개발자 최경일" },
      { property: "og:description", content: "UX와 소통에 집중합니다." },
      { property: "og:url", content: "https://www.gyeung-il.com/" },
      {
        property: "og:image",
        content: "https://www.gyeung-il.com/assets/choi-CBcsyV5s.jpg",
      },
      {
        property: "og:image:alt",
        content: "개발자 최경일의 프로필 사진",
      },
      { property: "og:site_name", content: "개발자 최경일" },
      { property: "og:type", content: "website" },
      {
        property: "article:author",
        content: "https://github.com/inhachoi",
      },
      { name: "twitter:title", content: "개발자 최경일" },
      { name: "twitter:description", content: "UX와 소통에 집중합니다." },
      {
        name: "twitter:image",
        content: "https://www.gyeung-il.com/assets/choi-CBcsyV5s.jpg",
      },
      { title: "개발자 최경일" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/logo.png" },
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
