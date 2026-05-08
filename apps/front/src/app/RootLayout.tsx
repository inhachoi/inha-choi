import styled from "@emotion/styled";
import { Outlet } from "@tanstack/react-router";

import { Footer, NavigationBar } from "@/widgets";

export function RootLayout() {
  return (
    <>
      <NavigationBar />
      <PageLayout>
        <Outlet />
      </PageLayout>
      <Footer />
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
