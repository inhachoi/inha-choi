import { Suspense, lazy } from "react";
import { LoadingSpinner } from "@/shared/ui";
import { Routes, Route } from "react-router-dom";
import styled from "@emotion/styled";
import { colors } from "@toss/tds-colors";

const MainPage = lazy(() => import("@/pages/main-page"));
const PostsPage = lazy(() => import("@/pages/posts-page"));
const GuestbookPage = lazy(() => import("@/pages/guestbook-page"));
const NotFoundPage = lazy(() => import("@/pages/not-found-page"));

export function AppRouter() {
  return (
    <PageLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/guestbook" element={<GuestbookPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </PageLayout>
  );
}

const PageLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.grey50};
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
