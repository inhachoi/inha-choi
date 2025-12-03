import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage, PostsPage, StudyPage, VisitorPage } from "@/pages";
import { NavigationBar } from "./widgets/NavigationBar";
import styled from "@emotion/styled";
import { colors } from "@toss/tds-colors";
import { Footer } from "@/widgets";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Container>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/Study" element={<StudyPage />} />
          <Route path="/Visitor" element={<VisitorPage />} />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.grey50};
  margin: 60px auto 0 auto;
  min-width: 370px;
`;
