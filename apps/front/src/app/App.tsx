import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage, PostsPage, StudyPage, GuestbookPage } from "@/pages";
import { NavigationBar, Footer } from "@/widgets";
import styled from "@emotion/styled";
import { colors } from "@toss/tds-colors";
import { GlobalStyles } from "./GlobalStyles";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <NavigationBar />
      <PageLayout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/study" element={<StudyPage />} />
          <Route path="/guestbook" element={<GuestbookPage />} />
        </Routes>
      </PageLayout>
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
