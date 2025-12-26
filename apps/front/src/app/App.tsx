import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavigationBar, Footer } from "@/widgets";
import styled from "@emotion/styled";
import { colors } from "@toss/tds-colors";
import { GlobalStyles } from "./GlobalStyles";
import { Suspense, lazy } from "react";
import { LoadingSpinner } from "@/shared/ui/loading-spinner";

const MainPage = lazy(() => import("@/pages/main-page"));
const PostsPage = lazy(() => import("@/pages/posts-page"));
const GuestbookPage = lazy(
  () => import("@/pages/guestbook-page")
);
const NotFoundPage = lazy(() => import("@/pages/not-found-page"));

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />

      <NavigationBar />

      <Suspense fallback={<LoadingSpinner />}>
        <PageLayout>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/guestbook" element={<GuestbookPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PageLayout>
      </Suspense>

      <Footer />
    </BrowserRouter>
  );
}

export default App;

const PageLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.grey50};
  margin: 60px 0 0 0;
  min-width: 370px;

  @media (max-width: 768px) {
    margin: 51px 0 0 0;
  }

  @media (max-width: 480px) {
    margin: 42px 0 0 0;
  }
`;
