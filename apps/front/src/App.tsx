import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Main, Posts, Study, Visitor } from "./pages";
import { NavigationBar } from "./widgets/NavigationBar";
import styled from "@emotion/styled";

function App() {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Container>        
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/Study" element={<Study />} />
          <Route path="/Visitor" element={<Visitor />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width:720px;
  margin: 60px auto 0 auto;
`;
