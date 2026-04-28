import styled from "@emotion/styled";
import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { GlobalStyles } from "@/app/styles/GlobalStyles";
import { Footer, NavigationBar } from "@/widgets";

export function RootLayout() {
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
