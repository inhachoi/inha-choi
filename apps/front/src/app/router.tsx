import styled from "@emotion/styled";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { lazyRouteComponent } from "@tanstack/react-router";

import { GlobalStyles } from "@/app/styles/GlobalStyles";
import { Footer, NavigationBar } from "@/widgets";

const rootRoute = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <GlobalStyles />
      <NavigationBar />
      <PageLayout>
        <Outlet />
      </PageLayout>
      <Footer />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </>
  );
}

const PageLayout = styled.div`
  display: flex;
  justify-content: center;
  background: var(--color-bg-page);
  margin: 60px 0 0 0;
  min-width: 370px;
  min-height: calc(100vh - 140px);

  @media (max-width: 768px) {
    margin: 51px 0 0 0;
    min-height: calc(100vh - 114px);
  }

  @media (max-width: 480px) {
    margin: 42px 0 0 0;
    min-height: calc(100vh - 90px);
  }
`;

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: lazyRouteComponent(() => import("@/pages/main-page")),
});

const postsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/posts",
  component: lazyRouteComponent(() => import("@/pages/posts-page")),
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
  indexRoute,
  postsRoute,
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
