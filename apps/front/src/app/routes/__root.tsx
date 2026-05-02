import { createRootRoute } from "@tanstack/react-router";

import { RootLayout } from "@/app/layouts/RootLayout";
import { AppProviders } from "@/app/providers/AppProviders";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  return (
    <AppProviders>
      <RootLayout />
    </AppProviders>
  );
}
