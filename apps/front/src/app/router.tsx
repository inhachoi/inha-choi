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
